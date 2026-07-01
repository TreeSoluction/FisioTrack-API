import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { TreatmentsService } from './treatments.service';
import { PrismaService } from '../prisma/prisma.service';

describe('TreatmentsService', () => {
  let service: TreatmentsService;
  let prisma: any;

  const mockTreatment = {
    id: 'treatment-1',
    estimatedTime: '45 min',
    exercises: 'Alongamento',
    value: 150,
    status: 'IN_PROGRESS',
    startDate: new Date(),
    endDate: null,
    patientId: 'patient-1',
    userId: 'user-1',
    patient: { id: 'patient-1', name: 'John Doe' },
    sessions: [],
    payments: [],
  };

  beforeEach(async () => {
    prisma = {
      treatment: {
        create: jest.fn(),
        findMany: jest.fn(),
        findFirst: jest.fn(),
        findUnique: jest.fn(),
        count: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TreatmentsService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<TreatmentsService>(TreatmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should call prisma.treatment.create with userId', async () => {
      const createDto = {
        patientId: 'patient-1',
        estimatedTime: '45 min',
        exercises: 'Alongamento',
        value: 150,
      };
      prisma.treatment.create.mockResolvedValue(mockTreatment);

      const result = await service.create('user-1', createDto);

      expect(result).toEqual(mockTreatment);
      expect(prisma.treatment.create).toHaveBeenCalledWith({
        data: {
          ...createDto,
          userId: 'user-1',
          value: 150,
        },
      });
    });
  });

  describe('findAll', () => {
    it('should return treatments with patient included and pagination', async () => {
      prisma.treatment.findMany.mockResolvedValue([mockTreatment]);
      prisma.treatment.count.mockResolvedValue(1);

      const result = await service.findAll('user-1', 1, 20);

      expect(result.data).toEqual([mockTreatment]);
      expect(result.pagination.total).toBe(1);
      expect(prisma.treatment.findMany).toHaveBeenCalledWith({
        where: { userId: 'user-1' },
        orderBy: { createdAt: 'desc' },
        skip: 0,
        take: 20,
        include: { patient: true },
      });
    });
  });

  describe('findOne', () => {
    it('should return treatment with patient, sessions, payments', async () => {
      prisma.treatment.findFirst.mockResolvedValue(mockTreatment);

      const result = await service.findOne('treatment-1', 'user-1');

      expect(result).toEqual(mockTreatment);
      expect(prisma.treatment.findFirst).toHaveBeenCalledWith({
        where: { id: 'treatment-1', userId: 'user-1' },
        include: { patient: true, sessions: true, payments: true },
      });
    });

    it('should throw NotFoundException when not found', async () => {
      prisma.treatment.findFirst.mockResolvedValue(null);

      await expect(service.findOne('treatment-1', 'user-1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findByPatient', () => {
    it('should return treatments filtered by patientId', async () => {
      prisma.treatment.findMany.mockResolvedValue([mockTreatment]);

      const result = await service.findByPatient('patient-1', 'user-1');

      expect(result).toEqual([mockTreatment]);
      expect(prisma.treatment.findMany).toHaveBeenCalledWith({
        where: { patientId: 'patient-1', userId: 'user-1' },
        orderBy: { createdAt: 'desc' },
      });
    });
  });

  describe('update', () => {
    it('should verify existence then update', async () => {
      prisma.treatment.findFirst.mockResolvedValue(mockTreatment);
      prisma.treatment.update.mockResolvedValue({
        ...mockTreatment,
        estimatedTime: '60 min',
      });

      const result = await service.update('treatment-1', 'user-1', {
        estimatedTime: '60 min',
      });

      expect(result.estimatedTime).toBe('60 min');
      expect(prisma.treatment.update).toHaveBeenCalledWith({
        where: { id: 'treatment-1' },
        data: { estimatedTime: '60 min' },
      });
    });

    it('should throw NotFoundException when not found', async () => {
      prisma.treatment.findFirst.mockResolvedValue(null);

      await expect(
        service.update('treatment-1', 'user-1', {
          estimatedTime: '60 min',
        } as any),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete after verification', async () => {
      prisma.treatment.findFirst.mockResolvedValue(mockTreatment);
      prisma.treatment.delete.mockResolvedValue(mockTreatment);

      await service.remove('treatment-1', 'user-1');

      expect(prisma.treatment.delete).toHaveBeenCalledWith({
        where: { id: 'treatment-1' },
      });
    });

    it('should throw NotFoundException when not found', async () => {
      prisma.treatment.findFirst.mockResolvedValue(null);

      await expect(service.remove('treatment-1', 'user-1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
