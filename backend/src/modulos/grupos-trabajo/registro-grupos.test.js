import assert from "node:assert/strict";
import { test } from "node:test";

import { crearAlmacenAcademico } from "../../compartido/almacen-academico.js";
import { GrupoTrabajo } from "./grupo-trabajo.js";
import { RegistroGrupos } from "./registro-grupos.js";
import { crearRepositorioGrupos } from "./grupos.repository.js";

const datosValidos = {
  nombre: "Grupo 1",
  actividadId: "ACT-01",
  modalidad: "afinidad",
  integrantes: ["EST-01", "EST-02"],
};

test("HU-02: un registro nuevo se crea sin grupos", () => {
  const registro = new RegistroGrupos();

  assert.deepEqual(registro.consultarPorActividad("ACT-01"), []);
});

test("HU-02: CA-01/CA-05 registra un grupo y lo consulta por su actividad", () => {
  const registro = new RegistroGrupos();
  const grupo = new GrupoTrabajo(datosValidos);

  registro.registrar(grupo);

  const resultado = registro.consultarPorActividad("ACT-01");

  assert.deepEqual(resultado, [grupo]);
  assert.deepEqual(resultado[0].integrantes, ["EST-01", "EST-02"]);
});

test("HU-02: CA-05 devuelve únicamente los grupos de la actividad consultada", () => {
  const registro = new RegistroGrupos();
  registro.registrar(new GrupoTrabajo(datosValidos));
  registro.registrar(
    new GrupoTrabajo({ ...datosValidos, nombre: "Grupo 2", actividadId: "ACT-02" }),
  );

  const resultado = registro.consultarPorActividad("ACT-01");

  assert.equal(resultado.length, 1);
  assert.equal(resultado[0].actividadId, "ACT-01");
});

test("HU-02: rechaza consultar con un identificador de actividad inválido", () => {
  const registro = new RegistroGrupos();

  for (const id of ["", "   ", " ACT-01", "ACT-01 ", null, undefined, 123]) {
    assert.throws(() => registro.consultarPorActividad(id), /actividad/);
  }
});

test("HU-02: rechaza registrar objetos que no son GrupoTrabajo", () => {
  const registro = new RegistroGrupos();

  for (const grupo of [{}, null, undefined, "Grupo 1"]) {
    assert.throws(() => registro.registrar(grupo), /instancia de GrupoTrabajo/);
  }
});

test("HU-02: RN-05 la consulta devuelve un arreglo de solo lectura", () => {
  const registro = new RegistroGrupos();
  registro.registrar(new GrupoTrabajo(datosValidos));

  const resultado = registro.consultarPorActividad("ACT-01");

  assert.throws(() => resultado.push({}), TypeError);
});

test("HU-02: cada consulta devuelve una copia independiente de los grupos", () => {
  const registro = new RegistroGrupos();
  registro.registrar(new GrupoTrabajo(datosValidos));

  const primera = registro.consultarPorActividad("ACT-01");
  registro.registrar(new GrupoTrabajo({ ...datosValidos, nombre: "Grupo 2" }));
  const segunda = registro.consultarPorActividad("ACT-01");

  assert.equal(primera.length, 1);
  assert.equal(segunda.length, 2);
});

test("HU-02: dos instancias que comparten el mismo repositorio ven los mismos datos", () => {
  const repositorio = crearRepositorioGrupos(crearAlmacenAcademico());
  const reg1 = new RegistroGrupos(repositorio);
  const reg2 = new RegistroGrupos(repositorio);
  reg1.registrar(new GrupoTrabajo(datosValidos));

  const resultado = reg2.consultarPorActividad("ACT-01");
  assert.equal(resultado.length, 1);
  assert.equal(resultado[0].nombre, "Grupo 1");
});

test("HU-02: una instancia sin argumentos sigue funcionando y queda aislada de otras", () => {
  const reg1 = new RegistroGrupos();
  const reg2 = new RegistroGrupos();
  reg1.registrar(new GrupoTrabajo(datosValidos));

  assert.equal(reg1.consultarPorActividad("ACT-01").length, 1);
  assert.equal(reg2.consultarPorActividad("ACT-01").length, 0);
});

