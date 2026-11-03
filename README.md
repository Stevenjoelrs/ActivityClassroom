# ActivityClassroom

Primeros incrementos de **HU-01** (calendario académico) y **HU-02** (registro de
grupos de trabajo). JavaScript con Node.js, sin dependencias externas.

## Pruebas

El repositorio integra dos suites de pruebas automatizadas:

```sh
pnpm test
```

Este comando ejecuta ambas suites en secuencia:
1. `pnpm run test:dominio`: ejecuta **74 pruebas** nativas del dominio, persistencia y servicios de HU-01 y HU-02 utilizando el runner nativo `node --test` y `node:assert/strict`. No requiere ninguna dependencia externa instalada.
2. `pnpm run test:backend`: ejecuta **23 pruebas** unitarias de los módulos de entregas y revisión (HU-03 y HU-04) utilizando **Jest** con módulos ESM (`--experimental-vm-modules`).

### ¿Por qué dos suites separadas?
Nuestras pruebas de HU-01 y HU-02 siguen la regla de cero dependencias externas y usan el ejecutor estándar `node --test` con patrones específicos por carpeta. Las pruebas de HU-03 y HU-04 provienen del repositorio externo de Joyce y arubis y fueron diseñadas con Jest, apoyándose en utilidades como `jest.fn()` y `expect()`. Para evitar que `node --test` intente ejecutar archivos de Jest o que Jest capture pruebas de `node:test`, cada suite corre con su propio entorno y patrones delimitados (`testMatch` en Jest y argumentos por carpeta en `node --test`).

> **Nota:** Para ejecutar las pruebas de Jest se requiere haber instalado las dependencias del backend con `pnpm install` dentro de la carpeta `backend/`.

Para ejecutar cada suite por separado:

```sh
# Solo pruebas de dominio y persistencia (node --test)
pnpm run test:dominio

# Solo pruebas del backend externo (Jest)
pnpm run test:backend
```

## Equivalencia de historias

La correspondencia entre las historias de usuario de ambos equipos es la siguiente:

| Repositorio externo | Nuestra numeración | Funcionalidad |
|---|---|---|
| **US-01** | **HU-03** | Envío simulado de tareas por correo institucional con validación de adjunto |
| **US-02** | **HU-04** | Revisión de tareas por el docente y retroalimentación (lo que está bien, lo que está mal, lo que debe corregir) |
| — | **HU-01** | Calendario académico (clases, tareas, actividades, suspensiones) |
| — | **HU-02** | Grupos de trabajo (modalidades afinidad y sorteo) |

## Créditos y autoría

Este repositorio consolida el trabajo colaborativo de dos equipos:
- **HU-01 y HU-02 (Calendario y Grupos):** Desarrolladas por Steven Joel Ramos Salazar y kn0wles.
- **HU-03 y HU-04 (Entregas y Revisión):** Desarrolladas originalmente en el repositorio externo [Sistema-academico](https://github.com/anjoyy24/Sistema-academico.git) por **Joyce** (implementación de historias y configuración base) y **arubis** (diseño e implementación del conjunto de pruebas Jest en la rama `US-01-unit-test`).

Para explorar el historial completo preservado de ambos equipos:

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

### Endpoints HTTP de HU-01 y HU-02

- `POST /api/calendario/eventos` → 201 `{ evento }`
- `GET /api/calendario?materia=<id>` → 200 `{ mensaje, eventos }`
- `POST /api/grupos` → 201 `{ grupo }`
- `GET /api/grupos?actividad=<id>` → 200 `{ grupos }`

La [documentación de historias de usuario](docs/US.md) y las
[tarjetas CRC](docs/crc.md) resumen ambas historias. También están disponibles la
[matriz de aceptación](docs/matriz-aceptacion.md), los [roles](docs/roles.md), la
[bitácora](docs/bitacora.md) y las [fuentes](docs/fuentes.md).
