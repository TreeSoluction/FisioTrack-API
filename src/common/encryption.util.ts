import * as crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;
const TAG_LENGTH = 16;

function getKey(): Buffer {
  const keyHex = process.env.ENCRYPTION_KEY;
  if (!keyHex || keyHex.length < 64) {
    throw new Error(
      'ENCRYPTION_KEY env var must be a 32-byte hex string (64 chars)',
    );
  }
  return Buffer.from(keyHex, 'hex');
}

export function encrypt(text: string): string {
  const key = getKey();
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  const tag = cipher.getAuthTag();

  return `${iv.toString('hex')}:${tag.toString('hex')}:${encrypted}`;
}

export function decrypt(ciphertext: string): string {
  const key = getKey();
  const [ivHex, tagHex, encrypted] = ciphertext.split(':');

  const iv = Buffer.from(ivHex, 'hex');
  const tag = Buffer.from(tagHex, 'hex');
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(tag);

  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}

export function encryptPatientFields<T extends Record<string, any>>(
  data: T,
  fields: string[],
): T {
  const result = { ...data } as Record<string, any>;
  for (const field of fields) {
    if (result[field] && typeof result[field] === 'string') {
      result[field] = encrypt(result[field]);
    }
  }
  return result as T;
}

export function decryptPatientFields<T extends Record<string, any>>(
  data: T,
  fields: string[],
): T {
  const result = { ...data } as Record<string, any>;
  for (const field of fields) {
    if (result[field] && typeof result[field] === 'string') {
      try {
        result[field] = decrypt(result[field]);
      } catch {
        // Field may not be encrypted yet
      }
    }
  }
  return result as T;
}
