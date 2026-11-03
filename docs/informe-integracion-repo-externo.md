# Informe de integración del repositorio externo

## Datos del análisis

| Dato | Valor |
|---|---|
| Repositorio | `https://github.com/anjoyy24/Sistema-academico.git` |
| Remoto local | `externo` (solo `fetch`, sin `push`) |
| Ramas analizadas | `externo/main`, `externo/US-01-02`, `externo/US-01-unit-test` |
| Método | `git ls-tree`, `git show`, `git log`, `git diff` |
| Fecha del informe | 2026-11-02 |
| Modo | Solo lectura: sin checkout, sin instalación de dependencias, sin ejecutar su código |

El repositorio se incorporó como remoto y se descargaron todas sus ramas:

```sh
git remote add externo https://github.com/anjoyy24/Sistema-academico.git
git fetch externo '+refs/heads/*:refs/remotes/externo/*'
```

No se modificó ni se ejecutó nada del repositorio externo.

## Resumen ejecutivo

El repositorio externo es una aplicación distinta de la nuestra: implementa el envío
simulado de tareas (HU-03; US-01 en el repo externo) y la revisión con
retroalimentación (HU-04; US-02 en el repo externo) sobre un backend Express 5 y un
frontend Vue 3. Persiste todo en memoria, no incluye pruebas automatizadas y no
comparte historia con `ActivityClassroom`. La integración exige decisiones de
persistencia, estructura, `package.json`, dependencias y consolidación documental
antes de fusionar nada.

## Comparación entre ramas del repositorio externo

| Aspecto | `main` | `US-01-02` | `US-01-unit-test` |
|---|---|---|---|
| Commits | 3 | 6 (incluye el merge de `main`) | 13 (incluye autoría de arubis) |
| Módulos de negocio | Carpetas vacías con `.gitkeep` | `entregas-tareas` y `revision-tareas` completos | Idem a `US-01-02` |
| Persistencia | Sin almacén | `compartido/datos-memoria.js` (memoria) | `compartido/datos-memoria.js` (memoria) |
| Base de datos | Solo `database/README.md` | Agrega `database/schema.sql` (propuesta) | Idem a `US-01-02` |
| Dependencias backend | `cors`, `dotenv`, `express`, `pg` | Agrega `multer` | Agrega `jest` en `devDependencies` |
| Variables de entorno | `PORT`, `FRONTEND_ORIGIN`, `DATABASE_URL` | Agrega `INSTITUTIONAL_DOMAIN` | Idem a `US-01-02` |
| Frontend | Pantallas iniciales y cliente de prueba | Servicio de entregas y pantallas funcionales | Idem a `US-01-02` |
| Pruebas | Ninguna | Ninguna | 4 suites y 23 pruebas unitarias con Jest |

`US-01-02` contiene la base de `main` más la implementación de las dos historias por Joyce. Posteriormente, la rama `US-01-unit-test` añade las suites de pruebas unitarias implementadas por arubis con Jest.

## a) Variables de entorno

Solo se listan los nombres; no se reproducen valores.

| Variable | Archivo | Uso |
|---|---|---|
| `PORT` | `backend/.env.example`, `backend/src/config/env.js` | Puerto del servidor; se valida como entero dentro del rango permitido |
| `FRONTEND_ORIGIN` | `backend/.env.example`, `backend/src/config/env.js` | Origen autorizado por CORS |
| `INSTITUTIONAL_DOMAIN` | `backend/.env.example`, `backend/src/config/env.js` | Dominio exigido al correo del remitente (solo en `US-01-02`) |
| `DATABASE_URL` | `backend/.env.example`, `backend/src/config/env.js` | Cadena de conexión opcional; si falta, no se crea el pool |

Detalles:

- `dotenv` carga `backend/.env` mediante una ruta absoluta calculada con `import.meta.url`.
- El archivo `.env` real no está versionado; solo se versiona `backend/.env.example`.
- `config/env.js` exporta un objeto `config` con `port`, `frontendOrigin`,
  `institutionalDomain` y `databaseUrl`.
- `INSTITUTIONAL_DOMAIN` aparece únicamente en `US-01-02`; en `main` no existe.

## b) Persistencia

La persistencia real es **en memoria**:

