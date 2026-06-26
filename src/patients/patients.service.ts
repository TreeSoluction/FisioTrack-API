import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import {
  encryptPatientFields,
  decryptPatientFields,
} from '../common/encryption.util';

const SENSITIVE_FIELDS = ['cpf', 'medicalHistory', 'address'];

@Injectable()
export class PatientsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, data: CreatePatientDto) {
    const encryptedData = encryptPatientFields(data, SENSITIVE_FIELDS);
    return this.prisma.patient.create({
      data: {
        ...encryptedData,
        userId,
      },
    });
  }

  async findAll(userId: string) {
    const patients = await this.prisma.patient.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    return patients.map((p) => decryptPatientFields(p, SENSITIVE_FIELDS));
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
    return this.prisma.patient.update({
      where: { id },
      data: encryptedData,
    });
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);
    return this.prisma.patient.delete({ where: { id } });
  }
}