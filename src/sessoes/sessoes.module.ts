import { Module } from '@nestjs/common';
import { SessoesService } from './sessoes.service';
import { SessoesController } from './sessoes.controller';

@Module({
  providers: [SessoesService],
  controllers: [SessoesController],
  exports: [SessoesService],
})
export class SessoesModule {}