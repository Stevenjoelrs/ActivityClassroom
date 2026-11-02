import express from 'express';
import cors from 'cors';
import { config } from './config/env.js';
import statusRoutes from './routes/status.routes.js';

const app = express();
app.use(cors({ origin: config.frontendOrigin }));
app.use(express.json());
app.use('/api', statusRoutes);
app.use((req, res) => res.status(404).json({ mensaje: 'Ruta no encontrada' }));
app.use((error, req, res, next) => {
  const status = error.status === 400 ? 400 : 500;
  res.status(status).json({ mensaje: status === 400 ? 'JSON inválido' : 'Error interno del servidor' });
});
export default app;
