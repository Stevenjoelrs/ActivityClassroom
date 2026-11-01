import assert from "node:assert/strict";
import { test } from "node:test";

import { GrupoTrabajo } from "./grupo-trabajo.js";

const datosValidos = {
  nombre: "Grupo 1",
  actividadId: "ACT-01",
  modalidad: "afinidad",
  integrantes: ["EST-01", "EST-02"],
};

test("registra y permite consultar un grupo por afinidad", () => {
  const grupo = new GrupoTrabajo({ ...datosValidos, maximoIntegrantes: 3 });

  assert.equal(grupo.nombre, "Grupo 1");
  assert.equal(grupo.actividadId, "ACT-01");
  assert.equal(grupo.modalidad, "afinidad");
  assert.deepEqual(grupo.integrantes, ["EST-01", "EST-02"]);
  assert.equal(grupo.maximoIntegrantes, 3);
});

test("registra integrantes de un sorteo ya realizado", () => {
  const grupo = new GrupoTrabajo({ ...datosValidos, modalidad: "sorteo" });

  assert.equal(grupo.modalidad, "sorteo");
  assert.deepEqual(grupo.integrantes, ["EST-01", "EST-02"]);
});
