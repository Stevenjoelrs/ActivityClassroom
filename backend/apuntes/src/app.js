const path = require('node:path');
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });
const express = require('express');
const ApunteRepository = require('./repositories/apunteRepository');
const { ApunteService } = require('./services/apunteService');
const crearRutas = require('./routes/apunteRoutes');

const app = express();
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../../../public')));

const servicio = new ApunteService(new ApunteRepository());
app.use('/api', crearRutas(servicio));

app.use((err, req, res, next) => {
  if (err.estado) {
    return res.status(err.estado).json({ error: err.message });
  }
  if (err.code === '23503') {
    return res.status(400).json({ error: 'La materia o el estudiante indicado no existe' });
  }
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));