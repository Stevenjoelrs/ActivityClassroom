import assert from "node:assert/strict";
import { test } from "node:test";

import { crearAlmacenAcademico } from "../../compartido/almacen-academico.js";
import { CalendarioAcademico, EventoAcademico } from "./calendario-academico.js";
import { crearRepositorioCalendario } from "./calendario.repository.js";

const datosValidos = {
  id: "EV-01",
  materiaId: "MAT-101",
  tipo: "clase",
  fecha: "2026-11-10",
  horario: "08:00 - 10:00",
  descripcion: "Clase de Arquitectura",
};

test("HU-01: CA-01/CA-05 registra y consulta una clase con fecha, horario y descripción", () => {
  const calendario = new CalendarioAcademico();
  calendario.registrarEvento(new EventoAcademico(datosValidos));

  const resultado = calendario.consultarMateria("MAT-101");
  const evento = resultado.eventos[0];

  assert.equal(evento.tipo, "clase");
  assert.equal(evento.fecha, "2026-11-10");
  assert.equal(evento.horario, "08:00 - 10:00");
  assert.equal(evento.descripcion, "Clase de Arquitectura");
});

test("HU-01: CA-02 registra una entrega de tarea con su fecha", () => {
  const evento = new EventoAcademico({
    ...datosValidos,
    tipo: "entrega_tarea",
    fecha: "2026-11-20",
    descripcion: "Entrega del informe",
  });

  assert.equal(evento.tipo, "entrega_tarea");
  assert.equal(evento.fecha, "2026-11-20");
  assert.equal(evento.descripcion, "Entrega del informe");
});

test("HU-01: CA-03 registra una actividad académica con su descripción", () => {
  const evento = new EventoAcademico({
    ...datosValidos,
    tipo: "actividad",
    descripcion: "Exposición grupal",
  });

  assert.equal(evento.tipo, "actividad");
  assert.equal(evento.descripcion, "Exposición grupal");
});

