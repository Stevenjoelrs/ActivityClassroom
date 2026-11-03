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

---

## 3. Historia de usuario: Envío de tareas por correo (HU-03 / US-01)
**ID:** HU-03 (US-01 en repositorio externo)  
**Nombre:** Envío simulado de tareas por correo electrónico.

### Historia de usuario
Como estudiante, quiero enviar mi tarea adjuntando un archivo a través del correo institucional simulado, para que el docente reciba mi entrega formalmente.

### Criterios de aceptación
- **CA-01:** El remitente debe contar con una dirección válida bajo el dominio institucional (ej. `@est.umss.edu.bo`).
- **CA-02:** El destinatario debe corresponder a un correo válido de docente.
- **CA-03:** La entrega debe incluir obligatoriamente un archivo adjunto.
- **CA-04:** Formatos de archivo admitidos: `.pdf`, `.docx` y `.zip`.
- **CA-05:** El tamaño del archivo no puede superar los 10 MB.
- **CA-06:** Al confirmarse el envío, la entrega se guarda con fecha, hora y estado inicial `POR REVISAR`.
- **CA-07:** Si el servicio de correo falla, no se confirma el envío ni se registra la entrega.

---

## 4. Historia de usuario: Revisión de tareas y retroalimentación (HU-04 / US-02)
**ID:** HU-04 (US-02 en repositorio externo)  
**Nombre:** Revisión de tareas con feedback estructurado.

### Historia de usuario
Como docente, quiero consultar las entregas recibidas de una tarea, descargar los archivos adjuntos y registrar retroalimentación estructurada, para orientar al estudiante sobre su desempeño.

### Criterios de aceptación
- **CA-01:** El docente puede consultar las entregas recibidas para una tarea específica, visualizando la lista de estudiantes y fecha de recepción.
- **CA-02:** Si un estudiante envía múltiples entregas para la misma tarea, el sistema toma la más reciente.
- **CA-03:** El docente puede acceder y descargar el archivo adjunto de cada entrega.
- **CA-04:** El registro de retroalimentación requiere obligatoriamente tres aspectos:
  - Lo que está bien (`correcto`).
  - Lo que está mal (`incorrecto`).
  - Lo que debe corregir (`corregir`).
- **CA-05:** Ningún campo de retroalimentación puede quedar vacío o contener únicamente espacios.
- **CA-06:** Al registrar el feedback completo, la entrega pasa al estado `REVISADA`.
- **CA-07:** El docente puede modificar o actualizar el feedback de una entrega ya revisada conservando su estado.
