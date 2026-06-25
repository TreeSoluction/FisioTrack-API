import { IsNumber, IsOptional, IsString, IsObject, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSessaoDto {
  @ApiPropertyOptional({ example: 75.5 })
  @IsOptional()
  @IsNumber()
  peso?: number;

  @ApiProperty({ example: 5, minimum: 0, maximum: 10 })
  @IsNumber()
  @Min(0)
  @Max(10)
  escalaDor: number;

  @ApiPropertyOptional({ example: { braco: 30, coxa: 55 } })
  @IsOptional()
  @IsObject()
  medidas?: Record<string, number>;

  @ApiPropertyOptional({ example: 'Paciente relatou melhora na dor' })
  @IsOptional()
  @IsString()
  observacoes?: string;
}