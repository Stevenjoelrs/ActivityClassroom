# Tarjetas CRC - HU-01 y HU-02

Una tarjeta por clase implementada. Los colaboradores coinciden con el código.

## GrupoTrabajo (HU-02)

| Responsabilidades | Colaboradores |
| --- | --- |
| Representar un grupo por afinidad o por sorteo ya realizado | Ninguno (clase de dominio autónoma) |
| Conocer nombre, actividad, modalidad, integrantes y máximo | |
| Impedir integrantes duplicados | |
| Validar y respetar el tamaño máximo opcional | |
| Garantizar que sus datos e integrantes sean de solo lectura | |

**Atributos clave:** `nombre`, `actividadId`, `modalidad`, `integrantes`, `maximoIntegrantes`.

## RegistroGrupos (HU-02)

| Responsabilidades | Colaboradores |
| --- | --- |
| Delegar el almacenamiento y consulta de grupos al repositorio inyectado | RepositorioGrupos |
| Validar que el objeto registrado sea `GrupoTrabajo` | GrupoTrabajo |
| Consultar los grupos de una actividad | |
| Validar el identificador de la actividad consultada | |
| Entregar un arreglo congelado de resultados | |

**Atributos clave:** `#repositorio` (privado).

## EventoAcademico (HU-01)

| Responsabilidades | Colaboradores |
| --- | --- |
| Representar una clase, entrega, actividad o suspensión | Ninguno |
| Conocer fecha, horario opcional y descripción | |
| Conocer si el evento está suspendido | |
| Validar sus datos y permanecer inmutable | |

**Atributos clave:** `id`, `materiaId`, `tipo`, `fecha`, `horario`, `descripcion`, `suspendido`.

## CalendarioAcademico (HU-01)

| Responsabilidades | Colaboradores |
| --- | --- |
| Delegar el almacenamiento y consulta de eventos al repositorio inyectado | RepositorioCalendario |
| Validar que el evento registrado sea `EventoAcademico` | EventoAcademico |
| Consultar los eventos de una materia | |
| Informar cuando no existen eventos registrados | |
| Entregar `{mensaje, eventos}` de solo lectura | |

**Atributos clave:** `#repositorio` (privado).

## RepositorioCalendario (HU-01)

| Responsabilidades | Colaboradores |
| --- | --- |
| Guardar instancias de `EventoAcademico` en memoria o archivo | EventoAcademico, AlmacenAcademico, RepositorioArchivo |
| Listar eventos devolviendo una copia de los datos almacenados | |
| Hidratar objetos planos recuperados de archivo a `EventoAcademico` | |

**Atributos clave:** `guardar`, `listar`.

## RepositorioGrupos (HU-02)

| Responsabilidades | Colaboradores |
| --- | --- |
| Guardar instancias de `GrupoTrabajo` en memoria o archivo | GrupoTrabajo, AlmacenAcademico, RepositorioArchivo |
| Listar grupos devolviendo una copia de los datos almacenados | |
| Hidratar objetos planos recuperados de archivo a `GrupoTrabajo` | |

**Atributos clave:** `guardar`, `listar`.

## AlmacenAcademico (Compartido)

| Responsabilidades | Colaboradores |
| --- | --- |
| Proveer estructura de almacenamiento en memoria `{ eventos: [], grupos: [] }` | Ninguno |
| Proveer fábrica `crearAlmacenAcademico()` y singleton `almacenAcademico` | |

**Atributos clave:** `eventos`, `grupos`.

## RepositorioArchivo (Compartido)

| Responsabilidades | Colaboradores |
| --- | --- |
| Cargar colecciones desde archivo JSON al inicializarse | node:fs, node:path |
| Hidratar cada elemento mediante función `hidratar` | |
| Persistir datos de forma atómica (archivo temporal + rename) | |
| Crear el directorio de destino automáticamente si no existe | |
| Devolver una copia defensiva al listar | |

**Atributos clave:** `ruta`, `hidratar`, `guardar`, `listar`.

## RepositoriosPersistentes (Compartido)

| Responsabilidades | Colaboradores |
| --- | --- |
| Instanciar repositorios de archivo para `eventos.json` y `grupos.json` | RepositorioCalendario, RepositorioGrupos, node:path |
| Resolver ruta base desde `{ directorio }`, `process.env.DATA_DIR` o `backend/data/` | |
| Proveer acceso unificado a repositorios persistentes | |

**Atributos clave:** `directorio`, `calendario`, `grupos`.

## ServicioCalendario (HU-01)

| Responsabilidades | Colaboradores |
| --- | --- |
| Orquestar el registro y consulta de eventos académicos | CalendarioAcademico, EventoAcademico |
| Capturar errores de dominio y convertirlos en `AppError(400)` | AppError |
| Proveer fábrica `crearServicioCalendario()` con repositorio persistente por defecto | RepositoriosPersistentes |

**Atributos clave:** `registrar(datos)`, `consultar(materiaId)`.

## ControladorCalendario (HU-01)

| Responsabilidades | Colaboradores |
| --- | --- |
| Atender solicitudes `POST /api/calendario/eventos` y responder 201 | ServicioCalendario, express |
| Atender solicitudes `GET /api/calendario?materia=<id>` y responder 200 | ServicioCalendario, express |
| Delegar errores al middleware central de Express | express (next) |

**Atributos clave:** `registrarEvento`, `consultarCalendario`.

## ServicioGrupos (HU-02)

| Responsabilidades | Colaboradores |
| --- | --- |
| Orquestar el registro y consulta de grupos de trabajo por actividad | RegistroGrupos, GrupoTrabajo |
| Capturar errores de validación de dominio y convertirlos en `AppError(400)` | AppError |
| Proveer fábrica `crearServicioGrupos()` con repositorio persistente por defecto | RepositoriosPersistentes |

**Atributos clave:** `registrar(datos)`, `consultar(actividadId)`.

## ControladorGrupos (HU-02)

| Responsabilidades | Colaboradores |
| --- | --- |
| Atender solicitudes `POST /api/grupos` y responder 201 | ServicioGrupos, express |
| Atender solicitudes `GET /api/grupos?actividad=<id>` y responder 200 | ServicioGrupos, express |
| Delegar errores al middleware central de Express | express (next) |

**Atributos clave:** `registrarGrupo`, `consultarGrupos`.

