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

Leyenda: ✅ prueba que pasa, ❌ prueba que falla o falta, ⏳ pendiente de otra funcionalidad, ➖ sin prueba por diseño.
