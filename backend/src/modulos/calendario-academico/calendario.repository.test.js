import assert from "node:assert/strict";
import { test } from "node:test";

import { crearAlmacenAcademico } from "../../compartido/almacen-academico.js";
import { EventoAcademico } from "./calendario-academico.js";
import {
  crearRepositorioCalendario,
  repositorioCalendario,
} from "./calendario.repository.js";

const datosValidos = {
  id: "EV-01",
  materiaId: "MAT-101",
  tipo: "clase",
  fecha: "2026-11-10",
  horario: "08:00 - 10:00",
  descripcion: "Clase de Arquitectura",
};

test("HU-01 repositorio: guardar y listar eventos", () => {
  const almacen = crearAlmacenAcademico();
  const repo = crearRepositorioCalendario(almacen);
  const evento = new EventoAcademico(datosValidos);

  repo.guardar(evento);

  assert.deepEqual(repo.listar(), [evento]);
});

test("HU-01 repositorio: dos almacenes distintos no comparten datos", () => {
  const almacen1 = crearAlmacenAcademico();
  const almacen2 = crearAlmacenAcademico();
  const repo1 = crearRepositorioCalendario(almacen1);
  const repo2 = crearRepositorioCalendario(almacen2);
  const evento = new EventoAcademico(datosValidos);

  repo1.guardar(evento);

  assert.equal(repo1.listar().length, 1);
  assert.equal(repo2.listar().length, 0);
});

test("HU-01 repositorio: listar() devuelve una copia que no altera el almacén", () => {
  const almacen = crearAlmacenAcademico();
  const repo = crearRepositorioCalendario(almacen);
  const evento = new EventoAcademico(datosValidos);

  repo.guardar(evento);
  const lista = repo.listar();
  lista.push(new EventoAcademico({ ...datosValidos, id: "EV-02" }));

  assert.equal(repo.listar().length, 1);
  assert.equal(almacen.eventos.length, 1);
});

test("HU-01 repositorio: expone el singleton repositorioCalendario", () => {
  assert.ok(repositorioCalendario);
  assert.equal(typeof repositorioCalendario.guardar, "function");
  assert.equal(typeof repositorioCalendario.listar, "function");
});
