import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { PacientesModule } from './pacientes/pacientes.module';
import { TratamentosModule } from './tratamentos/tratamentos.module';
import { SessoesModule } from './sessoes/sessoes.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    PacientesModule,
    TratamentosModule,
    SessoesModule,
  ],
})
export class AppModule {}