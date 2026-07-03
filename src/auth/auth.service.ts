import { Injectable, ConflictException, UnauthorizedException, ForbiddenException, OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { ConsentService } from '../consent/consent.service';
import { THIRTY_DAYS_MS } from '../common/constants';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private consentService: ConsentService,
  ) {}

  async onModuleInit() {
    await this.cleanupExpiredTokens();
    setInterval(() => this.cleanupExpiredTokens(), 60 * 60 * 1000);
  }

  private async cleanupExpiredTokens() {
    const now = new Date();
    await Promise.all([
      this.prisma.refreshToken.deleteMany({ where: { expiresAt: { lt: now } } }),
      this.prisma.blacklistedToken.deleteMany({ where: { expiresAt: { lt: now } } }),
    ]);
  }

  private generateRefreshToken(): string {
    return crypto.randomBytes(40).toString('hex');
  }

  private async createRefreshToken(userId: string): Promise<string> {
    const token = this.generateRefreshToken();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.prisma.refreshToken.create({
      data: {
        token,
        userId,
        expiresAt,
      },
    });

    return token;
  }

  private async generateTokens(userId: string, payload: any) {
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = await this.createRefreshToken(userId);
    return { accessToken, refreshToken };
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { subscription: true },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const consentStatus = await this.consentService.getConsentStatus(user.id);
    const plan = user.subscription?.plan || 'FREE';

    const priceChanged =
      !!user.subscription?.priceChangedAt &&
      Date.now() - new Date(user.subscription.priceChangedAt).getTime() <
        THIRTY_DAYS_MS;

    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      plan,
    };

    const { accessToken, refreshToken } = await this.generateTokens(user.id, payload);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        plan,
        maxPatients: user.maxPatients,
      },
      requiresConsent: !consentStatus.hasConsented,
      missingDocuments: consentStatus.missingDocuments,
      priceChanged,
    };
  }

  async refreshTokens(refreshToken: string) {
    const tokenRecord = await this.prisma.refreshToken.findUnique({
      where: { token: refreshToken },
    });

    if (!tokenRecord) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    if (new Date() > tokenRecord.expiresAt) {
      await this.prisma.refreshToken.delete({ where: { token: refreshToken } });
      throw new UnauthorizedException('Refresh token expired');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: tokenRecord.userId },
      include: { subscription: true },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Delete old refresh token
    await this.prisma.refreshToken.delete({ where: { token: refreshToken } });

    const plan = user.subscription?.plan || 'FREE';
    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      plan,
    };

    const { accessToken, refreshToken: newRefreshToken } = await this.generateTokens(user.id, payload);

    return {
      access_token: accessToken,
      refresh_token: newRefreshToken,
    };
  }

  async logout(userId: string, accessToken: string) {
    // Decode token to get expiration
    const decoded = this.jwtService.decode(accessToken) as any;
    if (decoded?.exp) {
      const expiresAt = new Date(decoded.exp * 1000);

      // Add to blacklist
      await this.prisma.blacklistedToken.create({
        data: {
          token: accessToken,
          expiresAt,
        },
      });
    }

    // Delete all refresh tokens for this user
    await this.prisma.refreshToken.deleteMany({
      where: { userId },
    });

    return { message: 'Logged out successfully' };
  }

  async register(
    name: string,
    email: string,
    password: string,
    ipAddress?: string,
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const result = await this.prisma.$transaction(async (tx) => {
        const user = await tx.user.create({
          data: {
            name,
            email,
            password: hashedPassword,
            maxPatients: 50,
          },
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        });

        await tx.subscription.create({
          data: {
            userId: user.id,
            plan: 'FREE',
            status: 'ACTIVE',
          },
        });

        return user;
      });

      await this.consentService.recordAllConsents(result.id, ipAddress);

      return result;
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new ConflictException('Email already registered');
      }
      throw error;
    }
  }
}
