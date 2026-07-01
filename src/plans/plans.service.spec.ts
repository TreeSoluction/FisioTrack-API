import { PlansService } from './plans.service';

function createPrismaMock() {
  return {
    subscription: { findUnique: jest.fn() },
    user: { findUnique: jest.fn() },
    patient: { count: jest.fn() },
  };
}

describe('PlansService', () => {
  let service: PlansService;
  let prisma: ReturnType<typeof createPrismaMock>;

  beforeEach(() => {
    jest.clearAllMocks();
    prisma = createPrismaMock();
    service = new PlansService(prisma as any);
  });

  describe('getAvailablePlans', () => {
    it('should return 3 plans with correct ids', () => {
      const plans = service.getAvailablePlans();
      expect(plans).toHaveLength(3);
      expect(plans.map((p) => p.id)).toEqual(['FREE', 'PRO', 'ENTERPRISE']);
    });

    it('should have maxPatients: 50 for FREE plan', () => {
      const plans = service.getAvailablePlans();
      const freePlan = plans.find((p) => p.id === 'FREE');
      expect(freePlan?.maxPatients).toBe(50);
    });

    it('should have maxPatients: null and popular: true for PRO plan', () => {
      const plans = service.getAvailablePlans();
      const proPlan = plans.find((p) => p.id === 'PRO');
      expect(proPlan?.maxPatients).toBeNull();
      expect(proPlan?.popular).toBe(true);
    });
  });

  describe('getCurrentPlan', () => {
    it('should return plan details with patientCount', async () => {
      prisma.subscription.findUnique.mockResolvedValue({
        plan: 'PRO',
        status: 'ACTIVE',
      });
      prisma.user.findUnique.mockResolvedValue({ maxPatients: null });
      prisma.patient.count.mockResolvedValue(10);

      const result = await service.getCurrentPlan('user1');

      expect(result.id).toBe('PRO');
      expect(result.patientCount).toBe(10);
      expect(result.subscriptionStatus).toBe('ACTIVE');
    });

    it('should default to FREE when no subscription', async () => {
      prisma.subscription.findUnique.mockResolvedValue(null);
      prisma.user.findUnique.mockResolvedValue({ maxPatients: 50 });
      prisma.patient.count.mockResolvedValue(3);

      const result = await service.getCurrentPlan('user1');

      expect(result.id).toBe('FREE');
      expect(result.subscriptionStatus).toBe('ACTIVE');
      expect(result.patientCount).toBe(3);
      expect(result.maxPatients).toBe(50);
    });
  });

  describe('canCreatePatient', () => {
    it('should return allowed: true with actual count for PRO', async () => {
      prisma.subscription.findUnique.mockResolvedValue({ plan: 'PRO' });
      prisma.patient.count.mockResolvedValue(100);

      const result = await service.canCreatePatient('user1');

      expect(result).toEqual({ allowed: true, current: 100, max: null });
    });

    it('should return allowed: true with count for FREE under limit', async () => {
      prisma.subscription.findUnique.mockResolvedValue(null);
      prisma.patient.count.mockResolvedValue(10);
      prisma.user.findUnique.mockResolvedValue({ maxPatients: 50 });

      const result = await service.canCreatePatient('user1');

      expect(result).toEqual({ allowed: true, current: 10, max: 50 });
    });

    it('should return allowed: false for FREE at limit', async () => {
      prisma.subscription.findUnique.mockResolvedValue(null);
      prisma.patient.count.mockResolvedValue(50);
      prisma.user.findUnique.mockResolvedValue({ maxPatients: 50 });

      const result = await service.canCreatePatient('user1');

      expect(result).toEqual({ allowed: false, current: 50, max: 50 });
    });
  });
});
