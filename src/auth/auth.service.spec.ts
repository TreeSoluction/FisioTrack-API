import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConsentService } from '../consent/consent.service';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from './auth.service';

jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

import * as bcrypt from 'bcryptjs';

describe('AuthService', () => {
  let service: AuthService;
  let prisma: {
    user: { findUnique: jest.Mock; create: jest.Mock };
    subscription: { create: jest.Mock };
  };
  let jwtService: { sign: jest.Mock };
  let consentService: {
    getConsentStatus: jest.Mock;
    recordAllConsents: jest.Mock;
  };

  const mockUser = {
    id: 'user-1',
    name: 'Dr. Maria',
    email: 'maria@example.com',
    password: 'hashed-password',
    role: 'FISIOTHERAPIST',
    maxPatients: 50,
    subscription: { plan: 'PRO' },
  };

  const mockConsentStatus = {
    hasConsented: true,
    missingDocuments: [] as string[],
  };

  beforeEach(() => {
    prisma = {
      user: {
        findUnique: jest.fn(),
        create: jest.fn(),
      },
      subscription: {
        create: jest.fn(),
      },
    };
    jwtService = { sign: jest.fn().mockReturnValue('jwt-token') };
    consentService = {
      getConsentStatus: jest.fn().mockResolvedValue(mockConsentStatus),
      recordAllConsents: jest.fn(),
    };

    service = new AuthService(
      prisma as unknown as PrismaService,
      jwtService as unknown as JwtService,
      consentService as unknown as ConsentService,
    );

    jest.clearAllMocks();
    (bcrypt.compare as jest.Mock).mockReset();
    (bcrypt.hash as jest.Mock).mockReset();
  });

  describe('login', () => {
    it('throws UnauthorizedException for non-existent email', async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      await expect(
        service.login('missing@example.com', 'password'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('throws UnauthorizedException for wrong password', async () => {
      prisma.user.findUnique.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(service.login('maria@example.com', 'wrong')).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('returns access_token and user data on success', async () => {
      prisma.user.findUnique.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.login('maria@example.com', 'password');

      expect(result.access_token).toBe('jwt-token');
      expect(result.user).toMatchObject({
        id: 'user-1',
        name: 'Dr. Maria',
        email: 'maria@example.com',
        role: 'FISIOTHERAPIST',
        plan: 'PRO',
        maxPatients: 50,
      });
      expect(jwtService.sign).toHaveBeenCalledWith({
        sub: 'user-1',
        email: 'maria@example.com',
        role: 'FISIOTHERAPIST',
        plan: 'PRO',
      });
    });

    it('includes requiresConsent and missingDocuments from consent status', async () => {
      prisma.user.findUnique.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      consentService.getConsentStatus.mockResolvedValue({
        hasConsented: false,
        missingDocuments: ['terms', 'privacy'],
      });

      const result = await service.login('maria@example.com', 'password');

      expect(result.requiresConsent).toBe(true);
      expect(result.missingDocuments).toEqual(['terms', 'privacy']);
    });

    it('returns plan from subscription or defaults to FREE', async () => {
      prisma.user.findUnique.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const withPlan = await service.login('maria@example.com', 'password');
      expect(withPlan.user.plan).toBe('PRO');

      prisma.user.findUnique.mockResolvedValue({
        ...mockUser,
        subscription: null,
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const noPlan = await service.login('maria@example.com', 'password');
      expect(noPlan.user.plan).toBe('FREE');
    });
  });

  describe('register', () => {
    const newUser = {
      id: 'user-2',
      name: 'Dr. Pedro',
      email: 'pedro@example.com',
      role: 'FISIOTHERAPIST',
    };

    beforeEach(() => {
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-new');
      prisma.user.create.mockResolvedValue(newUser);
      prisma.subscription.create.mockResolvedValue({});
    });

    it('creates user with hashed password', async () => {
      await service.register('Dr. Pedro', 'pedro@example.com', 'plaintext');

      expect(bcrypt.hash).toHaveBeenCalledWith('plaintext', 10);
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          name: 'Dr. Pedro',
          email: 'pedro@example.com',
          password: 'hashed-new',
          maxPatients: 50,
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      });
    });

    it('creates default FREE subscription', async () => {
      await service.register('Dr. Pedro', 'pedro@example.com', 'password');

      expect(prisma.subscription.create).toHaveBeenCalledWith({
        data: {
          userId: 'user-2',
          plan: 'FREE',
          status: 'ACTIVE',
        },
      });
    });

    it('calls consentService.recordAllConsents with userId and ip', async () => {
      await service.register(
        'Dr. Pedro',
        'pedro@example.com',
        'password',
        '127.0.0.1',
      );

      expect(consentService.recordAllConsents).toHaveBeenCalledWith(
        'user-2',
        '127.0.0.1',
      );
    });

    it('returns user without password field', async () => {
      const result = await service.register(
        'Dr. Pedro',
        'pedro@example.com',
        'password',
      );

      expect(result).toEqual(newUser);
      expect(result).not.toHaveProperty('password');
      expect(Object.keys(result)).toEqual(['id', 'name', 'email', 'role']);
    });
  });
});
