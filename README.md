# ActivityClassroom

Primeros incrementos de **HU-01** (calendario académico) y **HU-02** (registro de
grupos de trabajo). JavaScript con Node.js, sin dependencias externas.

## Ejecutar las pruebas

Desde la raíz del proyecto:

```sh
npm test
```

`npm test` equivale a `node --test` y descubre los `*.test.js` en todas las
subcarpetas.

Para una ruta explícita, entrecomillarla:

```sh
node --test "backend/**/*.test.js"
```

El suite actual ejecuta **74 pruebas** nativas con `node:test` y
`node:assert/strict`.

Nuestras pruebas de dominio no necesitan instalar nada. Cuando se integren las
pruebas de HU-03/HU-04 (repositorio externo), se requerirá `npm ci` dentro de
`backend/`, porque sus servicios importan `dotenv`/`multer`.

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

La [documentación de la tarea 01 de grupos](docs/tarea-01-grupo-trabajo.md) incluye
UML, los ciclos TDD y las tareas siguientes.

## Persistencia

El almacenamiento de eventos y grupos se gestiona a través del patrón repositorio,
desacoplando el dominio de la tecnología de persistencia.

Por defecto, los repositorios persistentes guardan los datos en archivos JSON:
- `eventos.json`: colección serializada de `EventoAcademico`.
- `grupos.json`: colección serializada de `GrupoTrabajo`.

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
   npm ci
   npm run dev
   ```
   El servidor iniciará en `http://localhost:3000/api`.

2. **Iniciar el frontend:**
   ```bash
   cd frontend
   npm ci
   npm run dev
   ```
   La interfaz estará disponible en `http://localhost:5173`.

### Rutas de la interfaz

| Ruta | Nombre | Vista | Descripción |
|---|---|---|---|
| `/estudiante/calendario` | `calendario-estudiante` | `CalendarioView.vue` | Consulta de eventos por materia (HU-01) con avisos de clases suspendidas |
| `/docente/eventos` | `eventos-docente` | `EventosView.vue` | Registro de eventos académicos (clase, tarea, actividad, suspensión) (HU-01) |
| `/docente/grupos` | `grupos-docente` | `GruposView.vue` | Registro de grupos por afinidad o sorteo y consulta por actividad (HU-02) |
| `/estudiante` | `inicio-estudiante` | `InicioEstudianteView.vue` | Envío simulado de tareas (HU-03) |
| `/docente` | `inicio-docente` | `InicioDocenteView.vue` | Revisión de tareas y retroalimentación (HU-04) |
| `/` | `inicio` | `InicioView.vue` | Estado de la API y presentación del sistema |

### Endpoints HTTP de HU-01 y HU-02

- `POST /api/calendario/eventos` → 201 `{ evento }`
- `GET /api/calendario?materia=<id>` → 200 `{ mensaje, eventos }`
- `POST /api/grupos` → 201 `{ grupo }`
- `GET /api/grupos?actividad=<id>` → 200 `{ grupos }`

La [documentación de historias de usuario](docs/US.md) y las
[tarjetas CRC](docs/crc.md) resumen ambas historias. También están disponibles la
[matriz de aceptación](docs/matriz-aceptacion.md), los [roles](docs/roles.md), la
[bitácora](docs/bitacora.md) y las [fuentes](docs/fuentes.md).
