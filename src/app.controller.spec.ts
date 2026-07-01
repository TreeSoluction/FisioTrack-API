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
      providers: [
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('health', () => {
    it('should return status ok when DB is connected', async () => {
      prisma.$queryRaw.mockResolvedValue([{ '?column?': 1 }]);

      const result = await appController.health();

      expect(result.status).toBe('ok');
      expect(result.db).toBe('connected');
      expect(result.timestamp).toBeDefined();
    });

    it('should throw ServiceUnavailableException when DB is unreachable', async () => {
      prisma.$queryRaw.mockRejectedValue(new Error('Connection refused'));

      await expect(appController.health()).rejects.toThrow(ServiceUnavailableException);
    });
  });
});
