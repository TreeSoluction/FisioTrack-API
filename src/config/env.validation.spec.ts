import 'reflect-metadata';
import { validate } from './env.validation';

describe('Environment Validation', () => {
  const validEnv = {
    DATABASE_URL: 'postgresql://user:pass@localhost:5432/fisiotrack',
    JWT_SECRET: 'a'.repeat(32),
    ENCRYPTION_KEY: 'a'.repeat(64),
  };

  it('should return validated config when all required vars are present', () => {
    const result = validate(validEnv);
    expect(result.DATABASE_URL).toBe(validEnv.DATABASE_URL);
    expect(result.JWT_SECRET).toBe(validEnv.JWT_SECRET);
    expect(result.ENCRYPTION_KEY).toBe(validEnv.ENCRYPTION_KEY);
  });

  it('should accept optional vars', () => {
    const env = {
      ...validEnv,
      MP_ACCESS_TOKEN: 'test-token',
      PORT: '3000',
      NODE_ENV: 'development',
    };
    const result = validate(env);
    expect(result.MP_ACCESS_TOKEN).toBe('test-token');
    expect(result.PORT).toBe('3000');
  });

  describe('missing required vars', () => {
    it('should throw when DATABASE_URL is missing', () => {
      expect(() => validate({
        JWT_SECRET: 'a'.repeat(32),
        ENCRYPTION_KEY: 'a'.repeat(64),
      })).toThrow('DATABASE_URL');
    });

    it('should throw when JWT_SECRET is missing', () => {
      expect(() => validate({
        DATABASE_URL: 'postgresql://localhost/db',
        ENCRYPTION_KEY: 'a'.repeat(64),
      })).toThrow('JWT_SECRET');
    });

    it('should throw when ENCRYPTION_KEY is missing', () => {
      expect(() => validate({
        DATABASE_URL: 'postgresql://localhost/db',
        JWT_SECRET: 'a'.repeat(32),
      })).toThrow('ENCRYPTION_KEY');
    });
  });

  describe('invalid formats', () => {
    it('should throw when JWT_SECRET is too short', () => {
      expect(() => validate({
        ...validEnv,
        JWT_SECRET: 'short',
      })).toThrow('at least 32 characters');
    });

    it('should throw when ENCRYPTION_KEY is not 64 hex chars', () => {
      expect(() => validate({
        ...validEnv,
        ENCRYPTION_KEY: 'not-hex',
      })).toThrow('64-character hex string');
    });

    it('should throw when ENCRYPTION_KEY has uppercase hex', () => {
      expect(() => validate({
        ...validEnv,
        ENCRYPTION_KEY: 'A'.repeat(64),
      })).toThrow('64-character hex string');
    });
  });
});
