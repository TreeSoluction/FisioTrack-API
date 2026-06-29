import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { PrismaService } from '../prisma/prisma.service';

interface CachedPrices {
  monthly: { priceId: string; amount: number; currency: string } | null;
  yearly: {
    priceId: string;
    amount: number;
    currency: string;
    monthlyEquivalent: number;
    discountPercent: number;
  } | null;
  cachedAt: number;
}

@Injectable()
export class BillingService {
  private stripe: Stripe | null = null;
  private logger = new Logger(BillingService.name);
  private pricesCache: CachedPrices | null = null;
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  constructor(
    private config: ConfigService,
    private prisma: PrismaService,
  ) {
    const secretKey = this.config.get<string>('STRIPE_SECRET_KEY');
    if (secretKey) {
      this.stripe = new Stripe(secretKey);
      this.logger.log('Stripe initialized');
    } else {
      this.logger.warn('Stripe not configured - billing disabled');
    }
  }

  private ensureStripe(): Stripe {
    if (!this.stripe) {
      throw new ServiceUnavailableException('Payment not configured');
    }
    return this.stripe;
  }

  verifyWebhookSignature(rawBody: any, sig: string | undefined): Stripe.Event {
    const stripe = this.ensureStripe();
    const secret = this.config.get<string>('STRIPE_WEBHOOK_SECRET');
    if (!secret) {
      throw new Error('STRIPE_WEBHOOK_SECRET not configured');
    }
    if (!sig) {
      throw new Error('Missing stripe-signature header');
    }
    return stripe.webhooks.constructEvent(rawBody, sig, secret);
  }

  async getProductWithPrices() {
    const stripe = this.ensureStripe();
    const productId = this.config.get<string>('STRIPE_PRODUCT_ID');

    if (!productId) {
      return { product: null, prices: { monthly: null, yearly: null } };
    }

    if (
      this.pricesCache &&
      Date.now() - this.pricesCache.cachedAt < this.CACHE_TTL
    ) {
      const product = await stripe.products.retrieve(productId);
      return {
        product: {
          id: product.id,
          name: product.name,
          description: product.description,
          images: product.images,
        },
        prices: {
          monthly: this.pricesCache.monthly,
          yearly: this.pricesCache.yearly,
        },
      };
    }

    const prices = await stripe.prices.list({
      product: productId,
      active: true,
    });

    let monthly = null;
    let yearly = null;

    for (const price of prices.data) {
      if (price.recurring?.interval === 'month') {
        monthly = {
          priceId: price.id,
          amount: price.unit_amount || 0,
          currency: price.currency,
        };
      } else if (price.recurring?.interval === 'year') {
        yearly = {
          priceId: price.id,
          amount: price.unit_amount || 0,
          currency: price.currency,
          monthlyEquivalent: 0,
          discountPercent: 0,
        };
      }
    }

    if (monthly && yearly) {
      const monthlyTotal = monthly.amount * 12;
      yearly.monthlyEquivalent = Math.round(yearly.amount / 12);
      yearly.discountPercent = Math.round(
        (1 - yearly.amount / monthlyTotal) * 100,
      );
    }

    this.pricesCache = { monthly, yearly, cachedAt: Date.now() };

    const product = await stripe.products.retrieve(productId);
    return {
      product: {
        id: product.id,
        name: product.name,
        description: product.description,
        images: product.images,
      },
      prices: { monthly, yearly },
    };
  }

