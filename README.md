# ActivityClassroom

Sistema académico integral que consolida **HU-01** (calendario académico), **HU-02** (grupos de trabajo), **HU-03** (envío de tareas), **HU-04** (revisión de tareas), **HU-05** (asignación de asientos y asistencia) y **HU-06** (tomar apuntes). Desarrollado con Node.js, Express, Vue 3 y persistencia híbrida.

## Pruebas

El repositorio integra una suite consolidada de **102 pruebas automatizadas**:

```sh
pnpm test
```

Este comando ejecuta ambas suites en secuencia:
1. `pnpm run test:dominio`: ejecuta **74 pruebas** nativas del dominio, persistencia y servicios de HU-01 y HU-02 utilizando el runner nativo `node --test` y `node:assert/strict`. No requiere ninguna dependencia externa instalada.
2. `pnpm run test:backend`: ejecuta **28 pruebas** unitarias utilizando **Jest**: 23 pruebas de los módulos de entregas y revisión (HU-03 y HU-04) con módulos ESM (`--experimental-vm-modules`), y 5 pruebas de asignación de asientos y asistencia (HU-05) con aislamiento CommonJS.

### ¿Por qué dos suites separadas?
Nuestras pruebas de HU-01 y HU-02 siguen la regla de cero dependencias externas y usan el ejecutor estándar `node --test` con patrones específicos por carpeta. Las pruebas de HU-03, HU-04 y HU-05 provienen de repositorios integrados y fueron diseñadas con Jest, apoyándose en utilidades como `jest.fn()` y `expect()`. Para evitar que `node --test` intente ejecutar archivos de Jest o que Jest capture pruebas de `node:test`, cada suite corre con su propio entorno y patrones delimitados (`testMatch` en Jest y argumentos por carpeta en `node --test`).

> **Nota:** Para ejecutar las pruebas de Jest se requiere haber instalado las dependencias del backend con `pnpm install` dentro de la carpeta `backend/`.

Para ejecutar cada suite por separado:

```sh
# Solo pruebas de dominio y persistencia (node --test) - 74 pruebas
pnpm run test:dominio

# Solo pruebas unitarias de backend (Jest) - 28 pruebas
pnpm run test:backend
```

## Equivalencia de historias

La correspondencia entre las historias de usuario del proyecto es la siguiente:

| Repositorio de origen | Nuestra numeración | Funcionalidad |
|---|---|---|
| — | **HU-01** | Calendario académico (clases, tareas, actividades, suspensiones) |
| — | **HU-02** | Grupos de trabajo (modalidades afinidad y sorteo) |
| **Sistema-academico** (US-01) | **HU-03** | Envío simulado de tareas por correo institucional con validación de adjunto |
| **Sistema-academico** (US-02) | **HU-04** | Revisión de tareas por el docente y retroalimentación estructurada |
| **SistemaAula** (`modulo-asientos`) | **HU-05** | Asignación física de asientos y control de asistencia en el aula |
| **SistemaAula** (`backend-apuntes`) | **HU-06** | Gestión y toma de apuntes académicos vinculados a materias |

## Créditos y autoría

