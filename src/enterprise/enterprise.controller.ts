import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { EnterpriseService } from './enterprise.service';
import { CreateEnterpriseRequestDto } from './dto/enterprise-request.dto';

@ApiTags('enterprise')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('enterprise')
export class EnterpriseController {
  constructor(private enterpriseService: EnterpriseService) {}

  @Post('request')
  @ApiOperation({ summary: 'Submit enterprise plan request' })
  async createRequest(
    @Req() req: any,
    @Body() dto: CreateEnterpriseRequestDto,
  ) {
    return this.enterpriseService.createRequest(req.user.id, dto);
  }

  @Get('status')
  @ApiOperation({ summary: 'Get enterprise request status' })
  async getStatus(@Req() req: any) {
    return this.enterpriseService.getRequestStatus(req.user.id);
  }
}
