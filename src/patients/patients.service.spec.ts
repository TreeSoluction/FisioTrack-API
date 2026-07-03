import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PrismaService } from '../prisma/prisma.service';
import {
  encryptPatientFields,
  decryptPatientFields,
} from '../common/encryption.util';

jest.mock('../common/encryption.util', () => ({
  encryptPatientFields: jest.fn(),
  decryptPatientFields: jest.fn(),
}));

describe('PatientsService', () => {
  let service: PatientsService;
  let prisma: {
    patient: {
      create: jest.Mock;
      findMany: jest.Mock;
      findFirst: jest.Mock;
      count: jest.Mock;
      update: jest.Mock;
      delete: jest.Mock;
    };
  };

  beforeEach(async () => {
    prisma = {
      patient: {
        create: jest.fn(),
        findMany: jest.fn(),
        findFirst: jest.fn(),
        count: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PatientsService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<PatientsService>(PatientsService);
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should encrypt sensitive fields before saving', async () => {
      const userId = 'user-1';
      const data = {
        name: 'João',
        cpf: '12345678900',
        birthDate: '1990-01-01',
        phone: '11999998888',
        email: 'joao@email.com',
        address: 'Rua A',
        medicalHistory: 'Histórico',
      };
      const encrypted = { ...data, cpf: 'enc', phone: 'enc', email: 'enc' };
      (encryptPatientFields as jest.Mock).mockReturnValue(encrypted);
      prisma.patient.create.mockResolvedValue({ id: 'p1', ...encrypted });

      await service.create(userId, data);

      expect(encryptPatientFields).toHaveBeenCalledWith(data, [
        'cpf',
        'medicalHistory',
        'address',
        'phone',
        'email',
      ]);
    });

    it('should call prisma.patient.create with userId', async () => {
      const userId = 'user-1';
      const data = {
        name: 'João',
        cpf: '123',
        birthDate: '1990-01-01',
        phone: '11',
      };
      const encrypted = { cpf: 'enc' };
      (encryptPatientFields as jest.Mock).mockReturnValue(encrypted);
      prisma.patient.create.mockResolvedValue({ id: 'p1' });

      await service.create(userId, data);

      expect(prisma.patient.create).toHaveBeenCalledWith({
        data: { ...encrypted, userId },
      });
    });
  });

  describe('findAll', () => {
    it('should decrypt all patient fields with pagination', async () => {
      const userId = 'user-1';
      const encrypted = [{ id: 'p1', cpf: 'enc' }];
      prisma.patient.findMany.mockResolvedValue(encrypted);
      prisma.patient.count.mockResolvedValue(1);
      (decryptPatientFields as jest.Mock).mockReturnValue({
        id: 'p1',
        cpf: '123',
      });

      const result = await service.findAll(userId, 1, 20);

      expect(prisma.patient.findMany).toHaveBeenCalledWith({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        skip: 0,
        take: 20,
      });
      expect(result.items).toEqual([{ id: 'p1', cpf: '123' }]);
      expect(result.total).toBe(1);
    });
  });

  describe('findOne', () => {
    it('should return decrypted patient with treatments and appointments', async () => {
      const patient = {
        id: 'p1',
        cpf: 'enc',
        treatments: [],
        appointments: [],
      };
      prisma.patient.findFirst.mockResolvedValue(patient);
      (decryptPatientFields as jest.Mock).mockReturnValue({
        id: 'p1',
        cpf: '123',
        treatments: [],
        appointments: [],
      });

      const result = await service.findOne('p1', 'user-1');

      expect(prisma.patient.findFirst).toHaveBeenCalledWith({
        where: { id: 'p1', userId: 'user-1' },
        include: { treatments: true, appointments: true },
      });
      expect(decryptPatientFields).toHaveBeenCalledWith(patient, [
        'cpf',
        'medicalHistory',
        'address',
        'phone',
        'email',
      ]);
      expect(result.id).toBe('p1');
    });

    it('should throw NotFoundException when patient not found', async () => {
      prisma.patient.findFirst.mockResolvedValue(null);

      await expect(service.findOne('p1', 'user-1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should encrypt data before updating', async () => {
      const patient = {
        id: 'p1',
        cpf: 'enc',
        treatments: [],
        appointments: [],
      };
      prisma.patient.findFirst.mockResolvedValue(patient);
      (decryptPatientFields as jest.Mock).mockReturnValue({
        id: 'p1',
        cpf: '123',
      });
      const encrypted = { cpf: 'new-enc' };
      (encryptPatientFields as jest.Mock).mockReturnValue(encrypted);
      prisma.patient.update.mockResolvedValue({ id: 'p1' });

      await service.update('p1', 'user-1', { cpf: 'new-cpf' });

      expect(encryptPatientFields).toHaveBeenCalledWith({ cpf: 'new-cpf' }, [
        'cpf',
        'medicalHistory',
        'address',
        'phone',
        'email',
      ]);
      expect(prisma.patient.update).toHaveBeenCalledWith({
        where: { id: 'p1' },
        data: encrypted,
      });
    });

    it('should throw NotFoundException when patient not found', async () => {
      prisma.patient.findFirst.mockResolvedValue(null);

      await expect(
        service.update('p1', 'user-1', { cpf: 'new' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete patient after verification', async () => {
      const patient = {
        id: 'p1',
        cpf: 'enc',
        treatments: [],
        appointments: [],
      };
      prisma.patient.findFirst.mockResolvedValue(patient);
      (decryptPatientFields as jest.Mock).mockReturnValue({ id: 'p1' });
      prisma.patient.delete.mockResolvedValue({ id: 'p1' });

      await service.remove('p1', 'user-1');

      expect(prisma.patient.delete).toHaveBeenCalledWith({
        where: { id: 'p1' },
      });
    });

    it('should throw NotFoundException when patient not found', async () => {
      prisma.patient.findFirst.mockResolvedValue(null);

      await expect(service.remove('p1', 'user-1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
