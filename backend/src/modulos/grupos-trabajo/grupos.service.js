import { AppError } from "../../compartido/error.js";
import { repositorioGrupos } from "./grupos.repository.js";
import { GrupoTrabajo } from "./grupo-trabajo.js";
import { RegistroGrupos } from "./registro-grupos.js";

export function crearServicioGrupos({
  registro = new RegistroGrupos(repositorioGrupos),
} = {}) {
  return {
    registrar(datos = {}) {
      try {
        const grupo = new GrupoTrabajo(datos);
        registro.registrar(grupo);
        return grupo;
      } catch (error) {
        if (error instanceof AppError) throw error;
        throw new AppError(400, error.message);
      }
    },

    consultar(actividadId) {
      try {
        return registro.consultarPorActividad(actividadId);
      } catch (error) {
        if (error instanceof AppError) throw error;
        throw new AppError(400, error.message);
      }
    },
  };
}

export const servicioGrupos = crearServicioGrupos();
