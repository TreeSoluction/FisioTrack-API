import { ForbiddenException } from '@nestjs/common';
import { ConsentGuard } from './consent.guard';

function createConsentServiceMock() {
  return { getConsentStatus: jest.fn() };
}

function createExecutionContext(user?: { id: string }) {
  return {
    switchToHttp: () => ({
      getRequest: () => ({ user }),
    }),
  } as any;
}

describe('ConsentGuard', () => {
  let guard: ConsentGuard;
  let consentService: ReturnType<typeof createConsentServiceMock>;

  beforeEach(() => {
    jest.clearAllMocks();
    consentService = createConsentServiceMock();
    guard = new ConsentGuard(consentService as any);
  });

  describe('canActivate', () => {
    it('should return true when user has consented', async () => {
      consentService.getConsentStatus.mockResolvedValue({
        hasConsented: true,
        missingDocuments: [],
      });

      const context = createExecutionContext({ id: 'user1' });
      const result = await guard.canActivate(context);

      expect(result).toBe(true);
      expect(consentService.getConsentStatus).toHaveBeenCalledWith('user1');
    });

    it('should throw ForbiddenException when consent missing', async () => {
      consentService.getConsentStatus.mockResolvedValue({
        hasConsented: false,
        missingDocuments: ['PRIVACY_POLICY', 'TERMS_OF_USE'],
      });

      const context = createExecutionContext({ id: 'user1' });

      await expect(guard.canActivate(context)).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('should return true when no user in request (unauthenticated)', async () => {
      const context = createExecutionContext(undefined);
      const result = await guard.canActivate(context);

      expect(result).toBe(true);
      expect(consentService.getConsentStatus).not.toHaveBeenCalled();
    });
  });
});
