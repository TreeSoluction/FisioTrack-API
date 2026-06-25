import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSessionDto } from './dto/create-session.dto';

@Injectable()
export class SessionsService {
  constructor(private prisma: PrismaService) {}

  async create(treatmentId: string, data: CreateSessionDto) {
    const treatment = await this.prisma.treatment.findUnique({
      where: { id: treatmentId },
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

  async findAll(treatmentId: string) {
    return this.prisma.session.findMany({
      where: { treatmentId },
      orderBy: { date: 'desc' },
    });
  }

  async findOne(id: string) {
    const session = await this.prisma.session.findUnique({
      where: { id },
      include: { treatment: true },
    });

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    return session;
  }

  async getDashboard(patientId: string) {
    const treatments = await this.prisma.treatment.findMany({
      where: { patientId },
      include: {
        sessions: {
          orderBy: { date: 'desc' },
        },
      },
    });

    const totalSessions = treatments.reduce(
      (sum, t) => sum + t.sessions.length,
      0,
    );

    const latestSessions = treatments
      .flatMap((t) => t.sessions)
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 10);

    return {
      totalTreatments: treatments.length,
      totalSessions,
      latestSessions,
    };
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.session.delete({ where: { id } });
  }
}
