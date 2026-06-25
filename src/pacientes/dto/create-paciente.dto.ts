import { IsString, IsOptional, IsDateString, IsEmail, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePacienteDto {
  @ApiProperty({ example: 'João Silva' })
  @IsString()
  nome: string;

  @ApiProperty({ example: '123.456.789-00' })
  @IsString()
  cpf: string;

  @ApiProperty({ example: '1990-01-15' })
  @IsDateString()
  dataNascimento: string;

  @ApiProperty({ example: '(11) 99999-9999' })
  @IsString()
  telefone: string;

  @ApiPropertyOptional({ example: 'joao@email.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: 'Rua das Flores, 123' })
  @IsOptional()
  @IsString()
  endereco?: string;

  @ApiPropertyOptional({ example: 'Histórico de dor lombar crônica' })
  @IsOptional()
  @IsString()
  historico?: string;
}