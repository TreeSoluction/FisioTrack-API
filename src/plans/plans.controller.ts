import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PlansService } from './plans.service';

@ApiTags('plans')
@Controller('plans')
export class PlansController {
  constructor(private plansService: PlansService) {}

  @Get()
  @ApiOperation({ summary: 'List available plans' })
  getPlans() {
    return this.plansService.getAvailablePlans();
  }

  @Get('current')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get current user plan' })
  async getCurrentPlan(@Req() req: any) {
    return this.plansService.getCurrentPlan(req.user.id);
  }

  @Get('can-create-patient')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Check if user can create more patients' })
  async canCreatePatient(@Req() req: any) {
    return this.plansService.canCreatePatient(req.user.id);
  }
}
