import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { EnterpriseService } from './enterprise.service';
import { CreateEnterpriseRequestDto } from './dto/enterprise-request.dto';
import { AuthenticatedRequest } from '../common/types';

@ApiTags('enterprise')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('enterprise')
export class EnterpriseController {
  constructor(private enterpriseService: EnterpriseService) {}

  @Post('request')
  @ApiOperation({ summary: 'Submit enterprise plan request' })
  @ApiResponse({ status: 201, description: 'Request submitted' })
  @ApiResponse({ status: 409, description: 'Request already exists' })
  async createRequest(
    @Req() req: AuthenticatedRequest,
    @Body() dto: CreateEnterpriseRequestDto,
  ) {
    return this.enterpriseService.createRequest(req.user.id, dto);
  }

  @Get('status')
  @ApiOperation({ summary: 'Get enterprise request status' })
  @ApiResponse({ status: 200, description: 'Enterprise request status' })
  async getStatus(@Req() req: AuthenticatedRequest) {
    return this.enterpriseService.getRequestStatus(req.user.id);
  }
}
