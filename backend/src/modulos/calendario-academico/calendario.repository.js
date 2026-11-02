import { almacenAcademico } from "../../compartido/almacen-academico.js";
import { crearRepositorioArchivo } from "../../compartido/repositorio-archivo.js";
import { EventoAcademico } from "./calendario-academico.js";

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

export function crearRepositorioCalendarioArchivo(ruta) {
  return crearRepositorioArchivo({
    ruta,
    hidratar: (d) => new EventoAcademico(d),
  });
}

