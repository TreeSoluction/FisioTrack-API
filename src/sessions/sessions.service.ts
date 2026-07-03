import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
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

  async getSummary(userId: string) {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const [
      activePatients,
      activeTreatments,
      totalSessions,
      monthlyRevenue,
      sessionsByMonth,
      treatmentsByPatient,
    ] = await Promise.all([
      this.prisma.patient.count({ where: { userId, status: 'ACTIVE' } }),
      this.prisma.treatment.count({ where: { userId, status: 'IN_PROGRESS' } }),
      this.prisma.session.count({ where: { treatment: { userId } } }),
      this.prisma.treatment.aggregate({
        where: { userId, status: 'IN_PROGRESS' },
        _sum: { value: true },
      }),
      this.prisma.session.groupBy({
        by: ['date'],
        where: { treatment: { userId }, date: { gte: sixMonthsAgo } },
        _count: true,
      }),
      this.prisma.treatment.findMany({
        where: { userId, status: 'IN_PROGRESS' },
        include: {
          patient: { select: { name: true } },
          _count: { select: { sessions: true } },
        },
        orderBy: { createdAt: 'desc' },
        take: 6,
      }),
    ]);

    const monthNames = [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez',
    ];
    const sessionsMap = new Map<string, number>();
    for (const s of sessionsByMonth) {
      const key = `${s.date.getFullYear()}-${s.date.getMonth()}`;
      sessionsMap.set(key, (sessionsMap.get(key) || 0) + s._count);
    }

    const sessionsChartData: Array<{ name: string; value: number }> = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      sessionsChartData.push({
        name: monthNames[d.getMonth()],
        value: sessionsMap.get(key) || 0,
      });
    }

    const treatmentChartData = treatmentsByPatient.map((t) => ({
      name: t.patient?.name?.split(' ')[0] || t.id.slice(0, 6),
      value: Number(t.value),
    }));

    return {
      activePatients,
      activeTreatments,
      totalSessions,
      monthlyRevenue: Number(monthlyRevenue._sum.value || 0),
      sessionsChartData,
      treatmentChartData,
    };
  }

  async remove(userId: string, id: string) {
    const session = await this.findOne(userId, id);
    return this.prisma.session.delete({ where: { id: session.id } });
  }
}
