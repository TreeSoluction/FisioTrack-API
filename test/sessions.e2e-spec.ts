import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createTestApp } from './test.helper';

describe('Sessions (e2e)', () => {
  let app: INestApplication;
  let jwtToken: string;
  let treatmentId: string;

  beforeAll(async () => {
    app = await createTestApp();

    await request(app.getHttpServer()).post('/auth/register').send({
      name: 'Session User',
      email: 'session-test@example.com',
      password: 'password123',
    });

    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'session-test@example.com', password: 'password123' });
    jwtToken = loginRes.body.access_token;

    await request(app.getHttpServer())
      .post('/consent')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ documentType: 'PRIVACY_POLICY', documentVersion: '1.0' });

    await request(app.getHttpServer())
      .post('/consent')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ documentType: 'TERMS_OF_USE', documentVersion: '1.0' });

    await request(app.getHttpServer())
      .post('/consent')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ documentType: 'CONSENT_TERMS', documentVersion: '1.0' });

    const patientRes = await request(app.getHttpServer())
      .post('/patients')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        name: 'Patient for Session',
        cpf: '55566677788',
        birthDate: '1992-07-25',
        phone: '11944443333',
      });

    const treatmentRes = await request(app.getHttpServer())
      .post('/treatments')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        patientId: patientRes.body.id,
        estimatedTime: '60min',
        exercises: 'Reabilitação completa',
        value: 250,
      });
    treatmentId = treatmentRes.body.id;
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /sessions/:treatmentId', () => {
    it('should create a session', () => {
      return request(app.getHttpServer())
        .post(`/sessions/${treatmentId}`)
        .set('Authorization', `Bearer ${jwtToken}`)
        .send({ painScale: 5, weight: 75.5, notes: 'Sessão inicial' })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.painScale).toBe(5);
        });
    });
  });

  describe('GET /sessions/treatment/:treatmentId', () => {
    it('should list sessions for treatment', () => {
      return request(app.getHttpServer())
        .get(`/sessions/treatment/${treatmentId}`)
        .set('Authorization', `Bearer ${jwtToken}`)
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
        });
    });
  });

  describe('DELETE /sessions/:id', () => {
    it('should delete session', async () => {
      const createRes = await request(app.getHttpServer())
        .post(`/sessions/${treatmentId}`)
        .set('Authorization', `Bearer ${jwtToken}`)
        .send({ painScale: 3, notes: 'Para deletar' });

      await request(app.getHttpServer())
        .delete(`/sessions/${createRes.body.id}`)
        .set('Authorization', `Bearer ${jwtToken}`)
        .expect(200);
    });
  });
});
