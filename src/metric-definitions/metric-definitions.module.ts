import { Module } from '@nestjs/common';
import { MetricDefinitionsController } from './metric-definitions.controller';
import { MetricDefinitionsService } from './metric-definitions.service';
import { ConsentModule } from '../consent/consent.module';

@Module({
  imports: [ConsentModule],
  controllers: [MetricDefinitionsController],
  providers: [MetricDefinitionsService],
  exports: [MetricDefinitionsService],
})
export class MetricDefinitionsModule {}
