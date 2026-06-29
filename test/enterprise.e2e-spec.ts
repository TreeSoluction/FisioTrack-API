import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createTestApp } from './test.helper';

describe('Enterprise (e2e)', () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    app = await createTestApp();

    await request(app.getHttpServer()).post('/auth/register').send({
      name: 'Enterprise User',
      email: 'enterprise@test.com',
      password: 'password123',
    });

    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'enterprise@test.com', password: 'password123' });

    token = loginRes.body.access_token;
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /enterprise/request', () => {
    it('should create enterprise request', () => {
      return request(app.getHttpServer())
        .post('/enterprise/request')
        .set('Authorization', `Bearer ${token}`)
        .send({
          companyName: 'Test Corp',
          teamSize: 10,
          phone: '11999990000',
          message: 'Need multi-user access',
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.companyName).toBe('Test Corp');
          expect(res.body.status).toBe('PENDING');
        });
    });

    it('should return 409 for duplicate request', () => {
      return request(app.getHttpServer())
        .post('/enterprise/request')
        .set('Authorization', `Bearer ${token}`)
        .send({
          companyName: 'Test Corp 2',
          teamSize: 5,
          phone: '11999990000',
        })
        .expect(409);
    });
  });

  describe('GET /enterprise/status', () => {
    it('should return request status', () => {
      return request(app.getHttpServer())
        .get('/enterprise/status')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('status', 'PENDING');
          expect(res.body.companyName).toBe('Test Corp');
        });
    });

    it('should return empty response when no request', async () => {
      await request(app.getHttpServer()).post('/auth/register').send({
        name: 'No Enterprise',
        email: 'no-enterprise@test.com',
        password: 'password123',
      });

      const loginRes = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'no-enterprise@test.com', password: 'password123' });

      const res = await request(app.getHttpServer())
        .get('/enterprise/status')
        .set('Authorization', `Bearer ${loginRes.body.access_token}`)
        .expect(200);

      expect(!res.body || Object.keys(res.body).length === 0).toBe(true);
    });
  });
});
