import {
  Controller,
  Get,
  Post,
  Put,
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
import { TreatmentsService } from './treatments.service';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { UpdateTreatmentDto } from './dto/update-treatment.dto';
import { AuthenticatedRequest } from '../common/types';

@ApiTags('treatments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, ConsentGuard)
@Controller('treatments')
export class TreatmentsController {
  constructor(private readonly treatmentsService: TreatmentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new treatment' })
  @ApiResponse({ status: 201, description: 'Treatment created' })
  create(@Req() req: AuthenticatedRequest, @Body() createTreatmentDto: CreateTreatmentDto) {
    return this.treatmentsService.create(req.user.id, createTreatmentDto);
  }

  @Get()
  @ApiOperation({ summary: 'List treatments with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'List of treatments' })
  findAll(
    @Req() req: AuthenticatedRequest,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
  ) {
    return this.treatmentsService.findAll(req.user.id, page, limit);
  }

  @Get('patient/:patientId')
  @ApiOperation({ summary: 'List treatments by patient' })
  @ApiResponse({ status: 200, description: 'List of treatments for patient' })
  findByPatient(@Param('patientId', ParseCuidPipe) patientId: string, @Req() req: AuthenticatedRequest) {
    return this.treatmentsService.findByPatient(patientId, req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get treatment with sessions and payments' })
  @ApiResponse({ status: 200, description: 'Treatment found' })
  @ApiResponse({ status: 400, description: 'Invalid ID format' })
  @ApiResponse({ status: 404, description: 'Treatment not found' })
  findOne(@Param('id', ParseCuidPipe) id: string, @Req() req: AuthenticatedRequest) {
    return this.treatmentsService.findOne(id, req.user.id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update treatment' })
  @ApiResponse({ status: 200, description: 'Treatment updated' })
  @ApiResponse({ status: 400, description: 'Invalid ID format' })
  @ApiResponse({ status: 404, description: 'Treatment not found' })
  update(
    @Param('id', ParseCuidPipe) id: string,
    @Req() req: AuthenticatedRequest,
    @Body() updateTreatmentDto: UpdateTreatmentDto,
  ) {
    return this.treatmentsService.update(id, req.user.id, updateTreatmentDto);
  }

  @Get(':id/export')
  @ApiOperation({ summary: 'Export treatment history as CSV or JSON' })
  @ApiQuery({ name: 'format', required: false, enum: ['csv', 'json'] })
  @ApiResponse({ status: 200, description: 'Export data' })
  exportHistory(
    @Param('id', ParseCuidPipe) id: string,
    @Req() req: AuthenticatedRequest,
    @Query('format') format: string,
  ) {
    return this.treatmentsService.exportHistory(req.user.id, id, format || 'csv');
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete treatment' })
  @ApiResponse({ status: 200, description: 'Treatment deleted' })
  @ApiResponse({ status: 400, description: 'Invalid ID format' })
  @ApiResponse({ status: 404, description: 'Treatment not found' })
  remove(@Param('id', ParseCuidPipe) id: string, @Req() req: AuthenticatedRequest) {
    return this.treatmentsService.remove(id, req.user.id);
  }
}
