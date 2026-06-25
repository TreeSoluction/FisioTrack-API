import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';

@Injectable()
export class PacientesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, data: CreatePacienteDto) {
    return this.prisma.paciente.create({
      data: {
        ...data,
        usuarioId: userId,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.paciente.findMany({
      where: { usuarioId: userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, userId: string) {
    const paciente = await this.prisma.paciente.findFirst({
      where: { id, usuarioId: userId },
      include: {
        tratamentos: true,
        agendamentos: true,
      },
    });

    if (!paciente) {
      throw new NotFoundException('Paciente não encontrado');
    }

    return paciente;
  }

  async update(id: string, userId: string, data: UpdatePacienteDto) {
    await this.findOne(id, userId);
    return this.prisma.paciente.update({
      where: { id },
      data,
    });
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);
    return this.prisma.paciente.delete({ where: { id } });
  }
}