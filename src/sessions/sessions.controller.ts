import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Req,
  Query,
  UseGuards,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiQuery, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ConsentGuard } from '../consent/consent.guard';
import { ParseCuidPipe } from '../common/pipes/parse-cuid.pipe';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { AuthenticatedRequest } from '../common/types';

@ApiTags('sessions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, ConsentGuard)
@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post(':treatmentId')
  @ApiOperation({ summary: 'Create a new session for a treatment' })
  @ApiResponse({ status: 201, description: 'Session created' })
  @ApiResponse({ status: 400, description: 'Invalid ID format' })
  @ApiResponse({ status: 404, description: 'Treatment not found' })
  create(
    @Req() req: AuthenticatedRequest,
    @Param('treatmentId', ParseCuidPipe) treatmentId: string,
    @Body() createSessionDto: CreateSessionDto,
  ) {
    return this.sessionsService.create(req.user.id, treatmentId, createSessionDto);
  }

  @Get('treatment/:treatmentId')
  @ApiOperation({ summary: 'List sessions for a treatment with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'List of sessions' })
  @ApiResponse({ status: 400, description: 'Invalid ID format' })
  @ApiResponse({ status: 404, description: 'Treatment not found' })
  findAll(
    @Req() req: AuthenticatedRequest,
    @Param('treatmentId', ParseCuidPipe) treatmentId: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
  ) {
    return this.sessionsService.findAll(req.user.id, treatmentId, page, limit);
  }

  @Get('dashboard/:patientId')
  @ApiOperation({ summary: 'Get patient dashboard with session stats' })
  @ApiResponse({ status: 200, description: 'Dashboard data' })
  @ApiResponse({ status: 400, description: 'Invalid ID format' })
  @ApiResponse({ status: 404, description: 'Patient not found' })
  getDashboard(@Req() req: AuthenticatedRequest, @Param('patientId', ParseCuidPipe) patientId: string) {
    return this.sessionsService.getDashboard(req.user.id, patientId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get session by ID' })
  @ApiResponse({ status: 200, description: 'Session found' })
  @ApiResponse({ status: 400, description: 'Invalid ID format' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({ status: 404, description: 'Session not found' })
  findOne(@Req() req: AuthenticatedRequest, @Param('id', ParseCuidPipe) id: string) {
    return this.sessionsService.findOne(req.user.id, id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete session' })
  @ApiResponse({ status: 200, description: 'Session deleted' })
  @ApiResponse({ status: 400, description: 'Invalid ID format' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({ status: 404, description: 'Session not found' })
  remove(@Req() req: AuthenticatedRequest, @Param('id', ParseCuidPipe) id: string) {
    return this.sessionsService.remove(req.user.id, id);
  }
}
