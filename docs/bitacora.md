# Bitácora de programación en pareja

Registrar solo lo que ocurrió. Si una parte la hizo una sola persona, se anota así y la rotación empieza desde ahí.
Para cada commit, el piloto escribe y el navegante va como `Co-authored-by`.

## Autoría por historia

| Historia | Módulo | Autor principal | Copiloto | Commits de referencia |
|---|---|---|---|---|
| HU-01 | Código base | kn0wles | Stevenjoelrs | d218674, bb65ad6, 9971a52 |
| HU-01 | Documentación | Stevenjoelrs | kn0wles | 57dd779, 9b55857 |
| HU-02 | Código base, clases y pruebas iniciales | Stevenjoelrs | kn0wles | f35aac5, 0d53237, 3fe843a |
| HU-02 | Complemento de pruebas y documentación | kn0wles | Stevenjoelrs | 73325b4, 7d2ab51, 9b55857 |
| HU-01/HU-02 | Auditoría TDD/XP/CRC | kn0wles | Stevenjoelrs | 0944352 |

Los commits nuevos de la auditoría incorporan el trailer `Co-authored-by` del copiloto. La tabla registra la autoría acordada por la matriz; los commits históricos anteriores a la auditoría conservan el autor con el que fueron publicados.

## Ciclo 1: instanciación de RegistroGrupos

| Fecha | Tarea / ciclo TDD | Piloto | Copiloto | Rotación a los... | Commit |
|---|---|---|---|---|---|
| 2026-11-02 | Código de RegistroGrupos escrito antes que la prueba (sin evidencia de rojo previo) | Stevenjoelrs | kn0wles | kn0wles | 73325b4 |

## Ciclo 2: registrar y consultar por actividad (CA-01, CA-05)

| Fecha | Tarea / ciclo TDD | Piloto | Copiloto | Rotación a los... | Commit |
|---|---|---|---|---|---|
| 2026-11-02 | Pruebas de registro y consulta por actividad (CA-01, CA-05) | kn0wles | Stevenjoelrs | Stevenjoelrs | 73325b4 |

## Ciclo 3: validación y solo lectura

| Fecha | Tarea / ciclo TDD | Piloto | Copiloto | Rotación a los... | Commit |
|---|---|---|---|---|---|
| 2026-11-02 | Rojo: `registrar` acepta objetos que no son GrupoTrabajo | kn0wles | Stevenjoelrs | Stevenjoelrs | 73325b4 |
| 2026-11-02 | Verde: añadir validación `instanceof GrupoTrabajo` | kn0wles | Stevenjoelrs | Stevenjoelrs | 7d2ab51 |

