import { IsOptional, IsNumber, IsString, IsObject, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSessionDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  weight?: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(10)
  painScale: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  measurements?: Record<string, any>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notes?: string;
}