- `backend/src/compartido/datos-memoria.js` crea un `Map` de entregas y exporta una
  instancia compartida. Se pierde al reiniciar el proceso.
- `entregas.repository.js` y `revision.repository.js` leen y escriben ese `Map`.
- `backend/src/compartido/correo-simulado.js` simula el correo; no envía nada real.

PostgreSQL está previsto, pero **no se usa para los datos del negocio**:

- `pg` está declarado como dependencia y `config/database.js` crea un `Pool` solo si
  `DATABASE_URL` tiene valor.
- El pool se usa únicamente en `GET /api/health` (`SELECT 1`) y en el cierre ordenado
  (`pool.end()`). Ningún repositorio ejecuta SQL.
- `backend/database/schema.sql` existe solo en `US-01-02`. Es una propuesta opcional,
  marcada como no ejecutada, con tablas de estudiantes, docentes, tareas, entregas y
  feedback. No hay migraciones, `seed.sql` ni integración con los repositorios.

No hay persistencia en JSON ni en archivos.

## c) Puntos de entrada, rutas y middlewares

### `backend/src/server.js`

- Importa `app`, `config` y el pool.
- Escucha en `127.0.0.1` y en el puerto configurado.
- Maneja `EADDRINUSE` y cierra el servidor y el pool ante `SIGINT`/`SIGTERM`.

### `backend/src/app.js`

Orden de registro:

1. `cors` con el origen configurado.
2. `express.json()`.
3. `statusRoutes` bajo `/api`.
4. Middleware que agrega `Cache-Control: no-store` a `/api`.
5. `entregasRoutes` bajo `/api/entregas`.
6. `revisionRoutes` bajo `/api/revision`.
7. Manejador 404 con respuesta JSON.
8. Manejador central de errores de cuatro argumentos: tamaño de archivo, errores de
   `multer`, `AppError`, JSON inválido, cuerpo demasiado grande y error genérico.

### Routers

| Archivo | Prefijo | Endpoints |
|---|---|---|
| `routes/status.routes.js` | `/api` | `GET /`, `GET /health` |
| `modulos/entregas-tareas/entregas.routes.js` | `/api/entregas` | `POST /enviar` con `multer` en memoria |
| `modulos/revision-tareas/revision.routes.js` | `/api/revision` | `GET /`, `PUT /:id/feedback`, `GET /:id/adjunto` |

Cada módulo sigue el recorrido **ruta → controlador → servicio → repositorio**, con un
archivo adicional de validaciones. `multer` acepta un solo archivo, limita el tamaño y
lo mantiene en memoria. La descarga del adjunto responde como binario con
`Content-Disposition` y `X-Content-Type-Options: nosniff`.

## d) Pruebas

- No existe script `test` en `backend/package.json` ni en `frontend/package.json`.
- No hay carpeta `test/`, `tests/`, `__tests__/` ni archivos `*.test.js` o `*.spec.js`.
- No hay framework de pruebas en dependencias ni en los lockfiles.
- No hay pruebas de US-01 ni de US-02.
- El `backend/README.md` lo reconoce: “No se incluyen unit tests”. Menciona que las
  fábricas `crearServicioEntregas` y `crearServicioRevision` permiten inyectar
  dependencias para probarlas más adelante, pero no hay evidencia de ciclos rojo-verde.
- Por tanto, no se cumple el requisito 1.4 de TDD en las historias externas.

## e) Frontend

- Framework: Vue 3 (`3.5.44`), JavaScript, sin TypeScript.
- Build: Vite (`8.3.5`); scripts `dev`, `build` y `preview`.
- Enrutamiento: Vue Router (`4.6.4`) con `createWebHistory` y tres rutas: inicio,
  docente y estudiante.
- UI: Tailwind CSS 4, componentes shadcn-vue sobre `reka-ui` e iconos `lucide`.
- Consumo de la API:
  - `src/services/api.js` llama a `GET /api` con `fetch`.
  - `src/services/entregas.js` centraliza las llamadas con `fetch` a rutas relativas
    bajo `/api`: envío con `FormData`, listado por tarea y docente, y feedback en JSON.
  - La descarga del adjunto se hace con un enlace directo a la ruta de revisión.
  - Vite reenvía `/api` al backend mediante `server.proxy`.
