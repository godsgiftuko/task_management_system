import {
  IsBoolean,
  IsIn,
  IsNumber,
  IsString,
  validateSync,
} from 'class-validator';
import { config } from 'dotenv';
import { plainToClass } from 'class-transformer';
import { Logger } from '@nestjs/common';

const logger = new Logger('EnvConfig');
const NODE_ENVS = ['development', 'production', 'staging', 'test'] as const;
type NODE_ENV = (typeof NODE_ENVS)[number];

export class EnvConfig {
  // DATABASE
  @IsBoolean()
  USE_SQLITE: boolean;

  @IsString()
  DATABASE_DIALECT: string;

  @IsString()
  DATABASE_USER: string;

  @IsString()
  DATABASE_HOST: string;

  @IsNumber()
  DATABASE_PORT: number;

  @IsString()
  DATABASE_PASSWORD: string;

  @IsString()
  DATABASE_NAME: string;

  @IsBoolean()
  USE_DATABASE_LOG: boolean = true;

  // SERVER
  @IsIn(NODE_ENVS)
  NODE_ENV: NODE_ENV;

  @IsString()
  SERVER_NAME: string;

  @IsNumber()
  SERVER_PORT: number;

  // JWT
  @IsString()
  JWT_SECRET: string;

  // OTHERS
  @IsString()
  API_VERSION: string;

  static getDefaultObject(): EnvConfig {
    const obj = new EnvConfig();

    // DATABASE
    (obj.USE_SQLITE = Boolean(process.env.USE_SQLITE || true)),
    (obj.DATABASE_DIALECT = process.env.DATABASE_DIALECT || 'mysql'),
      (obj.DATABASE_USER = process.env.DATABASE_USER),
      (obj.DATABASE_HOST = process.env.DATABASE_HOST),
      (obj.DATABASE_PORT = +process.env.DATABASE_PORT || 3306),
      (obj.DATABASE_PASSWORD = process.env.DATABASE_PASSWORD),
      (obj.DATABASE_NAME = process.env.DATABASE_NAME),
      (obj.USE_DATABASE_LOG = Boolean(process.env.USE_DATABASE_LOG)),
      // SERVER
      (obj.NODE_ENV = (process.env.NODE_ENV as NODE_ENV) || 'development'),
      (obj.SERVER_NAME = process.env.SERVER_NAME || 'Task Management System'),
      (obj.SERVER_PORT = +process.env.SERVER_PORT || 8000);
    // JWT
    obj.JWT_SECRET = process.env.JWT_SECRET || 'JWT_SECRET';
    // OTHERS
    obj.API_VERSION = 'api/v1';

    return obj;
  }
}

config();

const configs = plainToClass(
  EnvConfig,
  { ...EnvConfig.getDefaultObject(), ...process.env },
  { enableImplicitConversion: true },
);

const errors = validateSync(configs, { whitelist: true });

if (errors.length > 0) {
  logger.error(JSON.stringify(errors, undefined, '  '));
  throw new Error('Invalid env variables.');
}

export { configs };
