import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface PlanFeature {
  name: string;
  included: boolean;
}

export interface Plan {
  id: string;
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
        id: 'FREE',
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
        id: 'PRO',
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
        id: 'ENTERPRISE',
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
    const subscription = await this.prisma.subscription.findUnique({
      where: { userId },
      select: { plan: true, status: true },
    });

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { maxPatients: true },
    });

    const plan = subscription?.plan || 'FREE';
    const plans = this.getAvailablePlans();
    const currentPlan = plans.find((p) => p.id === plan);

    const patientCount = await this.prisma.patient.count({
      where: { userId },
    });

    return {
      ...currentPlan,
      subscriptionStatus: subscription?.status || 'ACTIVE',
      patientCount,
      maxPatients: user.maxPatients,
    };
  }

  async canCreatePatient(userId: string): Promise<{ allowed: boolean; current: number; max: number | null }> {
    const subscription = await this.prisma.subscription.findUnique({
      where: { userId },
      select: { plan: true },
    });

    const plan = subscription?.plan || 'FREE';

    if (plan === 'PRO' || plan === 'ENTERPRISE') {
      return { allowed: true, current: 0, max: null };
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { maxPatients: true },
    });

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
