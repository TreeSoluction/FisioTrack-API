import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { ConsentModule } from '../consent/consent.module';
import { PrismaModule } from '../prisma/prisma.module';
import { PatientLimitGuard } from '../common/patient-limit.guard';

@Module({
  imports: [ConsentModule, PrismaModule],
  controllers: [PatientsController],
  providers: [PatientsService, PatientLimitGuard],
  exports: [PatientsService],
})
export class PatientsModule {}
