import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DocumentType } from '@prisma/client';
import { CreateConsentDto } from './dto/consent.dto';

export const DOCUMENT_VERSIONS = {
  [DocumentType.PRIVACY_POLICY]: '1.0',
  [DocumentType.TERMS_OF_USE]: '1.0',
  [DocumentType.CONSENT_TERMS]: '1.0',
} as const;

@Injectable()
export class ConsentService {
  constructor(private prisma: PrismaService) {}

  async recordConsent(userId: string, dto: CreateConsentDto) {
    return this.prisma.userConsent.upsert({
      where: {
        userId_documentType: {
          userId,
          documentType: dto.documentType,
        },
      },
      update: {
        documentVersion: dto.documentVersion,
        ipAddress: dto.ipAddress,
        consentedAt: new Date(),
      },
      create: {
        userId,
        documentType: dto.documentType,
        documentVersion: dto.documentVersion,
        ipAddress: dto.ipAddress,
      },
    });
  }

  async getConsentStatus(userId: string) {
    const consents = await this.prisma.userConsent.findMany({
      where: { userId, revokedAt: null },
    });

    const consentMap = new Map(
      consents.map((c) => [c.documentType, c.documentVersion]),
    );

    const missingDocuments: DocumentType[] = [];

    for (const docType of Object.values(DocumentType)) {
      const currentVersion = DOCUMENT_VERSIONS[docType];
      const userVersion = consentMap.get(docType);

      if (!userVersion || userVersion !== currentVersion) {
        missingDocuments.push(docType);
      }
    }

    return {
      hasConsented: missingDocuments.length === 0,
      missingDocuments,
    };
  }

  async recordAllConsents(userId: string, ipAddress?: string) {
    const consents = Object.values(DocumentType).map((docType) => ({
      userId,
      documentType: docType,
      documentVersion: DOCUMENT_VERSIONS[docType],
      ipAddress,
    }));

    for (const consent of consents) {
      await this.prisma.userConsent.upsert({
        where: {
          userId_documentType: {
            userId: consent.userId,
            documentType: consent.documentType,
          },
        },
        update: {
          documentVersion: consent.documentVersion,
          ipAddress: consent.ipAddress,
          consentedAt: new Date(),
        },
        create: consent,
      });
    }
  }

  async getConsentHistory(userId: string) {
    return this.prisma.userConsent.findMany({
      where: { userId },
      orderBy: { consentedAt: 'desc' },
    });
  }

  async revokeConsent(userId: string, documentType: DocumentType) {
    const consent = await this.prisma.userConsent.findUnique({
      where: {
        userId_documentType: { userId, documentType },
      },
    });

    if (!consent || consent.revokedAt) {
      return null;
    }

    return this.prisma.userConsent.update({
      where: {
        userId_documentType: { userId, documentType },
      },
      data: { revokedAt: new Date() },
    });
  }
}
