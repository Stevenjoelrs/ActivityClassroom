import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { after, test } from "node:test";

import { EventoAcademico } from "../modulos/calendario-academico/calendario-academico.js";
import { GrupoTrabajo } from "../modulos/grupos-trabajo/grupo-trabajo.js";
import { crearRepositoriosPersistentes } from "./repositorios.js";

const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "repos-test-"));

after(() => {
  fs.rmSync(tempDir, { recursive: true, force: true });
});

const eventoValido = {
  id: "EV-01",
  materiaId: "MAT-101",
  tipo: "clase",
  fecha: "2026-11-10",
  horario: "08:00 - 10:00",
  descripcion: "Clase de Arquitectura",
};

const grupoValido = {
  nombre: "Grupo 1",
  actividadId: "ACT-01",
  modalidad: "afinidad",
  integrantes: ["EST-01", "EST-02"],
};

test("repositorios persistentes: guarda en eventos.json y grupos.json dentro del directorio y los recupera", () => {
  const dir = path.join(tempDir, "datos-1");
  const repos1 = crearRepositoriosPersistentes({ directorio: dir });

  repos1.calendario.guardar(new EventoAcademico(eventoValido));
  repos1.grupos.guardar(new GrupoTrabajo(grupoValido));

  assert.ok(fs.existsSync(path.join(dir, "eventos.json")));
  assert.ok(fs.existsSync(path.join(dir, "grupos.json")));

  const repos2 = crearRepositoriosPersistentes({ directorio: dir });
  const eventos = repos2.calendario.listar();
  const grupos = repos2.grupos.listar();

  assert.equal(eventos.length, 1);
  assert.equal(eventos[0].id, "EV-01");
  assert.equal(grupos.length, 1);
  assert.equal(grupos[0].nombre, "Grupo 1");
});

test("repositorios persistentes: sin argumento usa process.env.DATA_DIR si está definido", () => {
  const dirEnv = path.join(tempDir, "datos-env");
  process.env.DATA_DIR = dirEnv;

  try {
    const repos = crearRepositoriosPersistentes();
    repos.calendario.guardar(new EventoAcademico(eventoValido));

    assert.ok(fs.existsSync(path.join(dirEnv, "eventos.json")));
  } finally {
    delete process.env.DATA_DIR;
  }
});

test("repositorios persistentes: sin argumento ni DATA_DIR usa backend/data/", () => {
  const anteriorEnv = process.env.DATA_DIR;
  delete process.env.DATA_DIR;

  try {
    const repos = crearRepositoriosPersistentes();
    const esperado = path.resolve("backend/data");
    assert.equal(path.resolve(repos.directorio), esperado);
  } finally {
    if (anteriorEnv !== undefined) {
      process.env.DATA_DIR = anteriorEnv;
    }
  }
});
