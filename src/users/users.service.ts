import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { decryptPatientFields } from '../common/encryption.util';
import { SENSITIVE_FIELDS } from '../common/constants';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        maxPatients: true,
        createdAt: true,
        subscription: {
          select: {
            plan: true,
            status: true,
            currentPeriodEnd: true,
            cancelAtPeriodEnd: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      ...user,
      plan: user.subscription?.plan || 'FREE',
      subscriptionStatus: user.subscription?.status || 'ACTIVE',
    };
  }

  async updateProfile(userId: string, dto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (dto.email && dto.email !== user.email) {
      const existing = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });
      if (existing) {
        throw new ConflictException('Email already in use');
      }
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: dto,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
  }

  async exportData(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        patients: true,
        treatments: {
          include: {
            sessions: true,
            payments: true,
          },
        },
        appointments: true,
        consents: true,
        subscription: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      exportDate: new Date().toISOString(),
      userData: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
      subscription: user.subscription,
      patients: user.patients.map((p) =>
        decryptPatientFields(p, SENSITIVE_FIELDS),
      ),
      treatments: user.treatments,
      appointments: user.appointments,
      consents: user.consents,
    };
  }

  async deleteAccount(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.prisma.$transaction([
      this.prisma.session.deleteMany({
        where: { treatment: { userId } },
      }),
      this.prisma.payment.deleteMany({
        where: { treatment: { userId } },
      }),
      this.prisma.treatment.deleteMany({
        where: { userId },
      }),
      this.prisma.appointment.deleteMany({
        where: { userId },
      }),
      this.prisma.patient.deleteMany({
        where: { userId },
      }),
      this.prisma.userConsent.deleteMany({
        where: { userId },
      }),
      this.prisma.enterpriseRequest.deleteMany({
        where: { userId },
      }),
      this.prisma.review.deleteMany({
        where: { userId },
      }),
      this.prisma.subscription.deleteMany({
        where: { userId },
      }),
      this.prisma.user.delete({
        where: { id: userId },
      }),
    ]);

    return { message: 'Account deleted successfully' };
  }
}
