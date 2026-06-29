import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createTestApp } from './test.helper';

describe('Patients (e2e)', () => {
  let app: INestApplication;
  let jwtToken: string;
  let patientId: string;

  beforeAll(async () => {
    app = await createTestApp();

    await request(app.getHttpServer()).post('/auth/register').send({
      name: 'Test User',
      email: 'patient-test@example.com',
      password: 'password123',
    });

    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'patient-test@example.com', password: 'password123' });
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
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /patients', () => {
    it('should create a patient', async () => {
      const res = await request(app.getHttpServer())
        .post('/patients')
        .set('Authorization', `Bearer ${jwtToken}`)
        .send({
          name: 'João Silva',
          cpf: '12345678901',
          birthDate: '1990-01-15',
          phone: '11999998888',
          email: 'joao@example.com',
          address: 'Rua A, 123',
        })
        .expect(201);

      expect(res.body).toHaveProperty('id');
      expect(res.body.name).toBe('João Silva');
      expect(res.body.cpf).toBe('12345678901');
      patientId = res.body.id;
    });

    it('should return 401 without JWT', async () => {
      await request(app.getHttpServer())
        .post('/patients')
        .send({
          name: 'Unauthorized',
          cpf: '00000000000',
          birthDate: '2000-01-01',
          phone: '11888887777',
        })
        .expect(401);
    });
  });

  describe('GET /patients', () => {
    it('should list patients', async () => {
      const res = await request(app.getHttpServer())
        .get('/patients')
        .set('Authorization', `Bearer ${jwtToken}`)
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  describe('GET /patients/:id', () => {
    it('should get patient by id', async () => {
      const res = await request(app.getHttpServer())
        .get(`/patients/${patientId}`)
        .set('Authorization', `Bearer ${jwtToken}`)
        .expect(200);

      expect(res.body.id).toBe(patientId);
      expect(res.body.name).toBe('João Silva');
    });
  });

  describe('PUT /patients/:id', () => {
    it('should update patient', async () => {
      const res = await request(app.getHttpServer())
        .put(`/patients/${patientId}`)
        .set('Authorization', `Bearer ${jwtToken}`)
        .send({ name: 'João Silva Santos', phone: '11988887777' })
        .expect(200);

      expect(res.body.name).toBe('João Silva Santos');
      expect(res.body.phone).toBe('11988887777');
    });
  });

  describe('DELETE /patients/:id', () => {
    it('should delete patient', async () => {
      const createRes = await request(app.getHttpServer())
        .post('/patients')
        .set('Authorization', `Bearer ${jwtToken}`)
        .send({
          name: 'To Delete',
          cpf: '99999999999',
          birthDate: '1985-05-20',
          phone: '11777776666',
        });
      const deleteId = createRes.body.id;

      await request(app.getHttpServer())
        .delete(`/patients/${deleteId}`)
        .set('Authorization', `Bearer ${jwtToken}`)
        .expect(200);
    });
  });
});
