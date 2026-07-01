import { Injectable, Logger, OnModuleInit, ServiceUnavailableException } from '@nestjs/common';
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
  payer?: { id: number };
}

interface MPPlan {
  id: string;
  amount: number;
  frequency: number;
  frequency_type: string;
  name: string;
  status: string;
}

@Injectable()
export class BillingService implements OnModuleInit {
  private logger = new Logger(BillingService.name);
  private accessToken: string;
  private apiUrl = 'https://api.mercadopago.com';
  private monthlyPlanId: string | null = null;
  private yearlyPlanId: string | null = null;

  constructor(
    private config: ConfigService,
    private prisma: PrismaService,
  ) {
    this.accessToken = this.config.get<string>('MP_ACCESS_TOKEN') || '';
    if (!this.accessToken) {
      this.logger.warn('MP_ACCESS_TOKEN not configured - billing disabled');
    }
  }

  async onModuleInit() {
    if (!this.accessToken) return;

    try {
      await this.ensurePlansExist();
    } catch (error) {
      this.logger.error('Failed to initialize billing plans:', error);
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

  // ========== PLAN MANAGEMENT ==========

  private async ensurePlansExist() {
    this.logger.log('Checking Mercado Pago plans...');

    // List existing plans
    const existingPlans = await this.request('GET', '/preapproval_plan/search');
    const plans = existingPlans.results || [];

    // Find or create monthly plan
    const monthlyPlan = plans.find(
      (p: any) => p.auto_recurring?.frequency === 1 &&
        p.auto_recurring?.frequency_type === 'months' &&
        p.auto_recurring?.transaction_amount === 19.90,
    );

    if (monthlyPlan) {
      this.monthlyPlanId = monthlyPlan.id;
      this.logger.log(`Monthly plan found: ${this.monthlyPlanId}`);
    } else {
      const newPlan = await this.request('POST', '/preapproval_plan', {
        reason: 'FisioTrack PRO - Assinatura Mensal',
        auto_recurring: {
          frequency: 1,
          frequency_type: 'months',
          transaction_amount: 19.90,
          currency_id: 'BRL',
        },
        payment_methods_allowed: ['credit_card', 'debit_card'],
        back_url: `${this.config.get('FRONTEND_URL') || 'http://localhost'}/settings`,
      });
      this.monthlyPlanId = newPlan.id;
      this.logger.log(`Monthly plan created: ${this.monthlyPlanId}`);
    }

    // Find or create yearly plan
    const yearlyPlan = plans.find(
      (p: any) => p.auto_recurring?.frequency === 12 &&
        p.auto_recurring?.frequency_type === 'months' &&
        p.auto_recurring?.transaction_amount === 190.00,
    );

    if (yearlyPlan) {
      this.yearlyPlanId = yearlyPlan.id;
      this.logger.log(`Yearly plan found: ${this.yearlyPlanId}`);
    } else {
      const newPlan = await this.request('POST', '/preapproval_plan', {
        reason: 'FisioTrack PRO - Assinatura Anual',
        auto_recurring: {
          frequency: 12,
          frequency_type: 'months',
          transaction_amount: 190.00,
          currency_id: 'BRL',
        },
        payment_methods_allowed: ['credit_card', 'debit_card'],
        back_url: `${this.config.get('FRONTEND_URL') || 'http://localhost'}/settings`,
      });
      this.yearlyPlanId = newPlan.id;
      this.logger.log(`Yearly plan created: ${this.yearlyPlanId}`);
    }

    this.logger.log(`Plans initialized - Monthly: ${this.monthlyPlanId}, Yearly: ${this.yearlyPlanId}`);
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
    plan: string,
  ) {
    const customerId = await this.getOrCreateCustomer(userId, email, name);
    const frontendUrl = this.config.get<string>('FRONTEND_URL') || 'http://localhost:5173';
    const apiUrl = this.config.get<string>('API_URL') || 'http://localhost:3000';

    // Normalize plan: accept 'month'/'year' or 'monthly'/'yearly'
    const normalizedPlan = plan === 'month' || plan === 'monthly' ? 'monthly' : 'yearly';
    const planId = normalizedPlan === 'monthly' ? this.monthlyPlanId : this.yearlyPlanId;

    if (!planId) {
      throw new Error('Subscription plans not initialized. Please restart the server.');
    }

    const amount = normalizedPlan === 'monthly' ? 19.90 : 190.00;
    const title = normalizedPlan === 'monthly'
      ? 'FisioTrack PRO - Assinatura Mensal'
      : 'FisioTrack PRO - Assinatura Anual';

    // Create preference for subscription checkout
    const preference = await this.request('POST', '/checkout/preferences', {
      items: [
        {
          id: `fisiotrack_${normalizedPlan}`,
          title,
          quantity: 1,
          unit_price: amount,
          currency_id: 'BRL',
        },
      ],
      payer: {
        email,
        first_name: name.split(' ')[0],
        last_name: name.split(' ').slice(1).join(' ') || '',
      },
      external_reference: `sub_${userId}_${normalizedPlan}`,
      notification_url: `${apiUrl}/billing/webhook`,
      back_urls: {
        success: `${frontendUrl}/settings?payment=success`,
        failure: `${frontendUrl}/pricing?payment=failure`,
        pending: `${frontendUrl}/settings?payment=pending`,
      },
      metadata: {
        userId,
        plan: normalizedPlan,
        plan_id: planId,
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

  async checkPaymentStatus(externalReference: string) {
    try {
      // Search for payments with this external reference
      const payments = await this.request('GET', `/v1/payments/search?external_reference=${externalReference}`);

      if (!payments.results || payments.results.length === 0) {
        return { status: 'pending', message: 'Pagamento não encontrado' };
      }

      const payment = payments.results[0];

      return {
        status: payment.status,
        statusDetail: payment.status_detail,
        paymentId: payment.id,
        amount: payment.transaction_amount,
        paymentType: payment.payment_method_id,
        dateApproved: payment.date_approved,
        dateCreated: payment.date_created,
      };
    } catch (error) {
      this.logger.error('Error checking payment status:', error);
      return { status: 'error', message: 'Erro ao verificar pagamento' };
    }
  }

  async cancelSubscription(userId: string) {
    const subscription = await this.prisma.subscription.findUnique({
      where: { userId },
    });

    if (!subscription || subscription.plan !== 'PRO') {
      throw new Error('No active subscription to cancel');
    }

    // If there's a preapproval, cancel it in Mercado Pago
    if (subscription.mpPreapprovalId) {
      try {
        await this.request(
          'PUT',
          `/preapproval/${subscription.mpPreapprovalId}`,
          { status: 'cancelled' },
        );
      } catch (error) {
        this.logger.error('Failed to cancel preapproval in Mercado Pago:', error);
        // Continue with local cancellation even if MP fails
      }
    }

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

  async createPortalUrl(userId: string) {
    const frontendUrl = this.config.get<string>('FRONTEND_URL') || 'http://localhost';
    // Mercado Pago doesn't have a portal like Stripe
    // Redirect to settings page where user can manage subscription
    return { url: `${frontendUrl}/settings` };
  }

  // ========== WEBHOOKS ==========

  verifyWebhookSignature(body: any, signature: string): boolean {
    const secret = this.config.get<string>('MP_WEBHOOK_SECRET');
    if (!secret) return true; // Skip verification if no secret configured
    if (!signature) return true; // Skip if no signature provided (for testing)

    // Mercado Pago uses x-signature header with HMAC-SHA256
    const hash = crypto
      .createHmac('sha256', secret)
      .update(JSON.stringify(body))
      .digest('hex');

    return hash === signature;
  }

  async handleWebhook(event: any) {
    // Mercado Pago sends: { action: "payment.created", type: "payment", data: { id: 123 } }
    // Or legacy format: { topic: "payment", resource: "123" }
    const topic = event.topic || event.type;
    const resourceId = event.data?.id || event.resource;

    this.logger.log(`Webhook received: type=${topic}, resourceId=${resourceId}`);

    try {
      if (topic === 'payment' || topic === 'payment.created') {
        await this.handlePaymentWebhook(String(resourceId));
      } else if (topic === 'preapproval' || topic === 'preapproval.created') {
        await this.handlePreapprovalWebhook(String(resourceId));
      } else {
        this.logger.log(`Unhandled webhook type: ${topic}`);
      }
    } catch (error) {
      this.logger.error(`Error processing webhook type=${topic}:`, error);
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
      const planId = plan === 'monthly' ? this.monthlyPlanId : this.yearlyPlanId;

      // Create preapproval for recurring payments
      let preapprovalId = null;
      if (planId) {
        try {
          const preapproval = await this.request('POST', '/preapproval', {
            preapproval_plan_id: planId,
            payer_id: payment.payer?.id,
            reason: `FisioTrack PRO - ${plan === 'monthly' ? 'Mensal' : 'Anual'}`,
            external_reference: `preapproval_${userId}_${plan}`,
            back_url: `${this.config.get('FRONTEND_URL') || 'http://localhost'}/settings`,
            notification_url: `${this.config.get('API_URL') || 'http://localhost:3000'}/billing/webhook`,
            metadata: { userId, plan },
          });
          preapprovalId = preapproval.id;
          this.logger.log(`Preapproval created for user ${userId}: ${preapprovalId}`);
        } catch (error) {
          this.logger.error(`Failed to create preapproval for user ${userId}:`, error);
        }
      }

      // Update subscription
      await this.prisma.subscription.upsert({
        where: { userId },
        update: {
          plan: 'PRO',
          status: 'ACTIVE',
          mpPreapprovalId: preapprovalId,
          currentPeriodStart: new Date(),
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        },
        create: {
          userId,
          plan: 'PRO',
          status: 'ACTIVE',
          mpPreapprovalId: preapprovalId,
          currentPeriodStart: new Date(),
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
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
