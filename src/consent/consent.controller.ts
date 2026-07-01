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
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { DocumentType } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ConsentService } from './consent.service';
import { CreateConsentDto } from './dto/consent.dto';
import { AuthenticatedRequest } from '../common/types';

@ApiTags('consent')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('consent')
export class ConsentController {
  constructor(private consentService: ConsentService) {}

  @Post()
  @ApiOperation({ summary: 'Record user consent' })
  @ApiResponse({ status: 201, description: 'Consent recorded' })
  async recordConsent(@Req() req: AuthenticatedRequest, @Body() dto: CreateConsentDto) {
    const ipAddress = req.ip || (req.headers['x-forwarded-for'] as string);
    return this.consentService.recordConsent(req.user.id, dto, ipAddress);
  }

  @Get('status')
  @ApiOperation({ summary: 'Get consent status' })
  @ApiResponse({ status: 200, description: 'Consent status with missing documents' })
  async getConsentStatus(@Req() req: AuthenticatedRequest) {
    return this.consentService.getConsentStatus(req.user.id);
  }

  @Get('history')
  @ApiOperation({ summary: 'Get consent history' })
  @ApiResponse({ status: 200, description: 'List of consent records' })
  async getConsentHistory(@Req() req: AuthenticatedRequest) {
    return this.consentService.getConsentHistory(req.user.id);
  }

  @Delete(':type')
  @ApiOperation({ summary: 'Revoke consent (LGPD Art. 18 VIII)' })
  @ApiResponse({ status: 200, description: 'Consent revoked' })
  @ApiResponse({ status: 404, description: 'Consent not found or already revoked' })
  async revokeConsent(@Req() req: AuthenticatedRequest, @Param('type') type: string) {
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