### Evidencia del ciclo 3

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
✔ HU-02 RN-05: la consulta devuelve un arreglo de solo lectura (0.204778ms)
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
      at Test.run (node:internal/test_runner/test:974:7)
      at Test.postRun (node:internal/test_runner/test:1542:19)
      at Test.run (node:internal/test_runner/test:1467:7)
      at Test.processPendingSubtests (node:internal/test_runner/test:974:7) {
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
✔ HU-01: registra y permite consultar eventos de una materia (1.688347ms)
✔ HU-01: devuelve únicamente los eventos de la materia consultada (0.320925ms)
✔ HU-01: informa cuando no existen eventos para una materia (0.160516ms)
✔ HU-01: refleja suspensiones registradas en el calendario (0.182283ms)
✔ HU-01: rechaza identificadores inválidos de evento y materia (0.603795ms)
✔ HU-01: rechaza tipos de evento no admitidos (0.233148ms)
✔ HU-01: rechaza fechas inválidas o con formato distinto de AAAA-MM-DD (0.431432ms)
✔ HU-01: acepta eventos sin horario o con horario nulo (0.239698ms)
✔ HU-01: rechaza horarios vacíos o con espacios en los extremos (0.379375ms)
✔ HU-01: rechaza descripciones vacías o no textuales (0.41596ms)
✔ HU-01: rechaza un estado de suspensión no booleano (0.26404ms)
✔ HU-01: registra todos los tipos de evento admitidos (0.215227ms)
✔ HU-01: rechaza registrar objetos que no son eventos (0.309738ms)
✔ HU-01: rechaza consultar una materia con identificador inválido (0.316806ms)
✔ HU-01: no permite reasignar datos de un evento establecido (0.301494ms)
✔ HU-01: no permite modificar el arreglo de eventos consultado (0.224153ms)
✔ HU-01: la consulta vacía devuelve un arreglo congelado (0.162164ms)
✔ HU-01: cada consulta devuelve una copia independiente de los eventos (0.139413ms)
✔ registra y permite consultar un grupo por afinidad (3.869637ms)
✔ registra integrantes de un sorteo ya realizado (0.327667ms)
✔ rechaza integrantes duplicados (0.716318ms)
✔ rechaza un grupo que supera el máximo (0.343427ms)
✔ acepta un grupo con el máximo exacto (0.301063ms)
✔ acepta un grupo sin máximo establecido (0.274678ms)
✔ rechaza nombre o actividad sin datos válidos (0.548753ms)
✔ rechaza modalidades no admitidas (0.422026ms)
✔ rechaza grupos sin un arreglo de integrantes no vacío (0.405143ms)
✔ rechaza identificadores de integrantes inválidos y arreglos con huecos (0.646256ms)
✔ rechaza identificador de actividad con espacios en los extremos (0.295019ms)
✔ rechaza un máximo que no sea un entero positivo seguro (0.463283ms)
✔ no permite reasignar datos de un grupo establecido (0.321185ms)
✔ no permite cambiar ni agregar integrantes (0.233271ms)
✔ modificar la lista original no cambia el grupo (0.199036ms)
✔ HU-02: un registro nuevo se crea sin grupos (2.317454ms)
✔ HU-02 CA-01/CA-05: registra un grupo y lo consulta por su actividad (0.744466ms)
✔ HU-02 CA-05: devuelve únicamente los grupos de la actividad consultada (0.35259ms)
✔ HU-02: rechaza consultar con un identificador de actividad inválido (0.712901ms)
✔ HU-02: rechaza registrar objetos que no son GrupoTrabajo (0.384847ms)
✔ HU-02 RN-05: la consulta devuelve un arreglo de solo lectura (0.216737ms)
ℹ tests 39
ℹ suites 0
ℹ pass 39
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 114.406791
```

Nota de auditoría: la salida histórica se normalizó al identificador `RN-05`; el
renombre real del test quedó en el commit `9b55857`.

## Ciclo HU-01: calendario académico

| Fecha | Tarea / ciclo TDD | Piloto | Copiloto | Rotación a los... | Commit |
|---|---|---|---|---|---|
| 2026-11-02 | Código base de EventoAcademico y CalendarioAcademico | kn0wles | Stevenjoelrs | Stevenjoelrs | d218674, bb65ad6, 9971a52 |
| 2026-11-02 | Documentación de la tarea de calendario | Stevenjoelrs | kn0wles | kn0wles | 57dd779, 9b55857 |

## Evidencia de la sesión

- Captura de la llamada o sesión compartida: pendiente de adjuntar.
- Modalidad: remota por VPN, un solo piloto escribe a la vez.


---

## Ciclo de Integración: SistemaAula en ActivityClassroom

| Fecha | Tarea / ciclo | Piloto | Copiloto | Rotación a los... | Commit |
|---|---|---|---|---|---|
| 2026-11-03 | Fusión de modulo-asientos y feature/frontend-apuntes | kn0wles | Stevenjoelrs | Stevenjoelrs | 8aafd8c, 97c3615 |
| 2026-11-03 | Reorganización de estructura modular en backend con `git mv` | kn0wles | Stevenjoelrs | Stevenjoelrs | 87c0525 |
| 2026-11-03 | Conversión mecánica a CommonJS y adaptación de pruebas a Jest | kn0wles | Stevenjoelrs | kn0wles | c6a09be |
| 2026-11-03 | Actualización de documentación, roles, matriz y bitácora | Stevenjoelrs | kn0wles | kn0wles | pendiente |

### Salida real de la verificación (`npm test`)

```text
$ node node_modules/jest/bin/jest.js --runInBand
PASS backend/calendario/calendario-academico.test.js
PASS ./pruebas.test.js
PASS backend/grupos/grupo-trabajo.test.js
PASS backend/grupos/registro-grupos.test.js

Test Suites: 4 passed, 4 total
Tests:       48 passed, 48 total
Snapshots:   0 total
Time:        0.753 s, estimated 1 s
Ran all test suites.
```

Total de pruebas: 43 de ActivityClassroom (21 calendario, 15 grupos, 7 registro) + 5 de SistemaAula (asientos y asistencia) = **48 pruebas en verde**.

### Evidencias de la sesión de integración

- Capturas de pantalla o sesión compartida: pendiente de adjuntar.
- Modalidad: pair programming remoto.

### Pendientes identificados

1. **Unificación de identificadores de dominio:** Homogeneizar formato de materia (`MAT-101` vs `materia.id`) y de estudiante (`EST-01` vs `matricula`).
2. **Persistencia mixta:** Armonizar almacenamiento en memoria (`calendario`, `grupos`) con la base de datos relacional PostgreSQL (`asignacion_de_asientos`, `apuntes`).
3. **Pruebas de apuntes:** Implementar suite de pruebas unitarias automatizadas con Jest para el servicio y repositorio de apuntes.
4. **Frontend de apuntes:** Integrar el frontend de apuntes a la estructura general de interfaz.
