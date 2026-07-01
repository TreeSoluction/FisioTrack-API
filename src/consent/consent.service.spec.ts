import { Test, TestingModule } from '@nestjs/testing';
import { DocumentType } from '@prisma/client';
import { ConsentService, DOCUMENT_VERSIONS } from './consent.service';
import { PrismaService } from '../prisma/prisma.service';

describe('ConsentService', () => {
  let service: ConsentService;
  let prisma: {
    userConsent: {
      upsert: jest.Mock;
      findMany: jest.Mock;
      findUnique: jest.Mock;
      update: jest.Mock;
    };
    $transaction: jest.Mock;
  };

  beforeEach(async () => {
    prisma = {
      userConsent: {
        upsert: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
      },
      $transaction: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsentService, { provide: PrismaService, useValue: prisma }],
    }).compile();

    service = module.get<ConsentService>(ConsentService);
    jest.clearAllMocks();
  });

  describe('recordConsent', () => {
    it('should upsert with correct data', async () => {
      const dto = {
        documentType: DocumentType.PRIVACY_POLICY,
        documentVersion: '1.0',
      };
      const expected = { userId: 'u1', ...dto, ipAddress: '127.0.0.1' };
      prisma.userConsent.upsert.mockResolvedValue(expected);

      const result = await service.recordConsent('u1', dto, '127.0.0.1');

      expect(prisma.userConsent.upsert).toHaveBeenCalledWith({
        where: {
          userId_documentType: {
            userId: 'u1',
            documentType: DocumentType.PRIVACY_POLICY,
          },
        },
        update: {
          documentVersion: '1.0',
          ipAddress: '127.0.0.1',
          consentedAt: expect.any(Date),
        },
        create: {
          userId: 'u1',
          documentType: DocumentType.PRIVACY_POLICY,
          documentVersion: '1.0',
          ipAddress: '127.0.0.1',
        },
      });
      expect(result).toEqual(expected);
    });
  });

  describe('getConsentStatus', () => {
    it('should return hasConsented: true when all consents present', async () => {
      const consents = Object.values(DocumentType).map((dt) => ({
        documentType: dt,
        documentVersion: DOCUMENT_VERSIONS[dt],
      }));
      prisma.userConsent.findMany.mockResolvedValue(consents);

      const result = await service.getConsentStatus('u1');

      expect(result.hasConsented).toBe(true);
      expect(result.missingDocuments).toEqual([]);
    });

    it('should return missing documents when some not consented', async () => {
      prisma.userConsent.findMany.mockResolvedValue([]);

      const result = await service.getConsentStatus('u1');

      expect(result.hasConsented).toBe(false);
      expect(result.missingDocuments).toEqual(
        expect.arrayContaining(Object.values(DocumentType)),
      );
    });

    it('should exclude revoked consents', async () => {
      const revokedConsent = {
        documentType: DocumentType.PRIVACY_POLICY,
        documentVersion: '1.0',
        revokedAt: new Date(),
      };
      prisma.userConsent.findMany.mockResolvedValue([]);

      await service.getConsentStatus('u1');

      expect(prisma.userConsent.findMany).toHaveBeenCalledWith({
        where: { userId: 'u1', revokedAt: null },
      });
    });
  });

  describe('recordAllConsents', () => {
    it('should create all 3 document types in a transaction', async () => {
      prisma.userConsent.upsert.mockResolvedValue({});
      prisma.$transaction.mockImplementation(async (ops: any[]) => {
        return Promise.all(ops);
      });

      await service.recordAllConsents('u1', '127.0.0.1');

      expect(prisma.$transaction).toHaveBeenCalled();
      expect(prisma.userConsent.upsert).toHaveBeenCalledTimes(
        Object.values(DocumentType).length,
      );
    });
  });

  describe('getConsentHistory', () => {
    it('should return consents ordered by consentedAt desc', async () => {
      const history = [
        { id: 2, documentType: DocumentType.TERMS_OF_USE },
        { id: 1, documentType: DocumentType.PRIVACY_POLICY },
      ];
      prisma.userConsent.findMany.mockResolvedValue(history);

      const result = await service.getConsentHistory('u1');

      expect(prisma.userConsent.findMany).toHaveBeenCalledWith({
        where: { userId: 'u1' },
        orderBy: { consentedAt: 'desc' },
      });
      expect(result).toEqual(history);
    });
  });

  describe('revokeConsent', () => {
    it('should set revokedAt timestamp', async () => {
      const consent = {
        userId: 'u1',
        documentType: DocumentType.PRIVACY_POLICY,
        revokedAt: null,
      };
      prisma.userConsent.findUnique.mockResolvedValue(consent);
      prisma.userConsent.update.mockResolvedValue({
        ...consent,
        revokedAt: new Date(),
      });

      await service.revokeConsent('u1', DocumentType.PRIVACY_POLICY);

      expect(prisma.userConsent.update).toHaveBeenCalledWith({
        where: {
          userId_documentType: {
            userId: 'u1',
            documentType: DocumentType.PRIVACY_POLICY,
          },
        },
        data: { revokedAt: expect.any(Date) },
      });
    });

    it('should return null when consent not found', async () => {
      prisma.userConsent.findUnique.mockResolvedValue(null);

      const result = await service.revokeConsent(
        'u1',
        DocumentType.PRIVACY_POLICY,
      );

      expect(result).toBeNull();
      expect(prisma.userConsent.update).not.toHaveBeenCalled();
    });

    it('should return null when already revoked', async () => {
      const consent = {
        userId: 'u1',
        documentType: DocumentType.PRIVACY_POLICY,
        revokedAt: new Date(),
      };
      prisma.userConsent.findUnique.mockResolvedValue(consent);

      const result = await service.revokeConsent(
        'u1',
        DocumentType.PRIVACY_POLICY,
      );

      expect(result).toBeNull();
      expect(prisma.userConsent.update).not.toHaveBeenCalled();
    });
  });
});
