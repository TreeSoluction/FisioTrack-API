import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { PatientsModule } from './patients/patients.module';
import { TreatmentsModule } from './treatments/treatments.module';
import { SessionsModule } from './sessions/sessions.module';
import { EmailModule } from './email/email.module';
import { ConsentModule } from './consent/consent.module';
import { PlansModule } from './plans/plans.module';
import { EnterpriseModule } from './enterprise/enterprise.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    PatientsModule,
    TreatmentsModule,
    SessionsModule,
    EmailModule,
    ConsentModule,
    PlansModule,
    EnterpriseModule,
  ],
})
export class AppModule {}
