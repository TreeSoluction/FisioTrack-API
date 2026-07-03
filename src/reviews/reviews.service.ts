import {
  Injectable,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async getStatus(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { createdAt: true },
    });

    if (!user) {
      throw new ForbiddenException('User not found');
    }

    const review = await this.prisma.review.findUnique({
      where: { userId },
      select: { id: true, rating: true, dismissedAt: true, createdAt: true },
    });

    const accountAgeDays = Math.floor(
      (Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24),
    );

    const hasReviewed = !!review;
    const wasDismissed = review?.dismissedAt != null;
    const daysSinceDismiss =
      wasDismissed && review?.dismissedAt
        ? Math.floor(
            (Date.now() - new Date(review.dismissedAt).getTime()) /
              (1000 * 60 * 60 * 24),
          )
        : 0;

    const canReview =
      !hasReviewed &&
      accountAgeDays >= 7 &&
      (!wasDismissed || daysSinceDismiss >= 7);

    let reason = '';
    if (hasReviewed) {
      reason = 'already_reviewed';
    } else if (accountAgeDays < 7) {
      reason = 'too_new';
    } else if (wasDismissed && daysSinceDismiss < 7) {
      reason = 'dismissed';
    }

    return {
      canReview,
      hasReviewed,
      wasDismissed,
      accountAgeDays,
      review: hasReviewed
        ? {
            rating: review.rating,
            createdAt: review.createdAt,
          }
        : null,
      reason,
    };
  }

  async createReview(userId: string, dto: CreateReviewDto) {
    const status = await this.getStatus(userId);

    if (status.hasReviewed) {
      throw new ConflictException('You have already reviewed');
    }

    if (!status.canReview) {
      throw new ForbiddenException({
        message: 'Cannot review yet',
        reason: status.reason,
      });
    }

    try {
      return await this.prisma.review.create({
        data: {
          userId,
          rating: dto.rating,
          comment: dto.comment,
        },
      });
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new ConflictException('You have already reviewed');
      }
      throw error;
    }
  }

  async dismissReview(userId: string) {
    const review = await this.prisma.review.findUnique({
      where: { userId },
    });

    if (review) {
      return this.prisma.review.update({
        where: { userId },
        data: { dismissedAt: new Date() },
      });
    }

    return this.prisma.review.create({
      data: {
        userId,
        rating: 0,
        dismissedAt: new Date(),
      },
    });
  }
}
