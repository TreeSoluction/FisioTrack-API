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
      data: patients.map((p) => decryptPatientFields(p, SENSITIVE_FIELDS)),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
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
}
