const TIPOS_EVENTO = Object.freeze([
  "clase",
  "entrega_tarea",
  "actividad",
  "suspension",
]);

function esIdentificadorValido(valor) {
  return typeof valor === "string" && valor.length > 0 && valor === valor.trim();
}

function esFechaValida(fecha) {
  if (typeof fecha !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
    return false;
  }

  const fechaUtc = new Date(`${fecha}T00:00:00Z`);

  return (
    !Number.isNaN(fechaUtc.getTime()) &&
    fechaUtc.toISOString().slice(0, 10) === fecha
  );
}

export class EventoAcademico {
  constructor({ id, materiaId, tipo, fecha, horario, descripcion, suspendido = false }) {
    if (!esIdentificadorValido(id)) {
      throw new Error("El evento debe tener un identificador válido.");
    }
    if (!esIdentificadorValido(materiaId)) {
      throw new Error("El evento debe tener una materia válida.");
    }
    if (!TIPOS_EVENTO.includes(tipo)) {
      throw new Error("El tipo de evento no es válido.");
    }
    if (!esFechaValida(fecha)) {
      throw new Error("La fecha del evento debe tener el formato AAAA-MM-DD.");
    }
    if (
      horario != null &&
      (typeof horario !== "string" || !horario.trim() || horario !== horario.trim())
    ) {
      throw new Error(
        "El horario debe ser una cadena no vacía sin espacios en los extremos.",
      );
    }
    if (typeof descripcion !== "string" || !descripcion.trim()) {
      throw new Error("El evento debe tener una descripción.");
    }
    if (typeof suspendido !== "boolean") {
      throw new Error("El estado de suspensión debe ser booleano.");
    }
    Object.assign(this, {
      id,
      materiaId,
      tipo,
      fecha,
      horario,
      descripcion,
      suspendido,
    });
    Object.freeze(this);
  }
}

export class CalendarioAcademico {
  #eventos = [];

  registrarEvento(evento) {
    if (!(evento instanceof EventoAcademico)) {
      throw new Error("El evento debe ser una instancia de EventoAcademico.");
    }
    this.#eventos.push(evento);
  }

  consultarMateria(materiaId) {
    if (!esIdentificadorValido(materiaId)) {
      throw new Error("El identificador de la materia debe ser válido.");
    }

    const eventosMateria = this.#eventos.filter(
      (evento) => evento.materiaId === materiaId,
    );

    if (eventosMateria.length === 0) {
      return {
        mensaje: "No existen eventos programados para esta materia.",
        eventos: Object.freeze([]),
      };
    }

    return {
      mensaje: null,
      eventos: Object.freeze([...eventosMateria]),
    };
  }
}
