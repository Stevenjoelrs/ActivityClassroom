import { Router } from 'express';
import { AppError } from '../../compartido/error.js';
import { almacen } from '../../compartido/datos-memoria.js';

if (!almacen.materias) {
  almacen.materias = [
    { id: 1, nombre: 'Sistemas de Información 2' },
    { id: 2, nombre: 'Base de Datos 2' },
    { id: 3, nombre: 'Ingeniería de Software' },
    { id: 4, nombre: 'Taller de Grado' },
  ];
}
if (!almacen.apuntes) {
  almacen.apuntes = [
    {
      id: 1,
      estudiante_id: 1,
      materia_id: 1,
      materia: 'Sistemas de Información 2',
      titulo: 'Arquitectura Limpia y TDD',
      contenido: 'Separación estricta de responsabilidades, ciclo Red-Green-Refactor.',
      fecha_creacion: '2026-11-01T10:00:00.000Z',
      fecha_modificacion: null,
    },
    {
      id: 2,
      estudiante_id: 1,
      materia_id: 2,
      materia: 'Base de Datos 2',
      titulo: 'Normalización e Índices',
      contenido: 'Formas normales 1FN, 2FN, 3FN y optimización de consultas.',
      fecha_creacion: '2026-11-02T14:30:00.000Z',
      fecha_modificacion: null,
    },
  ];
}

const router = Router();

function leerEstudianteId(req) {
  const header = req.get('x-estudiante-id');
  const id = Number(header);
  if (!Number.isInteger(id) || id <= 0) {
    throw new AppError('Debes seleccionar un estudiante', 400);
  }
  return id;
}

// GET /api/materias
router.get('/materias', (req, res) => {
  res.json(almacen.materias);
});

// POST /api/materias
router.post('/materias', (req, res) => {
  const nombre = req.body?.nombre?.trim();
  if (!nombre) {
    throw new AppError('El nombre de la materia es obligatorio', 400);
  }
  const id = almacen.materias.length + 1;
  const nueva = { id, nombre };
  almacen.materias.push(nueva);
  res.status(201).json(nueva);
});

// GET /api/apuntes
router.get('/apuntes', (req, res) => {
  const estudianteId = leerEstudianteId(req);
  const notas = almacen.apuntes
    .filter((a) => a.estudiante_id === estudianteId)
    .sort((a, b) => new Date(b.fecha_creacion) - new Date(a.fecha_creacion));
  res.json(notas);
});

// GET /api/apuntes/:id
router.get('/apuntes/:id', (req, res) => {
  const estudianteId = leerEstudianteId(req);
  const noteId = Number(req.params.id);
  const apunte = almacen.apuntes.find((a) => a.id === noteId);
  if (!apunte) {
    throw new AppError('Apunte no encontrado', 404);
  }
  if (apunte.estudiante_id !== estudianteId) {
    throw new AppError('No puedes acceder a apuntes de otro estudiante', 403);
  }
  res.json(apunte);
});

// POST /api/apuntes
router.post('/apuntes', (req, res) => {
  const estudianteId = leerEstudianteId(req);
  const { titulo, contenido, idMateria } = req.body || {};
  if (!titulo || typeof titulo !== 'string' || !titulo.trim()) {
    throw new AppError('El título es obligatorio', 400);
  }
  if (!contenido || typeof contenido !== 'string' || !contenido.trim()) {
    throw new AppError('El contenido es obligatorio', 400);
  }
  const materiaId = Number(idMateria);
  const materia = almacen.materias.find((m) => m.id === materiaId);
  if (!materia) {
    throw new AppError('La materia seleccionada no existe', 400);
  }

  const id = almacen.apuntes.length + 1;
  const nuevo = {
    id,
    estudiante_id: estudianteId,
    materia_id: materiaId,
    materia: materia.nombre,
    titulo: titulo.trim(),
    contenido: contenido.trim(),
    fecha_creacion: new Date().toISOString(),
    fecha_modificacion: null,
  };
  almacen.apuntes.push(nuevo);
  res.status(201).json(nuevo);
});

// PUT /api/apuntes/:id
router.put('/apuntes/:id', (req, res) => {
  const estudianteId = leerEstudianteId(req);
  const noteId = Number(req.params.id);
  const apunte = almacen.apuntes.find((a) => a.id === noteId);
  if (!apunte) {
    throw new AppError('Apunte no encontrado', 404);
  }
  if (apunte.estudiante_id !== estudianteId) {
    throw new AppError('No puedes acceder a apuntes de otro estudiante', 403);
  }

  const { titulo, contenido, idMateria } = req.body || {};
  if (titulo !== undefined) {
    if (typeof titulo !== 'string' || !titulo.trim()) {
      throw new AppError('El título es obligatorio', 400);
    }
    apunte.titulo = titulo.trim();
  }
  if (contenido !== undefined) {
    if (typeof contenido !== 'string' || !contenido.trim()) {
      throw new AppError('El contenido es obligatorio', 400);
    }
    apunte.contenido = contenido.trim();
  }
  if (idMateria !== undefined) {
    const materiaId = Number(idMateria);
    const materia = almacen.materias.find((m) => m.id === materiaId);
    if (!materia) {
      throw new AppError('La materia seleccionada no existe', 400);
    }
    apunte.materia_id = materiaId;
    apunte.materia = materia.nombre;
  }
  apunte.fecha_modificacion = new Date().toISOString();
  res.json(apunte);
});

// DELETE /api/apuntes/:id
router.delete('/api/apuntes/:id', (req, res) => {
  const estudianteId = leerEstudianteId(req);
  const noteId = Number(req.params.id);
  if (req.query.confirmar !== 'true') {
    throw new AppError('Se requiere confirmar=true para eliminar el apunte', 400);
  }
  const index = almacen.apuntes.findIndex((a) => a.id === noteId);
  if (index === -1) {
    throw new AppError('Apunte no encontrado', 404);
  }
  if (almacen.apuntes[index].estudiante_id !== estudianteId) {
    throw new AppError('No puedes acceder a apuntes de otro estudiante', 403);
  }
  almacen.apuntes.splice(index, 1);
  res.json({ mensaje: 'Apunte eliminado exitosamente', id: noteId });
});

export default router;
