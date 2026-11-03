# Matriz de trazabilidad: historias, criterios y pruebas

Estado según las pruebas actuales. Actualizar después de cada `node --test`.

## HU-01 - Calendario académico

| HU | CA/RN | Caso | Dado/Cuando | Esperado | Test | Estado |
|----|-------|------|-------------|----------|------|--------|
| HU-01 | CA-01 | Horario de clases | Registrar una clase con horario | Se consulta con su horario | backend/src/modulos/calendario-academico/calendario-academico.test.js (CA-01/CA-05) | ✅ |
| HU-01 | CA-02 | Entrega de tarea | Registrar evento `entrega_tarea` | Se conservan tipo, fecha y descripción | backend/src/modulos/calendario-academico/calendario-academico.test.js (CA-02) | ✅ |
| HU-01 | CA-03 | Actividad académica | Registrar evento `actividad` | Se conservan tipo y descripción | backend/src/modulos/calendario-academico/calendario-academico.test.js (CA-03) | ✅ |
| HU-01 | CA-04 | Suspensión | Registrar evento suspendido | La consulta refleja `suspendido: true` | backend/src/modulos/calendario-academico/calendario-academico.test.js | ✅ |
| HU-01 | CA-05 | Fecha y descripción | Consultar un evento registrado | Se muestran su fecha y descripción | backend/src/modulos/calendario-academico/calendario-academico.test.js (CA-01/CA-05) | ✅ |
| HU-01 | CA-06 | Consulta vacía | Materia sin eventos | Mensaje informativo y arreglo vacío | backend/src/modulos/calendario-academico/calendario-academico.test.js | ✅ |
| HU-01 | - | Filtro por materia | Eventos de MAT-101 y MAT-202 | Solo los de la materia consultada | backend/src/modulos/calendario-academico/calendario-academico.test.js | ✅ |
| HU-01 | - | Fecha inválida | Fecha inexistente o formato distinto | Error | backend/src/modulos/calendario-academico/calendario-academico.test.js | ✅ |
| HU-01 | - | Datos inválidos | Id, materia, tipo, horario o descripción inválidos | Error | backend/src/modulos/calendario-academico/calendario-academico.test.js | ✅ |
| HU-01 | - | Evento inmutable | Reasignar datos de un evento | TypeError | backend/src/modulos/calendario-academico/calendario-academico.test.js | ✅ |
| HU-01 | - | Consulta de solo lectura | Modificar el arreglo devuelto | TypeError | backend/src/modulos/calendario-academico/calendario-academico.test.js | ✅ |
| HU-01 | - | Resultado inmutable | Reasignar `mensaje` o `eventos` del resultado | TypeError | backend/src/modulos/calendario-academico/calendario-academico.test.js | ✅ |
| HU-01 | - | Repositorio inyectado compartido | Dos instancias con mismo repositorio | Ven los mismos eventos | backend/src/modulos/calendario-academico/calendario-academico.test.js | ✅ |
| HU-01 | - | Repositorio inyectado aislado | Instancia sin argumentos | No comparte eventos con otras | backend/src/modulos/calendario-academico/calendario-academico.test.js | ✅ |
| HU-01 | - | Repositorio guardar y listar | Guardar evento en repositorio | Se recupera con `listar()` | backend/src/modulos/calendario-academico/calendario.repository.test.js | ✅ |
| HU-01 | - | Almacenes en memoria aislados | Dos almacenes independientes | No comparten datos | backend/src/modulos/calendario-academico/calendario.repository.test.js | ✅ |
| HU-01 | - | Copia defensiva en listar | Modificar retorno de `listar()` | No altera el almacén | backend/src/modulos/calendario-academico/calendario.repository.test.js | ✅ |
| HU-01 | - | Singleton repositorio | Importar `repositorioCalendario` | Expone `guardar` y `listar` | backend/src/modulos/calendario-academico/calendario.repository.test.js | ✅ |

## HU-02 - Grupos de trabajo

