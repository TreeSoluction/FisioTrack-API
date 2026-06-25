import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PacientesService } from './pacientes.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';

@ApiTags('pacientes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('pacientes')
export class PacientesController {
  constructor(private pacientesService: PacientesService) {}

  @Post()
  @ApiOperation({ summary: 'Criar paciente' })
  create(@Request() req: any, @Body() createPacienteDto: CreatePacienteDto) {
    return this.pacientesService.create(req.user.id, createPacienteDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar pacientes' })
  findAll(@Request() req: any) {
    return this.pacientesService.findAll(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar paciente por ID' })
  findOne(@Param('id') id: string, @Request() req: any) {
    return this.pacientesService.findOne(id, req.user.id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar paciente' })
  update(
    @Param('id') id: string,
    @Request() req: any,
    @Body() updatePacienteDto: UpdatePacienteDto,
  ) {
    return this.pacientesService.update(id, req.user.id, updatePacienteDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar paciente' })
  remove(@Param('id') id: string, @Request() req: any) {
    return this.pacientesService.remove(id, req.user.id);
  }
}