import assert from "node:assert/strict";
import { test } from "node:test";

import { GrupoTrabajo } from "./grupo-trabajo.js";
import { RegistroGrupos } from "./registro-grupos.js";

const datosValidos = {
    nombre: "Grupo 1",
    actividadId: "ACT-01",
    modalidad: "afinidad",
    integrantes: ["EST-01", "EST-02"],
};

// Ciclo 1: instanciación
test("HU-02: un registro nuevo se crea sin grupos", () => {
    const registro = new RegistroGrupos();

    assert.deepEqual(registro.consultarPorActividad("ACT-01"), []);
});

// Ciclo 2: CA-01 y CA-05
test("HU-02 CA-01/CA-05: registra un grupo y lo consulta por su actividad", () => {
    const registro = new RegistroGrupos();
    const grupo = new GrupoTrabajo(datosValidos);

    registro.registrar(grupo);

    assert.deepEqual(registro.consultarPorActividad("ACT-01"), [grupo]);
});

test("HU-02 CA-05: devuelve únicamente los grupos de la actividad consultada", () => {
    const registro = new RegistroGrupos();
    registro.registrar(new GrupoTrabajo(datosValidos));
    registro.registrar(
        new GrupoTrabajo({ ...datosValidos, nombre: "Grupo 2", actividadId: "ACT-02" }),
    );

    const resultado = registro.consultarPorActividad("ACT-01");

    assert.equal(resultado.length, 1);
    assert.equal(resultado[0].actividadId, "ACT-01");
});

// Ciclo 3: validaciones y solo lectura
test("HU-02: rechaza consultar con un identificador de actividad inválido", () => {
    const registro = new RegistroGrupos();

    for (const id of ["", "   ", null, undefined, 123]) {
        assert.throws(() => registro.consultarPorActividad(id), /actividad/);
    }
});

test("HU-02: rechaza registrar objetos que no son GrupoTrabajo", () => {
    const registro = new RegistroGrupos();

    for (const grupo of [{}, null, undefined, "Grupo 1"]) {
        assert.throws(() => registro.registrar(grupo), /instancia de GrupoTrabajo/);
    }
});

test("HU-02 RN-06: la consulta devuelve un arreglo de solo lectura", () => {
    const registro = new RegistroGrupos();
    registro.registrar(new GrupoTrabajo(datosValidos));

    const resultado = registro.consultarPorActividad("ACT-01");

    assert.throws(() => resultado.push({}), TypeError);
});