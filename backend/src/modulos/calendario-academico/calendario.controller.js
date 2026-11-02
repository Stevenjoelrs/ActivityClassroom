import { servicioCalendario } from "./calendario.service.js";

export function registrarEvento(req, res, next) {
  try {
    const evento = servicioCalendario.registrar(req.body);
    res.status(201).json({ evento });
  } catch (error) {
    next(error);
  }
}

export function consultarCalendario(req, res, next) {
  try {
    const { materia } = req.query;
    const resultado = servicioCalendario.consultar(materia);
    res.status(200).json(resultado);
  } catch (error) {
    next(error);
  }
}