- Pantallas: `InicioView` muestra el estado de la API; `InicioEstudianteView` simula el
  envío; `InicioDocenteView` consulta entregas, descarga adjuntos y guarda feedback.
- No hay autenticación: los correos y códigos de tarea son filtros enviados por query
  string o cuerpo, no credenciales.

## f) Dependencias, Node, `.gitignore` y lockfiles

### Backend (`backend/package.json`)

| Dependencia | Versión resuelta |
|---|---|
| `express` | `5.3.0` |
| `pg` | `8.23.1` |
| `multer` | `2.5.0` |
| `dotenv` | `18.0.9` |
| `cors` | `2.8.6` |
| `nodemon` (dev) | `3.1.14` |

`"type": "module"`. No declara `engines`.

### Frontend (`frontend/package.json`)

| Dependencia | Versión resuelta |
|---|---|
| `vue` | `3.5.44` |
| `vue-router` | `4.6.4` |
| `vite` (dev) | `8.3.5` |
| `tailwindcss` (dev) | `4.3.3` |

Además usa `@lucide/vue`, `@vueuse/core`, `class-variance-authority`, `clsx`, `cn`,
`reka-ui`, `tailwind-merge`, `@tailwindcss/vite`, `@vitejs/plugin-vue` y
`tw-animate-css`. Tampoco declara `engines`.

### Versión de Node

- Ningún `package.json` declara `engines`.
- Los lockfiles exigen, de forma transitiva, Node `^20.19.0 || >=22.12.0` para las
  dependencias de Vite/Rolldown, y `18 || 20 || >=22` para otras. No hay una versión
  fijada por el proyecto.

### Lockfiles

- `backend/package-lock.json` y `frontend/package-lock.json`, ambos `lockfileVersion: 3`.
- Se versionan y se instalan con `npm ci`.

### `.gitignore`

- Raíz: ignora `node_modules/`, `dist/`, `dist-ssr/`, `.env` y `.env.*` (con excepción
  de `.env.example`), `*.local`, logs, `.DS_Store`, `.idea/` y directorios locales de
  herramientas.
- `backend/.gitignore`: `node_modules/`, `.env`, `.env.*` (excepto `.env.example`) y
  `*.log`.
- `frontend/.gitignore`: logs, `node_modules`, `dist`, `dist-ssr`, `.env`, `.env.*`
  (excepto `.env.example`), archivos de editor y del sistema.

## g) Documentación

| Documento | Contenido |
|---|---|
| `README.md` (raíz) | Presentación, ejecución de backend y frontend, organización, relación entre `main` y `US-01-02` |
| `backend/README.md` | Estructura por funcionalidad, endpoints, reglas de la demo, ausencia de pruebas y base de datos futura |
| `frontend/README.md` | Estructura, estilo, componentes y reglas del equipo |
| `backend/database/README.md` | Estado de `schema.sql` y ausencia de `seed.sql` |

No existe carpeta `docs/`. Tampoco hay historias de usuario en archivos, tarjetas CRC,
matriz de aceptación, bitácora, roles ni diagramas UML. Las referencias a US-01 y US-02
aparecen en `README.md` y en mensajes de commit, pero no como documentos trazables.

## h) Historial

| Dato | Resultado |
|---|---|
| Autor único | Joyce `<joyfq23@gmail.com>` |
| Commits en `main` | 3 |
| Commits en `US-01-02` | 6 (incluye el merge de `main`) |
| Fechas | Todos del 2026-11-02 |
| Ramas remotas | `main` y `US-01-02` |
| Etiquetas | Ninguna |
| `Co-authored-by` | Ninguno |
| Historia compartida con nuestro repo | No |

La raíz del repositorio externo es `83715ab`; la nuestra es `56b8c6a`. No existe
ancestro común entre `externo/main` y `develop`, ni entre `externo/US-01-02` y
`develop`.

Secuencia de `US-01-02`:

1. `83715ab` — configuración inicial (raíz común).
2. `9328652` — implementa US-01 y US-02.
3. `cd779d3` — mueve la carpeta `database` (rama de la historia).
4. `b4ce196` — mueve la carpeta `database` (rama `main`, mismo cambio por separado).
5. `5203851` — merge de `main` en `US-01-02`.

