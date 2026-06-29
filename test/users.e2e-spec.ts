import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createTestApp } from './test.helper';

describe('Users (e2e)', () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    app = await createTestApp();

    await request(app.getHttpServer()).post('/auth/register').send({
      name: 'Test User',
      email: 'users@test.com',
      password: 'password123',
    });

    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'users@test.com', password: 'password123' });

    token = loginRes.body.access_token;
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /users/me', () => {
    it('should return user profile', () => {
      return request(app.getHttpServer())
        .get('/users/me')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body).toHaveProperty('name');
          expect(res.body).toHaveProperty('email');
        });
    });

    it('should return 401 without JWT', () => {
      return request(app.getHttpServer()).get('/users/me').expect(401);
    });
  });

  describe('PUT /users/me', () => {
    it('should update user profile', () => {
      return request(app.getHttpServer())
        .put('/users/me')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Updated Name' })
        .expect(200)
        .expect((res) => {
          expect(res.body.name).toBe('Updated Name');
        });
    });
  });

  describe('DELETE /users/me', () => {
    it('should delete account', async () => {
      await request(app.getHttpServer()).post('/auth/register').send({
        name: 'Delete User',
        email: 'delete@test.com',
        password: 'password123',
      });

      const loginRes = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'delete@test.com', password: 'password123' });

      const deleteToken = loginRes.body.access_token;

      return request(app.getHttpServer())
        .delete('/users/me')
        .set('Authorization', `Bearer ${deleteToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.message).toBe('Account deleted successfully');
        });
    });
  });
});
