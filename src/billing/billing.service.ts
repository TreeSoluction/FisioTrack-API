import { Injectable, Logger, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { SubscriptionStatus } from '@prisma/client';
import * as crypto from 'crypto';

interface PagarMeCustomer {
  id?: string;
  external_id: string;
  name: string;
  email: string;
  type: 'individual' | 'company';
  document: string;
  phone_numbers: string[];
}

interface PagarMeSubscription {
  id: string;
  status: string;
  plan_id: string;
  customer: { id: string };
  current_period_start: string;
  current_period_end: string;
  payment_method: string;
  metadata: Record<string, string>;
}

interface PagarMeTransaction {
  id: string;
  status: string;
  amount: number;
  payment_method: string;
  customer: { id: string };
  metadata: Record<string, string>;
  boleto_url?: string;
  pix_qr_code?: string;
  pix_copy_paste?: string;
}

@Injectable()
export class BillingService {
  private logger = new Logger(BillingService.name);
  private apiKey: string;
  private apiUrl = 'https://api.pagar.me/core/v5';

  constructor(
    private config: ConfigService,
    private prisma: PrismaService,
  ) {
    this.apiKey = this.config.get<string>('PAGARME_API_KEY') || '';
    if (!this.apiKey) {
      this.logger.warn('PAGARME_API_KEY not configured - billing disabled');
    }
  }

  private ensureApiKey(): string {
    if (!this.apiKey) {
      throw new ServiceUnavailableException('Payment not configured');
    }
    return this.apiKey;
  }

  private async request(method: string, path: string, body?: any) {
    const apiKey = this.ensureApiKey();
    const url = `${this.apiUrl}${path}`;

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(apiKey + ':').toString('base64')}`,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const error = await response.json();
      this.logger.error(`Pagar.me error: ${JSON.stringify(error)}`);
      throw new Error(error.message || 'Payment provider error');
    }

    return response.json();
  }

  // ========== CUSTOMERS ==========

  async getOrCreateCustomer(userId: string, email: string, name: string) {
    const subscription = await this.prisma.subscription.findUnique({
      where: { userId },
    });

    if (subscription?.pagarmeCustomerId) {
      return subscription.pagarmeCustomerId;
    }

    // Create customer in Pagar.me
    const customer = await this.request('POST', '/customers', {
      external_id: userId,
      name,
      email,
      type: 'individual',
      document: '00000000000000', // CPF placeholder - will be updated
      phone_numbers: ['+5500000000000'],
    });

    // Save to DB
    await this.prisma.subscription.upsert({
      where: { userId },
      update: { pagarmeCustomerId: customer.id },
      create: {
        userId,
        pagarmeCustomerId: customer.id,
        plan: 'FREE',
        status: 'ACTIVE',
      },
    });

    return customer.id;
  }

  // ========== PRICING ==========

  async getPricing() {
    return {
      monthly: {
        amount: 1990,
        currency: 'BRL',
        label: 'Mensal',
      },
      yearly: {
        amount: 19000,
        currency: 'BRL',
        monthlyEquivalent: 1583,
        discountPercent: 20,
        label: 'Anual',
      },
      onetime: {
        amount: 1990,
        currency: 'BRL',
        durationDays: 30,
        label: 'Avulso',
      },
    };
  }

  // ========== CHECKOUT ==========

  async createSubscriptionCheckout(
    userId: string,
    email: string,
    name: string,
    plan: 'monthly' | 'yearly',
  ) {
    const customerId = await this.getOrCreateCustomer(userId, email, name);
    const frontendUrl = this.config.get<string>('FRONTEND_URL') || 'http://localhost:5173';

    // Create subscription in Pagar.me
    const subscription = await this.request('POST', '/subscriptions', {
      plan_id: plan === 'monthly'
        ? this.config.get('PAGARME_PLAN_MONTHLY_ID')
        : this.config.get('PAGARME_PLAN_YEARLY_ID'),
      customer_id: customerId,
      payment_method: 'credit_card',
      credit_card: {
        installments: 1,
        statement_descriptor: 'FISIOTRACK',
      },
      metadata: { userId, plan },
      postback_url: `${this.config.get('API_URL') || 'http://localhost:3000'}/billing/webhook`,
    });

    this.logger.log(`Subscription created for user ${userId}: ${subscription.id}`);

    return {
      subscriptionId: subscription.id,
      checkoutUrl: subscription.checkout_url,
    };
  }

  async createOneTimeCheckout(userId: string, email: string, name: string) {
    const customerId = await this.getOrCreateCustomer(userId, email, name);

    // Create one-time transaction in Pagar.me
    const transaction = await this.request('POST', '/transactions', {
      amount: 1990, // R$ 19,90 in cents
      customer_id: customerId,
      payment_methods: ['credit_card', 'pix', 'boleto'],
      metadata: { userId, type: 'one_time' },
      postback_url: `${this.config.get('API_URL') || 'http://localhost:3000'}/billing/webhook`,
    });

    this.logger.log(`One-time transaction created for user ${userId}: ${transaction.id}`);

    return {
      transactionId: transaction.id,
      paymentUrl: transaction.payment_url,
      pixQrCode: transaction.pix_qr_code,
      pixCopyPaste: transaction.pix_copy_paste,
      boletoUrl: transaction.boleto_url,
    };
  }

  // ========== SUBSCRIPTION MANAGEMENT ==========

  async getSubscriptionStatus(userId: string) {
    const subscription = await this.prisma.subscription.findUnique({
      where: { userId },
    });

    if (!subscription) {
      return { plan: 'FREE', status: 'ACTIVE', currentPeriodEnd: null, cancelAtPeriodEnd: false };
    }

    // Check one-time access expiration
    const oneTimeAccess = await this.prisma.oneTimeAccess.findUnique({
      where: { userId },
    });

    if (oneTimeAccess && new Date() > oneTimeAccess.expiresAt) {
      // One-time access expired - downgrade to FREE
      await this.prisma.subscription.update({
        where: { userId },
        data: { plan: 'FREE' },
      });
      await this.prisma.oneTimeAccess.delete({ where: { userId } });
      return { plan: 'FREE', status: 'ACTIVE', currentPeriodEnd: null, cancelAtPeriodEnd: false };
    }

    return {
      plan: subscription.plan,
      status: subscription.status,
      currentPeriodEnd: subscription.currentPeriodEnd,
      cancelAtPeriodEnd: subscription.cancelAtPeriodEnd,
      isOneTime: !!oneTimeAccess,
      oneTimeExpiresAt: oneTimeAccess?.expiresAt,
    };
  }

  async cancelSubscription(userId: string) {
    const subscription = await this.prisma.subscription.findUnique({
      where: { userId },
    });

    if (!subscription?.pagarmeSubscriptionId) {
      throw new Error('No active subscription to cancel');
    }

    // Cancel in Pagar.me
    await this.request('PATCH', `/subscriptions/${subscription.pagarmeSubscriptionId}`, {
      status: 'canceled',
    });

    // Update DB
    await this.prisma.subscription.update({
      where: { userId },
      data: {
        plan: 'FREE',
        status: 'CANCELLED',
        cancelAtPeriodEnd: false,
      },
    });

    this.logger.log(`Subscription cancelled for user ${userId}`);

    return { message: 'Subscription cancelled' };
  }

  async reactivateSubscription(userId: string) {
    const subscription = await this.prisma.subscription.findUnique({
      where: { userId },
    });

    if (!subscription?.pagarmeSubscriptionId) {
      throw new Error('No subscription to reactivate');
    }

    // Reactivate in Pagar.me
    await this.request('PATCH', `/subscriptions/${subscription.pagarmeSubscriptionId}`, {
      status: 'active',
    });

    // Update DB
    await this.prisma.subscription.update({
      where: { userId },
      data: {
        plan: 'PRO',
        status: 'ACTIVE',
        cancelAtPeriodEnd: false,
      },
    });

    this.logger.log(`Subscription reactivated for user ${userId}`);

    return { message: 'Subscription reactivated' };
  }

  // ========== WEBHOOKS ==========

  verifyWebhookSignature(body: any, signature: string): boolean {
    const secret = this.config.get<string>('PAGARME_WEBHOOK_SECRET');
    if (!secret) return true; // Skip verification if no secret configured

    const hash = crypto
      .createHmac('sha256', secret)
      .update(JSON.stringify(body))
      .digest('hex');

    return hash === signature;
  }

  async handleWebhook(event: any) {
    const { type, data } = event;

    this.logger.log(`Webhook received: ${type}`);

    try {
      switch (type) {
        case 'subscription_created':
          await this.handleSubscriptionCreated(data);
          break;
        case 'subscription_updated':
          await this.handleSubscriptionUpdated(data);
          break;
        case 'subscription_canceled':
          await this.handleSubscriptionCanceled(data);
          break;
        case 'subscription_success':
          await this.handleSubscriptionSuccess(data);
          break;
        case 'subscription_failed':
          await this.handleSubscriptionFailed(data);
          break;
        case 'transaction_created':
        case 'transaction_updated':
          await this.handleTransaction(data);
          break;
        default:
          this.logger.log(`Unhandled webhook type: ${type}`);
      }
    } catch (error) {
      this.logger.error(`Error processing webhook ${type}:`, error);
    }
  }

  private async handleSubscriptionCreated(data: PagarMeSubscription) {
    const userId = data.metadata?.userId;
    if (!userId) return;

    await this.prisma.subscription.upsert({
      where: { userId },
      update: {
        pagarmeSubscriptionId: data.id,
        plan: 'PRO',
        status: 'ACTIVE',
        currentPeriodStart: new Date(data.current_period_start),
        currentPeriodEnd: new Date(data.current_period_end),
      },
      create: {
        userId,
        pagarmeSubscriptionId: data.id,
        plan: 'PRO',
        status: 'ACTIVE',
        currentPeriodStart: new Date(data.current_period_start),
        currentPeriodEnd: new Date(data.current_period_end),
      },
    });

    this.logger.log(`Subscription created for user ${userId}`);
  }

  private async handleSubscriptionUpdated(data: PagarMeSubscription) {
    const userId = data.metadata?.userId;
    if (!userId) return;

    const statusMap: Record<string, SubscriptionStatus> = {
      active: SubscriptionStatus.ACTIVE,
      canceled: SubscriptionStatus.CANCELLED,
      past_due: SubscriptionStatus.PAST_DUE,
      unpaid: SubscriptionStatus.UNPAID,
    };

    const newStatus: SubscriptionStatus = statusMap[data.status] || SubscriptionStatus.ACTIVE;

    await this.prisma.subscription.updateMany({
      where: { pagarmeSubscriptionId: data.id },
      data: {
        status: newStatus,
        currentPeriodStart: new Date(data.current_period_start),
        currentPeriodEnd: new Date(data.current_period_end),
      },
    });
  }

  private async handleSubscriptionCanceled(data: PagarMeSubscription) {
    const userId = data.metadata?.userId;
    if (!userId) return;

    await this.prisma.subscription.updateMany({
      where: { pagarmeSubscriptionId: data.id },
      data: {
        plan: 'FREE',
        status: 'CANCELLED',
        cancelAtPeriodEnd: false,
      },
    });

    this.logger.log(`Subscription cancelled for user ${userId}`);
  }

  private async handleSubscriptionSuccess(data: PagarMeSubscription) {
    const userId = data.metadata?.userId;
    if (!userId) return;

    await this.prisma.subscription.updateMany({
      where: { pagarmeSubscriptionId: data.id },
      data: {
        status: 'ACTIVE',
        currentPeriodStart: new Date(data.current_period_start),
        currentPeriodEnd: new Date(data.current_period_end),
      },
    });
  }

  private async handleSubscriptionFailed(data: PagarMeSubscription) {
    const userId = data.metadata?.userId;
    if (!userId) return;

    await this.prisma.subscription.updateMany({
      where: { pagarmeSubscriptionId: data.id },
      data: { status: 'PAST_DUE' },
    });
  }

  private async handleTransaction(data: PagarMeTransaction) {
    const userId = data.metadata?.userId;
    const type = data.metadata?.type;

    if (!userId) return;

    // Handle one-time payment
    if (type === 'one_time' && data.status === 'paid') {
      const expiresAt = new Date();
      expiresAt.setMonth(expiresAt.getMonth() + 1);

      await this.prisma.oneTimeAccess.upsert({
        where: { userId },
        update: {
          expiresAt,
          transactionId: data.id,
        },
        create: {
          userId,
          expiresAt,
          transactionId: data.id,
        },
      });

      // Grant PRO access
      await this.prisma.subscription.upsert({
        where: { userId },
        update: { plan: 'PRO', status: 'ACTIVE' },
        create: { userId, plan: 'PRO', status: 'ACTIVE' },
      });

      this.logger.log(`One-time access granted for user ${userId}, expires ${expiresAt}`);
    }
  }
}
