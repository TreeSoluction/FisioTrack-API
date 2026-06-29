import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createTestApp } from './test.helper';

describe('Treatments (e2e)', () => {
  let app: INestApplication;
  let jwtToken: string;
  let patientId: string;
  let treatmentId: string;

  beforeAll(async () => {
    app = await createTestApp();

    await request(app.getHttpServer()).post('/auth/register').send({
      name: 'Treatment User',
      email: 'treatment-test@example.com',
      password: 'password123',
    });

    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'treatment-test@example.com', password: 'password123' });
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
        name: 'Patient for Treatment',
        cpf: '11122233344',
        birthDate: '1988-03-10',
        phone: '11955554444',
      });
    patientId = patientRes.body.id;
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /treatments', () => {
    it('should create a treatment', async () => {
      const res = await request(app.getHttpServer())
        .post('/treatments')
        .set('Authorization', `Bearer ${jwtToken}`)
        .send({
          patientId,
          estimatedTime: '45min',
          exercises: 'Exercícios de fortalecimento',
          value: 150,
        })
        .expect(201);

      expect(res.body).toHaveProperty('id');
      expect(res.body.patientId).toBe(patientId);
      treatmentId = res.body.id;
    });
  });

  describe('GET /treatments', () => {
    it('should list treatments', async () => {
      const res = await request(app.getHttpServer())
        .get('/treatments')
        .set('Authorization', `Bearer ${jwtToken}`)
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  describe('GET /treatments/:id', () => {
    it('should get treatment by id', async () => {
      const res = await request(app.getHttpServer())
        .get(`/treatments/${treatmentId}`)
        .set('Authorization', `Bearer ${jwtToken}`)
        .expect(200);

      expect(res.body.id).toBe(treatmentId);
    });
  });

  describe('GET /treatments/patient/:patientId', () => {
    it('should get treatments by patient', async () => {
      const res = await request(app.getHttpServer())
        .get(`/treatments/patient/${patientId}`)
        .set('Authorization', `Bearer ${jwtToken}`)
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  describe('PUT /treatments/:id', () => {
    it('should update treatment', async () => {
      const res = await request(app.getHttpServer())
        .put(`/treatments/${treatmentId}`)
        .set('Authorization', `Bearer ${jwtToken}`)
        .send({ exercises: 'Exercícios atualizados', value: 200 })
        .expect(200);

      expect(res.body.exercises).toBe('Exercícios atualizados');
      expect(res.body.value).toBe(200);
    });
  });

  describe('DELETE /treatments/:id', () => {
    it('should delete treatment', async () => {
      const createRes = await request(app.getHttpServer())
        .post('/treatments')
        .set('Authorization', `Bearer ${jwtToken}`)
        .send({
          patientId,
          estimatedTime: '30min',
          exercises: 'Para deletar',
          value: 100,
        });
      const deleteId = createRes.body.id;

      await request(app.getHttpServer())
        .delete(`/treatments/${deleteId}`)
        .set('Authorization', `Bearer ${jwtToken}`)
        .expect(200);
    });
  });
});
