import { ServiceUnavailableException } from '@nestjs/common';
import Stripe from 'stripe';
import { BillingService } from './billing.service';

jest.mock('stripe');

const MockStripe = Stripe as unknown as jest.Mock;

function createStripeMock() {
  return {
    webhooks: { constructEvent: jest.fn() },
    products: { retrieve: jest.fn() },
    prices: { list: jest.fn() },
    customers: {
      retrieve: jest.fn(),
      search: jest.fn(),
      create: jest.fn(),
    },
    checkout: {
      sessions: { create: jest.fn() },
    },
    billingPortal: {
      sessions: { create: jest.fn() },
    },
    subscriptions: {
      update: jest.fn(),
      retrieve: jest.fn(),
    },
  };
}

function createConfigMock(values: Record<string, string | undefined> = {}) {
  return { get: jest.fn((key: string) => values[key]) } as any;
}

function createPrismaMock() {
  return {
    subscription: {
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      upsert: jest.fn(),
      update: jest.fn(),
    },
    webhookEvent: {
      findUnique: jest.fn(),
      upsert: jest.fn(),
      update: jest.fn(),
    },
  };
}

describe('BillingService', () => {
  let service: BillingService;
  let config: any;
  let prisma: any;
  let stripe: ReturnType<typeof createStripeMock>;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    config = createConfigMock({ STRIPE_SECRET_KEY: 'sk_test_123' });
    prisma = createPrismaMock();
    stripe = createStripeMock();
    MockStripe.mockImplementation(() => stripe);
    service = new BillingService(config, prisma);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('constructor / ensureStripe', () => {
    it('should initialize Stripe when STRIPE_SECRET_KEY is provided', () => {
      expect(MockStripe).toHaveBeenCalledWith('sk_test_123');
      expect(service['stripe']).toBe(stripe);
    });

    it('should throw ServiceUnavailableException when STRIPE_SECRET_KEY is not set', () => {
      const noKeyConfig = createConfigMock({});
      const svc = new BillingService(noKeyConfig, prisma);
      expect(svc['stripe']).toBeNull();
      expect(() => svc['ensureStripe']()).toThrow(ServiceUnavailableException);
    });
  });

  describe('getProductWithPrices', () => {
    it('should return null product when no STRIPE_PRODUCT_ID is configured', async () => {
      config.get.mockImplementation((key: string) => {
        if (key === 'STRIPE_PRODUCT_ID') return undefined;
        return 'sk_test_123';
      });
      const svc = new BillingService(config, prisma);
      const result = await svc.getProductWithPrices();
      expect(result).toEqual({
        product: null,
        prices: { monthly: null, yearly: null },
      });
    });

    it('should fetch prices from Stripe and return product with monthly/yearly pricing', async () => {
      config.get.mockImplementation((key: string) => {
        if (key === 'STRIPE_PRODUCT_ID') return 'prod_123';
        return 'sk_test_123';
      });
      const svc = new BillingService(config, prisma);

      stripe.prices.list.mockResolvedValue({
        data: [
          {
            id: 'price_monthly',
            recurring: { interval: 'month' },
            unit_amount: 2999,
            currency: 'brl',
          },
          {
            id: 'price_yearly',
            recurring: { interval: 'year' },
            unit_amount: 23999,
            currency: 'brl',
          },
        ],
      });
      stripe.products.retrieve.mockResolvedValue({
        id: 'prod_123',
        name: 'FisioApp PRO',
        description: 'Premium plan',
        images: ['img.png'],
      });

      const result = await svc.getProductWithPrices();

      expect(result.product).toEqual({
        id: 'prod_123',
        name: 'FisioApp PRO',
        description: 'Premium plan',
        images: ['img.png'],
      });
      expect(result.prices.monthly).toEqual({
        priceId: 'price_monthly',
        amount: 2999,
        currency: 'brl',
      });
      expect(result.prices.yearly).toMatchObject({
        priceId: 'price_yearly',
        amount: 23999,
        currency: 'brl',
        monthlyEquivalent: Math.round(23999 / 12),
      });
      expect(result.prices.yearly!.discountPercent).toBeGreaterThan(0);
      expect(stripe.prices.list).toHaveBeenCalledWith({
        product: 'prod_123',
        active: true,
      });
    });

    it('should cache prices and skip Stripe price fetch on second call within TTL', async () => {
      config.get.mockImplementation((key: string) => {
        if (key === 'STRIPE_PRODUCT_ID') return 'prod_123';
        return 'sk_test_123';
      });
      const svc = new BillingService(config, prisma);

      stripe.prices.list.mockResolvedValue({
        data: [
          {
            id: 'price_m',
            recurring: { interval: 'month' },
            unit_amount: 1000,
            currency: 'brl',
          },
          {
            id: 'price_y',
            recurring: { interval: 'year' },
            unit_amount: 10000,
            currency: 'brl',
          },
        ],
      });
      stripe.products.retrieve.mockResolvedValue({
        id: 'prod_123',
        name: 'Plan',
        description: '',
        images: [],
      });

      await svc.getProductWithPrices();
      expect(stripe.prices.list).toHaveBeenCalledTimes(1);

      jest.advanceTimersByTime(3 * 60 * 1000);
      await svc.getProductWithPrices();
      expect(stripe.prices.list).toHaveBeenCalledTimes(1);
      expect(stripe.products.retrieve).toHaveBeenCalledTimes(2);
    });

    it('should refetch prices after cache expires', async () => {
      config.get.mockImplementation((key: string) => {
        if (key === 'STRIPE_PRODUCT_ID') return 'prod_123';
        return 'sk_test_123';
      });
      const svc = new BillingService(config, prisma);

      stripe.prices.list.mockResolvedValue({
        data: [
          {
            id: 'price_m',
            recurring: { interval: 'month' },
            unit_amount: 1000,
            currency: 'brl',
          },
          {
            id: 'price_y',
            recurring: { interval: 'year' },
            unit_amount: 10000,
            currency: 'brl',
          },
        ],
      });
      stripe.products.retrieve.mockResolvedValue({
        id: 'prod_123',
        name: 'Plan',
        description: '',
        images: [],
      });

      await svc.getProductWithPrices();
      jest.advanceTimersByTime(6 * 60 * 1000);
      await svc.getProductWithPrices();
      expect(stripe.prices.list).toHaveBeenCalledTimes(2);
    });

    it('should handle only monthly price (no yearly)', async () => {
      config.get.mockImplementation((key: string) => {
        if (key === 'STRIPE_PRODUCT_ID') return 'prod_123';
        return 'sk_test_123';
      });
      const svc = new BillingService(config, prisma);

      stripe.prices.list.mockResolvedValue({
        data: [
          {
            id: 'price_m',
            recurring: { interval: 'month' },
            unit_amount: 2999,
            currency: 'brl',
          },
        ],
      });
      stripe.products.retrieve.mockResolvedValue({
        id: 'prod_123',
        name: 'Plan',
        description: '',
        images: [],
      });

      const result = await svc.getProductWithPrices();
      expect(result.prices.monthly).not.toBeNull();
      expect(result.prices.yearly).toBeNull();
    });
  });

  describe('getOrCreateStripeCustomer', () => {
    it('should return existing stripeCustomerId from DB', async () => {
      prisma.subscription.findUnique.mockResolvedValue({
        stripeCustomerId: 'cus_existing',
      });
      stripe.customers.retrieve.mockResolvedValue({
        id: 'cus_existing',
        deleted: false,
      } as any);

      const result = await service.getOrCreateStripeCustomer(
        'user1',
        'a@b.com',
        'User',
      );
      expect(result).toBe('cus_existing');
      expect(stripe.customers.search).not.toHaveBeenCalled();
    });

    it('should search Stripe when DB subscription has no stripeCustomerId', async () => {
      prisma.subscription.findUnique.mockResolvedValue({
        stripeCustomerId: null,
      });
      stripe.customers.search.mockResolvedValue({
        data: [{ id: 'cus_found' }],
      });
      prisma.subscription.upsert.mockResolvedValue({});

      const result = await service.getOrCreateStripeCustomer(
        'user1',
        'a@b.com',
        'User',
      );
      expect(result).toBe('cus_found');
      expect(stripe.customers.search).toHaveBeenCalledWith({
        query: 'metadata["userId"]:"user1"',
      });
      expect(prisma.subscription.upsert).toHaveBeenCalledWith({
        where: { userId: 'user1' },
        update: { stripeCustomerId: 'cus_found' },
        create: {
          userId: 'user1',
          stripeCustomerId: 'cus_found',
          plan: 'FREE',
          status: 'ACTIVE',
        },
      });
    });

    it('should create a new Stripe customer when no DB record and search is empty', async () => {
      prisma.subscription.findUnique.mockResolvedValue(null);
      stripe.customers.search.mockResolvedValue({ data: [] });
      stripe.customers.create.mockResolvedValue({ id: 'cus_new' });
      prisma.subscription.upsert.mockResolvedValue({});

      const result = await service.getOrCreateStripeCustomer(
        'user1',
        'a@b.com',
        'User',
      );
      expect(result).toBe('cus_new');
      expect(stripe.customers.create).toHaveBeenCalledWith({
        email: 'a@b.com',
        name: 'User',
        metadata: { userId: 'user1' },
      });
    });

    it('should clear stripeCustomerId and search Stripe if customer was deleted', async () => {
      prisma.subscription.findUnique.mockResolvedValue({
        stripeCustomerId: 'cus_deleted',
      });
      stripe.customers.retrieve.mockResolvedValue({ deleted: true });
      stripe.customers.search.mockResolvedValue({
        data: [{ id: 'cus_recreated' }],
      });
      prisma.subscription.upsert.mockResolvedValue({});

      const result = await service.getOrCreateStripeCustomer(
        'user1',
        'a@b.com',
        'User',
      );
      expect(result).toBe('cus_recreated');
      expect(prisma.subscription.update).toHaveBeenCalledWith({
        where: { userId: 'user1' },
        data: { stripeCustomerId: null },
      });
    });

    it('should clear stripeCustomerId if customers.retrieve throws', async () => {
      prisma.subscription.findUnique.mockResolvedValue({
        stripeCustomerId: 'cus_bad',
      });
      stripe.customers.retrieve.mockRejectedValue(new Error('Not found'));
      stripe.customers.search.mockResolvedValue({
        data: [{ id: 'cus_fallback' }],
      });
      prisma.subscription.upsert.mockResolvedValue({});

      const result = await service.getOrCreateStripeCustomer(
        'user1',
        'a@b.com',
        'User',
      );
      expect(result).toBe('cus_fallback');
      expect(prisma.subscription.update).toHaveBeenCalledWith({
        where: { userId: 'user1' },
        data: { stripeCustomerId: null },
      });
    });
  });

  describe('createCheckoutSession', () => {
    it('should create a Stripe Checkout Session with correct params', async () => {
      prisma.subscription.findUnique.mockResolvedValue(null);
      stripe.customers.search.mockResolvedValue({ data: [] });
      stripe.customers.create.mockResolvedValue({ id: 'cus_new' });
      prisma.subscription.upsert.mockResolvedValue({});

      config.get.mockImplementation((key: string) => {
        if (key === 'STRIPE_PRODUCT_ID') return 'prod_123';
        if (key === 'FRONTEND_URL') return 'https://app.fisio.com';
        return 'sk_test_123';
      });
      const svc = new BillingService(config, prisma);

      stripe.prices.list.mockResolvedValue({
        data: [
          {
            id: 'price_m',
            recurring: { interval: 'month' },
            unit_amount: 2999,
            currency: 'brl',
          },
          {
            id: 'price_y',
            recurring: { interval: 'year' },
            unit_amount: 23999,
            currency: 'brl',
          },
        ],
      });
      stripe.products.retrieve.mockResolvedValue({
        id: 'prod_123',
        name: 'Plan',
        description: '',
        images: [],
      });
      stripe.checkout.sessions.create.mockResolvedValue({
        url: 'https://checkout.stripe.com/cpay/cs_123',
      });

      const result = await svc.createCheckoutSession(
        'user1',
        'a@b.com',
        'User',
        'month',
      );

      expect(result).toEqual({
        url: 'https://checkout.stripe.com/cpay/cs_123',
      });
      expect(stripe.checkout.sessions.create).toHaveBeenCalledWith({
        customer: 'cus_new',
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [{ price: 'price_m', quantity: 1 }],
        metadata: { userId: 'user1' },
        success_url:
          'https://app.fisio.com/settings?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: 'https://app.fisio.com/pricing',
      });
    });

    it('should throw when price not found for the requested interval', async () => {
      prisma.subscription.findUnique.mockResolvedValue(null);
      stripe.customers.search.mockResolvedValue({ data: [] });
      stripe.customers.create.mockResolvedValue({ id: 'cus_new' });
      prisma.subscription.upsert.mockResolvedValue({});

      config.get.mockImplementation((key: string) => {
        if (key === 'STRIPE_PRODUCT_ID') return 'prod_123';
        return 'sk_test_123';
      });
      const svc = new BillingService(config, prisma);

      stripe.prices.list.mockResolvedValue({ data: [] });
      stripe.products.retrieve.mockResolvedValue({
        id: 'prod_123',
        name: 'Plan',
        description: '',
        images: [],
      });

      await expect(
        svc.createCheckoutSession('user1', 'a@b.com', 'User', 'month'),
      ).rejects.toThrow('Price not found for interval: month');
    });

    it('should use yearly price when interval is year', async () => {
      prisma.subscription.findUnique.mockResolvedValue(null);
      stripe.customers.search.mockResolvedValue({ data: [] });
      stripe.customers.create.mockResolvedValue({ id: 'cus_new' });
      prisma.subscription.upsert.mockResolvedValue({});

      config.get.mockImplementation((key: string) => {
        if (key === 'STRIPE_PRODUCT_ID') return 'prod_123';
        if (key === 'FRONTEND_URL') return 'https://app.fisio.com';
        return 'sk_test_123';
      });
      const svc = new BillingService(config, prisma);

      stripe.prices.list.mockResolvedValue({
        data: [
          {
            id: 'price_m',
            recurring: { interval: 'month' },
            unit_amount: 2999,
            currency: 'brl',
          },
          {
            id: 'price_y',
            recurring: { interval: 'year' },
            unit_amount: 23999,
            currency: 'brl',
          },
        ],
      });
      stripe.products.retrieve.mockResolvedValue({
        id: 'prod_123',
        name: 'Plan',
        description: '',
        images: [],
      });
      stripe.checkout.sessions.create.mockResolvedValue({
        url: 'https://checkout.stripe.com/yearly',
      });

      await svc.createCheckoutSession('user1', 'a@b.com', 'User', 'year');

      expect(stripe.checkout.sessions.create).toHaveBeenCalledWith(
        expect.objectContaining({
          line_items: [{ price: 'price_y', quantity: 1 }],
        }),
      );
    });
  });

  describe('createPortalSession', () => {
    it('should create a billing portal session for existing customer', async () => {
      prisma.subscription.findUnique.mockResolvedValue({
        stripeCustomerId: 'cus_123',
      });
      config.get.mockReturnValue('https://app.fisio.com');

      stripe.billingPortal.sessions.create.mockResolvedValue({
        url: 'https://billing.stripe.com/portal/abc',
      });

      const result = await service.createPortalSession('user1');
      expect(result).toEqual({ url: 'https://billing.stripe.com/portal/abc' });
      expect(stripe.billingPortal.sessions.create).toHaveBeenCalledWith({
        customer: 'cus_123',
        return_url: 'https://app.fisio.com/settings',
      });
    });

    it('should throw when no stripeCustomerId exists', async () => {
      prisma.subscription.findUnique.mockResolvedValue({
        stripeCustomerId: null,
      });
      await expect(service.createPortalSession('user1')).rejects.toThrow(
        'No Stripe customer found',
      );
    });

    it('should throw when subscription record does not exist', async () => {
      prisma.subscription.findUnique.mockResolvedValue(null);
      await expect(service.createPortalSession('user1')).rejects.toThrow(
        'No Stripe customer found',
      );
    });
  });

  describe('getSubscriptionStatus', () => {
    it('should return FREE defaults when no subscription record exists', async () => {
      prisma.subscription.findUnique.mockResolvedValue(null);
      const result = await service.getSubscriptionStatus('user1');
      expect(result).toEqual({
        plan: 'FREE',
        status: 'ACTIVE',
        currentPeriodEnd: null,
        cancelAtPeriodEnd: false,
      });
    });

    it('should return subscription details from DB', async () => {
      const now = new Date();
      prisma.subscription.findUnique.mockResolvedValue({
        plan: 'PRO',
        status: 'ACTIVE',
        currentPeriodEnd: now,
        cancelAtPeriodEnd: false,
      });

      const result = await service.getSubscriptionStatus('user1');
      expect(result).toEqual({
        plan: 'PRO',
        status: 'ACTIVE',
        currentPeriodEnd: now,
        cancelAtPeriodEnd: false,
      });
    });

    it('should return cancelAtPeriodEnd true when set', async () => {
      prisma.subscription.findUnique.mockResolvedValue({
        plan: 'PRO',
        status: 'ACTIVE',
        currentPeriodEnd: new Date(),
        cancelAtPeriodEnd: true,
      });

      const result = await service.getSubscriptionStatus('user1');
      expect(result.cancelAtPeriodEnd).toBe(true);
    });
  });

  describe('cancelSubscription', () => {
    it('should throw when no active subscription', async () => {
      prisma.subscription.findUnique.mockResolvedValue(null);
      await expect(service.cancelSubscription('user1')).rejects.toThrow(
        'No active subscription to cancel',
      );
    });

    it('should throw when subscription has no stripeSubscriptionId', async () => {
      prisma.subscription.findUnique.mockResolvedValue({
        stripeSubscriptionId: null,
      });
      await expect(service.cancelSubscription('user1')).rejects.toThrow(
        'No active subscription to cancel',
      );
    });

    it('should update Stripe and DB to cancel at period end', async () => {
      prisma.subscription.findUnique.mockResolvedValue({
        stripeSubscriptionId: 'sub_abc',
      });
      stripe.subscriptions.update.mockResolvedValue({});

      const result = await service.cancelSubscription('user1');

      expect(stripe.subscriptions.update).toHaveBeenCalledWith('sub_abc', {
        cancel_at_period_end: true,
      });
      expect(prisma.subscription.update).toHaveBeenCalledWith({
        where: { userId: 'user1' },
        data: { cancelAtPeriodEnd: true },
      });
      expect(result).toEqual({
        message:
          'Subscription will be cancelled at the end of the billing period',
      });
    });
  });

  describe('reactivateSubscription', () => {
    it('should throw when no subscription exists', async () => {
      prisma.subscription.findUnique.mockResolvedValue(null);
      await expect(service.reactivateSubscription('user1')).rejects.toThrow(
        'No subscription to reactivate',
      );
    });

    it('should throw when stripeSubscriptionId is null', async () => {
      prisma.subscription.findUnique.mockResolvedValue({
        stripeSubscriptionId: null,
      });
      await expect(service.reactivateSubscription('user1')).rejects.toThrow(
        'No subscription to reactivate',
      );
    });

    it('should update Stripe and DB to reactivate subscription', async () => {
      prisma.subscription.findUnique.mockResolvedValue({
        stripeSubscriptionId: 'sub_abc',
      });
      stripe.subscriptions.update.mockResolvedValue({});

      const result = await service.reactivateSubscription('user1');

      expect(stripe.subscriptions.update).toHaveBeenCalledWith('sub_abc', {
        cancel_at_period_end: false,
      });
      expect(prisma.subscription.update).toHaveBeenCalledWith({
        where: { userId: 'user1' },
        data: { cancelAtPeriodEnd: false },
      });
      expect(result).toEqual({ message: 'Subscription reactivated' });
    });
  });

  describe('handleWebhookEvent', () => {
    it('should skip already processed events', async () => {
      prisma.webhookEvent.findUnique.mockResolvedValue({ processed: true });

      const event = {
        id: 'evt_1',
        type: 'checkout.session.completed',
        data: { object: {} },
      };
      await service.handleWebhookEvent(event as any);

      expect(prisma.webhookEvent.upsert).not.toHaveBeenCalled();
    });

    it('should process checkout.session.completed event', async () => {
      prisma.webhookEvent.findUnique.mockResolvedValue(null);
      prisma.webhookEvent.upsert.mockResolvedValue({});
      prisma.webhookEvent.update.mockResolvedValue({});

      const session = {
        metadata: { userId: 'user1' },
        subscription: 'sub_123',
      };
      stripe.subscriptions.retrieve.mockResolvedValue({
        id: 'sub_123',
        items: { data: [{ price: { id: 'price_m' } }] },
        current_period_start: 1700000000,
        current_period_end: 1700003600,
        cancel_at_period_end: false,
      });
      prisma.subscription.upsert.mockResolvedValue({});

      const event = {
        id: 'evt_1',
        type: 'checkout.session.completed',
        data: { object: session },
      };
      await service.handleWebhookEvent(event as any);

      expect(stripe.subscriptions.retrieve).toHaveBeenCalledWith('sub_123');
      expect(prisma.subscription.upsert).toHaveBeenCalled();
      expect(prisma.webhookEvent.update).toHaveBeenCalledWith({
        where: { stripeEventId: 'evt_1' },
        data: { processed: true },
      });
    });

    it('should skip checkout.session.completed when no userId in metadata', async () => {
      prisma.webhookEvent.findUnique.mockResolvedValue(null);
      prisma.webhookEvent.upsert.mockResolvedValue({});
      prisma.webhookEvent.update.mockResolvedValue({});

      const session = { metadata: {}, subscription: 'sub_123' };
      const event = {
        id: 'evt_1',
        type: 'checkout.session.completed',
        data: { object: session },
      };
      await service.handleWebhookEvent(event as any);

      expect(stripe.subscriptions.retrieve).not.toHaveBeenCalled();
    });

    it('should process customer.subscription.updated event', async () => {
      prisma.webhookEvent.findUnique.mockResolvedValue(null);
      prisma.webhookEvent.upsert.mockResolvedValue({});
      prisma.webhookEvent.update.mockResolvedValue({});

      prisma.subscription.findFirst.mockResolvedValue({ id: 'sub_db_1' });
      prisma.subscription.update.mockResolvedValue({});

      const subscription = {
        id: 'sub_123',
        status: 'active',
        items: { data: [{ price: { id: 'price_new' } }] },
        current_period_start: 1700000000,
        current_period_end: 1700003600,
        cancel_at_period_end: false,
      };
      const event = {
        id: 'evt_2',
        type: 'customer.subscription.updated',
        data: { object: subscription },
      };
      await service.handleWebhookEvent(event as any);

      expect(prisma.subscription.findFirst).toHaveBeenCalledWith({
        where: { stripeSubscriptionId: 'sub_123' },
      });
      expect(prisma.subscription.update).toHaveBeenCalledWith({
        where: { id: 'sub_db_1' },
        data: expect.objectContaining({
          stripePriceId: 'price_new',
          status: 'ACTIVE',
        }),
      });
    });

    it('should skip customer.subscription.updated when no DB record found', async () => {
      prisma.webhookEvent.findUnique.mockResolvedValue(null);
      prisma.webhookEvent.upsert.mockResolvedValue({});
      prisma.webhookEvent.update.mockResolvedValue({});

      prisma.subscription.findFirst.mockResolvedValue(null);

      const subscription = {
        id: 'sub_999',
        status: 'active',
        items: { data: [] },
        current_period_start: 0,
        current_period_end: 0,
        cancel_at_period_end: false,
      };
      const event = {
        id: 'evt_3',
        type: 'customer.subscription.updated',
        data: { object: subscription },
      };
      await service.handleWebhookEvent(event as any);

      expect(prisma.subscription.update).not.toHaveBeenCalled();
      expect(prisma.webhookEvent.update).toHaveBeenCalled();
    });

    it('should process customer.subscription.deleted event', async () => {
      prisma.webhookEvent.findUnique.mockResolvedValue(null);
      prisma.webhookEvent.upsert.mockResolvedValue({});
      prisma.webhookEvent.update.mockResolvedValue({});

      prisma.subscription.findFirst.mockResolvedValue({
        id: 'sub_db_1',
        userId: 'user1',
      });
      prisma.subscription.update.mockResolvedValue({});

      const subscription = { id: 'sub_123' };
      const event = {
        id: 'evt_4',
        type: 'customer.subscription.deleted',
        data: { object: subscription },
      };
      await service.handleWebhookEvent(event as any);

      expect(prisma.subscription.update).toHaveBeenCalledWith({
        where: { id: 'sub_db_1' },
        data: {
          plan: 'FREE',
          status: 'ACTIVE',
          stripeSubscriptionId: null,
          stripePriceId: null,
          currentPeriodStart: null,
          currentPeriodEnd: null,
          cancelAtPeriodEnd: false,
        },
      });
    });

    it('should skip customer.subscription.deleted when no DB record found', async () => {
      prisma.webhookEvent.findUnique.mockResolvedValue(null);
      prisma.webhookEvent.upsert.mockResolvedValue({});
      prisma.webhookEvent.update.mockResolvedValue({});

      prisma.subscription.findFirst.mockResolvedValue(null);

      const event = {
        id: 'evt_5',
        type: 'customer.subscription.deleted',
        data: { object: { id: 'sub_none' } },
      };
      await service.handleWebhookEvent(event as any);

      expect(prisma.subscription.update).not.toHaveBeenCalled();
      expect(prisma.webhookEvent.update).toHaveBeenCalled();
    });

    it('should process invoice.payment_failed event', async () => {
      prisma.webhookEvent.findUnique.mockResolvedValue(null);
      prisma.webhookEvent.upsert.mockResolvedValue({});
      prisma.webhookEvent.update.mockResolvedValue({});

      prisma.subscription.findFirst.mockResolvedValue({ id: 'sub_db_1' });
      prisma.subscription.update.mockResolvedValue({});

      const invoice = { subscription: 'sub_123' };
      const event = {
        id: 'evt_6',
        type: 'invoice.payment_failed',
        data: { object: invoice },
      };
      await service.handleWebhookEvent(event as any);

      expect(prisma.subscription.update).toHaveBeenCalledWith({
        where: { id: 'sub_db_1' },
        data: { status: 'PAST_DUE' },
      });
    });

    it('should skip invoice.payment_failed when no subscription on invoice', async () => {
      prisma.webhookEvent.findUnique.mockResolvedValue(null);
      prisma.webhookEvent.upsert.mockResolvedValue({});
      prisma.webhookEvent.update.mockResolvedValue({});

      const invoice = { subscription: null };
      const event = {
        id: 'evt_7',
        type: 'invoice.payment_failed',
        data: { object: invoice },
      };
      await service.handleWebhookEvent(event as any);

      expect(prisma.subscription.findFirst).not.toHaveBeenCalled();
      expect(prisma.webhookEvent.update).toHaveBeenCalled();
    });

    it('should handle processing errors gracefully without crashing', async () => {
      prisma.webhookEvent.findUnique.mockResolvedValue(null);
      prisma.webhookEvent.upsert.mockResolvedValue({});
      prisma.webhookEvent.update.mockRejectedValue(
        new Error('DB write failed'),
      );

      const event = {
        id: 'evt_err',
        type: 'checkout.session.completed',
        data: { object: { metadata: {}, subscription: null } },
      };

      await expect(
        service.handleWebhookEvent(event as any),
      ).resolves.not.toThrow();
    });

    it('should handle unknown event types gracefully', async () => {
      prisma.webhookEvent.findUnique.mockResolvedValue(null);
      prisma.webhookEvent.upsert.mockResolvedValue({});
      prisma.webhookEvent.update.mockResolvedValue({});

      const event = {
        id: 'evt_unk',
        type: 'some.unknown.event',
        data: { object: {} },
      };
      await service.handleWebhookEvent(event as any);

      expect(prisma.webhookEvent.update).toHaveBeenCalledWith({
        where: { stripeEventId: 'evt_unk' },
        data: { processed: true },
      });
    });

    it('should create webhookEvent record before processing', async () => {
      prisma.webhookEvent.findUnique.mockResolvedValue(null);
      prisma.webhookEvent.upsert.mockResolvedValue({});
      prisma.webhookEvent.update.mockResolvedValue({});

      const event = { id: 'evt_new', type: 'some.event', data: { object: {} } };
      await service.handleWebhookEvent(event as any);

      expect(prisma.webhookEvent.upsert).toHaveBeenCalledWith({
        where: { stripeEventId: 'evt_new' },
        update: {},
        create: { stripeEventId: 'evt_new', type: 'some.event' },
      });
    });

    it('should handle checkout.session.completed with no subscription ID', async () => {
      prisma.webhookEvent.findUnique.mockResolvedValue(null);
      prisma.webhookEvent.upsert.mockResolvedValue({});
      prisma.webhookEvent.update.mockResolvedValue({});

      const session = { metadata: { userId: 'user1' }, subscription: null };
      const event = {
        id: 'evt_8',
        type: 'checkout.session.completed',
        data: { object: session },
      };
      await service.handleWebhookEvent(event as any);

      expect(stripe.subscriptions.retrieve).not.toHaveBeenCalled();
      expect(prisma.webhookEvent.update).toHaveBeenCalled();
    });

    it('should handle invoice.payment_failed when subscription not found in DB', async () => {
      prisma.webhookEvent.findUnique.mockResolvedValue(null);
      prisma.webhookEvent.upsert.mockResolvedValue({});
      prisma.webhookEvent.update.mockResolvedValue({});

      prisma.subscription.findFirst.mockResolvedValue(null);

      const invoice = { subscription: 'sub_unknown' };
      const event = {
        id: 'evt_9',
        type: 'invoice.payment_failed',
        data: { object: invoice },
      };
      await service.handleWebhookEvent(event as any);

      expect(prisma.subscription.update).not.toHaveBeenCalled();
      expect(prisma.webhookEvent.update).toHaveBeenCalled();
    });
  });

  describe('mapStripeStatus (private)', () => {
    it('should map "active" to ACTIVE', () => {
      expect(service['mapStripeStatus']('active')).toBe('ACTIVE');
    });

    it('should map "past_due" to PAST_DUE', () => {
      expect(service['mapStripeStatus']('past_due')).toBe('PAST_DUE');
    });

    it('should map "canceled" to CANCELLED', () => {
      expect(service['mapStripeStatus']('canceled')).toBe('CANCELLED');
    });

    it('should map "unpaid" to UNPAID', () => {
      expect(service['mapStripeStatus']('unpaid')).toBe('UNPAID');
    });

    it('should default unknown status to ACTIVE', () => {
      expect(service['mapStripeStatus']('incomplete')).toBe('ACTIVE');
      expect(service['mapStripeStatus']('trialing')).toBe('ACTIVE');
      expect(service['mapStripeStatus']('')).toBe('ACTIVE');
    });
  });

  describe('verifyWebhookSignature', () => {
    it('should return verified event on valid signature', () => {
      config.get.mockImplementation((key: string) => {
        if (key === 'STRIPE_WEBHOOK_SECRET') return 'whsec_test';
        return 'sk_test_123';
      });
      const svc = new BillingService(config, prisma);
      const fakeEvent = { id: 'evt_verified', type: 'test' };
      stripe.webhooks.constructEvent.mockReturnValue(fakeEvent);

      const result = svc.verifyWebhookSignature('raw', 'sig_abc');
      expect(result).toBe(fakeEvent);
      expect(stripe.webhooks.constructEvent).toHaveBeenCalledWith(
        'raw',
        'sig_abc',
        'whsec_test',
      );
    });

    it('should throw when STRIPE_WEBHOOK_SECRET is not configured', () => {
      config.get.mockImplementation((key: string) => {
        if (key === 'STRIPE_WEBHOOK_SECRET') return undefined;
        return 'sk_test_123';
      });
      const svc = new BillingService(config, prisma);
      expect(() => svc.verifyWebhookSignature('raw', 'sig')).toThrow(
        'STRIPE_WEBHOOK_SECRET not configured',
      );
    });

    it('should throw when signature header is missing', () => {
      config.get.mockImplementation((key: string) => {
        if (key === 'STRIPE_WEBHOOK_SECRET') return 'whsec_test';
        return 'sk_test_123';
      });
      const svc = new BillingService(config, prisma);
      expect(() => svc.verifyWebhookSignature('raw', undefined)).toThrow(
        'Missing stripe-signature header',
      );
    });

    it('should throw ServiceUnavailableException when Stripe is not configured', () => {
      const noKeyConfig = createConfigMock({});
      const svc = new BillingService(noKeyConfig, prisma);
      expect(() => svc.verifyWebhookSignature('raw', 'sig')).toThrow(
        ServiceUnavailableException,
      );
    });
  });

  describe('ensureStripe edge cases', () => {
    it('should return same Stripe instance on repeated calls', () => {
      const s1 = service['ensureStripe']();
      const s2 = service['ensureStripe']();
      expect(s1).toBe(s2);
    });
  });
});