## Conflictos o decisiones pendientes

### 1. Numeración de historias

Equivalencia acordada entre equipos:

| Repo externo | Nuestra numeración | Funcionalidad |
|---|---|---|
| US-01 | **HU-03** | Envío simulado de tareas |
| US-02 | **HU-04** | Revisión de tareas con feedback |

- La correspondencia es fija: US-01 externa = HU-03 nuestra; US-02 externa = HU-04
  nuestra.
- No se renumera ninguna de las dos partes.
- En nuestros documentos se usa siempre HU-03/HU-04. Los nombres US-01/US-02 solo se
  mencionan como alias del repo externo en la matriz de trazabilidad.
- HU-01 (calendario) y HU-02 (grupos) son nuestras y ya están implementadas.

### 2. Persistencia compartida

- Nosotros trabajamos con clases en memoria.
- Ellos también usan memoria, pero además declaran `pg` y un `schema.sql` que no se
  ejecuta.
- No está definido quién es dueño de la persistencia común ni si se migrará a
  PostgreSQL.
- Decisión pendiente: mantener memoria para la entrega, adoptar PostgreSQL con
  migraciones y repositorios, o definir una interfaz de repositorio común. Si se adopta
  PostgreSQL, hay que decidir si se usa su `schema.sql` o uno propio y quién lo valida.

### 3. Estructura de carpetas

- En `develop` nuestras clases viven en la raíz del repositorio.
- En la rama actual `feature/estructura-backend` ya se movieron a las rutas finales
  `backend/src/modulos/calendario-academico/` y
  `backend/src/modulos/grupos-trabajo/`, compatibles con la organización del externo
  (`backend/src/modulos/<funcionalidad>/`).
- El externo separa rutas, controladores, servicios, repositorios y validaciones; nuestras
  clases de dominio no tienen esas capas.
- Decisión pendiente: confirmar que la estructura de `feature/estructura-backend` es la
  definitiva y decidir si nuestras clases se adaptan al esquema por capas o se mantienen
  como dominio puro dentro del módulo.

### 4. `package.json`, script `test` y ubicación de pruebas

- Nosotros tenemos un único `package.json` en la raíz con `"type": "module"` y
  `"test": "node --test"`.
- El externo tiene dos `package.json` (`backend/` y `frontend/`) y ninguno define
  `test`.
- Nuestras pruebas están junto a las clases; el externo no tiene pruebas.
- Decisión pendiente: un `package.json` raíz con workspaces, dos proyectos
  independientes, o un manifiesto raíz que orqueste ambos. También hay que definir si
  `npm test` ejecutará solo `backend` o también `frontend`, y si los `*.test.js` quedan
  junto al módulo o en una carpeta `test/` central.

### 5. Dependencias

- Nosotros no tenemos dependencias externas.
- Ellos usan `express`, `pg`, `multer`, `dotenv` y `cors` en backend, y Vue, Vite,
  Vue Router, Tailwind y shadcn-vue en frontend.
- Decisión pendiente: aceptar el costo de mantenimiento y auditoría de esas
  dependencias, o aislar la aplicación externa en un paquete separado. También hay que
  decidir si se instalan en la raíz o solo dentro de `backend/` y `frontend/`.

### 6. `.env.example`, `app.js`/`server.js` y estilo de código

- El externo introduce `backend/.env.example`, `backend/src/app.js` y
  `backend/src/server.js`; nosotros no tenemos ninguno.
- `INSTITUTIONAL_DOMAIN` solo existe en su rama de historias.
- Estilo: ellos usan comillas simples, punto y coma y, en varios archivos, varias
  sentencias por línea; nosotros usamos comillas dobles y una estructura más expandida.
- Decisión pendiente: definir un solo `.env.example` (o uno por paquete), confirmar si
  `app.js`/`server.js` son el punto de entrada oficial y acordar reglas de formato
  (Prettier/ESLint o convención manual) antes de mezclar código.

### 7. Estrategia de fusión con historiales no relacionados [RESUELTA]

