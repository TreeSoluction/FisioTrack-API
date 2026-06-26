import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';

@ApiTags('reviews')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('reviews')
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}

  @Get('status')
  @ApiOperation({ summary: 'Get review eligibility status' })
  async getStatus(@Req() req: any) {
    return this.reviewsService.getStatus(req.user.id);
  }

  @Post()
  @ApiOperation({ summary: 'Submit a review' })
  async createReview(@Req() req: any, @Body() dto: CreateReviewDto) {
    return this.reviewsService.createReview(req.user.id, dto);
  }

  @Post('dismiss')
  @ApiOperation({ summary: 'Dismiss review prompt' })
  async dismissReview(@Req() req: any) {
    return this.reviewsService.dismissReview(req.user.id);
  }
}
