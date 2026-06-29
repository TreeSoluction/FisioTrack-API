import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createTestApp } from './test.helper';

describe('Billing (e2e)', () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    app = await createTestApp();

    await request(app.getHttpServer()).post('/auth/register').send({
      name: 'Test User',
      email: 'billing@test.com',
      password: 'password123',
    });

    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'billing@test.com', password: 'password123' });

    token = loginRes.body.access_token;
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /billing/checkout', () => {
    it('should return 503 when Stripe not configured', () => {
      return request(app.getHttpServer())
        .post('/billing/checkout')
        .set('Authorization', `Bearer ${token}`)
        .send({ interval: 'month' })
        .expect(503);
    });
  });

  describe('POST /billing/portal', () => {
    it('should return 503 when Stripe not configured', () => {
      return request(app.getHttpServer())
        .post('/billing/portal')
        .set('Authorization', `Bearer ${token}`)
        .expect(503);
    });
  });

  describe('POST /billing/cancel', () => {
    it('should return 503 when Stripe not configured', () => {
      return request(app.getHttpServer())
        .post('/billing/cancel')
        .set('Authorization', `Bearer ${token}`)
        .expect(503);
    });
  });

  describe('POST /billing/reactivate', () => {
    it('should return 503 when Stripe not configured', () => {
      return request(app.getHttpServer())
        .post('/billing/reactivate')
        .set('Authorization', `Bearer ${token}`)
        .expect(503);
    });
  });

  describe('GET /billing/subscription', () => {
    it('should require authentication', () => {
      return request(app.getHttpServer())
        .get('/billing/subscription')
        .expect(401);
    });

    it('should return subscription status when authenticated', () => {
      return request(app.getHttpServer())
        .get('/billing/subscription')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('plan');
        });
    });
  });

  describe('GET /billing/plans', () => {
    it('should return 404 (route removed)', () => {
      return request(app.getHttpServer()).get('/billing/plans').expect(404);
    });
  });
});
