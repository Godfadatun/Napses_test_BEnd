import dotenv from 'dotenv';
import logger from './logger';

dotenv.config();

function throwIfUndefined(secret: string): string {
  if (!process.env[secret]) {
    logger.error(`Please set ${secret} environment variable`);
    process.exit(1);
  }
  return process.env[secret] as string;
}

export const PORT = throwIfUndefined('PORT');
export const SWAPI_BASE_URL = throwIfUndefined('SWAPI_BASE_URL');
export const DB_NAME = throwIfUndefined('DB_NAME');
export const DB_HOST = throwIfUndefined('DB_HOST');
export const DB_USERNAME = throwIfUndefined('DB_USERNAME');
export const DB_PORT = throwIfUndefined('DB_PORT');
