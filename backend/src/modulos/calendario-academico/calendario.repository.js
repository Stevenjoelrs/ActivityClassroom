import { almacenAcademico } from "../../compartido/almacen-academico.js";

export function crearRepositorioCalendario(datos = almacenAcademico) {
  return {
    guardar(evento) {
      datos.eventos.push(evento);
    },
    listar() {
      return [...datos.eventos];
    },
  };
}

export const repositorioCalendario = crearRepositorioCalendario();
