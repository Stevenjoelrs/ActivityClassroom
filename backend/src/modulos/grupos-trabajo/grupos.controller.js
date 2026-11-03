import { servicioGrupos } from "./grupos.service.js";

export function registrarGrupo(req, res, next) {
  try {
    const grupo = servicioGrupos.registrar(req.body);
    res.status(201).json({ grupo });
  } catch (error) {
    next(error);
  }
}

export function consultarGrupos(req, res, next) {
  try {
    const { actividad } = req.query;
    const grupos = servicioGrupos.consultar(actividad);
    res.status(200).json({ grupos });
  } catch (error) {
    next(error);
  }
}
