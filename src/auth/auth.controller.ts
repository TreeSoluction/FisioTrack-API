import {
  Controller,
  Post,
  Body,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login' })
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }

  @Post('register')
  @ApiOperation({ summary: 'Register new user' })
  async register(
    @Req() req: Request,
    @Body() body: { name: string; email: string; password: string },
  ) {
    const ip = req.ip || (req.headers['x-forwarded-for'] as string);
    return this.authService.register(body.name, body.email, body.password, ip);
  }
}
