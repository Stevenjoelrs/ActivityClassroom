import { Router } from 'express';
import { AppError } from '../../compartido/error.js';
import { almacen } from '../../compartido/datos-memoria.js';

if (!almacen.asientos) {
  almacen.asientos = new Map();
}
if (!almacen.asistencia) {
  almacen.asistencia = new Map();
}
if (!almacen.estudiantes) {
  almacen.estudiantes = [
    { id: 1, nombre: 'Ana Pérez', matricula: 'EST-202301' },
    { id: 2, nombre: 'Carlos Ruiz', matricula: 'EST-202302' },
    { id: 3, nombre: 'Beatriz Morales', matricula: 'EST-202303' },
    { id: 4, nombre: 'David Flores', matricula: 'EST-202304' },
    { id: 5, nombre: 'Elena Gómez', matricula: 'EST-202305' },
  ];
}

const router = Router();

// GET /api/estudiantes
router.get('/estudiantes', (req, res) => {
  res.json(almacen.estudiantes);
});

// POST /api/estudiantes
router.post('/estudiantes', (req, res) => {
  const nombre = req.body?.nombre?.trim();
  const matricula = req.body?.matricula?.trim() || null;
  if (!nombre) {
    throw new AppError('El nombre de estudiante es obligatorio', 400);
  }
  const id = almacen.estudiantes.length + 1;
  const nuevo = { id, nombre, matricula };
  almacen.estudiantes.push(nuevo);
  res.status(201).json(nuevo);
});

// GET /api/asientos
router.get('/asientos', (req, res) => {
  const lista = [];
  for (const [asiento, datos] of almacen.asientos.entries()) {
    lista.push({ asiento, ...datos });
  }
  lista.sort((a, b) => a.asiento - b.asiento);
  res.json(lista);
});

// PUT /api/asientos/:numero
router.put('/asientos/:numero', (req, res) => {
  const numero = Number(req.params.numero);
  if (!Number.isInteger(numero) || numero < 1 || numero > 50) {
    throw new AppError('El número de asiento debe estar entre 1 y 50', 400);
  }
  const estudianteId = Number(req.body?.estudianteId);
  const estudiante = almacen.estudiantes.find((e) => e.id === estudianteId);
  if (!estudiante) {
    throw new AppError('El estudiante seleccionado no existe', 400);
  }
  if (almacen.asientos.has(numero)) {
    throw new AppError('El asiento no está disponible.', 400);
  }
  const asignacion = {
    estudiante_id: estudiante.id,
    nombre: estudiante.nombre,
    matricula: estudiante.matricula,
  };
  almacen.asientos.set(numero, asignacion);
  res.status(201).json({ asiento: numero, ...asignacion });
});

// DELETE /api/asientos/:numero
router.delete('/asientos/:numero', (req, res) => {
  const numero = Number(req.params.numero);
  if (!almacen.asientos.has(numero)) {
    throw new AppError('El asiento no está ocupado', 404);
  }
  almacen.asientos.delete(numero);
  res.json({ asiento: numero, mensaje: 'Asiento liberado' });
});

// GET /api/asistencia?fecha=AAAA-MM-DD
router.get('/asistencia', (req, res) => {
  const fecha = req.query.fecha || new Date().toISOString().slice(0, 10);
  const resultado = almacen.estudiantes.map((est) => {
    const clave = `${est.id}_${fecha}`;
    const estado = almacen.asistencia.get(clave) || 'Ausente';
    return {
      estudiante_id: est.id,
      nombre: est.nombre,
      matricula: est.matricula,
      estado,
    };
  });
  res.json(resultado);
});

// PUT /api/asistencia/:estudianteId
router.put('/asistencia/:estudianteId', (req, res) => {
  const id = Number(req.params.estudianteId);
  const estado = req.body?.estado;
  const fecha = req.body?.fecha || new Date().toISOString().slice(0, 10);
  if (!['Presente', 'Ausente', 'Atrasado'].includes(estado)) {
    throw new AppError('El estado debe ser Presente, Ausente o Atrasado', 400);
  }
  const clave = `${id}_${fecha}`;
  almacen.asistencia.set(clave, estado);
  res.json({ estudiante_id: id, fecha, estado });
});

export default router;
