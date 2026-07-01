import { BadRequestException } from '@nestjs/common';
import { ParseCuidPipe } from './parse-cuid.pipe';

describe('ParseCuidPipe', () => {
  let pipe: ParseCuidPipe;

  beforeEach(() => {
    pipe = new ParseCuidPipe();
  });

  it('should be defined', () => {
    expect(pipe).toBeDefined();
  });

  describe('valid CUIDs', () => {
    it('should accept a valid 25-char lowercase alphanumeric CUID', () => {
      const validCuid = 'clx12345678901234567890ab';
      expect(pipe.transform(validCuid)).toBe(validCuid);
    });

    it('should accept another valid CUID', () => {
      const validCuid = 'abcdefghijklmnopqrstuvwxyz012345';
      // Too long - 32 chars
      expect(() => pipe.transform(validCuid)).toThrow(BadRequestException);
    });

    it('should accept CUID with only lowercase and digits', () => {
      const validCuid = 'a1b2c3d4e5f6g7h8i9j0k1l2m';
      expect(pipe.transform(validCuid)).toBe(validCuid);
    });
  });

  describe('invalid CUIDs', () => {
    it('should reject empty string', () => {
      expect(() => pipe.transform('')).toThrow(BadRequestException);
    });

    it('should reject string with uppercase letters', () => {
      expect(() => pipe.transform('Clx12345678901234567890ab')).toThrow(BadRequestException);
    });

    it('should reject string with special characters', () => {
      expect(() => pipe.transform('clx12345678901234567890!b')).toThrow(BadRequestException);
    });

    it('should reject string too short (24 chars)', () => {
      expect(() => pipe.transform('clx12345678901234567890a')).toThrow(BadRequestException);
    });

    it('should reject string too long (26 chars)', () => {
      expect(() => pipe.transform('clx12345678901234567890abc')).toThrow(BadRequestException);
    });

    it('should reject UUID format', () => {
      expect(() => pipe.transform('550e8400-e29b-41d4-a716-446655440000')).toThrow(BadRequestException);
    });

    it('should reject string with spaces', () => {
      expect(() => pipe.transform('clx1 2345678901234567890a')).toThrow(BadRequestException);
    });
  });

  describe('error message', () => {
    it('should include the invalid value in error message', () => {
      try {
        pipe.transform('invalid-id');
        fail('Should have thrown');
      } catch (error) {
        expect(error.message).toContain('invalid-id');
        expect(error.message).toContain('Invalid ID format');
      }
    });
  });
});