| HU | CA/RN | Caso | Dado/Cuando | Esperado | Test | Estado |
|----|-------|------|-------------|----------|------|--------|
| HU-02 | CA-01 | Registrar grupo | Registrar un grupo en el registro | Queda disponible para consulta | backend/src/modulos/grupos-trabajo/registro-grupos.test.js | ✅ |
| HU-02 | CA-02 | Grupo por afinidad | Crear grupo con modalidad `afinidad` | Se conservan datos e integrantes | backend/src/modulos/grupos-trabajo/grupo-trabajo.test.js | ✅ |
| HU-02 | CA-03 | Grupo por sorteo | Crear grupo con modalidad `sorteo` | Se conserva la lista recibida | backend/src/modulos/grupos-trabajo/grupo-trabajo.test.js | ✅ |
| HU-02 | CA-04 | Consultar integrantes | Consultar un grupo | Se leen sus integrantes | backend/src/modulos/grupos-trabajo/grupo-trabajo.test.js (CA-02/CA-04) | ✅ |
| HU-02 | CA-05 | Consultar por actividad | ACT-01 y ACT-02 con grupos | Solo los de ACT-01 | backend/src/modulos/grupos-trabajo/registro-grupos.test.js | ✅ |
| HU-02 | CA-06 | Duplicado | Mismo id dos veces | Error | backend/src/modulos/grupos-trabajo/grupo-trabajo.test.js | ✅ |
| HU-02 | CA-07 | Máximo superado | 3 integrantes con máximo 2 | Error | backend/src/modulos/grupos-trabajo/grupo-trabajo.test.js | ✅ |
| HU-02 | RN-01 | Modalidades | Modalidad distinta de afinidad o sorteo | Error | backend/src/modulos/grupos-trabajo/grupo-trabajo.test.js | ✅ |
| HU-02 | RN-02 | Sin distribución automática | El sorteo llega ya definido | El sistema no distribuye | backend/src/modulos/grupos-trabajo/grupo-trabajo.test.js (sorteo ya realizado) | ✅ |
| HU-02 | RN-03 | Sin aprobación | Crear un grupo | No requiere aprobación del docente | (por diseño, sin test) | ➖ |
| HU-02 | RN-04 | Falta de participación | Integrante que no participa | El grupo no se disuelve | (requiere flujo de entregas) | ⏳ pendiente |
| HU-02 | RN-05 | Grupo establecido | Reasignar datos o integrantes | TypeError | backend/src/modulos/grupos-trabajo/grupo-trabajo.test.js | ✅ |
| HU-02 | RN-05 | Consulta de solo lectura | Modificar el arreglo devuelto | TypeError | backend/src/modulos/grupos-trabajo/registro-grupos.test.js | ✅ |
| HU-02 | - | Registrar objeto inválido | `registrar({})`, `null`, texto | Error "instancia de GrupoTrabajo" | backend/src/modulos/grupos-trabajo/registro-grupos.test.js | ✅ |
| HU-02 | - | Consulta con id inválido | `consultarPorActividad("")`, `null` o con espacios | Error | backend/src/modulos/grupos-trabajo/registro-grupos.test.js | ✅ |
| HU-02 | - | Consulta independiente | Consultar, registrar otro grupo y volver a consultar | La primera consulta no cambia | backend/src/modulos/grupos-trabajo/registro-grupos.test.js | ✅ |
| HU-02 | - | Repositorio inyectado compartido | Dos instancias con mismo repositorio | Ven los mismos grupos | backend/src/modulos/grupos-trabajo/registro-grupos.test.js | ✅ |
| HU-02 | - | Repositorio inyectado aislado | Instancia sin argumentos | No comparte grupos con otras | backend/src/modulos/grupos-trabajo/registro-grupos.test.js | ✅ |
| HU-02 | - | Repositorio guardar y listar | Guardar grupo en repositorio | Se recupera con `listar()` | backend/src/modulos/grupos-trabajo/grupos.repository.test.js | ✅ |
| HU-02 | - | Almacenes en memoria aislados | Dos almacenes independientes | No comparten datos | backend/src/modulos/grupos-trabajo/grupos.repository.test.js | ✅ |
| HU-02 | - | Copia defensiva en listar | Modificar retorno de `listar()` | No altera el almacén | backend/src/modulos/grupos-trabajo/grupos.repository.test.js | ✅ |
| HU-02 | - | Singleton repositorio | Importar `repositorioGrupos` | Expone `guardar` y `listar` | backend/src/modulos/grupos-trabajo/grupos.repository.test.js | ✅ |