test("HU-01: CA-04 refleja suspensiones registradas en el calendario", () => {
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

test("HU-01: CA-06 informa cuando no existen eventos para una materia", () => {
  const calendario = new CalendarioAcademico();

  const resultado = calendario.consultarMateria("MAT-999");

  assert.equal(
    resultado.mensaje,
    "No existen eventos programados para esta materia.",
  );
  assert.equal(resultado.eventos.length, 0);
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

test("HU-01: rechaza identificadores inválidos de evento y materia", () => {
  for (const campo of ["id", "materiaId"]) {
    for (const valor of ["", "   ", " EV-01", "EV-01 ", null, undefined, 123]) {
      assert.throws(
        () => new EventoAcademico({ ...datosValidos, [campo]: valor }),
        campo === "id" ? /identificador/ : /materia/,
      );
    }
  }
});

test("HU-01: rechaza tipos de evento no admitidos", () => {
  for (const tipo of ["", "examen", "clase ", null, undefined, 123]) {
    assert.throws(
      () => new EventoAcademico({ ...datosValidos, tipo }),
      /tipo de evento/,
    );
  }
});

test("HU-01: rechaza fechas inválidas o con formato distinto de AAAA-MM-DD", () => {
  for (const fecha of [
    "",
    "2026-02-30",
    "2026-13-01",
    "2026-00-10",
    "2026-11-31",
    "2026-1-10",
    "10/11/2026",
    null,
    undefined,
    20261110,
  ]) {
    assert.throws(
      () => new EventoAcademico({ ...datosValidos, fecha }),
      /fecha/,
    );
  }
});

test("HU-01: acepta eventos sin horario o con horario nulo", () => {
  const sinHorario = new EventoAcademico({ ...datosValidos, horario: undefined });
  const conHorarioNulo = new EventoAcademico({ ...datosValidos, horario: null });

  assert.equal(sinHorario.horario, undefined);
  assert.equal(conHorarioNulo.horario, null);
});

test("HU-01: rechaza horarios vacíos o con espacios en los extremos", () => {
  for (const horario of ["", "   ", " 08:00", "08:00 ", 123, true]) {
    assert.throws(
      () => new EventoAcademico({ ...datosValidos, horario }),
      /horario/,
    );
  }
});

test("HU-01: rechaza descripciones vacías o no textuales", () => {
  for (const descripcion of ["", "   ", null, undefined, 123]) {
    assert.throws(
      () => new EventoAcademico({ ...datosValidos, descripcion }),
      /descripción/,
    );
  }
});

test("HU-01: rechaza un estado de suspensión no booleano", () => {
  for (const suspendido of ["true", "false", 0, 1, null]) {
    assert.throws(
      () => new EventoAcademico({ ...datosValidos, suspendido }),
      /booleano/,
    );
  }
});

test("HU-01: admite todos los tipos de evento", () => {
  for (const tipo of ["clase", "entrega_tarea", "actividad", "suspension"]) {
    const evento = new EventoAcademico({ ...datosValidos, tipo });

    assert.equal(evento.tipo, tipo);
  }
});

test("HU-01: rechaza registrar objetos que no son eventos", () => {
  const calendario = new CalendarioAcademico();

  for (const evento of [{}, null, undefined, "EV-01", 123]) {
    assert.throws(
      () => calendario.registrarEvento(evento),
      /instancia de EventoAcademico/,
    );
  }
});

test("HU-01: rechaza consultar una materia con identificador inválido", () => {
  const calendario = new CalendarioAcademico();

  for (const materiaId of ["", "   ", " MAT-101", "MAT-101 ", null, undefined, 123]) {
    assert.throws(
      () => calendario.consultarMateria(materiaId),
      /identificador de la materia/,
    );
  }
});

test("HU-01: no permite reasignar datos de un evento establecido", () => {
  const evento = new EventoAcademico(datosValidos);

  for (const [campo, valor] of [
    ["id", "EV-99"],
    ["materiaId", "MAT-999"],
    ["tipo", "suspension"],
    ["fecha", "2026-12-01"],
    ["horario", "10:00 - 12:00"],
    ["descripcion", "Otra descripción"],
    ["suspendido", true],
  ]) {
    assert.throws(() => { evento[campo] = valor; }, TypeError);
  }
});

test("HU-01: no permite modificar el arreglo de eventos consultado", () => {
  const calendario = new CalendarioAcademico();
  calendario.registrarEvento(new EventoAcademico(datosValidos));

  const resultado = calendario.consultarMateria("MAT-101");

  assert.throws(() => { resultado.eventos[0] = {}; }, TypeError);
  assert.throws(
    () => resultado.eventos.push(new EventoAcademico(datosValidos)),
    TypeError,
  );
});

test("HU-01: la consulta vacía devuelve un arreglo congelado", () => {
  const resultado = new CalendarioAcademico().consultarMateria("MAT-999");

  assert.throws(
    () => resultado.eventos.push(new EventoAcademico(datosValidos)),
    TypeError,
  );
});

test("HU-01: el resultado de la consulta es de solo lectura", () => {
  const calendario = new CalendarioAcademico();
  calendario.registrarEvento(new EventoAcademico(datosValidos));

  const resultado = calendario.consultarMateria("MAT-101");

  assert.throws(() => { resultado.mensaje = "Otro mensaje"; }, TypeError);
  assert.throws(() => { resultado.eventos = []; }, TypeError);
});

test("HU-01: cada consulta devuelve una copia independiente de los eventos", () => {
  const calendario = new CalendarioAcademico();
  calendario.registrarEvento(new EventoAcademico(datosValidos));

  const primera = calendario.consultarMateria("MAT-101");
  calendario.registrarEvento(
    new EventoAcademico({ ...datosValidos, id: "EV-02" }),
  );
  const segunda = calendario.consultarMateria("MAT-101");

  assert.equal(primera.eventos.length, 1);
  assert.equal(segunda.eventos.length, 2);
});

test("HU-01: dos instancias que comparten el mismo repositorio ven los mismos datos", () => {
  const repositorio = crearRepositorioCalendario(crearAlmacenAcademico());
  const cal1 = new CalendarioAcademico(repositorio);
  const cal2 = new CalendarioAcademico(repositorio);
  cal1.registrarEvento(new EventoAcademico(datosValidos));

  const consulta = cal2.consultarMateria("MAT-101");
  assert.equal(consulta.eventos.length, 1);
  assert.equal(consulta.eventos[0].id, "EV-01");
});

test("HU-01: una instancia sin argumentos sigue funcionando y queda aislada de otras", () => {
  const cal1 = new CalendarioAcademico();
  const cal2 = new CalendarioAcademico();
  cal1.registrarEvento(new EventoAcademico(datosValidos));

  assert.equal(cal1.consultarMateria("MAT-101").eventos.length, 1);
  assert.equal(cal2.consultarMateria("MAT-101").eventos.length, 0);
});

