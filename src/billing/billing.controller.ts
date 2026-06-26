import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Res,
  UseGuards,
  HttpCode,
  HttpStatus,
  RawBodyRequest,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Request, Response } from 'express';
import Stripe from 'stripe';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BillingService } from './billing.service';

@ApiTags('billing')
@Controller('billing')
export class BillingController {
  constructor(private billingService: BillingService) {}

  @Get('pricing')
  @ApiOperation({ summary: 'Get product prices' })
  async getPricing() {
    return this.billingService.getProductWithPrices();
  }

  @Get('plans')
  @ApiOperation({ summary: 'Get available plans' })
  async getPlans() {
    return this.billingService.getProductWithPrices();
  }

  @Post('checkout')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create Stripe Checkout Session' })
  async createCheckout(@Req() req: any, @Body() body: { interval: 'month' | 'year' }) {
    return this.billingService.createCheckoutSession(
      req.user.id,
      req.user.email,
      req.user.name,
      body.interval,
    );
  }

  @Post('portal')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create Stripe Billing Portal Session' })
  async createPortal(@Req() req: any) {
    return this.billingService.createPortalSession(req.user.id);
  }

  @Get('subscription')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get current subscription status' })
  async getSubscription(@Req() req: any) {
    return this.billingService.getSubscriptionStatus(req.user.id);
  }

  @Post('cancel')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Cancel subscription at period end' })
  async cancelSubscription(@Req() req: any) {
    return this.billingService.cancelSubscription(req.user.id);
  }

  @Post('reactivate')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reactivate cancelled subscription' })
  async reactivateSubscription(@Req() req: any) {
    return this.billingService.reactivateSubscription(req.user.id);
  }

  @Post('webhook')
  @ApiOperation({ summary: 'Stripe webhook handler' })
  async handleWebhook(
    @Req() req: RawBodyRequest<Request>,
    @Res() res: Response,
  ) {
    const sig = req.headers['stripe-signature'];
    const secret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!sig || !secret) {
      res.status(400).json({ error: 'Missing signature or secret' });
      return;
    }

    let event: Stripe.Event;

    try {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');
      event = stripe.webhooks.constructEvent(req.rawBody, sig, secret);
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message);
      res.status(400).json({ error: `Webhook Error: ${err.message}` });
      return;
    }

    try {
      await this.billingService.handleWebhookEvent(event);
      res.json({ received: true });
    } catch (err: any) {
      console.error('Webhook handling error:', err);
      res.status(500).json({ error: 'Webhook handling failed' });
    }
  }
}
