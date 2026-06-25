import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { UpdateTreatmentDto } from './dto/update-treatment.dto';

@Injectable()
export class TreatmentsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, data: CreateTreatmentDto) {
    return this.prisma.treatment.create({
      data: {
        ...data,
        userId,
        value: data.value,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.treatment.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: { patient: true },
    });
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
    return this.prisma.treatment.update({
      where: { id },
      data,
    });
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);
    return this.prisma.treatment.delete({ where: { id } });
  }
}
