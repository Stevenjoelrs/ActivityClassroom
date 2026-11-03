import app from './app.js';
import { config } from './config/env.js';
import { pool } from './config/database.js';
import { almacen } from './compartido/datos-memoria.js';
import { poblarDatosIniciales } from './compartido/semillas.js';

// Poblar almacén con datos de demostración y prueba
poblarDatosIniciales(almacen);

const server = app.listen(config.port, '127.0.0.1', () => {
  console.log(`Sistema académico: http://127.0.0.1:${config.port}/api`);
});
server.on('error', (error) => {
  console.error(error.code === 'EADDRINUSE'
    ? `El puerto ${config.port} está ocupado. Cambia PORT en backend/.env.`
    : `No se pudo iniciar el servidor: ${error.code}`);
  process.exitCode = 1;
});
function shutdown() {
  server.close(async () => {
    await pool?.end();
  });
}
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