## Persistencia en archivo y cableado (HU-01 y HU-02)

| HU | CA/RN | Caso | Dado/Cuando | Esperado | Test | Estado |
|----|-------|------|-------------|----------|------|--------|
| HU-01/02 | - | Archivo inexistente | Cargar repositorio con ruta inexistente | Devuelve lista vacía | backend/src/compartido/repositorio-archivo.test.js | ✅ |
| HU-01/02 | - | Guardar e hidratar entidades | Guardar y reabrir con misma ruta | Instancias `EventoAcademico` y `GrupoTrabajo` | backend/src/compartido/repositorio-archivo.test.js | ✅ |
| HU-01/02 | - | JSON con formato inválido | Archivo con sintaxis JSON corrupta | Error con mensaje claro | backend/src/compartido/repositorio-archivo.test.js | ✅ |
| HU-01/02 | - | Datos inválidos en archivo | Objeto serializado no cumple validación | Error de validación del dominio | backend/src/compartido/repositorio-archivo.test.js | ✅ |
| HU-01/02 | - | Creación de directorio | Guardar en ruta con subcarpetas inexistentes | Crea la estructura de carpetas | backend/src/compartido/repositorio-archivo.test.js | ✅ |
| HU-01/02 | - | Limpieza de temporales | Guardar múltiples veces | No quedan archivos `.tmp` residuales | backend/src/compartido/repositorio-archivo.test.js | ✅ |
| HU-01/02 | - | Cableado persistente | `crearRepositoriosPersistentes({ directorio })` | Guarda y recupera en `eventos.json` y `grupos.json` | backend/src/compartido/repositorios.test.js | ✅ |
| HU-01/02 | - | Configuración DATA_DIR | `process.env.DATA_DIR` definido | Utiliza el directorio configurado | backend/src/compartido/repositorios.test.js | ✅ |
| HU-01/02 | - | Directorio por defecto | Sin argumento ni variable de entorno | Resuelve `backend/data/` | backend/src/compartido/repositorios.test.js | ✅ |

## Servicios HTTP y conversión a AppError (HU-01 y HU-02)

| HU | CA/RN | Caso | Dado/Cuando | Esperado | Test | Estado |
|----|-------|------|-------------|----------|------|--------|
| HU-01 | CA-01/02/03/05 | Servicio calendario registro y consulta | Registrar clases, entregas y actividades | Se consultan por materia | backend/src/modulos/calendario-academico/calendario.service.test.js | ✅ |
| HU-01 | CA-04 | Clase suspendida | Registrar evento suspendido | Refleja `suspendido: true` | backend/src/modulos/calendario-academico/calendario.service.test.js | ✅ |
| HU-01 | CA-06 | Materia sin eventos | Consultar materia sin registros | Mensaje y arreglo vacío | backend/src/modulos/calendario-academico/calendario.service.test.js | ✅ |
| HU-01 | - | Conversión a AppError | Error de validación del dominio | AppError(400) con mismo mensaje | backend/src/modulos/calendario-academico/calendario.service.test.js | ✅ |
| HU-01 | - | Persistencia de servicio | Recrear servicio sobre archivo JSON | Datos se conservan intactos | backend/src/modulos/calendario-academico/calendario.service.test.js | ✅ |
| HU-02 | CA-01..05 | Servicio grupos registro y consulta | Registrar afinidad y sorteo | Se consultan por actividad | backend/src/modulos/grupos-trabajo/grupos.service.test.js | ✅ |
| HU-02 | CA-06 | Integrantes duplicados | Mismo estudiante dos veces | AppError(400) | backend/src/modulos/grupos-trabajo/grupos.service.test.js | ✅ |
| HU-02 | CA-07 | Máximo superado | Más integrantes que el máximo | AppError(400) | backend/src/modulos/grupos-trabajo/grupos.service.test.js | ✅ |
| HU-02 | - | Filtro por actividad y validación | Actividad distinta o id vacío | No devuelve de otra y AppError(400) | backend/src/modulos/grupos-trabajo/grupos.service.test.js | ✅ |
| HU-02 | - | Persistencia de servicio | Recrear servicio sobre archivo JSON | Datos se conservan intactos | backend/src/modulos/grupos-trabajo/grupos.service.test.js | ✅ |

