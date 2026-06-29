import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createTestApp } from './test.helper';

describe('Consent (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;

  beforeAll(async () => {
    app = await createTestApp();

    await request(app.getHttpServer()).post('/auth/register').send({
      name: 'Consent Tester',
      email: 'consent@test.com',
      password: 'senha123',
    });

    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'consent@test.com', password: 'senha123' });

    accessToken = loginRes.body.access_token;
  });

  afterAll(async () => {
    await app.close();
  });

  const authHeader = () => ({ Authorization: `Bearer ${accessToken}` });

  describe('POST /consent', () => {
    it('records consent', () => {
      return request(app.getHttpServer())
        .post('/consent')
        .set(authHeader())
        .send({ documentType: 'PRIVACY_POLICY', documentVersion: '1.0' })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.documentType).toBe('PRIVACY_POLICY');
          expect(res.body.documentVersion).toBe('1.0');
        });
    });
  });

  describe('GET /consent/status', () => {
    it('returns consent status', () => {
      return request(app.getHttpServer())
        .get('/consent/status')
        .set(authHeader())
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('hasConsented');
          expect(typeof res.body.hasConsented).toBe('boolean');
          expect(res.body).toHaveProperty('missingDocuments');
          expect(Array.isArray(res.body.missingDocuments)).toBe(true);
        });
    });
  });

  describe('GET /consent/history', () => {
    it('returns consent history', () => {
      return request(app.getHttpServer())
        .get('/consent/history')
        .set(authHeader())
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBeGreaterThan(0);
          expect(res.body[0]).toHaveProperty('documentType');
        });
    });
  });

  describe('GET /consent/status without auth', () => {
    it('returns 401', () => {
      return request(app.getHttpServer()).get('/consent/status').expect(401);
    });
  });
});
