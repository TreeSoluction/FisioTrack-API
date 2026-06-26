import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PlanType } from '@prisma/client';

@Injectable()
export class PatientLimitGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      return true;
    }

    const userData = await this.prisma.user.findUnique({
      where: { id: user.id },
      select: { plan: true, maxPatients: true },
    });

    if (userData.plan === PlanType.PRO || userData.plan === PlanType.ENTERPRISE) {
      return true;
    }

    const patientCount = await this.prisma.patient.count({
      where: { userId: user.id },
    });

    if (patientCount >= userData.maxPatients) {
      throw new ForbiddenException({
        message: 'Patient limit reached',
        current: patientCount,
        max: userData.maxPatients,
        plan: userData.plan,
        upgradeRequired: true,
      });
    }

    return true;
  }
}