  async getOrCreateStripeCustomer(userId: string, email: string, name: string) {
    const stripe = this.ensureStripe();

    const subscription = await this.prisma.subscription.findUnique({
      where: { userId },
    });

    if (subscription?.stripeCustomerId) {
      try {
        const customer = await stripe.customers.retrieve(
          subscription.stripeCustomerId,
        );
        if (customer.deleted) {
          await this.prisma.subscription.update({
            where: { userId },
            data: { stripeCustomerId: null },
          });
        } else {
          return subscription.stripeCustomerId;
        }
      } catch {
        await this.prisma.subscription.update({
          where: { userId },
          data: { stripeCustomerId: null },
        });
      }
    }

    const existing = await stripe.customers.search({
      query: `metadata["userId"]:"${userId}"`,
    });
    if (existing.data.length > 0) {
      const customerId = existing.data[0].id;
      await this.prisma.subscription.upsert({
        where: { userId },
        update: { stripeCustomerId: customerId },
        create: {
          userId,
          stripeCustomerId: customerId,
          plan: 'FREE',
          status: 'ACTIVE',
        },
      });
      return customerId;
    }

    const customer = await stripe.customers.create({
      email,
      name,
      metadata: { userId },
    });

    await this.prisma.subscription.upsert({
      where: { userId },
      update: { stripeCustomerId: customer.id },
      create: {
        userId,
        stripeCustomerId: customer.id,
        plan: 'FREE',
        status: 'ACTIVE',
      },
    });

    return customer.id;
  }

