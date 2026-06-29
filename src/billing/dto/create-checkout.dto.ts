import { IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCheckoutDto {
  @ApiProperty({ enum: ['month', 'year'] })
  @IsIn(['month', 'year'])
  interval: 'month' | 'year';
}