## HU-03 y HU-04 (repositorio externo)

Pruebas unitarias de Jest importadas desde la rama `externo/US-01-unit-test` (autor: arubis). Total: 4 suites y 23 pruebas en verde.

### `backend/src/modulos/entregas-tareas/tests/entregas.service.test.js` (7 pruebas)
- Envío exitoso: dado un remitente institucional, un adjunto válido y el correo del docente, cuando envía, entonces se envía el correo y se guarda la entrega
- Sin adjunto: dado que no adjunta archivo, cuando intenta enviar, entonces se rechaza con "Debe adjuntar un archivo"
- Formato inválido: dado un archivo .exe, entonces se rechaza indicando los formatos permitidos (.pdf, .docx, .zip)
- Tamaño excedido: dado un archivo mayor a 10 MB, entonces se rechaza
- Remitente no institucional: dado un remitente fuera del dominio institucional, entonces se rechaza
- Correo del docente inválido: dado un destinatario con formato inválido, entonces se rechaza
- Fallo del servicio de correo: dado que el correo falla, entonces no se confirma el envío, se informa el error y no se guarda la entrega

### `backend/src/modulos/entregas-tareas/tests/entregas.validaciones.test.js` (3 pruebas)
- Sin adjunto: dado que no adjunta archivo, entonces se rechaza con "Debe adjuntar un archivo"
- Formato inválido: dado un archivo .exe, entonces se rechaza indicando los formatos permitidos (.pdf, .docx, .zip)
- Tamaño excedido: dado un archivo mayor a 10 MB, entonces se rechaza

### `backend/src/modulos/revision-tareas/tests/revision.service.test.js` (8 pruebas)
- Ver entregas recibidas: dado que existen correos de entrega, cuando el docente abre la revisión, entonces ve la lista de estudiantes con su fecha de recepción, todos POR REVISAR
- Sin entregas: dado que no hay correos recibidos, entonces devuelve una lista vacía
- Abrir la tarea: dada una entrega con archivo adjunto, cuando el docente la selecciona, entonces puede ver el archivo adjunto
- Feedback completo: dado un estudiante con entrega, cuando el docente registra los tres campos, entonces el feedback se guarda asociado a esa entrega y pasa a REVISADA
- Campo vacío: dado que falta uno de los tres campos, cuando intenta guardar, entonces se rechaza indicando cuál falta y no se modifica la entrega
- Estudiante sin entrega: dado un estudiante que no envió su tarea, cuando se intenta registrar feedback, entonces se rechaza con "No existe entrega para revisar"
- Modificar feedback: dada una entrega REVISADA, cuando el docente edita el feedback, entonces se actualiza el contenido y sigue REVISADA
- Varios correos del mismo estudiante: dado un estudiante con más de un correo de la misma tarea, entonces se toma el más reciente

### `backend/src/modulos/revision-tareas/tests/revision.validaciones.test.js` (5 pruebas)
- Feedback completo: dados los tres campos completos, entonces se aceptan y se devuelven
- Campo vacío: dado que falta "lo que está bien", entonces se rechaza indicando cuál falta
- Campo vacío: dado que falta "lo que está mal", entonces se rechaza indicando cuál falta
- Campo vacío: dado que falta "lo que debe corregir", entonces se rechaza indicando cuál falta
- Campo vacío: dado un campo con solo espacios, entonces se rechaza

## HU-05 - Asignación de asientos y asistencia (SistemaAula)

Pruebas unitarias de Jest importadas desde la rama `sistemaaula/modulo-asientos` (autora: Camila Araoz), normalizadas bajo la nomenclatura oficial `HU-05`. Total: 1 suite y 5 pruebas en verde.

