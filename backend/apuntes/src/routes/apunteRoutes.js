const express = require('express');
const { ErrorNegocio } = require('../services/apunteService');

function crearRutas(servicio) {
  const router = express.Router();

  const leerEstudiante = (req) => {
    const id = Number(req.get('x-estudiante-id'));
    if (!Number.isInteger(id) || id <= 0) {
      throw new ErrorNegocio('Debes seleccionar un estudiante', 400);
    }
    return id;
  };

  const manejar = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res)).catch(next);

  router.get('/estudiantes', manejar(async (req, res) => {
    res.json(await servicio.listarEstudiantes());
  }));

  router.get('/materias', manejar(async (req, res) => {
    res.json(await servicio.listarMaterias());
  }));

  router.get('/apuntes', manejar(async (req, res) => {
    res.json(await servicio.listar(leerEstudiante(req)));
  }));

  router.get('/apuntes/:id', manejar(async (req, res) => {
    res.json(await servicio.obtener(Number(req.params.id), leerEstudiante(req)));
  }));

  router.post('/apuntes', manejar(async (req, res) => {
    const apunte = await servicio.crear(leerEstudiante(req), req.body);
    res.status(201).json(apunte);
  }));

  router.put('/apuntes/:id', manejar(async (req, res) => {
    const apunte = await servicio.editar(
      Number(req.params.id), leerEstudiante(req), req.body
    );
    res.json(apunte);
  }));

  router.delete('/apuntes/:id', manejar(async (req, res) => {
    await servicio.eliminar(
      Number(req.params.id),
      leerEstudiante(req),
      req.query.confirmar === 'true'
    );
    res.json({ mensaje: 'Apunte eliminado' });
  }));

  return router;
}

module.exports = crearRutas;