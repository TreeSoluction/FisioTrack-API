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
import { TratamentosService } from './tratamentos.service';
import { CreateTratamentoDto } from './dto/create-tratamento.dto';
import { UpdateTratamentoDto } from './dto/update-tratamento.dto';

@ApiTags('tratamentos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('tratamentos')
export class TratamentosController {
  constructor(private tratamentosService: TratamentosService) {}

  @Post()
  @ApiOperation({ summary: 'Criar tratamento' })
  create(@Request() req, @Body() createTratamentoDto: CreateTratamentoDto) {
    return this.tratamentosService.create(req.user.id, createTratamentoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar tratamentos' })
  findAll(@Request() req) {
    return this.tratamentosService.findAll(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar tratamento por ID' })
  findOne(@Param('id') id: string, @Request() req) {
    return this.tratamentosService.findOne(id, req.user.id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar tratamento' })
  update(
    @Param('id') id: string,
    @Request() req,
    @Body() updateTratamentoDto: UpdateTratamentoDto,
  ) {
    return this.tratamentosService.update(id, req.user.id, updateTratamentoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar tratamento' })
  remove(@Param('id') id: string, @Request() req) {
    return this.tratamentosService.remove(id, req.user.id);
  }
}