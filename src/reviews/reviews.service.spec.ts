import { ConflictException, ForbiddenException } from '@nestjs/common';
import { ReviewsService } from './reviews.service';

function createPrismaMock() {
  return {
    user: { findUnique: jest.fn() },
    review: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
  };
}

function daysAgo(days: number): Date {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000);
}

describe('ReviewsService', () => {
  let service: ReviewsService;
  let prisma: ReturnType<typeof createPrismaMock>;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    prisma = createPrismaMock();
    service = new ReviewsService(prisma as any);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('getStatus', () => {
    it('should return canReview: true when eligible (7+ days, no review)', async () => {
      prisma.user.findUnique.mockResolvedValue({ createdAt: daysAgo(30) });
      prisma.review.findUnique.mockResolvedValue(null);

      const result = await service.getStatus('user1');

      expect(result.canReview).toBe(true);
      expect(result.hasReviewed).toBe(false);
    });

    it('should return canReview: false when account too new', async () => {
      prisma.user.findUnique.mockResolvedValue({ createdAt: daysAgo(3) });
      prisma.review.findUnique.mockResolvedValue(null);

      const result = await service.getStatus('user1');

      expect(result.canReview).toBe(false);
      expect(result.reason).toBe('too_new');
    });

    it('should return canReview: false when already reviewed', async () => {
      prisma.user.findUnique.mockResolvedValue({ createdAt: daysAgo(30) });
      prisma.review.findUnique.mockResolvedValue({
        id: 'rev1',
        rating: 5,
        dismissedAt: null,
        createdAt: daysAgo(10),
      });

      const result = await service.getStatus('user1');

      expect(result.canReview).toBe(false);
      expect(result.hasReviewed).toBe(true);
      expect(result.reason).toBe('already_reviewed');
    });

    it('should return canReview: false when dismissed within 7 days', async () => {
      prisma.user.findUnique.mockResolvedValue({ createdAt: daysAgo(30) });
      prisma.review.findUnique.mockResolvedValue({
        id: 'rev1',
        rating: 0,
        dismissedAt: daysAgo(3),
        createdAt: daysAgo(10),
      });

      const result = await service.getStatus('user1');

      expect(result.canReview).toBe(false);
      expect(result.wasDismissed).toBe(true);
      expect(['dismissed', 'already_reviewed']).toContain(result.reason);
    });
  });

  describe('createReview', () => {
    it('should create review when eligible', async () => {
      prisma.user.findUnique.mockResolvedValue({ createdAt: daysAgo(30) });
      prisma.review.findUnique.mockResolvedValue(null);
      prisma.review.create.mockResolvedValue({
        id: 'rev1',
        userId: 'user1',
        rating: 5,
      });

      const result = await service.createReview('user1', {
        rating: 5,
        comment: 'Great app',
      });

      expect(result.id).toBe('rev1');
      expect(prisma.review.create).toHaveBeenCalledWith({
        data: { userId: 'user1', rating: 5, comment: 'Great app' },
      });
    });

    it('should throw ConflictException when already reviewed', async () => {
      prisma.user.findUnique.mockResolvedValue({ createdAt: daysAgo(30) });
      prisma.review.findUnique.mockResolvedValue({
        id: 'rev1',
        rating: 5,
        dismissedAt: null,
        createdAt: daysAgo(10),
      });

      await expect(
        service.createReview('user1', { rating: 5 }),
      ).rejects.toThrow(ConflictException);
    });

    it('should throw ForbiddenException when not eligible', async () => {
      prisma.user.findUnique.mockResolvedValue({ createdAt: daysAgo(3) });
      prisma.review.findUnique.mockResolvedValue(null);

      await expect(
        service.createReview('user1', { rating: 5 }),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('dismissReview', () => {
    it('should update existing review with dismissedAt', async () => {
      prisma.review.findUnique.mockResolvedValue({
        id: 'rev1',
        userId: 'user1',
      });
      prisma.review.update.mockResolvedValue({
        id: 'rev1',
        dismissedAt: new Date(),
      });

      const result = await service.dismissReview('user1');

      expect(prisma.review.update).toHaveBeenCalledWith({
        where: { userId: 'user1' },
        data: { dismissedAt: expect.any(Date) },
      });
    });

    it('should create new review with rating 0 when none exists', async () => {
      prisma.review.findUnique.mockResolvedValue(null);
      prisma.review.create.mockResolvedValue({
        id: 'rev2',
        userId: 'user1',
        rating: 0,
      });

      const result = await service.dismissReview('user1');

      expect(prisma.review.create).toHaveBeenCalledWith({
        data: { userId: 'user1', rating: 0, dismissedAt: expect.any(Date) },
      });
    });
  });
});
