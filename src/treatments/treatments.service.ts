import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { UpdateTreatmentDto } from './dto/update-treatment.dto';

@Injectable()
export class TreatmentsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, data: CreateTreatmentDto) {
    const patient = await this.prisma.patient.findFirst({
      where: { id: data.patientId, userId },
    });

    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    return this.prisma.treatment.create({
      data: {
        ...data,
        userId,
        value: data.value,
      },
    });
  }

  async findAll(userId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;

    const [treatments, total] = await Promise.all([
      this.prisma.treatment.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: { patient: true },
      }),
      this.prisma.treatment.count({ where: { userId } }),
    ]);

    return {
      items: treatments,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string, userId: string) {
    const treatment = await this.prisma.treatment.findFirst({
      where: { id, userId },
      include: { patient: true, sessions: true, payments: true },
    });

    if (!treatment) {
      throw new NotFoundException('Treatment not found');
    }

    return treatment;
  }

  async findByPatient(patientId: string, userId: string) {
    return this.prisma.treatment.findMany({
      where: { patientId, userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id: string, userId: string, data: UpdateTreatmentDto) {
    await this.findOne(id, userId);
    try {
      return await this.prisma.treatment.update({
        where: { id },
        data,
      });
    } catch (error: any) {
      if (error.code === 'P2025') throw new NotFoundException('Treatment not found');
      throw error;
    }
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);
    try {
      return await this.prisma.treatment.delete({ where: { id } });
    } catch (error: any) {
      if (error.code === 'P2025') throw new NotFoundException('Treatment not found');
      throw error;
    }
  }

  async exportHistory(userId: string, treatmentId: string, format: string) {
    const treatment = await this.findOne(treatmentId, userId);

    const sessions = await this.prisma.session.findMany({
      where: { treatmentId },
      orderBy: { date: 'desc' },
    });

    const metricDefinitions = await this.prisma.metricDefinition.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    if (format === 'csv') {
      const metricHeaders = metricDefinitions.map((m) => m.name);
      const headers = ['Data', 'Dor', 'Peso', ...metricHeaders, 'Notas'];

      const rows = sessions.map((s) => {
        const measurements = (s.measurements as Record<string, any>) || {};
        const metricValues = metricDefinitions.map((m) => {
          const entry = measurements[m.id];
          return entry?.value ?? '';
        });
        return [
          new Date(s.date).toLocaleDateString('pt-BR'),
          s.painScale,
          s.weight ?? '',
          ...metricValues,
          s.notes ?? '',
        ];
      });

      const csvContent = [headers, ...rows]
        .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
        .join('\n');

      return { csv: csvContent, filename: `tratamento-${treatmentId}.csv` };
    }

    return { treatment, sessions, metricDefinitions };
  }
}
