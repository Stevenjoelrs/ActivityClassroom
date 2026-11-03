import { almacen } from "../../compartido/datos-memoria.js";
import { crearRepositorioArchivo } from "../../compartido/repositorio-archivo.js";
import { EventoAcademico } from "./calendario-academico.js";

export function crearRepositorioCalendario(datos = almacen) {
  return {
    guardar(evento) {
      datos.eventos.push(evento);
      return evento;
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