- Se ejecutó la fusión mediante `git merge --no-ff --no-commit --allow-unrelated-histories externo/US-01-unit-test` sobre el commit `3dc8577c31df6e90ed73cf0f4850ee1f9ce3af8f`.
- Resolución explícita aplicada:
  - **Nuestras versiones (`--ours`):** `README.md`, `backend/.env.example`, `backend/src/app.js`, `backend/src/config/env.js`, `backend/src/server.js`, `frontend/src/assets/styles/componentes.css`, `frontend/src/components/Encabezado.vue`, `frontend/src/router/index.js` y `frontend/vite.config.js`.
  - **Versión externa (`--theirs`):** `backend/package.json` y `backend/package-lock.json` para incorporar Jest y sus scripts.
  - Los archivos nuevos del repo externo (`.gitignore`, `backend/README.md`, `backend/database/*`, `.gitkeep` y las suites de pruebas Jest en `tests/`) se integraron limpiamente al índice.

### 8. Pruebas y TDD [RESUELTA]

- La rama `externo/US-01-unit-test` incorporó 4 suites de pruebas unitarias con Jest (23 pruebas en total) creadas por arubis para validar los servicios y validaciones de entregas y revisión de tareas.
- Se configuró el `package.json` de la raíz para orquestar ambas suites sin interferencias:
  - `npm run test:dominio`: ejecuta las 74 pruebas nativas con `node --test` delimitadas por carpeta.
  - `npm run test:backend`: ejecuta las 23 pruebas de Jest con `--experimental-vm-modules` en `backend/`.
  - `npm test`: ejecuta secuencialmente ambas suites (97 pruebas en verde).

### 9. Documentación a consolidar

- Falta en el externo: historias de usuario en archivos, tarjetas CRC, matriz de
  aceptación, bitácora, roles y UML.
- Nuestro `docs/` ya contiene esos artefactos para HU-01 y HU-02.
- Decisión pendiente: crear documentos equivalentes para HU-03/HU-04 (US-01/US-02 en
  el repo externo), agregar sus clases al CRC y al UML, y unificar la matriz y la
  bitácora con la autoría real de cada equipo. También hay que decidir si se conserva
  su `README.md` o se integra en el nuestro.

## Evidencia de la inspección

Comandos utilizados, todos de lectura:

```sh
git remote add externo https://github.com/anjoyy24/Sistema-academico.git
git fetch externo '+refs/heads/*:refs/remotes/externo/*'
git ls-tree -r --name-only externo/main
git ls-tree -r --name-only externo/US-01-02
git diff --name-status externo/main externo/US-01-02
git log --graph --oneline --decorate --all
git show externo/US-01-02:backend/package.json
git show externo/US-01-02:backend/src/app.js
git show externo/US-01-02:backend/database/schema.sql
git show externo/US-01-02:frontend/package.json
git merge-base externo/main develop
```

Resultados relevantes:

- `git merge-base` no devuelve ancestro común.
- No hay archivos de prueba ni scripts `test` en el externo.
- Solo está versionado `backend/.env.example`; ningún `.env` real.

## Estructura observada en `externo/US-01-02`

```text
backend/
├── database/
│   ├── README.md
│   └── schema.sql
├── src/
│   ├── app.js
│   ├── server.js
│   ├── compartido/
│   │   ├── correo-simulado.js
│   │   ├── datos-memoria.js
│   │   ├── error.js
│   │   └── validaciones.js
│   ├── config/
│   │   ├── database.js
│   │   └── env.js
│   ├── modulos/
│   │   ├── entregas-tareas/
│   │   │   ├── entregas.controller.js
│   │   │   ├── entregas.repository.js
│   │   │   ├── entregas.routes.js
│   │   │   ├── entregas.service.js
│   │   │   └── entregas.validaciones.js
│   │   └── revision-tareas/
│   │       ├── revision.controller.js
│   │       ├── revision.repository.js
│   │       ├── revision.routes.js
│   │       ├── revision.service.js
│   │       └── revision.validaciones.js
│   └── routes/
│       └── status.routes.js
├── .env.example
├── .gitignore
├── package.json
└── package-lock.json
frontend/
├── src/
│   ├── components/
│   ├── router/
│   ├── services/
│   │   ├── api.js
│   │   └── entregas.js
│   └── views/
│       ├── InicioView.vue
│       ├── docente/InicioDocenteView.vue
│       └── estudiante/InicioEstudianteView.vue
├── package.json
├── package-lock.json
└── vite.config.js
```
