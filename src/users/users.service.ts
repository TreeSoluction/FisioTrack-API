import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

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
        plan: true,
        subscriptionStatus: true,
        maxPatients: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateProfile(userId: string, dto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: dto,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        plan: true,
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
        plan: true,
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
        plan: user.plan,
        createdAt: user.createdAt,
      },
      patients: user.patients,
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

    // Delete all related data in order
    await this.prisma.session.deleteMany({
      where: { treatment: { userId } },
    });

    await this.prisma.payment.deleteMany({
      where: { treatment: { userId } },
    });

    await this.prisma.treatment.deleteMany({
      where: { userId },
    });

    await this.prisma.appointment.deleteMany({
      where: { userId },
    });

    await this.prisma.patient.deleteMany({
      where: { userId },
    });

    await this.prisma.userConsent.deleteMany({
      where: { userId },
    });

    await this.prisma.enterpriseRequest.deleteMany({
      where: { userId },
    });

    await this.prisma.user.delete({
      where: { id: userId },
    });

    return { message: 'Account deleted successfully' };
  }
}
