import { ServiceUnavailableException } from '@nestjs/common';
import { BillingService } from './billing.service';

// Mock fetch globally
global.fetch = jest.fn();

function createConfigMock(values: Record<string, string | undefined> = {}) {
  return { get: jest.fn((key: string) => values[key]) } as any;
}

function createPrismaMock() {
  return {
    subscription: {
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
      upsert: jest.fn(),
      update: jest.fn(),
      updateMany: jest.fn(),
    },
    oneTimeAccess: {
      findUnique: jest.fn(),
      upsert: jest.fn(),
      delete: jest.fn(),
    },
  };
}

describe('BillingService', () => {
  let service: BillingService;
  let prisma: ReturnType<typeof createPrismaMock>;
  const mockFetch = global.fetch as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    prisma = createPrismaMock();
    service = new BillingService(
      createConfigMock({
        PAGARME_API_KEY: 'test-api-key',
        PAGARME_WEBHOOK_SECRET: 'test-webhook-secret',
        PAGARME_PLAN_MONTHLY_ID: 'plan_monthly_123',
        PAGARME_PLAN_YEARLY_ID: 'plan_yearly_456',
        API_URL: 'http://localhost:3000',
        FRONTEND_URL: 'http://localhost:5173',
      }),
      prisma as any,
    );
  });

  describe('ensureApiKey', () => {
    it('should throw when API key not configured for API calls', async () => {
      const serviceWithoutKey = new BillingService(
        createConfigMock({}),
        prisma as any,
      );

      prisma.subscription.findUnique.mockResolvedValue(null);
      await expect(serviceWithoutKey.getOrCreateCustomer('user1', 'a@b.com', 'Test')).rejects.toThrow(
        ServiceUnavailableException,
      );
    });
  });

  describe('getPricing', () => {
    it('should return pricing information', async () => {
      const result = await service.getPricing();

      expect(result).toEqual({
        monthly: { amount: 1990, currency: 'BRL', label: 'Mensal' },
        yearly: {
          amount: 19000,
          currency: 'BRL',
          monthlyEquivalent: 1583,
          discountPercent: 20,
          label: 'Anual',
        },
        onetime: { amount: 1990, currency: 'BRL', durationDays: 30, label: 'Avulso' },
      });
    });
  });

  describe('getOrCreateCustomer', () => {
    it('should return existing customer ID from DB', async () => {
      prisma.subscription.findUnique.mockResolvedValue({
        pagarmeCustomerId: 'cust_existing_123',
      });

      const result = await service.getOrCreateCustomer('user1', 'test@email.com', 'Test User');

      expect(result).toBe('cust_existing_123');
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it('should create new customer in Pagar.me when not in DB', async () => {
      prisma.subscription.findUnique.mockResolvedValue(null);
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ id: 'cust_new_456' }),
      });

      const result = await service.getOrCreateCustomer('user1', 'test@email.com', 'Test User');

      expect(result).toBe('cust_new_456');
      expect(prisma.subscription.upsert).toHaveBeenCalled();
    });
  });

  describe('createSubscriptionCheckout', () => {
    it('should create checkout for monthly plan', async () => {
      prisma.subscription.findUnique.mockResolvedValue({
        pagarmeCustomerId: 'cust_123',
      });
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({
          id: 'sub_789',
          checkout_url: 'https://checkout.pagar.me/abc',
        }),
      });

      const result = await service.createSubscriptionCheckout(
        'user1', 'test@email.com', 'Test User', 'monthly',
      );

      expect(result.checkoutUrl).toBe('https://checkout.pagar.me/abc');
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/subscriptions'),
        expect.objectContaining({
          method: 'POST',
          body: expect.stringContaining('plan_monthly_123'),
        }),
      );
    });

    it('should create checkout for yearly plan', async () => {
      prisma.subscription.findUnique.mockResolvedValue({
        pagarmeCustomerId: 'cust_123',
      });
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({
          id: 'sub_789',
          checkout_url: 'https://checkout.pagar.me/abc',
        }),
      });

      const result = await service.createSubscriptionCheckout(
        'user1', 'test@email.com', 'Test User', 'yearly',
      );

      expect(result.checkoutUrl).toBe('https://checkout.pagar.me/abc');
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/subscriptions'),
        expect.objectContaining({
          body: expect.stringContaining('plan_yearly_456'),
        }),
      );
    });
  });

  describe('createOneTimeCheckout', () => {
    it('should create one-time payment', async () => {
      prisma.subscription.findUnique.mockResolvedValue({
        pagarmeCustomerId: 'cust_123',
      });
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({
          id: 'txn_789',
          payment_url: 'https://checkout.pagar.me/xyz',
        }),
      });

      const result = await service.createOneTimeCheckout(
        'user1', 'test@email.com', 'Test User',
      );

      expect(result.transactionId).toBe('txn_789');
      expect(result.paymentUrl).toBe('https://checkout.pagar.me/xyz');
    });
  });

  describe('getSubscriptionStatus', () => {
    it('should return FREE when no subscription', async () => {
      prisma.subscription.findUnique.mockResolvedValue(null);
      prisma.oneTimeAccess.findUnique.mockResolvedValue(null);

      const result = await service.getSubscriptionStatus('user1');

      expect(result.plan).toBe('FREE');
    });

    it('should return PRO with one-time info', async () => {
      prisma.subscription.findUnique.mockResolvedValue({
        plan: 'PRO',
        status: 'ACTIVE',
        currentPeriodEnd: new Date('2026-12-31'),
        cancelAtPeriodEnd: false,
      });
      prisma.oneTimeAccess.findUnique.mockResolvedValue({
        expiresAt: new Date('2026-12-31'),
      });

      const result = await service.getSubscriptionStatus('user1');

      expect(result.plan).toBe('PRO');
      expect(result.isOneTime).toBe(true);
    });

    it('should downgrade to FREE when one-time access expired', async () => {
      prisma.subscription.findUnique.mockResolvedValue({
        plan: 'PRO',
        status: 'ACTIVE',
      });
      prisma.oneTimeAccess.findUnique.mockResolvedValue({
        expiresAt: new Date('2020-01-01'), // Expired
      });

      const result = await service.getSubscriptionStatus('user1');

      expect(result.plan).toBe('FREE');
      expect(prisma.subscription.update).toHaveBeenCalled();
      expect(prisma.oneTimeAccess.delete).toHaveBeenCalled();
    });
  });

  describe('cancelSubscription', () => {
    it('should cancel subscription', async () => {
      prisma.subscription.findUnique.mockResolvedValue({
        pagarmeSubscriptionId: 'sub_123',
      });
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ status: 'canceled' }),
      });

      const result = await service.cancelSubscription('user1');

      expect(result.message).toBe('Subscription cancelled');
      expect(prisma.subscription.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ plan: 'FREE' }),
        }),
      );
    });

    it('should throw when no subscription', async () => {
      prisma.subscription.findUnique.mockResolvedValue(null);

      await expect(service.cancelSubscription('user1')).rejects.toThrow(
        'No active subscription to cancel',
      );
    });
  });

  describe('verifyWebhookSignature', () => {
    it('should return true for valid signature', () => {
      const body = { test: 'data' };
      const crypto = require('crypto');
      const expectedHash = crypto
        .createHmac('sha256', 'test-webhook-secret')
        .update(JSON.stringify(body))
        .digest('hex');

      const result = service.verifyWebhookSignature(body, expectedHash);
      expect(result).toBe(true);
    });

    it('should return false for invalid signature', () => {
      const result = service.verifyWebhookSignature({ test: 'data' }, 'invalid');
      expect(result).toBe(false);
    });

    it('should return true when no secret configured', () => {
      const serviceNoSecret = new BillingService(
        createConfigMock({}),
        prisma as any,
      );
      const result = serviceNoSecret.verifyWebhookSignature({}, 'anything');
      expect(result).toBe(true);
    });
  });

  describe('handleWebhook', () => {
    it('should handle subscription_created event', async () => {
      await service.handleWebhook({
        type: 'subscription_created',
        data: {
          id: 'sub_123',
          status: 'active',
          plan_id: 'plan_monthly',
          customer: { id: 'cust_123' },
          current_period_start: '2026-01-01',
          current_period_end: '2026-02-01',
          metadata: { userId: 'user1' },
        },
      });

      expect(prisma.subscription.upsert).toHaveBeenCalled();
    });

    it('should handle transaction with one_time payment', async () => {
      await service.handleWebhook({
        type: 'transaction_updated',
        data: {
          id: 'txn_123',
          status: 'paid',
          amount: 1990,
          customer: { id: 'cust_123' },
          metadata: { userId: 'user1', type: 'one_time' },
        },
      });

      expect(prisma.oneTimeAccess.upsert).toHaveBeenCalled();
      expect(prisma.subscription.upsert).toHaveBeenCalled();
    });
  });
});
