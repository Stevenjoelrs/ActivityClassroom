import { crearAlmacenAcademico } from "../../compartido/almacen-academico.js";
import { GrupoTrabajo } from "./grupo-trabajo.js";
import { crearRepositorioGrupos } from "./grupos.repository.js";

function esIdentificadorValido(valor) {
  return typeof valor === "string" && valor.length > 0 && valor === valor.trim();
}

export class RegistroGrupos {
  #repositorio;

  constructor(repositorio = crearRepositorioGrupos(crearAlmacenAcademico())) {
    this.#repositorio = repositorio;
  }

  registrar(grupo) {
    if (!(grupo instanceof GrupoTrabajo)) {
      throw new Error("El grupo debe ser una instancia de GrupoTrabajo.");
    }
    this.#repositorio.guardar(grupo);
  }

  consultarPorActividad(actividadId) {
    if (!esIdentificadorValido(actividadId)) {
      throw new Error("El id de la actividad debe ser válido.");
    }
    return Object.freeze(
      this.#repositorio
        .listar()
        .filter((grupo) => grupo.actividadId === actividadId),
    );
  }
}
