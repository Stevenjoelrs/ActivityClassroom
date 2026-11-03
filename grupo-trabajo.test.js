import assert from "node:assert/strict";
import { test } from "node:test";

import { GrupoTrabajo } from "./grupo-trabajo.js";

const datosValidos = {
  nombre: "Grupo 1",
  actividadId: "ACT-01",
  modalidad: "afinidad",
  integrantes: ["EST-01", "EST-02"],
};

test("HU-02: CA-02/CA-04 registra y permite consultar un grupo por afinidad", () => {
  const grupo = new GrupoTrabajo({ ...datosValidos, maximoIntegrantes: 3 });

  assert.equal(grupo.nombre, "Grupo 1");
  assert.equal(grupo.actividadId, "ACT-01");
  assert.equal(grupo.modalidad, "afinidad");
  assert.deepEqual(grupo.integrantes, ["EST-01", "EST-02"]);
  assert.equal(grupo.maximoIntegrantes, 3);
});

test("HU-02: CA-03 registra integrantes de un sorteo ya realizado", () => {
  const grupo = new GrupoTrabajo({ ...datosValidos, modalidad: "sorteo" });

  assert.equal(grupo.modalidad, "sorteo");
  assert.deepEqual(grupo.integrantes, ["EST-01", "EST-02"]);
});

test("HU-02: CA-06 rechaza integrantes duplicados", () => {
  assert.throws(
    () => new GrupoTrabajo({ ...datosValidos, integrantes: ["EST-01", "EST-01"] }),
    /dos veces/,
  );
});

test("HU-02: CA-07 rechaza un grupo que supera el máximo", () => {
  assert.throws(
    () => new GrupoTrabajo({ ...datosValidos, maximoIntegrantes: 1 }),
    /supera/,
  );
});

test("HU-02: acepta un grupo con el máximo exacto", () => {
  const grupo = new GrupoTrabajo({ ...datosValidos, maximoIntegrantes: 2 });

  assert.equal(grupo.integrantes.length, 2);
});

test("HU-02: acepta un grupo sin máximo establecido", () => {
  const grupo = new GrupoTrabajo(datosValidos);

  assert.equal(grupo.maximoIntegrantes, null);
  assert.equal(grupo.integrantes.length, 2);
});

test("HU-02: rechaza nombre o actividad sin datos válidos", () => {
  for (const campo of ["nombre", "actividadId"]) {
    for (const valor of ["", "   ", null, undefined, 123]) {
      assert.throws(
        () => new GrupoTrabajo({ ...datosValidos, [campo]: valor }),
        campo === "nombre" ? /nombre/ : /identificadores/,
      );
    }
  }
});

test("HU-02: RN-01 rechaza modalidades no admitidas", () => {
  for (const modalidad of ["", "manual", null, undefined]) {
    assert.throws(
      () => new GrupoTrabajo({ ...datosValidos, modalidad }),
      /modalidad/,
    );
  }
});

test("HU-02: rechaza grupos sin un arreglo de integrantes no vacío", () => {
  for (const integrantes of [[], "EST-01", null, undefined, 123]) {
    assert.throws(
      () => new GrupoTrabajo({ ...datosValidos, integrantes }),
      /colección de integrantes/,
    );
  }
});

test("HU-02: rechaza identificadores de integrantes inválidos y arreglos con huecos", () => {
  for (const integrantes of [
    [""], ["   "], [null], [undefined], [123], [" EST-01"], ["EST-01 "], Array(2),
  ]) {
    assert.throws(
      () => new GrupoTrabajo({ ...datosValidos, integrantes }),
      /identificadores/,
    );
  }
});

test("HU-02: rechaza identificador de actividad con espacios en los extremos", () => {
  assert.throws(
    () => new GrupoTrabajo({ ...datosValidos, actividadId: " ACT-01 " }),
    /identificadores/,
  );
});

test("HU-02: rechaza un máximo que no sea un entero positivo seguro", () => {
  for (const maximoIntegrantes of [
    0, -1, true, false, 1.5, "2", NaN, Infinity, Number.MAX_SAFE_INTEGER + 1,
  ]) {
    assert.throws(
      () => new GrupoTrabajo({ ...datosValidos, maximoIntegrantes }),
      /entero positivo/,
    );
  }
});

test("HU-02: RN-05 no permite reasignar datos de un grupo establecido", () => {
  const grupo = new GrupoTrabajo(datosValidos);

  for (const [campo, valor] of [
    ["nombre", "Grupo 2"],
    ["actividadId", "ACT-02"],
    ["modalidad", "sorteo"],
    ["integrantes", ["EST-03"]],
    ["maximoIntegrantes", 5],
  ]) {
    assert.throws(() => { grupo[campo] = valor; }, TypeError);
  }
});

test("HU-02: RN-05 no permite cambiar ni agregar integrantes", () => {
  const grupo = new GrupoTrabajo({ ...datosValidos, integrantes: ["EST-01"] });

  assert.throws(() => { grupo.integrantes[0] = "EST-03"; }, TypeError);
  assert.throws(() => grupo.integrantes.push("EST-03"), TypeError);
});

test("HU-02: RN-05 modificar la lista original no cambia el grupo", () => {
  const integrantes = ["EST-01", "EST-02"];
  const grupo = new GrupoTrabajo({ ...datosValidos, integrantes });

  integrantes.push("EST-03");

  assert.deepEqual(grupo.integrantes, ["EST-01", "EST-02"]);
});
