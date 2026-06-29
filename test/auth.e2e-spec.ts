import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createTestApp } from './test.helper';

describe('Auth (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createTestApp();
  });

  afterAll(async () => {
    await app.close();
  });

  const registerDto = {
    name: 'Dr. Teste',
    email: 'teste@fisio.com',
    password: 'senha123',
  };

  describe('POST /auth/register', () => {
    it('creates user and returns user data', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send(registerDto)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.name).toBe(registerDto.name);
          expect(res.body.email).toBe(registerDto.email);
        });
    });
  });

  describe('POST /auth/login', () => {
    it('returns access_token for valid credentials', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: registerDto.email, password: registerDto.password })
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('access_token');
          expect(typeof res.body.access_token).toBe('string');
          expect(res.body).toHaveProperty('user');
          expect(res.body.user.email).toBe(registerDto.email);
        });
    });

    it('returns 401 for invalid credentials', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: registerDto.email, password: 'wrongpassword' })
        .expect(401);
    });

    it('returns requiresConsent for new user', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: registerDto.email, password: registerDto.password })
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('requiresConsent');
          expect(res.body).toHaveProperty('missingDocuments');
        });
    });
  });
});
