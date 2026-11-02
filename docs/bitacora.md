# Bitácora de programación en pareja

Registrar solo lo que ocurrió. Si una parte la hizo una sola persona, se anota así y la rotación empieza desde ahí.
Para cada commit, el piloto escribe y el navegante va como `Co-authored-by`.

## Ciclo 1: instanciación de RegistroGrupos

| Fecha | Tarea / ciclo TDD | Piloto | Copiloto | Rotación a los... | Commit |
|---|---|---|---|---|---|
| 2026-11-02 | Código de RegistroGrupos escrito antes que la prueba (sin evidencia de rojo previo) | | | | |
| 2026-11-0X | Rojo: mover `registro-grupos.js` fuera y correr `node --test` (`ERR_MODULE_NOT_FOUND`) | | | | |
| 2026-11-0X | Verde: devolver el archivo y correr `node --test` | | | | |

Salida del rojo:

```
✔ HU-01: registra y permite consultar eventos de una materia (3.552476ms)
✔ HU-01: devuelve únicamente los eventos de la materia consultada (0.380315ms)
✔ HU-01: informa cuando no existen eventos para una materia (0.318172ms)
✔ HU-01: refleja suspensiones registradas en el calendario (0.50149ms)
✔ HU-01: rechaza identificadores inválidos de evento y materia (1.154536ms)
✔ HU-01: rechaza tipos de evento no admitidos (0.414047ms)
✔ HU-01: rechaza fechas inválidas o con formato distinto de AAAA-MM-DD (0.499414ms)
✔ HU-01: acepta eventos sin horario o con horario nulo (0.227577ms)
✔ HU-01: rechaza horarios vacíos o con espacios en los extremos (0.303483ms)
✔ HU-01: rechaza descripciones vacías o no textuales (0.372953ms)
✔ HU-01: rechaza un estado de suspensión no booleano (0.316026ms)
✔ HU-01: registra todos los tipos de evento admitidos (0.304838ms)
✔ HU-01: rechaza registrar objetos que no son eventos (0.216567ms)
✔ HU-01: rechaza consultar una materia con identificador inválido (0.180167ms)
✔ HU-01: no permite reasignar datos de un evento establecido (1.49556ms)
✔ HU-01: no permite modificar el arreglo de eventos consultado (0.198948ms)
✔ HU-01: la consulta vacía devuelve un arreglo congelado (0.183517ms)
✔ HU-01: cada consulta devuelve una copia independiente de los eventos (0.140707ms)
✔ registra y permite consultar un grupo por afinidad (8.224764ms)
✔ registra integrantes de un sorteo ya realizado (0.266866ms)
✔ rechaza integrantes duplicados (0.59266ms)
✔ rechaza un grupo que supera el máximo (0.290464ms)
✔ acepta un grupo con el máximo exacto (0.312079ms)
✔ acepta un grupo sin máximo establecido (0.242608ms)
✔ rechaza nombre o actividad sin datos válidos (0.448734ms)
✔ rechaza modalidades no admitidas (0.412259ms)
✔ rechaza grupos sin un arreglo de integrantes no vacío (0.418547ms)
✔ rechaza identificadores de integrantes inválidos y arreglos con huecos (0.446281ms)
✔ rechaza identificador de actividad con espacios en los extremos (0.230543ms)
✔ rechaza un máximo que no sea un entero positivo seguro (0.486564ms)
✔ no permite reasignar datos de un grupo establecido (0.281707ms)
✔ no permite cambiar ni agregar integrantes (0.238012ms)
✔ modificar la lista original no cambia el grupo (0.186984ms)
✔ HU-02: un registro nuevo se crea sin grupos (1.775004ms)
✔ HU-02 CA-01/CA-05: registra un grupo y lo consulta por su actividad (3.871294ms)
✔ HU-02 CA-05: devuelve únicamente los grupos de la actividad consultada (0.252866ms)
✔ HU-02: rechaza consultar con un identificador de actividad inválido (0.481101ms)
✖ HU-02: rechaza registrar objetos que no son GrupoTrabajo (0.740957ms)
✔ HU-02 RN-06: la consulta devuelve un arreglo de solo lectura (0.204778ms)
ℹ tests 39
ℹ suites 0
ℹ pass 38
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 115.021177

✖ failing tests:

test at registro-grupos.test.js:53:1
✖ HU-02: rechaza registrar objetos que no son GrupoTrabajo (0.740957ms)
  AssertionError [ERR_ASSERTION]: Missing expected exception.
      at TestContext.<anonymous> (file:///mnt/PROGRAM'S/WEB/SIS_INFO_2/ActivityClassroom/registro-grupos.test.js:57:16)
      at Test.runInAsyncScope (node:async_hooks:226:14)
      at Test.run (node:internal/test_runner/test:1402:25)
      at Test.processPendingSubtests (node:test_runner/test:974:7)
      at Test.postRun (node:test_runner/test:1542:7)
      at Test.run (node:internal/test_runner/test:1467:7)
      at async Test.processPendingSubtests (node:test_runner/test:974:7) {
    generatedMessage: false,
    code: 'ERR_ASSERTION',
    actual: undefined,
    expected: /instancia de GrupoTrabajo/,
    operator: 'throws',
    diff: 'simple'
  }
```

Salida del verde:

```
(pegar aquí la salida de node --test)
```

## Ciclo 2: registrar y consultar por actividad (CA-01, CA-05)

| Fecha | Tarea / ciclo TDD | Piloto | Copiloto | Rotación a los... | Commit |
|---|---|---|---|---|---|
| 2026-11-0X | | | | | |

## Ciclo 3: validación y solo lectura

| Fecha | Tarea / ciclo TDD | Piloto | Copiloto | Rotación a los... | Commit |
|---|---|---|---|---|---|
| 2026-11-0X | Rojo: `registrar` acepta objetos que no son GrupoTrabajo | | | | |
| 2026-11-0X | Verde: añadir validación `instanceof GrupoTrabajo` | | | | |

## Evidencia de la sesión

- Captura de la llamada o sesión compartida: (adjuntar y enlazar aquí)
- Modalidad: remota por VPN, un solo piloto escribe a la vez.