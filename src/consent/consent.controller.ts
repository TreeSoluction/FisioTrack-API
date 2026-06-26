import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ConsentService } from './consent.service';
import { CreateConsentDto } from './dto/consent.dto';

@ApiTags('consent')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('consent')
export class ConsentController {
  constructor(private consentService: ConsentService) {}

  @Post()
  @ApiOperation({ summary: 'Record user consent' })
  async recordConsent(@Req() req: any, @Body() dto: CreateConsentDto) {
    const ipAddress = req.ip || req.headers['x-forwarded-for'];
    return this.consentService.recordConsent(req.user.id, {
      ...dto,
      ipAddress,
    });
  }

  @Get('status')
  @ApiOperation({ summary: 'Get consent status' })
  async getConsentStatus(@Req() req: any) {
    return this.consentService.getConsentStatus(req.user.id);
  }

  @Get('history')
  @ApiOperation({ summary: 'Get consent history' })
  async getConsentHistory(@Req() req: any) {
    return this.consentService.getConsentHistory(req.user.id);
  }
}
