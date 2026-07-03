import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ConsentGuard } from '../consent/consent.guard';
import { ParseCuidPipe } from '../common/pipes/parse-cuid.pipe';
import { MetricDefinitionsService } from './metric-definitions.service';
import { CreateMetricDefinitionDto } from './dto/create-metric-definition.dto';
import { UpdateMetricDefinitionDto } from './dto/update-metric-definition.dto';
import { AuthenticatedRequest } from '../common/types';

@ApiTags('metric-definitions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, ConsentGuard)
@Controller('metric-definitions')
export class MetricDefinitionsController {
  constructor(private readonly metricDefinitionsService: MetricDefinitionsService) {}

  @Get()
  @ApiOperation({ summary: 'List all metric definitions for the user' })
  @ApiResponse({ status: 200, description: 'List of metric definitions' })
  findAll(@Req() req: AuthenticatedRequest) {
    return this.metricDefinitionsService.findAll(req.user.id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new metric definition' })
  @ApiResponse({ status: 201, description: 'Metric definition created' })
  create(@Req() req: AuthenticatedRequest, @Body() dto: CreateMetricDefinitionDto) {
    return this.metricDefinitionsService.create(req.user.id, dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a metric definition' })
  @ApiResponse({ status: 200, description: 'Metric definition updated' })
  @ApiResponse({ status: 404, description: 'Not found' })
  update(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseCuidPipe) id: string,
    @Body() dto: UpdateMetricDefinitionDto,
  ) {
    return this.metricDefinitionsService.update(req.user.id, id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a metric definition' })
  @ApiResponse({ status: 200, description: 'Metric definition deleted' })
  @ApiResponse({ status: 404, description: 'Not found' })
  remove(@Req() req: AuthenticatedRequest, @Param('id', ParseCuidPipe) id: string) {
    return this.metricDefinitionsService.remove(req.user.id, id);
  }
}
