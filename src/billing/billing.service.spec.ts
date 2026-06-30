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
        MP_ACCESS_TOKEN: 'test-access-token',
        MP_WEBHOOK_SECRET: 'test-webhook-secret',
        API_URL: 'http://localhost:3000',
        FRONTEND_URL: 'http://localhost:5173',
      }),
      prisma as any,
    );
  });

  describe('ensureToken', () => {
    it('should throw when access token not configured', async () => {
      const serviceWithoutToken = new BillingService(
        createConfigMock({}),
        prisma as any,
      );

      prisma.subscription.findUnique.mockResolvedValue(null);
      await expect(serviceWithoutToken.getOrCreateCustomer('user1', 'a@b.com', 'Test')).rejects.toThrow(
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
        mpCustomerId: 'cust_existing_123',
      });

      const result = await service.getOrCreateCustomer('user1', 'test@email.com', 'Test User');

      expect(result).toBe('cust_existing_123');
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it('should create new customer in Mercado Pago when not in DB', async () => {
      prisma.subscription.findUnique.mockResolvedValue(null);
      // First call: search
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ results: [] }),
      });
      // Second call: create
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ id: 12345 }),
      });

      const result = await service.getOrCreateCustomer('user1', 'test@email.com', 'Test User');

      expect(result).toBe('12345');
      expect(prisma.subscription.upsert).toHaveBeenCalled();
    });

    it('should find existing customer by email', async () => {
      prisma.subscription.findUnique.mockResolvedValue(null);
      // Search returns existing customer
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ results: [{ id: 99999 }] }),
      });

      const result = await service.getOrCreateCustomer('user1', 'test@email.com', 'Test User');

      expect(result).toBe('99999');
    });
  });

  describe('createSubscriptionCheckout', () => {
    it('should create checkout for monthly plan', async () => {
      prisma.subscription.findUnique.mockResolvedValue({
        mpCustomerId: 'cust_123',
      });
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({
          id: 'pref_789',
          init_point: 'https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=abc',
        }),
      });

      const result = await service.createSubscriptionCheckout(
        'user1', 'test@email.com', 'Test User', 'monthly',
      );

      expect(result.checkoutUrl).toContain('mercadopago.com.br');
      expect(result.preferenceId).toBe('pref_789');
    });

    it('should create checkout for yearly plan', async () => {
      prisma.subscription.findUnique.mockResolvedValue({
        mpCustomerId: 'cust_123',
      });
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({
          id: 'pref_789',
          init_point: 'https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=abc',
        }),
      });

      const result = await service.createSubscriptionCheckout(
        'user1', 'test@email.com', 'Test User', 'yearly',
      );

      expect(result.checkoutUrl).toContain('mercadopago.com.br');
    });
  });

  describe('createOneTimeCheckout', () => {
    it('should create one-time payment', async () => {
      prisma.subscription.findUnique.mockResolvedValue({
        mpCustomerId: 'cust_123',
      });
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({
          id: 'pref_xyz',
          init_point: 'https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=xyz',
        }),
      });

      const result = await service.createOneTimeCheckout(
        'user1', 'test@email.com', 'Test User',
      );

      expect(result.preferenceId).toBe('pref_xyz');
      expect(result.checkoutUrl).toContain('mercadopago.com.br');
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
        mpPreapprovalId: 'preapproval_123',
      });
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({}),
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
    it('should handle payment webhook for one-time', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({
          id: 12345,
          status: 'approved',
          external_reference: 'onetime_user1',
          payment_type_id: 'credit_card',
          transaction_amount: 19.90,
          date_created: '2026-01-01T00:00:00.000-03:00',
        }),
      });

      await service.handleWebhook({
        topic: 'payment',
        resource: '12345',
      });

      expect(prisma.oneTimeAccess.upsert).toHaveBeenCalled();
      expect(prisma.subscription.upsert).toHaveBeenCalled();
    });

    it('should handle preapproval webhook', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({
          id: 'preapproval_123',
          status: 'authorized',
          metadata: { userId: 'user1' },
          date_created: '2026-01-01T00:00:00.000-03:00',
          next_payment_date: '2026-02-01T00:00:00.000-03:00',
        }),
      });

      await service.handleWebhook({
        topic: 'preapproval',
        resource: 'preapproval_123',
      });

      expect(prisma.subscription.upsert).toHaveBeenCalled();
    });
  });
});
