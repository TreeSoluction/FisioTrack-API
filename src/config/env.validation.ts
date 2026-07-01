import { plainToInstance } from 'class-transformer';
import {
  IsString,
  IsOptional,
  validateSync,
  MinLength,
  Matches,
} from 'class-validator';

class EnvironmentVariables {
  @IsString()
  DATABASE_URL: string;

  @IsString()
  @MinLength(32, { message: 'JWT_SECRET must be at least 32 characters' })
  JWT_SECRET: string;

  @IsString()
  @Matches(/^[a-f0-9]{64}$/, {
    message: 'ENCRYPTION_KEY must be a 64-character hex string',
  })
  ENCRYPTION_KEY: string;

  @IsOptional()
  @IsString()
  ENCRYPTION_ENABLED?: string;

  @IsOptional()
  @IsString()
  MP_ACCESS_TOKEN?: string;

  @IsOptional()
  @IsString()
  MP_WEBHOOK_SECRET?: string;

  @IsOptional()
  @IsString()
  SMTP_HOST?: string;

  @IsOptional()
  @IsString()
  SMTP_PORT?: string;

  @IsOptional()
  @IsString()
  SMTP_USER?: string;

  @IsOptional()
  @IsString()
  SMTP_PASS?: string;

  @IsOptional()
  @IsString()
  SMTP_FROM?: string;

  @IsOptional()
  @IsString()
  CORS_ORIGINS?: string;

  @IsOptional()
  @IsString()
  FRONTEND_URL?: string;

  @IsOptional()
  @IsString()
  API_URL?: string;

  @IsOptional()
  @IsString()
  PORT?: string;

  @IsOptional()
  @IsString()
  NODE_ENV?: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    const messages = errors
      .flatMap((err) => Object.values(err.constraints || {}))
      .join('\n');
    throw new Error(`Environment validation failed:\n${messages}`);
  }

  return validatedConfig;
}
