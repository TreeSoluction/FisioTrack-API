import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createTestApp } from './test.helper';

describe('Reviews (e2e)', () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    app = await createTestApp();

    await request(app.getHttpServer()).post('/auth/register').send({
      name: 'Review User',
      email: 'review@test.com',
      password: 'password123',
    });

    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'review@test.com', password: 'password123' });

    token = loginRes.body.access_token;
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /reviews/status', () => {
    it('should return review status', () => {
      return request(app.getHttpServer())
        .get('/reviews/status')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('canReview');
          expect(res.body).toHaveProperty('hasReviewed');
          expect(res.body).toHaveProperty('accountAgeDays');
        });
    });

    it('should return 401 without JWT', () => {
      return request(app.getHttpServer()).get('/reviews/status').expect(401);
    });
  });

  describe('POST /reviews', () => {
    it('should return 403 for new account (not eligible)', () => {
      return request(app.getHttpServer())
        .post('/reviews')
        .set('Authorization', `Bearer ${token}`)
        .send({ rating: 5, comment: 'Great app!' })
        .expect(403);
    });
  });

  describe('POST /reviews/dismiss', () => {
    it('should dismiss review', () => {
      return request(app.getHttpServer())
        .post('/reviews/dismiss')
        .set('Authorization', `Bearer ${token}`)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('dismissedAt');
        });
    });
  });
});
