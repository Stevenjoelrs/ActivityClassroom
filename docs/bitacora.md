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

## Sesión de integración: SistemaAula en ActivityClassroom (HU-05 y HU-06)

- **Fecha:** 2026-11-03
- **Piloto:** kn0wles
- **Copiloto:** Stevenjoelrs
- **Objetivo:** Integrar el repositorio externo `SistemaAula` (ramas `modulo-asientos` y `feature/backend-apuntes`), preservando todo su historial git sin `--squash` ni `--force`, alineando la arquitectura con la rama base `develop` y normalizando los runners de pruebas a 102 pruebas en verde.

### Pasos ejecutados
1. **Verificación y diagnóstico inicial:** Comprobación del estado limpio del árbol de trabajo, remotos configurados y confirmación de que la rama base activa en el origen es `develop`.
2. **Fusión no trivial de historias:** En la rama de trabajo `integracion/sistema-aula`, se incorporaron los historiales de `sistemaaula/modulo-asientos` y `sistemaaula/feature/backend-apuntes` mediante `--allow-unrelated-histories`, resolviendo conflictos conservando el diseño estructural y los archivos originales de `develop`.
3. **Puesta al día con `develop`:** Fusión de `origin/develop` dentro de `integracion/sistema-aula` (commit `9480897`), asegurando que todos los desarrollos de HU-01 a HU-04 (incluyendo los 74 tests de `node:test` y 23 tests de `jest`) permanezcan intactos.
4. **Aislamiento modular CommonJS en raíz ESM:**
   - Creación de `backend/asignacion_de_asientos/package.json` con `{"type": "commonjs"}`.
   - Creación de `backend/apuntes/package.json` con `{"type": "commonjs"}`.
   - Preservación de la raíz `"type": "module"` en `package.json` y `backend/package.json`.
5. **Normalización de pruebas y runner:**
   - Movimiento de `pruebas.test.js` a `backend/asignacion_de_asientos/pruebas.test.js`.
   - Normalización de los títulos de las 5 pruebas de asientos al estándar `HU-05: ...`.
   - Inclusión de `<rootDir>/asignacion_de_asientos/**/*.test.js` en `jest.testMatch` dentro de `backend/package.json`.
6. **Reorganización y limpieza del árbol:**
   - Frontend de apuntes ubicado en `frontend/apuntes/` (`index.html`, `app.js`, `styles.css`).
   - Frontend de asientos preservado en `frontend/asignacion_de_asientos/index.html`.
   - Ajuste de rutas estáticas en `backend/apuntes/src/app.js` y `backend/server.js`.
   - Adición de `datos.json` al `.gitignore` para no versionar la persistencia local de asientos.
   - Limpieza de archivos redundantes (`package-lock.json`, `pnpm-workspace.yaml`, `.gitkeep`, `docs/class.puml`, `tests/`).
   - Unificación de variables relacionales en `backend/.env.example`.
7. **Actualización documental integral:** Actualización de `docs/roles.md`, `docs/US.md`, `docs/matriz-aceptacion.md`, `docs/fuentes.md`, `docs/diagrama-clases.md`, `docs/crc.md` y `README.md`.

### Problemas encontrados y soluciones aplicadas
- **Incompatibilidad de módulos (ESM vs CommonJS):** El código heredado de `SistemaAula` utilizaba `require` y `module.exports`, lo que chocaba con el entorno ESM nativo de `develop`. Se resolvió definiendo submanifiestos locales `{"type": "commonjs"}` en cada subdirectorio correspondiente, permitiendo la coexistencia sin alterar la lógica de negocio.
- **Ruta de persistencia local en `Aula.js`:** Se verificó que `Aula.js` utiliza `path.join(__dirname, 'datos.json')`, operando de manera aislada dentro de `backend/asignacion_de_asientos/` sin ensuciar la raíz del proyecto. Se agregó la regla correspondiente a `.gitignore`.
- **Ausencia de pruebas en HU-06:** Se verificó que `feature/backend-apuntes` no contenía suite de pruebas en el repositorio de origen; se documentó explícitamente en la matriz y bitácora con 0 pruebas asignadas.

