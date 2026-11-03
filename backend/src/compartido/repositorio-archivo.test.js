import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { after, test } from "node:test";

import { EventoAcademico } from "../modulos/calendario-academico/calendario-academico.js";
import {
  crearRepositorioCalendarioArchivo,
} from "../modulos/calendario-academico/calendario.repository.js";
import { GrupoTrabajo } from "../modulos/grupos-trabajo/grupo-trabajo.js";
import {
  crearRepositorioGruposArchivo,
} from "../modulos/grupos-trabajo/grupos.repository.js";
import { crearRepositorioArchivo } from "./repositorio-archivo.js";

const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "persistencia-test-"));

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

test("repositorio archivo: archivo inexistente devuelve lista vacía", () => {
  const ruta = path.join(tempDir, "inexistente.json");
  const repo = crearRepositorioArchivo({ ruta, hidratar: (d) => d });

  assert.deepEqual(repo.listar(), []);
});

test("repositorio archivo: guardar y volver a crear con la misma ruta devuelve instancias del dominio", () => {
  const rutaEventos = path.join(tempDir, "eventos-test.json");
  const repoEventos1 = crearRepositorioCalendarioArchivo(rutaEventos);
  repoEventos1.guardar(new EventoAcademico(eventoValido));

  const repoEventos2 = crearRepositorioCalendarioArchivo(rutaEventos);
  const eventosRecuperados = repoEventos2.listar();
  assert.equal(eventosRecuperados.length, 1);
  assert.ok(eventosRecuperados[0] instanceof EventoAcademico);
  assert.equal(eventosRecuperados[0].id, "EV-01");
  assert.equal(eventosRecuperados[0].descripcion, "Clase de Arquitectura");

  const rutaGrupos = path.join(tempDir, "grupos-test.json");
  const repoGrupos1 = crearRepositorioGruposArchivo(rutaGrupos);
  repoGrupos1.guardar(new GrupoTrabajo(grupoValido));

  const repoGrupos2 = crearRepositorioGruposArchivo(rutaGrupos);
  const gruposRecuperados = repoGrupos2.listar();
  assert.equal(gruposRecuperados.length, 1);
  assert.ok(gruposRecuperados[0] instanceof GrupoTrabajo);
  assert.equal(gruposRecuperados[0].nombre, "Grupo 1");
  assert.deepEqual(gruposRecuperados[0].integrantes, ["EST-01", "EST-02"]);
});

test("repositorio archivo: JSON inválido lanza Error con mensaje claro", () => {
  const ruta = path.join(tempDir, "invalido.json");
  fs.writeFileSync(ruta, "esto no es json valido{", "utf8");

  assert.throws(
    () => crearRepositorioArchivo({ ruta, hidratar: (d) => d }),
    /JSON|formato/i,
  );
});

test("repositorio archivo: datos inválidos dentro del archivo lanzan el Error de validación del dominio", () => {
  const ruta = path.join(tempDir, "dominio-invalido.json");
  fs.writeFileSync(
    ruta,
    JSON.stringify([{ id: "EV-01", materiaId: "", tipo: "clase" }]),
    "utf8",
  );

  assert.throws(
    () =>
      crearRepositorioArchivo({
        ruta,
        hidratar: (d) => new EventoAcademico(d),
      }),
    /materia/,
  );
});

test("repositorio archivo: crea la carpeta si no existe", () => {
  const ruta = path.join(tempDir, "carpeta-anidada", "sub", "eventos.json");
  const repo = crearRepositorioCalendarioArchivo(ruta);

  repo.guardar(new EventoAcademico(eventoValido));

  assert.ok(fs.existsSync(ruta));
  assert.equal(repo.listar().length, 1);
});

test("repositorio archivo: tras guardar no queda ningún archivo temporal en la carpeta", () => {
  const carpeta = path.join(tempDir, "carpeta-temporales");
  const ruta = path.join(carpeta, "datos.json");
  const repo = crearRepositorioArchivo({ ruta, hidratar: (d) => d });

  repo.guardar({ id: 1 });
  repo.guardar({ id: 2 });

  const archivos = fs.readdirSync(carpeta);
  const temporales = archivos.filter((archivo) => archivo.includes(".tmp"));

  assert.equal(temporales.length, 0);
  assert.ok(archivos.includes("datos.json"));
});
