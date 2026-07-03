import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMetricDefinitionDto } from './dto/create-metric-definition.dto';
import { UpdateMetricDefinitionDto } from './dto/update-metric-definition.dto';

@Injectable()
export class MetricDefinitionsService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: string) {
    return this.prisma.metricDefinition.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(userId: string, data: CreateMetricDefinitionDto) {
    return this.prisma.metricDefinition.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  async update(userId: string, id: string, data: UpdateMetricDefinitionDto) {
    const metric = await this.findOne(id, userId);
    return this.prisma.metricDefinition.update({
      where: { id: metric.id },
      data,
    });
  }

  async remove(userId: string, id: string) {
    const metric = await this.findOne(id, userId);
    return this.prisma.metricDefinition.delete({
      where: { id: metric.id },
    });
  }

  private async findOne(id: string, userId: string) {
    const metric = await this.prisma.metricDefinition.findUnique({
      where: { id },
    });

    if (!metric) {
      throw new NotFoundException('Metric definition not found');
    }

    if (metric.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return metric;
  }
}
