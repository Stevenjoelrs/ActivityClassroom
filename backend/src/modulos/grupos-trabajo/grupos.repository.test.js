import assert from "node:assert/strict";
import { test } from "node:test";

import { crearAlmacenAcademico } from "../../compartido/almacen-academico.js";
import { GrupoTrabajo } from "./grupo-trabajo.js";
import {
  crearRepositorioGrupos,
  repositorioGrupos,
} from "./grupos.repository.js";

const datosValidos = {
  nombre: "Grupo 1",
  actividadId: "ACT-01",
  modalidad: "afinidad",
  integrantes: ["EST-01", "EST-02"],
};

test("HU-02 repositorio: guardar y listar grupos", () => {
  const almacen = crearAlmacenAcademico();
  const repo = crearRepositorioGrupos(almacen);
  const grupo = new GrupoTrabajo(datosValidos);

  repo.guardar(grupo);

  assert.deepEqual(repo.listar(), [grupo]);
});

test("HU-02 repositorio: dos almacenes distintos no comparten datos", () => {
  const almacen1 = crearAlmacenAcademico();
  const almacen2 = crearAlmacenAcademico();
  const repo1 = crearRepositorioGrupos(almacen1);
  const repo2 = crearRepositorioGrupos(almacen2);
  const grupo = new GrupoTrabajo(datosValidos);

  repo1.guardar(grupo);

  assert.equal(repo1.listar().length, 1);
  assert.equal(repo2.listar().length, 0);
});

test("HU-02 repositorio: listar() devuelve una copia que no altera el almacén", () => {
  const almacen = crearAlmacenAcademico();
  const repo = crearRepositorioGrupos(almacen);
  const grupo = new GrupoTrabajo(datosValidos);

  repo.guardar(grupo);
  const lista = repo.listar();
  lista.push(new GrupoTrabajo({ ...datosValidos, nombre: "Grupo 2" }));

  assert.equal(repo.listar().length, 1);
  assert.equal(almacen.grupos.length, 1);
});

test("HU-02 repositorio: expone el singleton repositorioGrupos", () => {
  assert.ok(repositorioGrupos);
  assert.equal(typeof repositorioGrupos.guardar, "function");
  assert.equal(typeof repositorioGrupos.listar, "function");
});
