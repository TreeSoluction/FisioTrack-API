import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { PrismaService } from '../prisma/prisma.service';

describe('SessionsService', () => {
  let service: SessionsService;
  let prisma: any;

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
  };

  beforeEach(async () => {
    prisma = {
      session: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        delete: jest.fn(),
      },
      treatment: {
        findUnique: jest.fn(),
        findMany: jest.fn(),
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
    it('should verify treatment exists before creating', async () => {
      prisma.treatment.findUnique.mockResolvedValue(mockTreatment);
      prisma.session.create.mockResolvedValue(mockSession);

      await service.create('treatment-1', {
        painScale: 5,
        notes: 'Sessão de alongamento',
      });

      expect(prisma.treatment.findUnique).toHaveBeenCalledWith({
        where: { id: 'treatment-1' },
      });
    });

    it('should throw NotFoundException when treatment not found', async () => {
      prisma.treatment.findUnique.mockResolvedValue(null);

      await expect(
        service.create('treatment-1', { painScale: 5 }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should create session with treatmentId', async () => {
      prisma.treatment.findUnique.mockResolvedValue(mockTreatment);
      prisma.session.create.mockResolvedValue(mockSession);

      const createDto = { painScale: 5, notes: 'Sessão de alongamento' };
      const result = await service.create('treatment-1', createDto);

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
    it('should return sessions ordered by date desc', async () => {
      prisma.session.findMany.mockResolvedValue([mockSession]);

      const result = await service.findAll('treatment-1');

      expect(result).toEqual([mockSession]);
      expect(prisma.session.findMany).toHaveBeenCalledWith({
        where: { treatmentId: 'treatment-1' },
        orderBy: { date: 'desc' },
      });
    });
  });

  describe('findOne', () => {
    it('should return session with treatment', async () => {
      prisma.session.findUnique.mockResolvedValue(mockSession);

      const result = await service.findOne('session-1');

      expect(result).toEqual(mockSession);
      expect(prisma.session.findUnique).toHaveBeenCalledWith({
        where: { id: 'session-1' },
        include: { treatment: true },
      });
    });

    it('should throw NotFoundException when not found', async () => {
      prisma.session.findUnique.mockResolvedValue(null);

      await expect(service.findOne('session-1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getDashboard', () => {
    it('should return totalTreatments, totalSessions, latestSessions', async () => {
      const treatments = [
        { id: 'treatment-1', sessions: [mockSession] },
        { id: 'treatment-2', sessions: [] },
      ];

      prisma.treatment.findMany.mockResolvedValue(treatments);

      const result = await service.getDashboard('patient-1');

      expect(result.totalTreatments).toBe(2);
      expect(result.totalSessions).toBe(1);
      expect(result.latestSessions).toEqual([mockSession]);
    });

    it('should return empty data when no data', async () => {
      prisma.treatment.findMany.mockResolvedValue([]);

      const result = await service.getDashboard('patient-1');

      expect(result.totalTreatments).toBe(0);
      expect(result.totalSessions).toBe(0);
      expect(result.latestSessions).toEqual([]);
    });
  });

  describe('remove', () => {
    it('should delete after verification', async () => {
      prisma.session.findUnique.mockResolvedValue(mockSession);
      prisma.session.delete.mockResolvedValue(mockSession);

      await service.remove('session-1');

      expect(prisma.session.delete).toHaveBeenCalledWith({
        where: { id: 'session-1' },
      });
    });

    it('should throw NotFoundException when not found', async () => {
      prisma.session.findUnique.mockResolvedValue(null);

      await expect(service.remove('session-1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
