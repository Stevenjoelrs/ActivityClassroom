import pg from 'pg';
import { config } from './env.js';

export const pool = config.databaseUrl ? new pg.Pool({
  connectionString: config.databaseUrl,
  connectionTimeoutMillis: 2000,
  query_timeout: 2000,
  max: 5,
}) : null;

pool?.on('error', () => {
  console.error('Se perdió una conexión inactiva con PostgreSQL');
});

export async function getDatabaseStatus() {
  if (!pool) return { estado: 'sin_configurar' };
  try {
    await pool.query('SELECT 1');
    return { estado: 'disponible' };
  } catch {
    return { estado: 'no_disponible' };
  }
}
