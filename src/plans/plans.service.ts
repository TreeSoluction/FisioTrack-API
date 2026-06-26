import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PlanType } from '@prisma/client';

export interface PlanFeature {
  name: string;
  included: boolean;
}

export interface Plan {
  id: PlanType;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  maxPatients: number | null;
  popular?: boolean;
}

@Injectable()
export class PlansService {
  constructor(private prisma: PrismaService) {}

  getAvailablePlans(): Plan[] {
    return [
      {
        id: PlanType.FREE,
        name: 'Gratuito',
        price: 'R$ 0',
        period: '/mês',
        description: 'Para profissionais autônomos',
        features: [
          'Até 50 pacientes',
          'Tratamentos ilimitados',
          'Relatórios básicos',
          'Suporte por email',
        ],
        maxPatients: 50,
      },
      {
        id: PlanType.PRO,
        name: 'PRO',
        price: 'R$ 19,90',
        period: '/mês',
        description: 'Para clínicas pequenas',
        features: [
          'Pacientes ilimitados',
          'Tratamentos ilimitados',
          'Relatórios avançados',
          'Suporte prioritário',
          'Multi-usuário',
        ],
        maxPatients: null,
        popular: true,
      },
      {
        id: PlanType.ENTERPRISE,
        name: 'Enterprise',
        price: 'Custom',
        period: '',
        description: 'Para clínicas grandes',
        features: [
          'Tudo do PRO',
          'API de integração',
          'Relatórios personalizados',
          'Gerente de conta dedicado',
          'SLA garantido',
        ],
        maxPatients: null,
      },
    ];
  }

  async getCurrentPlan(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { plan: true, maxPatients: true, subscriptionStatus: true },
    });

    const plans = this.getAvailablePlans();
    const currentPlan = plans.find((p) => p.id === user.plan);

    const patientCount = await this.prisma.patient.count({
      where: { userId },
    });

    return {
      ...currentPlan,
      subscriptionStatus: user.subscriptionStatus,
      patientCount,
      maxPatients: user.maxPatients,
    };
  }

  async canCreatePatient(userId: string): Promise<{ allowed: boolean; current: number; max: number | null }> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { plan: true, maxPatients: true },
    });

    if (user.plan === PlanType.PRO || user.plan === PlanType.ENTERPRISE) {
      return { allowed: true, current: 0, max: null };
    }

    const patientCount = await this.prisma.patient.count({
      where: { userId },
    });

    return {
      allowed: patientCount < user.maxPatients,
      current: patientCount,
      max: user.maxPatients,
    };
  }
}
