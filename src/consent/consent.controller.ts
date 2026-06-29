import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { DocumentType } from '@prisma/client';
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

  @Delete(':type')
  @ApiOperation({ summary: 'Revoke consent (LGPD Art. 18 VIII)' })
  async revokeConsent(@Req() req: any, @Param('type') type: string) {
    const documentType = type as DocumentType;
    if (!Object.values(DocumentType).includes(documentType)) {
      throw new NotFoundException('Invalid document type');
    }
    const result = await this.consentService.revokeConsent(
      req.user.id,
      documentType,
    );
    if (!result) {
      throw new NotFoundException('Consent not found or already revoked');
    }
    return { message: 'Consent revoked successfully' };
  }
}
