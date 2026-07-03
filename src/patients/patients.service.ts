import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import {
  encryptPatientFields,
  decryptPatientFields,
} from '../common/encryption.util';
import { SENSITIVE_FIELDS } from '../common/constants';

@Injectable()
export class PatientsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, data: CreatePatientDto) {
    const encryptedData = encryptPatientFields(data, SENSITIVE_FIELDS);
    const patient = await this.prisma.patient.create({
      data: {
        ...encryptedData,
        userId,
      },
    });
    return decryptPatientFields(patient, SENSITIVE_FIELDS);
  }

  async findAll(userId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;

    const [patients, total] = await Promise.all([
      this.prisma.patient.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.patient.count({ where: { userId } }),
    ]);

    return {
      items: patients.map((p) => decryptPatientFields(p, SENSITIVE_FIELDS)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string, userId: string) {
    const patient = await this.prisma.patient.findFirst({
      where: { id, userId },
      include: {
        treatments: true,
        appointments: true,
      },
    });

    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    return decryptPatientFields(patient, SENSITIVE_FIELDS);
  }

  async update(id: string, userId: string, data: UpdatePatientDto) {
    await this.findOne(id, userId);
    const encryptedData = encryptPatientFields(data, SENSITIVE_FIELDS);
    try {
      const patient = await this.prisma.patient.update({
        where: { id },
        data: encryptedData,
      });
      return decryptPatientFields(patient, SENSITIVE_FIELDS);
    } catch (error: any) {
      if (error.code === 'P2025') throw new NotFoundException('Patient not found');
      throw error;
    }
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);
    try {
      return await this.prisma.patient.delete({ where: { id } });
    } catch (error: any) {
      if (error.code === 'P2025') throw new NotFoundException('Patient not found');
      throw error;
    }
  }

  async getHistory(userId: string, patientId: string) {
    const patient = await this.findOne(patientId, userId);

    const treatments = await this.prisma.treatment.findMany({
      where: { patientId, userId },
      include: {
        sessions: {
          orderBy: { date: 'desc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const sessions = treatments.flatMap((t) =>
      t.sessions.map((s) => ({
        ...s,
        treatment: { id: t.id, estimatedTime: t.estimatedTime },
      })),
    ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const metricDefinitions = await this.prisma.metricDefinition.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return { patient, sessions, metricDefinitions };
  }

  async exportHistory(userId: string, patientId: string, format: string) {
    const { patient, sessions, metricDefinitions } = await this.getHistory(userId, patientId);

    if (format === 'csv') {
      return this.generateCsv(patient, sessions, metricDefinitions);
    }

    return { patient, sessions, metricDefinitions };
  }

  private generateCsv(patient: any, sessions: any[], metricDefinitions: any[]) {
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

    return { csv: csvContent, filename: `historico-${patient.name.replace(/\s+/g, '-')}.csv` };
  }
}