  async createCheckoutSession(
    userId: string,
    email: string,
    name: string,
    interval: 'month' | 'year',
  ) {
    const stripe = this.ensureStripe();
    const frontendUrl =
      this.config.get<string>('FRONTEND_URL') || 'http://localhost:5173';

    const customerId = await this.getOrCreateStripeCustomer(
      userId,
      email,
      name,
    );

    const prices = await this.getProductWithPrices();
    const price =
      interval === 'month' ? prices.prices.monthly : prices.prices.yearly;

    if (!price) {
      throw new Error('Price not found for interval: ' + interval);
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: price.priceId, quantity: 1 }],
      metadata: { userId },
      success_url: `${frontendUrl}/settings?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${frontendUrl}/pricing`,
    });

    return { url: session.url };
  }

  async createPortalSession(userId: string) {
    const stripe = this.ensureStripe();
    const frontendUrl =
      this.config.get<string>('FRONTEND_URL') || 'http://localhost:5173';

    const subscription = await this.prisma.subscription.findUnique({
      where: { userId },
    });
    if (!subscription?.stripeCustomerId) {
      throw new Error('No Stripe customer found');
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: subscription.stripeCustomerId,
      return_url: `${frontendUrl}/settings`,
    });

    return { url: session.url };
  }

  async getSubscriptionStatus(userId: string) {
    const subscription = await this.prisma.subscription.findUnique({
      where: { userId },
    });

    if (!subscription) {
      return {
        plan: 'FREE',
        status: 'ACTIVE',
        currentPeriodEnd: null,
        cancelAtPeriodEnd: false,
      };
    }

    return {
      plan: subscription.plan,
      status: subscription.status,
      currentPeriodEnd: subscription.currentPeriodEnd,
      cancelAtPeriodEnd: subscription.cancelAtPeriodEnd,
    };
  }

  async cancelSubscription(userId: string) {
    const stripe = this.ensureStripe();

    const subscription = await this.prisma.subscription.findUnique({
      where: { userId },
    });
    if (!subscription?.stripeSubscriptionId) {
      throw new Error('No active subscription to cancel');
    }

    await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
      cancel_at_period_end: true,
    });

    await this.prisma.subscription.update({
      where: { userId },
      data: { cancelAtPeriodEnd: true },
    });

    return {
      message:
        'Subscription will be cancelled at the end of the billing period',
    };
  }

  async reactivateSubscription(userId: string) {
    const stripe = this.ensureStripe();

    const subscription = await this.prisma.subscription.findUnique({
      where: { userId },
    });
    if (!subscription?.stripeSubscriptionId) {
      throw new Error('No subscription to reactivate');
    }

    await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
      cancel_at_period_end: false,
    });

    await this.prisma.subscription.update({
      where: { userId },
      data: { cancelAtPeriodEnd: false },
    });

    return { message: 'Subscription reactivated' };
  }

  async handleWebhookEvent(event: Stripe.Event) {
    const stripe = this.ensureStripe();

    const existing = await this.prisma.webhookEvent.findUnique({
      where: { stripeEventId: event.id },
    });

    if (existing?.processed) {
      this.logger.log(`Event ${event.id} already processed, skipping`);
      return;
    }

    await this.prisma.webhookEvent.upsert({
      where: { stripeEventId: event.id },
      update: {},
      create: { stripeEventId: event.id, type: event.type },
    });

    try {
      switch (event.type) {
        case 'checkout.session.completed':
          await this.handleCheckoutCompleted(event.data.object);
          break;
        case 'customer.subscription.updated':
          await this.handleSubscriptionUpdated(event.data.object);
          break;
        case 'customer.subscription.deleted':
          await this.handleSubscriptionDeleted(event.data.object);
          break;
        case 'invoice.payment_failed':
          await this.handlePaymentFailed(event.data.object);
          break;
      }

      await this.prisma.webhookEvent.update({
        where: { stripeEventId: event.id },
        data: { processed: true },
      });
    } catch (error) {
      this.logger.error(`Error processing event ${event.type}:`, error);
    }
  }

  private async handleCheckoutCompleted(session: Stripe.Checkout.Session) {
    const userId = session.metadata?.userId;
    if (!userId) return;

    const subscriptionId = session.subscription as string;
    if (!subscriptionId) return;

    const subscription = (await this.ensureStripe().subscriptions.retrieve(
      subscriptionId,
    )) as any;

    await this.prisma.subscription.upsert({
      where: { userId },
      update: {
        stripeSubscriptionId: subscription.id,
        stripePriceId: subscription.items.data[0]?.price?.id,
        plan: 'PRO',
        status: 'ACTIVE',
        currentPeriodStart: new Date(subscription.current_period_start * 1000),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
      },
      create: {
        userId,
        stripeSubscriptionId: subscription.id,
        stripePriceId: subscription.items.data[0]?.price?.id,
        plan: 'PRO',
        status: 'ACTIVE',
        currentPeriodStart: new Date(subscription.current_period_start * 1000),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
      },
    });

    this.logger.log(`Subscription activated for user ${userId}`);
  }

  private async handleSubscriptionUpdated(subscription: Stripe.Subscription) {
    const sub = subscription as any;
    const subscriptionRecord = await this.prisma.subscription.findFirst({
      where: { stripeSubscriptionId: sub.id },
    });

    if (!subscriptionRecord) return;

    await this.prisma.subscription.update({
      where: { id: subscriptionRecord.id },
      data: {
        stripePriceId: sub.items.data[0]?.price?.id,
        status: this.mapStripeStatus(sub.status),
        currentPeriodStart: new Date(sub.current_period_start * 1000),
        currentPeriodEnd: new Date(sub.current_period_end * 1000),
        cancelAtPeriodEnd: sub.cancel_at_period_end,
      },
    });
  }

  private async handleSubscriptionDeleted(subscription: Stripe.Subscription) {
    const sub = subscription as any;
    const subscriptionRecord = await this.prisma.subscription.findFirst({
      where: { stripeSubscriptionId: sub.id },
    });

    if (!subscriptionRecord) return;

    await this.prisma.subscription.update({
      where: { id: subscriptionRecord.id },
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

    this.logger.log(
      `Subscription cancelled for user ${subscriptionRecord.userId}`,
    );
  }

  private async handlePaymentFailed(invoice: Stripe.Invoice) {
    const inv = invoice as any;
    const subscriptionId = inv.subscription as string;
    if (!subscriptionId) return;

    const subscriptionRecord = await this.prisma.subscription.findFirst({
      where: { stripeSubscriptionId: subscriptionId },
    });

    if (!subscriptionRecord) return;

    await this.prisma.subscription.update({
      where: { id: subscriptionRecord.id },
      data: { status: 'PAST_DUE' },
    });
  }

  private mapStripeStatus(
    status: string,
  ): 'ACTIVE' | 'PAST_DUE' | 'CANCELLED' | 'UNPAID' {
    switch (status) {
      case 'active':
        return 'ACTIVE';
      case 'past_due':
        return 'PAST_DUE';
      case 'canceled':
        return 'CANCELLED';
      case 'unpaid':
        return 'UNPAID';
      default:
        return 'ACTIVE';
    }
  }
}
