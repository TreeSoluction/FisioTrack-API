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
import { PatientLimitGuard } from '../common/patient-limit.guard';
import { ParseCuidPipe } from '../common/pipes/parse-cuid.pipe';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { AuthenticatedRequest } from '../common/types';

@ApiTags('patients')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, ConsentGuard)
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  @UseGuards(PatientLimitGuard)
  @ApiOperation({ summary: 'Create a new patient' })
  @ApiResponse({ status: 201, description: 'Patient created successfully' })
  @ApiResponse({ status: 403, description: 'Patient limit reached' })
  create(@Req() req: AuthenticatedRequest, @Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(req.user.id, createPatientDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all patients with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'List of patients' })
  findAll(
    @Req() req: AuthenticatedRequest,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
  ) {
    return this.patientsService.findAll(req.user.id, page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get patient by ID with treatments and appointments' })
  @ApiResponse({ status: 200, description: 'Patient found' })
  @ApiResponse({ status: 400, description: 'Invalid ID format' })
  @ApiResponse({ status: 404, description: 'Patient not found' })
  findOne(@Param('id', ParseCuidPipe) id: string, @Req() req: AuthenticatedRequest) {
    return this.patientsService.findOne(id, req.user.id);
  }

  @Get(':id/history')
  @ApiOperation({ summary: 'Get patient session history with metric definitions' })
  @ApiResponse({ status: 200, description: 'Patient history' })
  getHistory(@Param('id', ParseCuidPipe) id: string, @Req() req: AuthenticatedRequest) {
    return this.patientsService.getHistory(req.user.id, id);
  }

  @Get(':id/export')
  @ApiOperation({ summary: 'Export patient history as CSV or JSON' })
  @ApiQuery({ name: 'format', required: false, enum: ['csv', 'json'] })
  @ApiResponse({ status: 200, description: 'Export data' })
  exportHistory(
    @Param('id', ParseCuidPipe) id: string,
    @Req() req: AuthenticatedRequest,
    @Query('format') format: string,
  ) {
    return this.patientsService.exportHistory(req.user.id, id, format || 'csv');
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update patient' })
  @ApiResponse({ status: 200, description: 'Patient updated' })
  @ApiResponse({ status: 400, description: 'Invalid ID format' })
  @ApiResponse({ status: 404, description: 'Patient not found' })
  update(
    @Param('id', ParseCuidPipe) id: string,
    @Req() req: AuthenticatedRequest,
    @Body() updatePatientDto: UpdatePatientDto,
  ) {
    return this.patientsService.update(id, req.user.id, updatePatientDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete patient' })
  @ApiResponse({ status: 200, description: 'Patient deleted' })
  @ApiResponse({ status: 400, description: 'Invalid ID format' })
  @ApiResponse({ status: 404, description: 'Patient not found' })
  remove(@Param('id', ParseCuidPipe) id: string, @Req() req: AuthenticatedRequest) {
    return this.patientsService.remove(id, req.user.id);
  }
}
