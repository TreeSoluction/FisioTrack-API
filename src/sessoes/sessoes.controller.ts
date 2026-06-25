import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SessoesService } from './sessoes.service';
import { CreateSessaoDto } from './dto/create-sessao.dto';

@ApiTags('sessoes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('sessoes')
export class SessoesController {
  constructor(private sessoesService: SessoesService) {}

  @Post(':tratamentoId')
  @ApiOperation({ summary: 'Criar sessão de acompanhamento' })
  create(
    @Request() req: any,
    @Param('tratamentoId') tratamentoId: string,
    @Body() createSessaoDto: CreateSessaoDto,
  ) {
    return this.sessoesService.create(req.user.id, tratamentoId, createSessaoDto);
  }

  @Get('tratamento/:tratamentoId')
  @ApiOperation({ summary: 'Listar sessões por tratamento' })
  findAllByTratamento(
    @Request() req: any,
    @Param('tratamentoId') tratamentoId: string,
  ) {
    return this.sessoesService.findAllByTratamento(req.user.id, tratamentoId);
  }

  @Get('dashboard/:pacienteId')
  @ApiOperation({ summary: 'Dashboard de evolução do paciente' })
  getDashboard(@Request() req: any, @Param('pacienteId') pacienteId: string) {
    return this.sessoesService.getDashboard(req.user.id, pacienteId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar sessão' })
  remove(@Param('id') id: string, @Request() req: any) {
    return this.sessoesService.remove(id, req.user.id);
  }
}