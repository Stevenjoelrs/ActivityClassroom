export class EventoAcademico {
  constructor({ id, materiaId, tipo, fecha, horario, descripcion, suspendido = false }) {
    Object.assign(this, {
      id,
      materiaId,
      tipo,
      fecha,
      horario,
      descripcion,
      suspendido,
    });
  }
}

export class CalendarioAcademico {
  #eventos = [];

  registrarEvento(evento) {
    this.#eventos.push(evento);
  }

  consultarMateria(materiaId) {
    const eventosMateria = this.#eventos.filter(
      (evento) => evento.materiaId === materiaId,
    );

    if (eventosMateria.length === 0) {
      return {
        mensaje: "No existen eventos programados para esta materia.",
        eventos: [],
      };
    }

    return {
      mensaje: null,
      eventos: eventosMateria,
    };
  }
}
