import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  Res,
  UseGuards,
  HttpCode,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BillingService } from './billing.service';
import { AuthenticatedRequest } from '../common/types';

@ApiTags('billing')
@Controller('billing')
export class BillingController {
  private readonly logger = new Logger(BillingController.name);

  constructor(private billingService: BillingService) {}

  @Get('pricing')
  @ApiOperation({ summary: 'Get pricing information' })
  @ApiResponse({ status: 200, description: 'Pricing details' })
  async getPricing() {
    return this.billingService.getPricing();
  }

  @Post('checkout')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create subscription checkout (monthly/yearly)' })
  @ApiResponse({ status: 200, description: 'Checkout URL created' })
  @ApiResponse({ status: 400, description: 'Invalid plan' })
  async createCheckout(
    @Req() req: AuthenticatedRequest,
    @Body() body: { plan: string },
  ) {
    return this.billingService.createSubscriptionCheckout(
      req.user.id,
      req.user.email,
      req.user.name,
      body.plan,
    );
  }

  @Post('checkout-onetime')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Create one-time payment checkout' })
  @ApiResponse({ status: 200, description: 'One-time checkout URL created' })
  async createOneTimeCheckout(@Req() req: AuthenticatedRequest) {
    return this.billingService.createOneTimeCheckout(
      req.user.id,
      req.user.email,
      req.user.name,
    );
  }

  @Get('subscription')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get current subscription status' })
  @ApiResponse({ status: 200, description: 'Subscription status' })
  async getSubscription(@Req() req: AuthenticatedRequest) {
    return this.billingService.getSubscriptionStatus(req.user.id);
  }

  @Post('portal')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Create billing portal URL' })
  @ApiResponse({ status: 200, description: 'Portal URL' })
  async createPortal(@Req() req: AuthenticatedRequest) {
    return this.billingService.createPortalUrl(req.user.id);
  }

  @Get('payment-status/:reference')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Check payment status by external reference' })
  @ApiResponse({ status: 200, description: 'Payment status' })
  async checkPaymentStatus(@Param('reference') reference: string, @Req() req: AuthenticatedRequest) {
    return this.billingService.checkPaymentStatus(req.user.id, reference);
  }

  @Post('cancel')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Cancel subscription' })
  @ApiResponse({ status: 200, description: 'Subscription cancelled' })
  @ApiResponse({ status: 400, description: 'No active subscription' })
  async cancelSubscription(@Req() req: AuthenticatedRequest) {
    return this.billingService.cancelSubscription(req.user.id);
  }

  @Post('reactivate')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reactivate cancelled subscription' })
  @ApiResponse({ status: 200, description: 'Subscription reactivated' })
  async reactivateSubscription(@Req() req: AuthenticatedRequest) {
    return this.billingService.reactivateSubscription(req.user.id);
  }

  @Post('webhook')
  @ApiOperation({ summary: 'Mercado Pago webhook handler' })
  @ApiResponse({ status: 200, description: 'Webhook processed' })
  @ApiResponse({ status: 400, description: 'Invalid signature' })
  async handleWebhook(@Req() req: Request, @Res() res: Response) {
    const signature = req.headers['x-signature'] as string ||
                      req.headers['x-hub-signature-256'] as string;

    if (!this.billingService.verifyWebhookSignature(req.body, signature)) {
      res.status(400).json({ error: 'Invalid signature' });
      return;
    }

    try {
      await this.billingService.handleWebhook(req.body);
      res.json({ ok: true });
    } catch (err: any) {
      this.logger.error(`Webhook handling error: ${err.message}`);
      res.status(500).json({ error: 'Webhook handling failed' });
    }
  }
}
