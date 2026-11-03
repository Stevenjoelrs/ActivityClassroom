import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { after, test } from "node:test";

import { crearAlmacenAcademico } from "../../compartido/almacen-academico.js";
import { AppError } from "../../compartido/error.js";
import {
  CalendarioAcademico,
} from "./calendario-academico.js";
import {
  crearRepositorioCalendario,
  crearRepositorioCalendarioArchivo,
} from "./calendario.repository.js";
import { crearServicioCalendario } from "./calendario.service.js";

const datosClase = {
  id: "EV-01",
  materiaId: "MAT-101",
  tipo: "clase",
  fecha: "2026-11-10",
  horario: "08:00 - 10:00",
  descripcion: "Clase de Arquitectura",
};

test("servicio calendario: registrar y consultar por materia (CA-01, CA-02, CA-03, CA-05)", () => {
  const repo = crearRepositorioCalendario(crearAlmacenAcademico());
  const servicio = crearServicioCalendario({
    calendario: new CalendarioAcademico(repo),
  });

  const ev1 = servicio.registrar(datosClase);
  assert.equal(ev1.tipo, "clase");
  assert.equal(ev1.horario, "08:00 - 10:00");

  const ev2 = servicio.registrar({
    id: "EV-02",
    materiaId: "MAT-101",
    tipo: "entrega_tarea",
    fecha: "2026-11-20",
    descripcion: "Entrega primer avance",
  });
  assert.equal(ev2.tipo, "entrega_tarea");

  const ev3 = servicio.registrar({
    id: "EV-03",
    materiaId: "MAT-101",
    tipo: "actividad",
    fecha: "2026-11-25",
    descripcion: "Taller grupal",
  });
  assert.equal(ev3.tipo, "actividad");

  const consulta = servicio.consultar("MAT-101");
  assert.equal(consulta.mensaje, null);
  assert.equal(consulta.eventos.length, 3);
  assert.equal(consulta.eventos[0].id, "EV-01");
  assert.equal(consulta.eventos[1].id, "EV-02");
  assert.equal(consulta.eventos[2].id, "EV-03");
});

test("servicio calendario: clase con suspendido: true reflejada (CA-04)", () => {
  const repo = crearRepositorioCalendario(crearAlmacenAcademico());
  const servicio = crearServicioCalendario({
    calendario: new CalendarioAcademico(repo),
  });

  servicio.registrar({
    ...datosClase,
    id: "EV-SUSP",
    suspendido: true,
  });

  const consulta = servicio.consultar("MAT-101");
  assert.equal(consulta.eventos.length, 1);
  assert.equal(consulta.eventos[0].suspendido, true);
});

test("servicio calendario: materia sin eventos devuelve mensaje y arreglo vacío (CA-06)", () => {
  const repo = crearRepositorioCalendario(crearAlmacenAcademico());
  const servicio = crearServicioCalendario({
    calendario: new CalendarioAcademico(repo),
  });

  const consulta = servicio.consultar("MAT-999");
  assert.equal(
    consulta.mensaje,
    "No existen eventos programados para esta materia.",
  );
  assert.deepEqual(consulta.eventos, []);
});

test("servicio calendario: un Error del dominio se convierte en AppError(400) con el mismo mensaje", () => {
  const repo = crearRepositorioCalendario(crearAlmacenAcademico());
  const servicio = crearServicioCalendario({
    calendario: new CalendarioAcademico(repo),
  });

  // Id inválido
  assert.throws(
    () => servicio.registrar({ ...datosClase, id: "" }),
    (err) => {
      assert.ok(err instanceof AppError);
      assert.equal(err.status, 400);
      assert.equal(
        err.message,
        "El evento debe tener un identificador válido.",
      );
      return true;
    },
  );

  // Fecha inválida
  assert.throws(
    () => servicio.registrar({ ...datosClase, fecha: "10-11-2026" }),
    (err) => {
      assert.ok(err instanceof AppError);
      assert.equal(err.status, 400);
      assert.equal(
        err.message,
        "La fecha del evento debe tener el formato AAAA-MM-DD.",
      );
      return true;
    },
  );

  // Consulta con materia inválida
  assert.throws(
    () => servicio.consultar(""),
    (err) => {
      assert.ok(err instanceof AppError);
      assert.equal(err.status, 400);
      assert.equal(
        err.message,
        "El identificador de la materia debe ser válido.",
      );
      return true;
    },
  );
});

test("servicio calendario: conserva los eventos al recrearse sobre el mismo archivo JSON", () => {
  const tempDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "calendario-service-test-"),
  );

  try {
    const rutaArchivo = path.join(tempDir, "eventos.json");
    const repo1 = crearRepositorioCalendarioArchivo(rutaArchivo);
    const servicio1 = crearServicioCalendario({
      calendario: new CalendarioAcademico(repo1),
    });

    servicio1.registrar(datosClase);

    const repo2 = crearRepositorioCalendarioArchivo(rutaArchivo);
    const servicio2 = crearServicioCalendario({
      calendario: new CalendarioAcademico(repo2),
    });

    const consulta = servicio2.consultar("MAT-101");
    assert.equal(consulta.eventos.length, 1);
    assert.equal(consulta.eventos[0].id, "EV-01");
    assert.equal(consulta.eventos[0].descripcion, "Clase de Arquitectura");
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});
