import { ForbiddenException } from '@nestjs/common';
import { PatientLimitGuard } from './patient-limit.guard';

function createPrismaMock() {
  return {
    subscription: { findUnique: jest.fn() },
    user: { findUnique: jest.fn() },
    patient: { count: jest.fn() },
  };
}

function createExecutionContext(user?: { id: string }) {
  return {
    switchToHttp: () => ({
      getRequest: () => ({ user }),
    }),
  } as any;
}

describe('PatientLimitGuard', () => {
  let guard: PatientLimitGuard;
  let prisma: ReturnType<typeof createPrismaMock>;

  beforeEach(() => {
    jest.clearAllMocks();
    prisma = createPrismaMock();
    guard = new PatientLimitGuard(prisma as any);
  });

  describe('canActivate', () => {
    it('should return false when no user', async () => {
      const context = createExecutionContext(undefined);
      const result = await guard.canActivate(context);
      expect(result).toBe(false);
    });

    it('should allow PRO users without limit check', async () => {
      prisma.subscription.findUnique.mockResolvedValue({ plan: 'PRO' });
      const context = createExecutionContext({ id: 'user1' });

      const result = await guard.canActivate(context);

      expect(result).toBe(true);
      expect(prisma.patient.count).not.toHaveBeenCalled();
    });

    it('should allow ENTERPRISE users without limit check', async () => {
      prisma.subscription.findUnique.mockResolvedValue({ plan: 'ENTERPRISE' });
      const context = createExecutionContext({ id: 'user1' });

      const result = await guard.canActivate(context);

      expect(result).toBe(true);
    });

    it('should allow FREE user under limit', async () => {
      prisma.subscription.findUnique.mockResolvedValue(null);
      prisma.user.findUnique.mockResolvedValue({ maxPatients: 50 });
      prisma.patient.count.mockResolvedValue(10);
      const context = createExecutionContext({ id: 'user1' });

      const result = await guard.canActivate(context);

      expect(result).toBe(true);
    });

    it('should throw ForbiddenException when FREE user at limit', async () => {
      prisma.subscription.findUnique.mockResolvedValue(null);
      prisma.user.findUnique.mockResolvedValue({ maxPatients: 50 });
      prisma.patient.count.mockResolvedValue(50);
      const context = createExecutionContext({ id: 'user1' });

      await expect(guard.canActivate(context)).rejects.toThrow(ForbiddenException);
    });

    it('should return false when user not found in DB', async () => {
      prisma.subscription.findUnique.mockResolvedValue(null);
      prisma.user.findUnique.mockResolvedValue(null);
      const context = createExecutionContext({ id: 'user1' });

      const result = await guard.canActivate(context);

      expect(result).toBe(false);
    });
  });
});
