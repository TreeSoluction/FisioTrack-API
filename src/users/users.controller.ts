import {
  Controller,
  Get,
  Put,
  Delete,
  Body,
  Req,
  UseGuards,
  Res,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthenticatedRequest } from '../common/types';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, description: 'User profile' })
  async getProfile(@Req() req: AuthenticatedRequest) {
    return this.usersService.getProfile(req.user.id);
  }

  @Put('me')
  @ApiOperation({ summary: 'Update current user profile' })
  @ApiResponse({ status: 200, description: 'Profile updated' })
  @ApiResponse({ status: 409, description: 'Email already in use' })
  async updateProfile(@Req() req: AuthenticatedRequest, @Body() dto: UpdateUserDto) {
    return this.usersService.updateProfile(req.user.id, dto);
  }

  @Get('me/export')
  @ApiOperation({ summary: 'Export all user data (LGPD Art. 18)' })
  @ApiResponse({ status: 200, description: 'JSON file with all user data' })
  async exportData(@Req() req: AuthenticatedRequest, @Res() res: Response) {
    const data = await this.usersService.exportData(req.user.id);
    res.setHeader('Content-Type', 'application/json');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="fisiotrack-export-${new Date().toISOString().split('T')[0]}.json"`,
    );
    res.json(data);
  }

  @Delete('me')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete account and all data (LGPD Art. 18)' })
  @ApiResponse({ status: 200, description: 'Account deleted' })
  async deleteAccount(@Req() req: AuthenticatedRequest) {
    return this.usersService.deleteAccount(req.user.id);
  }
}
