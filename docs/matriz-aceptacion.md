# Matriz de trazabilidad: historias, criterios y pruebas

Estado según las pruebas actuales. Actualizar después de cada `node --test`.

## HU-01 - Calendario académico

| HU | CA/RN | Caso | Dado/Cuando | Esperado | Test | Estado |
|----|-------|------|-------------|----------|------|--------|
| HU-01 | CA-01 | Horario de clases | Registrar una clase con horario | Se consulta con su horario | calendario-academico.test.js (CA-01/CA-05) | ✅ |
| HU-01 | CA-02 | Entrega de tarea | Registrar evento `entrega_tarea` | Se conservan tipo, fecha y descripción | calendario-academico.test.js (CA-02) | ✅ |
| HU-01 | CA-03 | Actividad académica | Registrar evento `actividad` | Se conservan tipo y descripción | calendario-academico.test.js (CA-03) | ✅ |
| HU-01 | CA-04 | Suspensión | Registrar evento suspendido | La consulta refleja `suspendido: true` | calendario-academico.test.js | ✅ |
| HU-01 | CA-05 | Fecha y descripción | Consultar un evento registrado | Se muestran su fecha y descripción | calendario-academico.test.js (CA-01/CA-05) | ✅ |
| HU-01 | CA-06 | Consulta vacía | Materia sin eventos | Mensaje informativo y arreglo vacío | calendario-academico.test.js | ✅ |
| HU-01 | - | Filtro por materia | Eventos de MAT-101 y MAT-202 | Solo los de la materia consultada | calendario-academico.test.js | ✅ |
| HU-01 | - | Fecha inválida | Fecha inexistente o formato distinto | Error | calendario-academico.test.js | ✅ |
| HU-01 | - | Datos inválidos | Id, materia, tipo, horario o descripción inválidos | Error | calendario-academico.test.js | ✅ |
| HU-01 | - | Evento inmutable | Reasignar datos de un evento | TypeError | calendario-academico.test.js | ✅ |
| HU-01 | - | Consulta de solo lectura | Modificar el arreglo devuelto | TypeError | calendario-academico.test.js | ✅ |
| HU-01 | - | Resultado inmutable | Reasignar `mensaje` o `eventos` del resultado | TypeError | calendario-academico.test.js | ✅ |

## HU-02 - Grupos de trabajo

| HU | CA/RN | Caso | Dado/Cuando | Esperado | Test | Estado |
|----|-------|------|-------------|----------|------|--------|
| HU-02 | CA-01 | Registrar grupo | Registrar un grupo en el registro | Queda disponible para consulta | registro-grupos.test.js | ✅ |
| HU-02 | CA-02 | Grupo por afinidad | Crear grupo con modalidad `afinidad` | Se conservan datos e integrantes | grupo-trabajo.test.js | ✅ |
| HU-02 | CA-03 | Grupo por sorteo | Crear grupo con modalidad `sorteo` | Se conserva la lista recibida | grupo-trabajo.test.js | ✅ |
| HU-02 | CA-04 | Consultar integrantes | Consultar un grupo | Se leen sus integrantes | grupo-trabajo.test.js (CA-02/CA-04) | ✅ |
| HU-02 | CA-05 | Consultar por actividad | ACT-01 y ACT-02 con grupos | Solo los de ACT-01 | registro-grupos.test.js | ✅ |
| HU-02 | CA-06 | Duplicado | Mismo id dos veces | Error | grupo-trabajo.test.js | ✅ |
| HU-02 | CA-07 | Máximo superado | 3 integrantes con máximo 2 | Error | grupo-trabajo.test.js | ✅ |
| HU-02 | RN-01 | Modalidades | Modalidad distinta de afinidad o sorteo | Error | grupo-trabajo.test.js | ✅ |
| HU-02 | RN-02 | Sin distribución automática | El sorteo llega ya definido | El sistema no distribuye | grupo-trabajo.test.js (sorteo ya realizado) | ✅ |
| HU-02 | RN-03 | Sin aprobación | Crear un grupo | No requiere aprobación del docente | (por diseño, sin test) | ➖ |
| HU-02 | RN-04 | Falta de participación | Integrante que no participa | El grupo no se disuelve | (requiere flujo de entregas) | ⏳ pendiente |
| HU-02 | RN-05 | Grupo establecido | Reasignar datos o integrantes | TypeError | grupo-trabajo.test.js | ✅ |
| HU-02 | RN-05 | Consulta de solo lectura | Modificar el arreglo devuelto | TypeError | registro-grupos.test.js | ✅ |
| HU-02 | - | Registrar objeto inválido | `registrar({})`, `null`, texto | Error "instancia de GrupoTrabajo" | registro-grupos.test.js | ✅ |
| HU-02 | - | Consulta con id inválido | `consultarPorActividad("")`, `null` o con espacios | Error | registro-grupos.test.js | ✅ |
| HU-02 | - | Consulta independiente | Consultar, registrar otro grupo y volver a consultar | La primera consulta no cambia | registro-grupos.test.js | ✅ |

Leyenda: ✅ prueba que pasa, ❌ prueba que falla o falta, ⏳ pendiente de otra funcionalidad, ➖ sin prueba por diseño.