| HU | CA/RN | Caso | Dado/Cuando | Esperado | Test | Estado |
|----|-------|------|-------------|----------|------|--------|
| HU-05 | CA-01 | Capacidad y dimensiones del aula | Instanciar un `Aula` | Posee 50 asientos (10 filas x 5 columnas) | backend/asignacion_de_asientos/pruebas.test.js | ✅ |
| HU-05 | CA-02 | Asiento ocupado | Asignar estudiante a asiento ya ocupado | Lanza Error "El asiento no está disponible." | backend/asignacion_de_asientos/pruebas.test.js | ✅ |
| HU-05 | CA-03 | Liberar asiento | Liberar un asiento asignado | Regresa a estado "Disponible" | backend/asignacion_de_asientos/pruebas.test.js | ✅ |
| HU-05 | CA-04 | Asistencia por defecto | Instanciar un `Estudiante` | Asistencia inicial es "Ausente" | backend/asignacion_de_asientos/pruebas.test.js | ✅ |
| HU-05 | CA-05 | Modificar asistencia | Docente registra asistencia "Presente" | Asistencia cambia a "Presente" | backend/asignacion_de_asientos/pruebas.test.js | ✅ |
| HU-05 | CA-06 | Búsqueda de estudiante | Buscar por nombre o matrícula (`buscarEstudiante`) | Retorna estudiante coincidente | backend/asignacion_de_asientos/Aula.js | ➖ |
| HU-05 | CA-07 | Persistencia local | Guardar y cargar en `datos.json` (`guardarDatos`/`cargarDatos`) | Estados conservados en archivo JSON | backend/asignacion_de_asientos/Aula.js | ➖ |

### `backend/asignacion_de_asientos/pruebas.test.js` (5 pruebas)
- `HU-05: el aula debe crearse con 50 asientos (10 filas x 5 columnas)`
- `HU-05: no se debe poder asignar un asiento ya ocupado`
- `HU-05: al liberar un asiento, este vuelve a estar disponible`
- `HU-05: un estudiante debe empezar como ausente por defecto`
- `HU-05: el docente debe poder cambiar la asistencia a presente`

---

## HU-06 - Tomar apuntes de clase (SistemaAula)

Módulo importado desde la rama `sistemaaula/feature/backend-apuntes` (autora: Ximena Mendoza Humerez). Código backend Express con arquitectura por capas (`ApunteService`, `ApunteRepository`, `apunteRoutes`).

| HU | CA/RN | Caso | Dado/Cuando | Esperado | Test | Estado |
|----|-------|------|-------------|----------|------|--------|
| HU-06 | CA-01 | Listar materias | `GET /api/materias` | Lista de materias académicas | Código integrado sin cobertura original | ➖ |
| HU-06 | CA-02 | Listar apuntes por estudiante | `GET /api/apuntes` con cabecera `x-estudiante-id` | Apuntes del estudiante ordenados cronológicamente | Código integrado sin cobertura original | ➖ |
| HU-06 | CA-03 | Detalle de apunte | `GET /api/apuntes/:id` | Objeto apunte completo con materia y fechas | Código integrado sin cobertura original | ➖ |
| HU-06 | CA-04 | Crear apunte | `POST /api/apuntes` con título, materia y contenido | HTTP 201 y apunte creado | Código integrado sin cobertura original | ➖ |
| HU-06 | CA-05 | Editar apunte | `PUT /api/apuntes/:id` con campos modificados | Objeto actualizado y fecha de modificación | Código integrado sin cobertura original | ➖ |
| HU-06 | CA-06 | Eliminar apunte | `DELETE /api/apuntes/:id?confirmar=true` | Eliminación confirmada | Código integrado sin cobertura original | ➖ |

> **Nota:** HU-06 cuenta con 0 pruebas unitarias automatizadas debido a que el repositorio fuente `SistemaAula` no incluía suite de pruebas para este módulo al momento de la integración.

Leyenda: ✅ prueba que pasa, ❌ prueba que falla o falta, ⏳ pendiente de otra funcionalidad, ➖ sin prueba por diseño.
