import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEnterpriseRequestDto } from './dto/enterprise-request.dto';

@Injectable()
export class EnterpriseService {
  constructor(private prisma: PrismaService) {}

  async createRequest(userId: string, dto: CreateEnterpriseRequestDto) {
    const existing = await this.prisma.enterpriseRequest.findUnique({
      where: { userId },
    });

    if (existing) {
      throw new ConflictException('You already have an enterprise request');
    }

    return this.prisma.enterpriseRequest.create({
      data: {
        userId,
        companyName: dto.companyName,
        cnpj: dto.cnpj,
        teamSize: dto.teamSize,
        phone: dto.phone,
        message: dto.message,
      },
    });
  }

  async getRequestStatus(userId: string) {
    const request = await this.prisma.enterpriseRequest.findUnique({
      where: { userId },
    });

    if (!request) {
      return null;
    }

    return {
      id: request.id,
      status: request.status,
      companyName: request.companyName,
      createdAt: request.createdAt,
    };
  }
}
