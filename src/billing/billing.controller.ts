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
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BillingService } from './billing.service';

@ApiTags('billing')
@Controller('billing')
export class BillingController {
  constructor(private billingService: BillingService) {}

  @Get('pricing')
  @ApiOperation({ summary: 'Get pricing information' })
  async getPricing() {
    return this.billingService.getPricing();
  }

  @Post('checkout')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create subscription checkout (monthly/yearly)' })
  async createCheckout(
    @Req() req: any,
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
  async createOneTimeCheckout(@Req() req: any) {
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
  async getSubscription(@Req() req: any) {
    return this.billingService.getSubscriptionStatus(req.user.id);
  }

  @Post('portal')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Create billing portal URL' })
  async createPortal(@Req() req: any) {
    return this.billingService.createPortalUrl(req.user.id);
  }

  @Get('payment-status/:reference')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Check payment status by external reference' })
  async checkPaymentStatus(@Param('reference') reference: string) {
    return this.billingService.checkPaymentStatus(reference);
  }

  @Post('cancel')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Cancel subscription' })
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
  @ApiOperation({ summary: 'Mercado Pago webhook handler' })
  async handleWebhook(@Req() req: Request, @Res() res: Response) {
    const signature = req.headers['x-hub-signature-256'] as string ||
                      req.headers['x-pagarme-signature'] as string;

    if (!this.billingService.verifyWebhookSignature(req.body, signature)) {
      res.status(400).json({ error: 'Invalid signature' });
      return;
    }

    try {
      await this.billingService.handleWebhook(req.body);
      res.json({ ok: true });
    } catch (err: any) {
      console.error('Webhook handling error:', err);
      res.status(500).json({ error: 'Webhook handling failed' });
    }
  }
}
