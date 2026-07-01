import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { decryptPatientFields } from '../common/encryption.util';

jest.mock('../common/encryption.util', () => ({
  decryptPatientFields: jest.fn((data) => data),
}));

describe('UsersService', () => {
  let service: UsersService;
  let prisma: any;

  const mockProfile = {
    id: 'user-1',
    name: 'Test User',
    email: 'test@example.com',
    role: 'THERAPIST',
    maxPatients: 50,
    createdAt: new Date(),
    subscription: {
      plan: 'PRO',
      status: 'ACTIVE',
      currentPeriodEnd: null,
      cancelAtPeriodEnd: false,
    },
  };

  const mockExportData = {
    id: 'user-1',
    name: 'Test User',
    email: 'test@example.com',
    role: 'THERAPIST',
    createdAt: new Date(),
    patients: [],
    treatments: [],
    appointments: [],
    consents: [],
    subscription: { plan: 'PRO', status: 'ACTIVE' },
  };

  beforeEach(async () => {
    prisma = {
      user: {
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
      userConsent: { deleteMany: jest.fn() },
      enterpriseRequest: { deleteMany: jest.fn() },
      review: { deleteMany: jest.fn() },
      subscription: { deleteMany: jest.fn() },
      session: { deleteMany: jest.fn() },
      payment: { deleteMany: jest.fn() },
      treatment: { deleteMany: jest.fn() },
      appointment: { deleteMany: jest.fn() },
      patient: { deleteMany: jest.fn() },
      $transaction: jest.fn((fns) => Promise.all(fns)),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, { provide: PrismaService, useValue: prisma }],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getProfile', () => {
    it('should return user with plan and subscriptionStatus', async () => {
      prisma.user.findUnique.mockResolvedValue(mockProfile);

      const result = await service.getProfile('user-1');

      expect(result.plan).toBe('PRO');
      expect(result.subscriptionStatus).toBe('ACTIVE');
    });

    it('should default to FREE plan when no subscription', async () => {
      prisma.user.findUnique.mockResolvedValue({
        ...mockProfile,
        subscription: null,
      });

      const result = await service.getProfile('user-1');

      expect(result.plan).toBe('FREE');
      expect(result.subscriptionStatus).toBe('ACTIVE');
    });

    it('should throw NotFoundException when user not found', async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      await expect(service.getProfile('user-1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateProfile', () => {
    it('should update and return user', async () => {
      prisma.user.findUnique.mockResolvedValue(mockProfile);
      prisma.user.update.mockResolvedValue({
        id: 'user-1',
        name: 'Updated Name',
        email: 'test@example.com',
        role: 'THERAPIST',
      });

      const result = await service.updateProfile('user-1', {
        name: 'Updated Name',
      });

      expect(result.name).toBe('Updated Name');
    });

    it('should throw NotFoundException when user not found', async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      await expect(
        service.updateProfile('user-1', { name: 'Updated' }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw ConflictException when email already in use', async () => {
      prisma.user.findUnique
        .mockResolvedValueOnce(mockProfile)
        .mockResolvedValueOnce({ id: 'other-user', email: 'taken@example.com' });

      await expect(
        service.updateProfile('user-1', { email: 'taken@example.com' }),
      ).rejects.toThrow(ConflictException);
    });

    it('should allow keeping same email', async () => {
      prisma.user.findUnique.mockResolvedValue(mockProfile);
      prisma.user.update.mockResolvedValue({
        id: 'user-1',
        name: 'Updated',
        email: 'test@example.com',
        role: 'THERAPIST',
      });

      const result = await service.updateProfile('user-1', {
        email: 'test@example.com',
      });

      expect(result.email).toBe('test@example.com');
    });
  });

  describe('exportData', () => {
    it('should return all user data with decrypted patients', async () => {
      const exportDataWithPatients = {
        ...mockExportData,
        patients: [{ cpf: 'encrypted', name: 'Patient 1' }],
      };
      prisma.user.findUnique.mockResolvedValue(exportDataWithPatients);

      const result = await service.exportData('user-1');

      expect(result.exportDate).toBeDefined();
      expect(result.userData.id).toBe('user-1');
      expect(result.patients).toBeDefined();
      expect(decryptPatientFields).toHaveBeenCalled();
    });

    it('should throw NotFoundException when user not found', async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      await expect(service.exportData('user-1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('deleteAccount', () => {
    it('should use prisma.$transaction', async () => {
      prisma.user.findUnique.mockResolvedValue(mockProfile);

      await service.deleteAccount('user-1');

      expect(prisma.$transaction).toHaveBeenCalled();
    });

    it('should throw NotFoundException when user not found', async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      await expect(service.deleteAccount('user-1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
