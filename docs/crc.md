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

## Almacen / AlmacenAcademico (Compartido)

| Responsabilidades | Colaboradores |
| --- | --- |
| Proveer estructura de almacenamiento unificada en memoria `{ entregas, eventos, grupos }` | Ninguno |
| Proveer fábrica `crearAlmacen()` y singleton `almacen` (y compatibilidad con `crearAlmacenAcademico` / `almacenAcademico`) | |

**Atributos clave:** `entregas`, `eventos`, `grupos`.

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


## ServicioEntregas (HU-03)

| Responsabilidades | Colaboradores |
| --- | --- |
| Validar correo institucional de remitente, correo docente y código de tarea | validaciones (institutionalEmail, email, taskCode) |
| Validar archivo adjunto (extensión, tamaño $\le$ 10 MB, no vacío) | validarArchivo |
| Enviar entrega a través del servicio de correo simulado | CorreoSimulado |
| Persistir entrega confirmada con estado 'POR REVISAR' | RepositorioEntregas, crypto (randomUUID) |

**Atributos clave:** `enviar(datos, archivo)`.

## ControladorEntregas (HU-03)

| Responsabilidades | Colaboradores |
| --- | --- |
| Atender solicitudes `POST /api/entregas` (multipart/form-data) | ServicioEntregas, multer, express |
| Responder HTTP 201 con el resultado del envío simulado | express (res) |

**Atributos clave:** `enviar`.

## RepositorioEntregas (HU-03)

| Responsabilidades | Colaboradores |
| --- | --- |
| Guardar la entrega en el almacén de datos (memoria / base de datos) | AlmacenCompartido |

**Atributos clave:** `guardar(entrega)`.

## ServicioRevision (HU-04)

| Responsabilidades | Colaboradores |
| --- | --- |
| Listar entregas por docente y tarea, seleccionando la más reciente por estudiante | RepositorioRevision, validaciones |
| Validar feedback estructurado en tres aspectos obligatorios | validarFeedback |
| Registrar y actualizar feedback, cambiando estado a 'REVISADA' | RepositorioRevision |
| Obtener contenido de archivo adjunto para descarga | RepositorioRevision |

**Atributos clave:** `listar(docente, tarea)`, `guardarFeedback(id, docente, datos)`, `adjunto(id, docente)`.

## ControladorRevision (HU-04)

| Responsabilidades | Colaboradores |
| --- | --- |
| Atender `GET /api/revision/entregas?docente=...&tarea=...` y responder JSON | ServicioRevision, express |
| Atender `PUT /api/revision/entregas/:id/feedback` y responder JSON | ServicioRevision, express |
| Atender `GET /api/revision/entregas/:id/adjunto` con cabeceras de descarga binaria | ServicioRevision, express |

**Atributos clave:** `listar`, `guardarFeedback`, `adjunto`.

## RepositorioRevision (HU-04)

| Responsabilidades | Colaboradores |
| --- | --- |
| Listar entregas que coincidan con docente y tarea | AlmacenCompartido |
| Buscar entrega por identificador y docente | AlmacenCompartido |
| Actualizar feedback y estado de la entrega | AlmacenCompartido |

**Atributos clave:** `listar`, `buscar`, `guardarFeedback`.

## Aula (HU-05)

| Responsabilidades | Colaboradores |
| --- | --- |
| Inicializar la cuadrícula física del aula con 50 asientos (10x5) | Asiento |
| Buscar estudiantes en una lista por nombre o matrícula | Estudiante |
| Guardar y cargar el estado de asignaciones en `datos.json` | fs, path |

**Atributos clave:** `asientos`, `buscarEstudiante`, `guardarDatos`, `cargarDatos`.

## Asiento (HU-05)

| Responsabilidades | Colaboradores |
| --- | --- |
| Representar la posición física (número, fila, columna) de un asiento | - |
| Asignar un estudiante validando que el asiento esté disponible | Estudiante |
| Liberar un asiento asignado restableciendo estado 'Disponible' | - |

**Atributos clave:** `numero`, `fila`, `columna`, `estado`, `estudianteAsignado`, `asignarEstudiante`, `liberarAsiento`.

## Estudiante (HU-05)

| Responsabilidades | Colaboradores |
| --- | --- |
| Representar datos del estudiante (nombre, apellido, matrícula) | - |
| Gestionar el estado de asistencia (por defecto 'Ausente') | - |
| Registrar cambio de estado de asistencia ('Presente', etc.) | - |

**Atributos clave:** `nombre`, `apellido`, `matricula`, `asistencia`, `registrarAsistencia`.

## ApunteService (HU-06)

| Responsabilidades | Colaboradores |
| --- | --- |
| Validar reglas de negocio para creación, edición y consulta de notas | ApunteRepository, ErrorNegocio |
| Validar confirmación obligatoria para eliminar apuntes | ApunteRepository |
| Listar apuntes por estudiante y obtener detalle | ApunteRepository |

**Atributos clave:** `listar`, `obtener`, `crear`, `editar`, `eliminar`.

## ApunteRepository (HU-06)

| Responsabilidades | Colaboradores |
| --- | --- |
| Ejecutar consultas SQL en PostgreSQL sobre la tabla `apuntes` | pg (Pool) |
| Proveer operaciones CRUD aisladas por `estudiante_id` | - |

**Atributos clave:** `listar(estudianteId)`, `obtener(id, estudianteId)`, `crear`, `editar`, `eliminar`.
