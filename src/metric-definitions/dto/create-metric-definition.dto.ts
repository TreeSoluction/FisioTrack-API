import { IsString, IsEnum, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMetricDefinitionDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ enum: ['NUMBER', 'TEXT'] })
  @IsEnum(['NUMBER', 'TEXT'] as const)
  type: 'NUMBER' | 'TEXT';

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  unit?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  min?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  max?: number;
}
