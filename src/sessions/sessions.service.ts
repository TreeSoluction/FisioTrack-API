import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSessionDto } from './dto/create-session.dto';

@Injectable()
export class SessionsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, treatmentId: string, data: CreateSessionDto) {
    const treatment = await this.prisma.treatment.findFirst({
      where: { id: treatmentId, userId },
    });

    if (!treatment) {
      throw new NotFoundException('Treatment not found');
    }

    return this.prisma.session.create({
      data: {
        ...data,
        treatmentId,
      },
    });
  }

  async findAll(userId: string, treatmentId: string, page = 1, limit = 20) {
    const treatment = await this.prisma.treatment.findFirst({
      where: { id: treatmentId, userId },
    });

    if (!treatment) {
      throw new NotFoundException('Treatment not found');
    }

    const skip = (page - 1) * limit;

    const [sessions, total] = await Promise.all([
      this.prisma.session.findMany({
        where: { treatmentId },
        orderBy: { date: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.session.count({ where: { treatmentId } }),
    ]);

    return {
      items: sessions,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(userId: string, id: string) {
    const session = await this.prisma.session.findUnique({
      where: { id },
      include: { treatment: true },
    });

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    if (session.treatment.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return session;
  }

  async getDashboard(userId: string, patientId: string) {
    const patient = await this.prisma.patient.findFirst({
      where: { id: patientId, userId },
    });

    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    const [totalTreatments, totalSessions, latestSessions] = await Promise.all([
      this.prisma.treatment.count({ where: { patientId, userId } }),
      this.prisma.session.count({
        where: { treatment: { patientId, userId } },
      }),
      this.prisma.session.findMany({
        where: { treatment: { patientId, userId } },
        orderBy: { date: 'desc' },
        take: 10,
        include: { treatment: { select: { id: true } } },
      }),
    ]);

    return {
      totalTreatments,
      totalSessions,
      latestSessions,
    };
  }

  async remove(userId: string, id: string) {
    const session = await this.findOne(userId, id);
    return this.prisma.session.delete({ where: { id: session.id } });
  }
}
