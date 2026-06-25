import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTratamentoDto } from './dto/create-tratamento.dto';
import { UpdateTratamentoDto } from './dto/update-tratamento.dto';

@Injectable()
export class TratamentosService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, data: CreateTratamentoDto) {
    return this.prisma.tratamento.create({
      data: {
        ...data,
        valor: data.valor,
        usuarioId: userId,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.tratamento.findMany({
      where: { usuarioId: userId },
      include: {
        paciente: {
          select: { id: true, nome: true, cpf: true },
        },
        _count: {
          select: { sessoes: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, userId: string) {
    const tratamento = await this.prisma.tratamento.findFirst({
      where: { id, usuarioId: userId },
      include: {
        paciente: true,
        sessoes: {
          orderBy: { data: 'desc' },
        },
        pagamentos: true,
      },
    });

    if (!tratamento) {
      throw new NotFoundException('Tratamento não encontrado');
    }

    return tratamento;
  }

  async update(id: string, userId: string, data: UpdateTratamentoDto) {
    await this.findOne(id, userId);
    return this.prisma.tratamento.update({
      where: { id },
      data,
    });
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);
    return this.prisma.tratamento.delete({ where: { id } });
  }
}