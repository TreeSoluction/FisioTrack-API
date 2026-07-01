export const SENSITIVE_FIELDS = ['cpf', 'medicalHistory', 'address', 'phone', 'email'];

// Time constants
export const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
export const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
export const FIFTEEN_MINUTES_MS = 15 * 60 * 1000;

// Rate limiting
export const RATE_LIMIT_GLOBAL = { ttl: 60000, limit: 100 };
export const RATE_LIMIT_AUTH = { ttl: 60000, limit: 5 };
export const RATE_LIMIT_REGISTER = { ttl: 60000, limit: 3 };

// Mercado Pago
export const MERCADO_PAGO_API_URL = 'https://api.mercadopago.com';
