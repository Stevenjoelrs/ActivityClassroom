import { Router } from 'express';
import { getDatabaseStatus } from '../config/database.js';

const router = Router();
router.get('/', (req, res) => {
  res.json({ mensaje: 'API del sistema académico funcionando' });
});
router.get('/health', async (req, res) => {
  res.json({ api: { estado: 'disponible' }, database: await getDatabaseStatus() });
});
export default router;
