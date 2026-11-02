import { almacenAcademico } from "../../compartido/almacen-academico.js";

export function crearRepositorioGrupos(datos = almacenAcademico) {
  return {
    guardar(grupo) {
      datos.grupos.push(grupo);
    },
    listar() {
      return [...datos.grupos];
    },
  };
}

export const repositorioGrupos = crearRepositorioGrupos();
