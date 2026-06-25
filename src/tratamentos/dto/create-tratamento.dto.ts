import { IsString, IsNumber, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTratamentoDto {
  @ApiProperty({ example: 'paciente-id-123' })
  @IsString()
  pacienteId: string;

  @ApiProperty({ example: '8 semanas' })
  @IsString()
  tempoEstimado: string;

  @ApiProperty({ example: 'Alongamento, fortalecimento, mobilidade' })
  @IsString()
  exercicios: string;

  @ApiProperty({ example: 250.0 })
  @IsNumber()
  valor: number;

  @ApiPropertyOptional({ example: '2024-01-15' })
  @IsOptional()
  @IsDateString()
  dataInicio?: string;

  @ApiPropertyOptional({ example: '2024-03-15' })
  @IsOptional()
  @IsDateString()
  dataFim?: string;
}