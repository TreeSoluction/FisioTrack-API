import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ConsentGuard } from '../consent/consent.guard';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';

@ApiTags('sessions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, ConsentGuard)
@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post(':treatmentId')
  create(
    @Param('treatmentId') treatmentId: string,
    @Body() createSessionDto: CreateSessionDto,
  ) {
    return this.sessionsService.create(treatmentId, createSessionDto);
  }

  @Get('treatment/:treatmentId')
  findAll(@Param('treatmentId') treatmentId: string) {
    return this.sessionsService.findAll(treatmentId);
  }

  @Get('dashboard/:patientId')
  getDashboard(@Param('patientId') patientId: string) {
    return this.sessionsService.getDashboard(patientId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sessionsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sessionsService.remove(id);
  }
}
