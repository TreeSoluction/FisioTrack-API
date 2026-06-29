import { ConflictException } from '@nestjs/common';
import { EnterpriseService } from './enterprise.service';

function createPrismaMock() {
  return {
    enterpriseRequest: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  };
}

describe('EnterpriseService', () => {
  let service: EnterpriseService;
  let prisma: ReturnType<typeof createPrismaMock>;

  beforeEach(() => {
    jest.clearAllMocks();
    prisma = createPrismaMock();
    service = new EnterpriseService(prisma as any);
  });

  describe('createRequest', () => {
    it('should create request with correct data', async () => {
      prisma.enterpriseRequest.findUnique.mockResolvedValue(null);
      prisma.enterpriseRequest.create.mockResolvedValue({
        id: 'req1',
        userId: 'user1',
        companyName: 'Acme',
        status: 'PENDING',
      });

      const dto = { companyName: 'Acme', teamSize: 10, phone: '11999990000' };
      const result = await service.createRequest('user1', dto);

      expect(result.id).toBe('req1');
      expect(prisma.enterpriseRequest.create).toHaveBeenCalledWith({
        data: {
          userId: 'user1',
          companyName: 'Acme',
          cnpj: undefined,
          teamSize: 10,
          phone: '11999990000',
          message: undefined,
          status: 'PENDING',
        },
      });
    });

    it('should throw ConflictException when duplicate', async () => {
      prisma.enterpriseRequest.findUnique.mockResolvedValue({ id: 'existing' });

      const dto = { companyName: 'Acme', teamSize: 10, phone: '11999990000' };
      await expect(service.createRequest('user1', dto as any)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('getRequestStatus', () => {
    it('should return request when found', async () => {
      prisma.enterpriseRequest.findUnique.mockResolvedValue({
        id: 'req1',
        status: 'PENDING',
        companyName: 'Acme',
        createdAt: new Date('2026-01-01'),
      });

      const result = await service.getRequestStatus('user1');

      expect(result).toEqual({
        id: 'req1',
        status: 'PENDING',
        companyName: 'Acme',
        createdAt: new Date('2026-01-01'),
      });
    });

    it('should return null when not found', async () => {
      prisma.enterpriseRequest.findUnique.mockResolvedValue(null);

      const result = await service.getRequestStatus('user1');

      expect(result).toBeNull();
    });
  });
});