### Evidencia de ejecución real (`pnpm test`):
```text
$ pnpm run test:dominio && pnpm run test:backend
$ node --test "backend/src/compartido/*.test.js" "backend/src/modulos/calendario-academico/*.test.js" "backend/src/modulos/grupos-trabajo/*.test.js"
✔ repositorio archivo: archivo inexistente devuelve lista vacía
✔ repositorio archivo: guardar y volver a crear con la misma ruta devuelve instancias del dominio
✔ repositorio archivo: JSON inválido lanza Error con mensaje claro
✔ repositorio archivo: datos inválidos dentro del archivo lanzan el Error de validación del dominio
✔ repositorio archivo: crea la carpeta si no existe
✔ repositorio archivo: tras guardar no queda ningún archivo temporal en la carpeta
✔ repositorios persistentes: guarda en eventos.json y grupos.json dentro del directorio y los recupera
✔ repositorios persistentes: sin argumento usa process.env.DATA_DIR si está definido
✔ repositorios persistentes: sin argumento ni DATA_DIR usa backend/data/
✔ HU-01: CA-01/CA-05 registra y consulta una clase con fecha, horario y descripción
✔ HU-01: CA-02 registra una entrega de tarea con su fecha
✔ HU-01: CA-03 registra una actividad académica con su descripción
✔ HU-01: CA-04 refleja suspensiones registradas en el calendario
✔ HU-01: CA-06 informa cuando no existen eventos para una materia
✔ HU-01: devuelve únicamente los eventos de la materia consultada
✔ HU-01: rechaza identificadores inválidos de evento y materia
✔ HU-01: rechaza tipos de evento no admitidos
✔ HU-01: rechaza fechas inválidas o con formato distinto de AAAA-MM-DD
✔ HU-01: acepta eventos sin horario o con horario nulo
✔ HU-01: rechaza horarios vacíos o con espacios en los extremos
✔ HU-01: rechaza descripciones vacías o no textuales
✔ HU-01: rechaza un estado de suspensión no booleano
✔ HU-01: admite todos los tipos de evento
✔ HU-01: rechaza registrar objetos que no son eventos
✔ HU-01: rechaza consultar una materia con identificador inválido
✔ HU-01: no permite reasignar datos de un evento establecido
✔ HU-01: no permite modificar el arreglo de eventos consultado
✔ HU-01: la consulta vacía devuelve un arreglo congelado
✔ HU-01: el resultado de la consulta es de solo lectura
✔ HU-01: cada consulta devuelve una copia independiente de los eventos
✔ HU-01: dos instancias que comparten el mismo repositorio ven los mismos datos
✔ HU-01: una instancia sin argumentos sigue funcionando y queda aislada de otras
✔ HU-01 repositorio: guardar y listar eventos
✔ HU-01 repositorio: dos almacenes distintos no comparten datos
✔ HU-01 repositorio: listar() devuelve una copia que no altera el almacén
✔ HU-01 repositorio: expone el singleton repositorioCalendario
✔ servicio calendario: registrar y consultar por materia (CA-01, CA-02, CA-03, CA-05)
✔ servicio calendario: clase con suspendido: true reflejada (CA-04)
✔ servicio calendario: materia sin eventos devuelve mensaje y arreglo vacío (CA-06)
✔ servicio calendario: un Error del dominio se convierte en AppError(400) con el mismo mensaje
✔ servicio calendario: conserva los eventos al recrearse sobre el mismo archivo JSON
✔ HU-02: CA-02/CA-04 registra y permite consultar un grupo por afinidad
✔ HU-02: CA-03 registra integrantes de un sorteo ya realizado
✔ HU-02: CA-06 rechaza integrantes duplicados
✔ HU-02: CA-07 rechaza un grupo que supera el máximo
✔ HU-02: acepta un grupo con el máximo exacto
✔ HU-02: acepta un grupo sin máximo establecido
✔ HU-02: rechaza nombre o actividad sin datos válidos
✔ HU-02: RN-01 rechaza modalidades no admitidas
✔ HU-02: rechaza grupos sin un arreglo de integrantes no vacío
✔ HU-02: rechaza identificadores de integrantes inválidos y arreglos con huecos
✔ HU-02: rechaza identificador de actividad con espacios en los extremos
✔ HU-02: rechaza un máximo que no sea un entero positivo seguro
✔ HU-02: RN-05 no permite reasignar datos de un grupo establecido
✔ HU-02: RN-05 no permite cambiar ni agregar integrantes
✔ HU-02: RN-05 modificar la lista original no cambia el grupo
✔ HU-02 repositorio: guardar y listar grupos
✔ HU-02 repositorio: dos almacenes distintos no comparten datos
✔ HU-02 repositorio: listar() devuelve una copia que no altera el almacén
✔ HU-02 repositorio: expone el singleton repositorioGrupos
✔ servicio grupos: registrar y consultar por actividad, afinidad y sorteo
✔ servicio grupos: integrante duplicado lanza AppError(400)
✔ servicio grupos: maximo superado lanza AppError(400)
✔ servicio grupos: otra actividad no lo devuelve y valida id de actividad
✔ servicio grupos: conserva los grupos al recrearse sobre el mismo archivo JSON
✔ HU-02: un registro nuevo se crea sin grupos
✔ HU-02: CA-01/CA-05 registra un grupo y lo consulta por su actividad
✔ HU-02: CA-05 devuelve únicamente los grupos de la actividad consultada
✔ HU-02: rechaza consultar con un identificador de actividad inválido
✔ HU-02: rechaza registrar objetos que no son GrupoTrabajo
✔ HU-02: RN-05 la consulta devuelve un arreglo de solo lectura
✔ HU-02: cada consulta devuelve una copia independiente de los grupos
✔ HU-02: dos instancias que comparten el mismo repositorio ven los mismos datos
✔ HU-02: una instancia sin argumentos sigue funcionando y queda aislada de otras
ℹ tests 74
ℹ suites 0
ℹ pass 74
ℹ fail 0

$ pnpm --prefix backend test
$ node --experimental-vm-modules node_modules/jest/bin/jest.js
PASS asignacion_de_asientos/pruebas.test.js
PASS src/modulos/entregas-tareas/tests/entregas.service.test.js
PASS src/modulos/revision-tareas/tests/revision.service.test.js
PASS src/modulos/entregas-tareas/tests/entregas.validaciones.test.js
PASS src/modulos/revision-tareas/tests/revision.validaciones.test.js

Test Suites: 5 passed, 5 total
Tests:       28 passed, 28 total
Snapshots:   0 total
Time:        0.598 s
Ran all test suites.

Total suite unificada: 74 (node:test) + 28 (Jest) = 102 pruebas en verde (0 fallos).
```