Este repositorio consolida el trabajo colaborativo preservando los historiales completos de commits:
- **HU-01 y HU-02 (Calendario y Grupos):** Desarrolladas por Steven Joel Ramos Salazar y kn0wles.
- **HU-03 y HU-04 (Entregas y Revisión):** Desarrolladas originalmente en [Sistema-academico](https://github.com/anjoyy24/Sistema-academico.git) por **Joyce** (arquitectura base) y **arubis** (conjunto de pruebas unitarias Jest).
- **HU-05 y HU-06 (Asientos y Apuntes):** Desarrolladas originalmente en [SistemaAula](https://github.com/araozcamila313/SistemaAula.git) por **Camila Araoz** (módulo de asignación de asientos, frontend y pruebas Jest) y **Ximena Mendoza Humerez** (backend de apuntes, persistencia relacional PostgreSQL y frontend de notas).

Para explorar el historial completo preservado de todos los equipos:

```sh
git log --graph --oneline --all
```

## Calendario académico (HU-01)

La clase `EventoAcademico` representa una clase, una entrega de tarea, una
actividad o una suspensión, con fecha, horario opcional y descripción.
`CalendarioAcademico` registra eventos y consulta únicamente los de una materia;
si no existen eventos, devuelve un mensaje informativo y un arreglo vacío. Tanto
los eventos como los resultados de las consultas son de solo lectura.

### Uso mínimo

```javascript
import { CalendarioAcademico, EventoAcademico } from "./backend/src/modulos/calendario-academico/calendario-academico.js";

const calendario = new CalendarioAcademico();
calendario.registrarEvento(
  new EventoAcademico({
    id: "EV-01",
    materiaId: "MAT-101",
    tipo: "entrega_tarea",
    fecha: "2026-11-10",
    horario: "08:00 - 10:00",
    descripcion: "Entrega del primer avance",
  }),
);

console.log(calendario.consultarMateria("MAT-101").eventos);
```

Los identificadores son cadenas no vacías sin espacios en sus extremos y la
fecha debe ser una fecha real en formato `AAAA-MM-DD`. Los tipos admitidos son
`clase`, `entrega_tarea`, `actividad` y `suspension`. El horario es opcional. Los
datos inválidos producen `Error` con un mensaje descriptivo.

La [documentación de la tarea de calendario](docs/tarea-01-calendario-academico.md)
incluye UML, los ciclos TDD y las tareas siguientes.

## Grupos de trabajo (HU-02)

Primer incremento de **HU-02**: registrar y consultar los datos de un grupo de
trabajo asociado a una actividad académica.

La clase `GrupoTrabajo` admite afinidad o sorteo, rechaza integrantes duplicados,
respeta un tamaño máximo opcional y conserva los integrantes de solo lectura.
La modalidad sorteo registra un resultado ya definido; no distribuye estudiantes.

### Uso mínimo

```javascript
import { GrupoTrabajo } from "./backend/src/modulos/grupos-trabajo/grupo-trabajo.js";

const grupo = new GrupoTrabajo({
  nombre: "Equipo Alfa",
  actividadId: "ACT-01",
  modalidad: "afinidad",
  integrantes: ["EST-01", "EST-02"],
  maximoIntegrantes: 3,
});

console.log(grupo.nombre, grupo.actividadId, grupo.modalidad);
console.log(grupo.integrantes);
```

Los identificadores son cadenas no vacías sin espacios en sus extremos. Los
integrantes se reciben como un arreglo y se guardan en una copia congelada. El
grupo también se congela para impedir reasignaciones. El máximo es opcional
(`null` cuando no existe) y debe ser un entero positivo seguro. Los datos
inválidos producen `Error` con un mensaje descriptivo.

La [documentación de la tarea 02 de grupos](docs/tarea-02-grupo-trabajo.md) incluye
UML, los ciclos TDD y las tareas siguientes.

## Asignación de asientos y asistencia (HU-05)

Módulo que modela la distribución espacial de un aula física y el control de asistencia diaria:
- **Clases de dominio:** `Aula`, `Asiento` y `Estudiante` en `backend/asignacion_de_asientos/`.
- **Reglas:** Capacidad fija de 50 asientos (10 filas x 5 columnas), validación para impedir asignar asientos ocupados, liberación y asistencia inicial por defecto en `Ausente`.
- **Persistencia local:** Serialización en `backend/asignacion_de_asientos/datos.json` mediante `guardarDatos()` y `cargarDatos()`.
- **Frontend interactivo:** Cuadrícula interactiva de aula en `frontend/asignacion_de_asientos/index.html`.
- **Pruebas:** 5 pruebas unitarias Jest en `backend/asignacion_de_asientos/pruebas.test.js` normalizadas al estándar `HU-05`.

## Tomar apuntes de clase (HU-06)

Módulo que permite a los estudiantes gestionar notas académicas asociadas a sus materias:
- **Backend por capas:** `ApunteService` (reglas de negocio y validaciones), `ApunteRepository` (acceso a base de datos) y enrutador Express en `backend/apuntes/src/`.
- **Operaciones:** Listar materias, listar apuntes cronológicamente por estudiante (`x-estudiante-id`), ver detalle, crear, editar y eliminar con confirmación explícita (`confirmar=true`).
- **Persistencia relacional:** Tablas `materias`, `estudiantes` y `apuntes` en PostgreSQL (`backend/apuntes/db/schema.sql`).
- **Frontend interactivo:** Interfaz web completa con modales para crear, ver, editar y eliminar notas en `frontend/apuntes/` (`index.html`, `app.js`, `styles.css`).

## Persistencia

El almacenamiento en la aplicación se gestiona de forma desacoplada mediante el patrón repositorio:

1. **Almacenamiento en memoria compartida (por defecto):**
   Todos los módulos (`calendario-academico`, `grupos-trabajo`, `entregas-tareas` y `revision-tareas`) utilizan por defecto el almacén compartido en memoria (`backend/src/compartido/datos-memoria.js`), facilitando la ejecución de pruebas y demostraciones sin dependencias de servicios externos.

2. **Esquema relacional unificado:**
   En `backend/database/schema.sql` se define el modelo relacional para PostgreSQL con las tablas correspondientes a los 4 módulos: `estudiantes`, `docentes`, `tareas`, `entregas`, `feedback`, `eventos_academicos`, `grupos_trabajo` y `grupo_integrantes`.

3. **Adaptador opcional a archivos JSON (HU-01 y HU-02):**
   Para persistencia local en disco de eventos y grupos, se dispone de adaptadores en `backend/src/compartido/repositorios.js` que serializan a `eventos.json` y `grupos.json` dentro de `backend/data/` (o la ruta configurada en `DATA_DIR`).

### Ubicación y configuración (DATA_DIR)

La función `crearRepositoriosPersistentes({ directorio })` resuelve la ubicación
según la siguiente prioridad:
1. El argumento `{ directorio }` provisto explícitamente.
2. La variable de entorno `process.env.DATA_DIR`.
3. El directorio por defecto `backend/data/`.

### Control de versiones y pruebas

- Los archivos de datos generados en `backend/data/` están ignorados mediante
  `backend/data/.gitignore` (`*` y `!.gitignore`), garantizando que la información
  persistida localmente no se versione en el repositorio.
- Las pruebas automatizadas no tocan `backend/data/`; en su lugar, utilizan directorios
  temporales creados con `node:fs` (`mkdtempSync`) y `node:os` (`tmpdir()`),
  limpiándose automáticamente al finalizar la ejecución.
- La escritura a disco se realiza de forma atómica mediante un archivo temporal y
  `fs.renameSync`, garantizando que tras guardar no queden archivos temporales residuales.

## Interfaz

El frontend está desarrollado en Vue 3 con Vite, Vue Router y componentes accesibles (shadcn-vue y lucide). Consume el backend Express a través del proxy configurado en Vite hacia `/api`.

### Cómo ejecutar la aplicación

1. **Iniciar el backend:**
   ```bash
   cd backend
   pnpm install
   pnpm run dev
   ```
   El servidor iniciará en `http://127.0.0.1:3000/api`.

2. **Iniciar el frontend:**
   ```bash
   cd frontend
   pnpm install
   pnpm run dev
   ```
   La interfaz estará disponible en `http://127.0.0.1:5173`.

### Rutas de la interfaz

| Ruta | Nombre | Vista | Descripción |
|---|---|---|---|
| `/estudiante/calendario` | `calendario-estudiante` | `CalendarioView.vue` | Consulta de eventos por materia (HU-01) con avisos de clases suspendidas |
| `/docente/eventos` | `eventos-docente` | `EventosView.vue` | Registro de eventos académicos (clase, tarea, actividad, suspensión) (HU-01) |
| `/docente/grupos` | `grupos-docente` | `GruposView.vue` | Registro de grupos por afinidad o sorteo y consulta por actividad (HU-02) |
| `/estudiante` | `inicio-estudiante` | `InicioEstudianteView.vue` | Envío simulado de tareas (HU-03) |
| `/docente` | `inicio-docente` | `InicioDocenteView.vue` | Revisión de tareas y retroalimentación (HU-04) |
| `/` | `inicio` | `InicioView.vue` | Estado de la API y presentación del sistema |

### Endpoints HTTP de la API

- **HU-01 (Calendario)**:
  - `POST /api/calendario/eventos` → 201 `{ evento }`
  - `GET /api/calendario?materia=<id>` → 200 `{ mensaje, eventos }`
- **HU-02 (Grupos)**:
  - `POST /api/grupos` → 201 `{ grupo }`
  - `GET /api/grupos?actividad=<id>` → 200 `{ grupos }`
- **HU-03 (Entregas)**:
  - `POST /api/entregas` → 201 `{ id, estado, enviado, mensaje }`
- **HU-04 (Revisión)**:
  - `GET /api/revision/entregas?docente=<correo>&tarea=<codigo>` → 200 `{ entregas, simulado }`
  - `PUT /api/revision/entregas/:id/feedback` → 200 `{ ...entregaRevisada }`
  - `GET /api/revision/entregas/:id/adjunto?docente=<correo>` → Descarga binaria

### Documentación del Proyecto

- [Historias de usuario (HU-01 a HU-06)](docs/US.md)
- [Diagrama de clases unificado](docs/diagrama-clases.md)
- [Tarjetas CRC](docs/crc.md)
- [Tarea 01: Calendario académico](docs/tarea-01-calendario-academico.md)
- [Tarea 02: Formación de grupos](docs/tarea-02-grupo-trabajo.md)
- [Tarea 03: Envío de tareas por correo](docs/tarea-03-entrega-tarea.md)
- [Tarea 04: Revisión con feedback](docs/tarea-04-revision-tarea.md)
- [Matriz de aceptación](docs/matriz-aceptacion.md)
- [Roles y responsables](docs/roles.md)
- [Bitácora](docs/bitacora.md)
- [Informe de integración](docs/informe-integracion-repo-externo.md)
- [Fuentes de consulta](docs/fuentes.md)
