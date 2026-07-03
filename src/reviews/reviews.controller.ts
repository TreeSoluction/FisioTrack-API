import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { AuthenticatedRequest } from '../common/types';

@ApiTags('reviews')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('reviews')
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}

  @Get('status')
  @ApiOperation({ summary: 'Get review eligibility status' })
  @ApiResponse({
    status: 200,
    description: 'Review status with eligibility info',
  })
  async getStatus(@Req() req: AuthenticatedRequest) {
    return this.reviewsService.getStatus(req.user.id);
  }

  @Post()
  @ApiOperation({ summary: 'Submit a review' })
  @ApiResponse({ status: 201, description: 'Review submitted' })
  @ApiResponse({ status: 409, description: 'Already reviewed' })
  @ApiResponse({ status: 403, description: 'Cannot review yet' })
  async createReview(
    @Req() req: AuthenticatedRequest,
    @Body() dto: CreateReviewDto,
  ) {
    return this.reviewsService.createReview(req.user.id, dto);
  }

  @Post('dismiss')
  @ApiOperation({ summary: 'Dismiss review prompt' })
  @ApiResponse({ status: 200, description: 'Review dismissed' })
  async dismissReview(@Req() req: AuthenticatedRequest) {
    return this.reviewsService.dismissReview(req.user.id);
  }
}
