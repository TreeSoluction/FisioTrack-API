import { Injectable, Logger, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { SubscriptionStatus } from '@prisma/client';
import * as crypto from 'crypto';

interface MPPreference {
  id: string;
  init_point: string;
  external_reference: string;
}

interface MPPayment {
  id: number;
  status: string;
  status_detail: string;
  payment_type_id: string;
  external_reference: string;
  transaction_amount: number;
  date_created: string;
  date_approved?: string;
}

@Injectable()
export class BillingService {
  private logger = new Logger(BillingService.name);
  private accessToken: string;
  private apiUrl = 'https://api.mercadopago.com';

  constructor(
    private config: ConfigService,
    private prisma: PrismaService,
  ) {
    this.accessToken = this.config.get<string>('MP_ACCESS_TOKEN') || '';
    if (!this.accessToken) {
      this.logger.warn('MP_ACCESS_TOKEN not configured - billing disabled');
    }
  }

  private ensureToken(): string {
    if (!this.accessToken) {
      throw new ServiceUnavailableException('Payment not configured');
    }
    return this.accessToken;
  }

  private async request(method: string, path: string, body?: any) {
    const token = this.ensureToken();
    const url = `${this.apiUrl}${path}`;

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const error = await response.json();
      this.logger.error(`Mercado Pago error: ${JSON.stringify(error)}`);
      throw new Error(error.message || 'Payment provider error');
    }

    return response.json();
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

  // ========== CUSTOMERS ==========

  async getOrCreateCustomer(userId: string, email: string, name: string) {
    const subscription = await this.prisma.subscription.findUnique({
      where: { userId },
    });

    if (subscription?.mpCustomerId) {
      return subscription.mpCustomerId;
    }

    // Search for existing customer by email
    const searchResult = await this.request(
      'GET',
      `/v1/customers/search?email=${encodeURIComponent(email)}`,
    );

    if (searchResult.results?.length > 0) {
      const customerId = searchResult.results[0].id;
      await this.prisma.subscription.upsert({
        where: { userId },
        update: { mpCustomerId: String(customerId) },
        create: {
          userId,
          mpCustomerId: String(customerId),
          plan: 'FREE',
          status: 'ACTIVE',
        },
      });
      return String(customerId);
    }

    // Create new customer
    const customer = await this.request('POST', '/v1/customers', {
      email,
      first_name: name.split(' ')[0],
      last_name: name.split(' ').slice(1).join(' ') || '',
      description: `FisioTrack user: ${userId}`,
      metadata: { userId },
    });

    await this.prisma.subscription.upsert({
      where: { userId },
      update: { mpCustomerId: String(customer.id) },
      create: {
        userId,
        mpCustomerId: String(customer.id),
        plan: 'FREE',
        status: 'ACTIVE',
      },
    });

    return String(customer.id);
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
    const apiUrl = this.config.get<string>('API_URL') || 'http://localhost:3000';

    const amount = plan === 'monthly' ? 1990 : 19000;
    const title = plan === 'monthly'
      ? 'FisioTrack PRO - Assinatura Mensal'
      : 'FisioTrack PRO - Assinatura Anual';

    // Create preference for subscription
    const preference = await this.request('POST', '/checkout/preferences', {
      items: [
        {
          id: `fisiotrack_${plan}`,
          title,
          quantity: 1,
          unit_price: amount / 100,
          currency_id: 'BRL',
        },
      ],
      payer: {
        email,
        name,
      },
      external_reference: `sub_${userId}_${plan}`,
      notification_url: `${apiUrl}/billing/webhook`,
      back_urls: {
        success: `${frontendUrl}/settings?payment=success`,
        failure: `${frontendUrl}/pricing?payment=failure`,
        pending: `${frontendUrl}/settings?payment=pending`,
      },
      auto_return: 'approved',
      metadata: {
        userId,
        plan,
        type: 'subscription',
      },
    });

    this.logger.log(`Preference created for user ${userId}: ${preference.id}`);

    return {
      preferenceId: preference.id,
      checkoutUrl: preference.init_point,
    };
  }

  async createOneTimeCheckout(userId: string, email: string, name: string) {
    const customerId = await this.getOrCreateCustomer(userId, email, name);
    const frontendUrl = this.config.get<string>('FRONTEND_URL') || 'http://localhost:5173';
    const apiUrl = this.config.get<string>('API_URL') || 'http://localhost:3000';

    // Create preference for one-time payment
    const preference = await this.request('POST', '/checkout/preferences', {
      items: [
        {
          id: 'fisiotrack_onetime',
          title: 'FisioTrack PRO - Acesso 30 dias',
          quantity: 1,
          unit_price: 19.90,
          currency_id: 'BRL',
        },
      ],
      payer: {
        email,
        name,
      },
      external_reference: `onetime_${userId}`,
      notification_url: `${apiUrl}/billing/webhook`,
      back_urls: {
        success: `${frontendUrl}/settings?payment=success`,
        failure: `${frontendUrl}/pricing?payment=failure`,
        pending: `${frontendUrl}/settings?payment=pending`,
      },
      auto_return: 'approved',
      payment_methods: {
        excluded_payment_types: [],
        installments: 1,
      },
      metadata: {
        userId,
        type: 'one_time',
      },
    });

    this.logger.log(`One-time preference created for user ${userId}: ${preference.id}`);

    return {
      preferenceId: preference.id,
      checkoutUrl: preference.init_point,
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

    if (!subscription?.mpPreapprovalId) {
      throw new Error('No active subscription to cancel');
    }

    // Cancel preapproval in Mercado Pago
    await this.request(
      'PUT',
      `/preapproval/${subscription.mpPreapprovalId}`,
      { status: 'cancelled' },
    );

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

    if (!subscription?.mpPreapprovalId) {
      throw new Error('No subscription to reactivate');
    }

    // Reactivate preapproval in Mercado Pago
    await this.request(
      'PUT',
      `/preapproval/${subscription.mpPreapprovalId}`,
      { status: 'authorized' },
    );

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
    const secret = this.config.get<string>('MP_WEBHOOK_SECRET');
    if (!secret) return true; // Skip verification if no secret configured

    const hash = crypto
      .createHmac('sha256', secret)
      .update(JSON.stringify(body))
      .digest('hex');

    return hash === signature;
  }

  async handleWebhook(event: any) {
    // Mercado Pago sends different webhook formats
    // topic: "payment" or "preapproval"
    const { topic, resource } = event;

    this.logger.log(`Webhook received: topic=${topic}, resource=${resource}`);

    try {
      if (topic === 'payment') {
        await this.handlePaymentWebhook(resource);
      } else if (topic === 'preapproval') {
        await this.handlePreapprovalWebhook(resource);
      }
    } catch (error) {
      this.logger.error(`Error processing webhook topic=${topic}:`, error);
    }
  }

  private async handlePaymentWebhook(paymentId: string) {
    // Fetch payment details
    const payment: MPPayment = await this.request('GET', `/v1/payments/${paymentId}`);

    const externalRef = payment.external_reference || '';

    // Handle one-time payment
    if (externalRef.startsWith('onetime_') && payment.status === 'approved') {
      const userId = externalRef.replace('onetime_', '');

      const expiresAt = new Date();
      expiresAt.setMonth(expiresAt.getMonth() + 1);

      await this.prisma.oneTimeAccess.upsert({
        where: { userId },
        update: {
          expiresAt,
          transactionId: String(payment.id),
        },
        create: {
          userId,
          expiresAt,
          transactionId: String(payment.id),
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

    // Handle subscription payment
    if (externalRef.startsWith('sub_') && payment.status === 'approved') {
      const parts = externalRef.split('_');
      const userId = parts[1];
      const plan = parts[2];

      // Update subscription
      await this.prisma.subscription.upsert({
        where: { userId },
        update: {
          plan: 'PRO',
          status: 'ACTIVE',
        },
        create: {
          userId,
          plan: 'PRO',
          status: 'ACTIVE',
        },
      });

      this.logger.log(`Subscription payment approved for user ${userId}`);
    }
  }

  private async handlePreapprovalWebhook(preapprovalId: string) {
    // Fetch preapproval details
    const preapproval = await this.request('GET', `/preapproval/${preapprovalId}`);

    const metadata = preapproval.metadata || {};
    const userId = metadata.userId;

    if (!userId) return;

    const statusMap: Record<string, SubscriptionStatus> = {
      authorized: SubscriptionStatus.ACTIVE,
      paused: SubscriptionStatus.PAST_DUE,
      cancelled: SubscriptionStatus.CANCELLED,
      terminated: SubscriptionStatus.CANCELLED,
    };

    const newStatus = statusMap[preapproval.status] || SubscriptionStatus.ACTIVE;

    await this.prisma.subscription.upsert({
      where: { userId },
      update: {
        mpPreapprovalId: preapprovalId,
        status: newStatus,
        currentPeriodStart: preapproval.date_created
          ? new Date(preapproval.date_created)
          : undefined,
        currentPeriodEnd: preapproval.next_payment_date
          ? new Date(preapproval.next_payment_date)
          : undefined,
      },
      create: {
        userId,
        mpPreapprovalId: preapprovalId,
        plan: 'PRO',
        status: newStatus,
        currentPeriodStart: preapproval.date_created
          ? new Date(preapproval.date_created)
          : undefined,
        currentPeriodEnd: preapproval.next_payment_date
          ? new Date(preapproval.next_payment_date)
          : undefined,
      },
    });

    this.logger.log(`Preapproval ${preapprovalId} updated for user ${userId}: ${preapproval.status}`);
  }
}
