import {
  encrypt,
  decrypt,
  encryptPatientFields,
  decryptPatientFields,
} from './encryption.util';

const ORIGINAL_KEY = process.env.ENCRYPTION_KEY;

beforeAll(() => {
  process.env.ENCRYPTION_KEY =
    '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';
});

afterAll(() => {
  if (ORIGINAL_KEY) {
    process.env.ENCRYPTION_KEY = ORIGINAL_KEY;
  } else {
    delete process.env.ENCRYPTION_KEY;
  }
});

describe('encryption.util', () => {
  describe('encrypt/decrypt roundtrip', () => {
    it('should encrypt and decrypt a string correctly', () => {
      const plaintext = 'João Silva';
      const encrypted = encrypt(plaintext);
      expect(encrypted).not.toBe(plaintext);
      expect(encrypted).toMatch(/^[0-9a-f]+:[0-9a-f]+:[0-9a-f]+$/);
      const decrypted = decrypt(encrypted);
      expect(decrypted).toBe(plaintext);
    });

    it('should produce different ciphertext for same plaintext (random IV)', () => {
      const plaintext = 'test data';
      const enc1 = encrypt(plaintext);
      const enc2 = encrypt(plaintext);
      expect(enc1).not.toBe(enc2);
      expect(decrypt(enc1)).toBe(plaintext);
      expect(decrypt(decrypt(enc1) ? enc2 : enc1)).toBe(plaintext);
    });

    it('should handle empty string', () => {
      const encrypted = encrypt('');
      const decrypted = decrypt(encrypted);
      expect(decrypted).toBe('');
    });

    it('should handle unicode characters', () => {
      const plaintext = '端子治療 Ñoño café';
      const encrypted = encrypt(plaintext);
      expect(decrypt(encrypted)).toBe(plaintext);
    });

    it('should throw on tampered ciphertext', () => {
      const encrypted = encrypt('secret');
      const parts = encrypted.split(':');
      parts[2] = '0000' + parts[2].slice(4);
      expect(() => decrypt(parts.join(':'))).toThrow();
    });
  });

  describe('encryptPatientFields', () => {
    it('should encrypt specified fields', () => {
      const data = { name: 'João', cpf: '12345678900', phone: '11999990000' };
      const result = encryptPatientFields(data, ['cpf', 'phone']);
      expect(result.name).toBe('João');
      expect(result.cpf).not.toBe('12345678900');
      expect(result.phone).not.toBe('11999990000');
    });

    it('should not encrypt fields not in the list', () => {
      const data = { name: 'João', cpf: '12345678900' };
      const result = encryptPatientFields(data, ['cpf']);
      expect(result.name).toBe('João');
      expect(result.cpf).not.toBe('12345678900');
    });

    it('should skip null/undefined fields', () => {
      const data = { cpf: '123', address: null, medicalHistory: undefined };
      const result = encryptPatientFields(data, [
        'cpf',
        'address',
        'medicalHistory',
      ]);
      expect(result.cpf).not.toBe('123');
      expect(result.address).toBeNull();
      expect(result.medicalHistory).toBeUndefined();
    });

    it('should not modify the original object', () => {
      const data = { cpf: '12345678900' };
      encryptPatientFields(data, ['cpf']);
      expect(data.cpf).toBe('12345678900');
    });
  });

  describe('decryptPatientFields', () => {
    it('should decrypt encrypted fields', () => {
      const original = { cpf: '12345678900', name: 'João' };
      const encrypted = encryptPatientFields(original, ['cpf']);
      const decrypted = decryptPatientFields(encrypted, ['cpf']);
      expect(decrypted.cpf).toBe('12345678900');
      expect(decrypted.name).toBe('João');
    });

    it('should handle fields that are not encrypted (graceful fallback)', () => {
      const data = { cpf: 'plaintext-cpf', name: 'João' };
      const result = decryptPatientFields(data, ['cpf']);
      expect(result.cpf).toBe('plaintext-cpf');
    });

    it('should not modify the original object', () => {
      const original = { cpf: '12345678900' };
      const encrypted = encryptPatientFields(original, ['cpf']);
      decryptPatientFields(encrypted, ['cpf']);
      expect(encrypted.cpf).not.toBe('12345678900');
    });
  });

  describe('getKey errors', () => {
    it('should throw when ENCRYPTION_KEY is missing', () => {
      const original = process.env.ENCRYPTION_KEY;
      delete process.env.ENCRYPTION_KEY;
      // Reset cached key by re-importing
      jest.resetModules();
      const { encrypt: freshEncrypt } = require('./encryption.util');
      expect(() => freshEncrypt('test')).toThrow(
        'ENCRYPTION_KEY env var must be a 32-byte hex string',
      );
      process.env.ENCRYPTION_KEY = original;
    });

    it('should throw when ENCRYPTION_KEY is too short', () => {
      const original = process.env.ENCRYPTION_KEY;
      process.env.ENCRYPTION_KEY = 'short';
      jest.resetModules();
      const { encrypt: freshEncrypt } = require('./encryption.util');
      expect(() => freshEncrypt('test')).toThrow(
        'ENCRYPTION_KEY env var must be a 32-byte hex string',
      );
      process.env.ENCRYPTION_KEY = original;
    });
  });
});
