import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PlansService } from './plans.service';
import { AuthenticatedRequest } from '../common/types';

@ApiTags('plans')
@Controller('plans')
export class PlansController {
  constructor(private plansService: PlansService) {}

  @Get()
  @ApiOperation({ summary: 'List available plans' })
  @ApiResponse({ status: 200, description: 'List of available plans' })
  getPlans() {
    return this.plansService.getAvailablePlans();
  }

  @Get('current')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get current user plan' })
  @ApiResponse({ status: 200, description: 'Current plan with usage info' })
  async getCurrentPlan(@Req() req: AuthenticatedRequest) {
    return this.plansService.getCurrentPlan(req.user.id);
  }

  @Get('can-create-patient')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Check if user can create more patients' })
  @ApiResponse({ status: 200, description: 'Patient creation eligibility' })
  async canCreatePatient(@Req() req: AuthenticatedRequest) {
    return this.plansService.canCreatePatient(req.user.id);
  }
}
