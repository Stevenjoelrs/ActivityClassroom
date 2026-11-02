# Documentación de Historias de Usuario

## 1. Historia de usuario: Calendario académico (HU-01)
**ID:** HU-01  
**Nombre:** Consulta del calendario académico.

### Historia de usuario
Como estudiante, quiero consultar el calendario académico de mi materia para conocer los horarios de clases, las fechas de entrega de tareas, las actividades académicas y las suspensiones o modificaciones de clases.

### Criterios de aceptación
- **CA-01:** El estudiante puede visualizar los horarios de sus clases.
- **CA-02:** El estudiante puede identificar las fechas de entrega de sus tareas.
- **CA-03:** El estudiante puede consultar las actividades académicas programadas.
- **CA-04:** Cuando se registra la suspensión de una clase, esta se refleja en el calendario.
- **CA-05:** Los eventos muestran la información correspondiente a su fecha y descripción.
- **CA-06:** Si no existen eventos, el sistema muestra un mensaje informativo en lugar de una pantalla vacía o información ficticia.

---

## 2. Historia de usuario: Asignación de grupos académicos (HU-02)
**ID:** HU-02  
**Nombre:** Formación y registro de grupos de trabajo.

### Historia de usuario
Como docente, quiero registrar los grupos de trabajo de una actividad académica, permitiendo que los estudiantes se organicen por afinidad o que los grupos sean definidos mediante un sorteo, para organizar el trabajo grupal de la materia.

### Criterios de aceptación
- **CA-01:** El docente puede registrar un grupo para una actividad académica.
- **CA-02:** Se pueden registrar los integrantes de un grupo formado por afinidad.
- **CA-03:** Se pueden registrar los integrantes de un grupo definido mediante sorteo.
- **CA-04:** El sistema permite consultar los integrantes de cada grupo.
- **CA-05:** El sistema permite identificar a qué actividad pertenece cada grupo.
- **CA-06:** El sistema impide que un estudiante aparezca duplicado dentro del mismo grupo.
- **CA-07:** Si una actividad establece un tamaño máximo de grupo, el sistema impide superarlo.

### Reglas de negocio
- **RN-01:** Se admiten dos modalidades: organización por afinidad y grupos definidos mediante sorteo.
- **RN-02:** El sistema registra los grupos y sus integrantes; no genera automáticamente la distribución aleatoria.
- **RN-03:** No se requiere aprobación del docente para confirmar cada grupo.
- **RN-04:** La falta de participación de un integrante no disuelve automáticamente el grupo.
- **RN-05:** Una vez establecido el grupo, sus integrantes no pueden cambiarse libremente durante la actividad.