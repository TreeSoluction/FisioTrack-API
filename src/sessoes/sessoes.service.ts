import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSessaoDto } from './dto/create-sessao.dto';

@Injectable()
export class SessoesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, tratamentoId: string, data: CreateSessaoDto) {
    const tratamento = await this.prisma.tratamento.findFirst({
      where: { id: tratamentoId, usuarioId: userId },
    });

    if (!tratamento) {
      throw new NotFoundException('Tratamento não encontrado');
    }

    return this.prisma.sessao.create({
      data: {
        ...data,
        tratamentoId,
      },
    });
  }

  async findAllByTratamento(userId: string, tratamentoId: string) {
    const tratamento = await this.prisma.tratamento.findFirst({
      where: { id: tratamentoId, usuarioId: userId },
    });

    if (!tratamento) {
      throw new NotFoundException('Tratamento não encontrado');
    }

    return this.prisma.sessao.findMany({
      where: { tratamentoId },
      orderBy: { data: 'desc' },
    });
  }

  async getDashboard(userId: string, pacienteId: string) {
    const paciente = await this.prisma.paciente.findFirst({
      where: { id: pacienteId, usuarioId: userId },
    });

    if (!paciente) {
      throw new NotFoundException('Paciente não encontrado');
    }

    const sessoes = await this.prisma.sessao.findMany({
      where: {
        tratamento: {
          pacienteId,
          usuarioId: userId,
        },
      },
      orderBy: { data: 'asc' },
      select: {
        data: true,
        peso: true,
        escalaDor: true,
        medidas: true,
      },
    });

    return sessoes;
  }

  async remove(id: string, userId: string) {
    const sessao = await this.prisma.sessao.findFirst({
      where: {
        id,
        tratamento: { usuarioId: userId },
      },
    });

    if (!sessao) {
      throw new NotFoundException('Sessão não encontrada');
    }

    return this.prisma.sessao.delete({ where: { id } });
  }
}