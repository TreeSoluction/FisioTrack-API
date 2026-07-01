import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { PrismaService } from '../prisma/prisma.service';

describe('SessionsService', () => {
  let service: SessionsService;
  let prisma: any;

  const mockUserId = 'user-1';
  const mockSession = {
    id: 'session-1',
    date: new Date('2025-01-15'),
    painScale: 5,
    weight: 70,
    measurements: null,
    notes: 'Sessão de alongamento',
    treatmentId: 'treatment-1',
  };

  const mockTreatment = {
    id: 'treatment-1',
    patientId: 'patient-1',
    userId: mockUserId,
  };

  const mockTreatmentWithUser = {
    ...mockSession,
    treatment: mockTreatment,
  };

  beforeEach(async () => {
    prisma = {
      session: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        count: jest.fn(),
        delete: jest.fn(),
      },
      treatment: {
        findFirst: jest.fn(),
        findUnique: jest.fn(),
        findMany: jest.fn(),
        count: jest.fn(),
      },
      patient: {
        findFirst: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SessionsService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<SessionsService>(SessionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should verify treatment belongs to user before creating', async () => {
      prisma.treatment.findFirst.mockResolvedValue(mockTreatment);
      prisma.session.create.mockResolvedValue(mockSession);

      await service.create(mockUserId, 'treatment-1', {
        painScale: 5,
        notes: 'Sessão de alongamento',
      });

      expect(prisma.treatment.findFirst).toHaveBeenCalledWith({
        where: { id: 'treatment-1', userId: mockUserId },
      });
    });

    it('should throw NotFoundException when treatment not found', async () => {
      prisma.treatment.findFirst.mockResolvedValue(null);

      await expect(
        service.create(mockUserId, 'treatment-1', { painScale: 5 }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should create session with treatmentId', async () => {
      prisma.treatment.findFirst.mockResolvedValue(mockTreatment);
      prisma.session.create.mockResolvedValue(mockSession);

      const createDto = { painScale: 5, notes: 'Sessão de alongamento' };
      const result = await service.create(mockUserId, 'treatment-1', createDto);

      expect(result).toEqual(mockSession);
      expect(prisma.session.create).toHaveBeenCalledWith({
        data: {
          ...createDto,
          treatmentId: 'treatment-1',
        },
      });
    });
  });

  describe('findAll', () => {
    it('should verify treatment ownership before returning sessions', async () => {
      prisma.treatment.findFirst.mockResolvedValue(mockTreatment);
      prisma.session.findMany.mockResolvedValue([mockSession]);
      prisma.session.count.mockResolvedValue(1);

      const result = await service.findAll(mockUserId, 'treatment-1', 1, 20);

      expect(result.data).toEqual([mockSession]);
      expect(result.pagination.total).toBe(1);
      expect(prisma.treatment.findFirst).toHaveBeenCalledWith({
        where: { id: 'treatment-1', userId: mockUserId },
      });
      expect(prisma.session.findMany).toHaveBeenCalledWith({
        where: { treatmentId: 'treatment-1' },
        orderBy: { date: 'desc' },
        skip: 0,
        take: 20,
      });
    });

    it('should throw NotFoundException when treatment not found', async () => {
      prisma.treatment.findFirst.mockResolvedValue(null);

      await expect(
        service.findAll(mockUserId, 'treatment-1'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('findOne', () => {
    it('should return session when owned by user', async () => {
      prisma.session.findUnique.mockResolvedValue(mockTreatmentWithUser);

      const result = await service.findOne(mockUserId, 'session-1');

      expect(result).toEqual(mockTreatmentWithUser);
      expect(prisma.session.findUnique).toHaveBeenCalledWith({
        where: { id: 'session-1' },
        include: { treatment: true },
      });
    });

    it('should throw NotFoundException when not found', async () => {
      prisma.session.findUnique.mockResolvedValue(null);

      await expect(service.findOne(mockUserId, 'session-1')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw ForbiddenException when treatment belongs to another user', async () => {
      const otherUserTreatment = {
        ...mockSession,
        treatment: { ...mockTreatment, userId: 'other-user' },
      };
      prisma.session.findUnique.mockResolvedValue(otherUserTreatment);

      await expect(
        service.findOne(mockUserId, 'session-1'),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('getDashboard', () => {
    it('should verify patient ownership before returning dashboard', async () => {
      prisma.patient.findFirst.mockResolvedValue({ id: 'patient-1', userId: mockUserId });
      prisma.treatment.count.mockResolvedValue(2);
      prisma.session.count.mockResolvedValue(1);
      prisma.session.findMany.mockResolvedValue([mockSession]);

      const result = await service.getDashboard(mockUserId, 'patient-1');

      expect(result.totalTreatments).toBe(2);
      expect(result.totalSessions).toBe(1);
      expect(result.latestSessions).toEqual([mockSession]);
      expect(prisma.patient.findFirst).toHaveBeenCalledWith({
        where: { id: 'patient-1', userId: mockUserId },
      });
    });

    it('should throw NotFoundException when patient not found', async () => {
      prisma.patient.findFirst.mockResolvedValue(null);

      await expect(
        service.getDashboard(mockUserId, 'patient-1'),
      ).rejects.toThrow(NotFoundException);
    });

    it('should return empty data when no data', async () => {
      prisma.patient.findFirst.mockResolvedValue({ id: 'patient-1', userId: mockUserId });
      prisma.treatment.count.mockResolvedValue(0);
      prisma.session.count.mockResolvedValue(0);
      prisma.session.findMany.mockResolvedValue([]);

      const result = await service.getDashboard(mockUserId, 'patient-1');

      expect(result.totalTreatments).toBe(0);
      expect(result.totalSessions).toBe(0);
      expect(result.latestSessions).toEqual([]);
    });
  });

  describe('remove', () => {
    it('should delete after verification', async () => {
      prisma.session.findUnique.mockResolvedValue(mockTreatmentWithUser);
      prisma.session.delete.mockResolvedValue(mockSession);

      await service.remove(mockUserId, 'session-1');

      expect(prisma.session.delete).toHaveBeenCalledWith({
        where: { id: 'session-1' },
      });
    });

    it('should throw NotFoundException when not found', async () => {
      prisma.session.findUnique.mockResolvedValue(null);

      await expect(service.remove(mockUserId, 'session-1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
