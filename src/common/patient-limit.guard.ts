import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PatientLimitGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      return false;
    }

    const subscription = await this.prisma.subscription.findUnique({
      where: { userId: user.id },
      select: { plan: true },
    });

    const plan = subscription?.plan || 'FREE';

    if (plan === 'PRO' || plan === 'ENTERPRISE') {
      return true;
    }

    const userData = await this.prisma.user.findUnique({
      where: { id: user.id },
      select: { maxPatients: true },
    });

    if (!userData) {
      return false;
    }

    const patientCount = await this.prisma.patient.count({
      where: { userId: user.id },
    });

    if (patientCount >= userData.maxPatients) {
      throw new ForbiddenException({
        message: 'Patient limit reached',
        current: patientCount,
        max: userData.maxPatients,
        plan,
        upgradeRequired: true,
      });
    }

    return true;
  }
}
