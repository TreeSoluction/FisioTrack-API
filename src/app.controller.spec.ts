import { Test, TestingModule } from '@nestjs/testing';
import { ServiceUnavailableException } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './prisma/prisma.service';

describe('AppController', () => {
  let appController: AppController;
  let prisma: any;

  beforeEach(async () => {
    prisma = {
      $queryRaw: jest.fn(),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{ provide: PrismaService, useValue: prisma }],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

  describe('health', () => {
    it('should return status ok with db connected when DB responds', async () => {
      prisma.$queryRaw.mockResolvedValue([{ '?column?': 1 }]);

      const result = await appController.health();

      expect(result).toEqual({
        status: 'ok',
        db: 'connected',
        timestamp: expect.any(String),
      });
      expect(prisma.$queryRaw).toHaveBeenCalled();
    });

    it('should return valid ISO timestamp', async () => {
      prisma.$queryRaw.mockResolvedValue([]);

      const result = await appController.health();

      expect(new Date(result.timestamp).toISOString()).toBe(result.timestamp);
    });

    it('should throw ServiceUnavailableException when DB is unreachable', async () => {
      prisma.$queryRaw.mockRejectedValue(new Error('Connection refused'));

      await expect(appController.health()).rejects.toThrow(
        ServiceUnavailableException,
      );
    });

    it('should throw ServiceUnavailableException when DB times out', async () => {
      prisma.$queryRaw.mockRejectedValue(new Error('Query timeout'));

      await expect(appController.health()).rejects.toThrow(
        'Database unreachable',
      );
    });
  });
});
