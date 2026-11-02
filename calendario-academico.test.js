import assert from "node:assert/strict";
import { test } from "node:test";

import { CalendarioAcademico, EventoAcademico } from "./calendario-academico.js";

const datosValidos = {
  id: "EV-01",
  materiaId: "MAT-101",
  tipo: "clase",
  fecha: "2026-11-10",
  horario: "08:00 - 10:00",
  descripcion: "Clase de Arquitectura",
};

test("HU-01: registra y permite consultar eventos de una materia", () => {
  const calendario = new CalendarioAcademico();
  calendario.registrarEvento(new EventoAcademico(datosValidos));

  const resultado = calendario.consultarMateria("MAT-101");

  assert.equal(resultado.eventos.length, 1);
  assert.equal(resultado.eventos[0].descripcion, "Clase de Arquitectura");
});

test("HU-01: devuelve únicamente los eventos de la materia consultada", () => {
  const calendario = new CalendarioAcademico();
  calendario.registrarEvento(new EventoAcademico(datosValidos));
  calendario.registrarEvento(
    new EventoAcademico({
      ...datosValidos,
      id: "EV-02",
      materiaId: "MAT-202",
      descripcion: "Clase de Base de Datos",
    }),
  );

  const resultado = calendario.consultarMateria("MAT-101");

  assert.equal(resultado.eventos.length, 1);
  assert.equal(resultado.eventos[0].materiaId, "MAT-101");
});

test("HU-01: informa cuando no existen eventos para una materia", () => {
  const calendario = new CalendarioAcademico();

  const resultado = calendario.consultarMateria("MAT-999");

  assert.equal(
    resultado.mensaje,
    "No existen eventos programados para esta materia.",
  );
  assert.equal(resultado.eventos.length, 0);
});

test("HU-01: refleja suspensiones registradas en el calendario", () => {
  const calendario = new CalendarioAcademico();
  calendario.registrarEvento(
    new EventoAcademico({
      ...datosValidos,
      id: "EV-03",
      tipo: "suspension",
      fecha: "2026-11-15",
      descripcion: "Clase suspendida por feriado",
      suspendido: true,
    }),
  );

  const resultado = calendario.consultarMateria("MAT-101");

  assert.equal(resultado.eventos[0].suspendido, true);
});
