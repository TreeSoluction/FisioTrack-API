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
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TreatmentsService } from './treatments.service';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { UpdateTreatmentDto } from './dto/update-treatment.dto';

@ApiTags('treatments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('treatments')
export class TreatmentsController {
  constructor(private readonly treatmentsService: TreatmentsService) {}

  @Post()
  create(@Req() req: any, @Body() createTreatmentDto: CreateTreatmentDto) {
    return this.treatmentsService.create(req.user.id, createTreatmentDto);
  }

  @Get()
  findAll(@Req() req: any) {
    return this.treatmentsService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.treatmentsService.findOne(id, req.user.id);
  }

  @Get('patient/:patientId')
  findByPatient(@Param('patientId') patientId: string, @Req() req: any) {
    return this.treatmentsService.findByPatient(patientId, req.user.id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Req() req: any,
    @Body() updateTreatmentDto: UpdateTreatmentDto,
  ) {
    return this.treatmentsService.update(id, req.user.id, updateTreatmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.treatmentsService.remove(id, req.user.id);
  }
}
