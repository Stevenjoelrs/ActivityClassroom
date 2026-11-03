import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';

dotenv.config({ path: fileURLToPath(new URL('../../.env', import.meta.url)), quiet: true });

const port = Number(process.env.PORT || 3000);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('PORT debe ser un entero entre 1 y 65535');
}

const configuredOrigins = process.env.FRONTEND_ORIGIN
  ? process.env.FRONTEND_ORIGIN.split(',').map(s => s.trim())
  : ['http://127.0.0.1:5173', 'http://localhost:5173'];

const allowedOrigins = Array.from(new Set([
  ...configuredOrigins,
  'http://127.0.0.1:5173',
  'http://localhost:5173',
]));

export const config = {
  institutionalDomain: process.env.INSTITUTIONAL_DOMAIN || 'est.umss.edu',
  port,
  frontendOrigin: allowedOrigins.length === 1 ? allowedOrigins[0] : allowedOrigins,
  databaseUrl: process.env.DATABASE_URL,
};
