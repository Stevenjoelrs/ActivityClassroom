import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";

import { crearAlmacenAcademico } from "../../compartido/almacen-academico.js";
import { AppError } from "../../compartido/error.js";
import {
  crearRepositorioGrupos,
  crearRepositorioGruposArchivo,
} from "./grupos.repository.js";
import { crearServicioGrupos } from "./grupos.service.js";
import { RegistroGrupos } from "./registro-grupos.js";

const datosAfinidad = {
  nombre: "Grupo Alfa",
  actividadId: "ACT-01",
  modalidad: "afinidad",
  integrantes: ["EST-01", "EST-02"],
};

const datosSorteo = {
  nombre: "Grupo Beta",
  actividadId: "ACT-01",
  modalidad: "sorteo",
  integrantes: ["EST-03", "EST-04"],
};

test("servicio grupos: registrar y consultar por actividad, afinidad y sorteo", () => {
  const repo = crearRepositorioGrupos(crearAlmacenAcademico());
  const servicio = crearServicioGrupos({
    registro: new RegistroGrupos(repo),
  });

  const g1 = servicio.registrar(datosAfinidad);
  assert.equal(g1.nombre, "Grupo Alfa");
  assert.equal(g1.modalidad, "afinidad");

  const g2 = servicio.registrar(datosSorteo);
  assert.equal(g2.nombre, "Grupo Beta");
  assert.equal(g2.modalidad, "sorteo");

  const grupos = servicio.consultar("ACT-01");
  assert.equal(grupos.length, 2);
  assert.equal(grupos[0].nombre, "Grupo Alfa");
  assert.equal(grupos[1].nombre, "Grupo Beta");
});

test("servicio grupos: integrante duplicado lanza AppError(400)", () => {
  const repo = crearRepositorioGrupos(crearAlmacenAcademico());
  const servicio = crearServicioGrupos({
    registro: new RegistroGrupos(repo),
  });

  assert.throws(
    () =>
      servicio.registrar({
        ...datosAfinidad,
        integrantes: ["EST-01", "EST-01"],
      }),
    (err) => {
      assert.ok(err instanceof AppError);
      assert.equal(err.status, 400);
      assert.equal(
        err.message,
        "Un estudiante no puede aparecer dos veces en el grupo.",
      );
      return true;
    },
  );
});

test("servicio grupos: maximo superado lanza AppError(400)", () => {
  const repo = crearRepositorioGrupos(crearAlmacenAcademico());
  const servicio = crearServicioGrupos({
    registro: new RegistroGrupos(repo),
  });

  assert.throws(
    () =>
      servicio.registrar({
        ...datosAfinidad,
        integrantes: ["EST-01", "EST-02", "EST-03"],
        maximoIntegrantes: 2,
      }),
    (err) => {
      assert.ok(err instanceof AppError);
      assert.equal(err.status, 400);
      assert.equal(
        err.message,
        "El grupo supera el tamaño máximo de la actividad.",
      );
      return true;
    },
  );
});

test("servicio grupos: otra actividad no lo devuelve y valida id de actividad", () => {
  const repo = crearRepositorioGrupos(crearAlmacenAcademico());
  const servicio = crearServicioGrupos({
    registro: new RegistroGrupos(repo),
  });

  servicio.registrar(datosAfinidad);
  servicio.registrar({
    ...datosAfinidad,
    nombre: "Grupo Otro",
    actividadId: "ACT-02",
  });

  const res1 = servicio.consultar("ACT-01");
  assert.equal(res1.length, 1);
  assert.equal(res1[0].nombre, "Grupo Alfa");

  assert.throws(
    () => servicio.consultar(""),
    (err) => {
      assert.ok(err instanceof AppError);
      assert.equal(err.status, 400);
      return true;
    },
  );
});

test("servicio grupos: conserva los grupos al recrearse sobre el mismo archivo JSON", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "grupos-service-test-"));

  try {
    const rutaArchivo = path.join(tempDir, "grupos.json");
    const repo1 = crearRepositorioGruposArchivo(rutaArchivo);
    const servicio1 = crearServicioGrupos({
      registro: new RegistroGrupos(repo1),
    });

    servicio1.registrar(datosAfinidad);

    const repo2 = crearRepositorioGruposArchivo(rutaArchivo);
    const servicio2 = crearServicioGrupos({
      registro: new RegistroGrupos(repo2),
    });

    const grupos = servicio2.consultar("ACT-01");
    assert.equal(grupos.length, 1);
    assert.equal(grupos[0].nombre, "Grupo Alfa");
    assert.deepEqual(grupos[0].integrantes, ["EST-01", "EST-02"]);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});
