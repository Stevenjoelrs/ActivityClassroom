import { almacenAcademico } from "../../compartido/almacen-academico.js";
import { crearRepositorioArchivo } from "../../compartido/repositorio-archivo.js";
import { GrupoTrabajo } from "./grupo-trabajo.js";

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

export function crearRepositorioGruposArchivo(ruta) {
  return crearRepositorioArchivo({
    ruta,
    hidratar: (d) => new GrupoTrabajo(d),
  });
}

