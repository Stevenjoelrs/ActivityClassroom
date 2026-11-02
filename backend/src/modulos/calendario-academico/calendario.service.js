import { AppError } from "../../compartido/error.js";
import { repositorios } from "../../compartido/repositorios.js";
import {
  CalendarioAcademico,
  EventoAcademico,
} from "./calendario-academico.js";

export function crearServicioCalendario({
  calendario = new CalendarioAcademico(repositorios.calendario),
} = {}) {
  return {
    registrar(datos = {}) {
      try {
        const evento = new EventoAcademico(datos);
        calendario.registrarEvento(evento);
        return evento;
      } catch (error) {
        if (error instanceof AppError) throw error;
        throw new AppError(400, error.message);
      }
    },

    consultar(materiaId) {
      try {
        return calendario.consultarMateria(materiaId);
      } catch (error) {
        if (error instanceof AppError) throw error;
        throw new AppError(400, error.message);
      }
    },
  };
}

export const servicioCalendario = crearServicioCalendario();
