# Guía de Demostración y Validación de Casos de Uso

Esta guía proporciona el paso a paso exacto para demostrar y validar cada una de las **6 Historias de Usuario (HU-01 a HU-06)** implementadas en el sistema. Todos los casos cuentan con **datos pre-cargados (semillas)** listos para ser mostrados sin necesidad de crear datos desde cero.

---

## 1. Puesta en marcha rápida

### Terminal 1: Iniciar el Backend
```sh
node backend/src/server.js
```
> El backend arrancará en `http://127.0.0.1:3000/api` y poblará automáticamente los datos iniciales de prueba en memoria y en `backend/data/`.

### Terminal 2: Iniciar el Frontend
```sh
cd frontend
pnpm dev
```
> El frontend estará disponible en `http://localhost:5173/` (o el puerto indicado en la consola).

---

## 2. Datos de prueba pre-cargados (Cheat Sheet)

Para no escribir desde cero, utiliza estos identificadores y correos ya preparados en el sistema:

| Concepto | Valor de prueba |
|---|---|
| **Materias del Calendario (HU-01)** | `MAT-101` (Álgebra con suspensión), `SIS-211` (Ingeniería de Software), `FIS-999` (Sin eventos) |
| **Actividades de Grupos (HU-02)** | `PRACTICA-01` (Afinidad y sorteo), `PROYECTO-FINAL` |
| **Correo del Docente (HU-03 / HU-04)** | `docente@umss.edu` |
| **Correos de Estudiantes (HU-03 / HU-04)** | `estudiante@est.umss.edu`, `carlos.ruiz@est.umss.edu`, `beatriz.morales@est.umss.edu` |
| **Tareas para Envíos / Revisión** | `PRACTICA-01`, `PRACTICA-02` |
| **Estudiantes para Asientos (HU-05)** | 1: Ana Pérez (`EST-202301`), 2: Carlos Ruiz (`EST-202302`), 3: Beatriz Morales (`EST-202303`), 4: David Flores (`EST-202304`), 5: Elena Gómez (`EST-202305`) |
| **Materias para Apuntes (HU-06)** | `Sistemas de Información 2`, `Base de Datos 2`, `Ingeniería de Software`, `Taller de Grado` |

---

## 3. Casos de Validación Paso a Paso

---

### HU-01: Calendario Académico y Suspensión de Clases

**Objetivo:** Demostrar la visualización de horarios, entregas de tareas, actividades presenciales, el badge visual de **clase suspendida** y la consulta vacía.

#### Caso 1.1: Consultar eventos normales y suspensión de clase
1. Abre en el navegador: [http://localhost:5173/estudiante/calendario](http://localhost:5173/estudiante/calendario).
2. En el campo **Identificador de la materia**, deja el valor predeterminado `MAT-101`.
3. Haz click en el botón **"Consultar calendario"**.
4. **Lo que debes señalar en pantalla:**
   - **Clase normal:** Aparece la tarjeta *"Clase"*, fecha `10/11/2026`, horario `08:15 - 09:45`, descripción: *"Introducción a Matrices y Espacios Vectoriales."*.
   - **Entrega de tarea:** Aparece la tarjeta *"Entrega de tarea"*, fecha `14/11/2026`.
   - **Clase suspendida (CA-04):** Aparece la tarjeta con fecha `17/11/2026` y el **aviso destacado en amarillo: `Clase suspendida`**.
   - **Actividad académica:** Tarjeta *"Actividad académica"* del `24/11/2026` para el Primer Examen Parcial.

#### Caso 1.2: Consulta de materia sin eventos (CA-06)
1. En el mismo campo de materia, escribe `FIS-999`.
2. Haz click en **"Consultar calendario"**.
3. **Lo que debes señalar:** Se muestra el mensaje informativo en azul: *"No existen eventos programados para esta materia."* (evita pantallas vacías o rotas).

#### Caso 1.3: Registro de un nuevo evento docente
1. Ve al menú superior y click en **"Registrar evento"** (o ve a `/docente/eventos`).
2. Llena los campos:
   - Identificador: `EV-NUEVO-01`
   - Materia: `MAT-101`
   - Tipo: `Suspensión` o `Clase`
   - Fecha: `2026-11-30`
   - Marca la casilla **"Clase suspendida"**.
3. Click en **"Registrar evento"** -> Aparece mensaje verde de éxito. Al volver a `/estudiante/calendario` y consultar `MAT-101`, el nuevo evento aparecerá listado.

---

### HU-02: Grupos de Trabajo (Afinidad y Sorteo)

**Objetivo:** Demostrar el registro de grupos con control de duplicados, modalidades y consulta por actividad.

#### Caso 2.1: Consultar grupos existentes
1. Abre [http://localhost:5173/docente/grupos](http://localhost:5173/docente/grupos).
2. En la sección inferior **"Consultar grupos por actividad"**, escribe `PRACTICA-01` en el campo.
3. Click en **"Consultar grupos"**.
4. **Lo que debes señalar:**
   - **Equipo Alpha:** Modalidad *Afinidad*, 2 integrantes (`EST-202301, EST-202302`), tamaño máximo 3.
   - **Equipo Beta:** Modalidad *Sorteo*, 3 integrantes (`EST-202303, EST-202304, EST-202305`), tamaño máximo 4.

#### Caso 2.2: Validación de integrantes duplicados (CA-06)
1. En el formulario superior **"Registrar grupo"**, ingresa:
   - Nombre: `Grupo Prueba Fallo`
   - Actividad: `PRACTICA-01`
   - Modalidad: `Afinidad`
   - Integrantes: escribe `EST-01` en la primera línea y `EST-01` en la segunda línea (duplicado).
2. Click en **"Registrar grupo"**.
3. **Lo que debes señalar:** El sistema rechaza el registro y muestra un cartel rojo de error indicando que no se admiten integrantes duplicados.

---

### HU-03: Envío Simulado de Tareas por Correo

**Objetivo:** Demostrar el envío formal con validación de adjuntos (`.pdf`, `.docx`, `.zip`), dominio institucional y simulación de fallos de red.

#### Caso 3.1: Envío exitoso con adjunto válido
1. Abre [http://localhost:5173/estudiante](http://localhost:5173/estudiante).
2. Verifica los datos predeterminados:
   - Correo del estudiante: `estudiante@est.umss.edu`
   - Identificador de la tarea: `PRACTICA-01`
   - Correo del docente: `docente@umss.edu`
3. Adjunta cualquier archivo válido con extensión `.pdf`, `.docx` o `.zip` desde tu equipo.
4. Click en el botón **"Simular envío de tarea"**.
5. **Lo que debes señalar:** Mensaje de éxito verde que confirma el registro del correo simulado junto a la fecha y hora exacta del envío, quedando en estado `POR REVISAR`.

#### Caso 3.2: Rechazo por formato no permitido (CA-04)
1. Intenta adjuntar un archivo con extensión no permitida (por ejemplo `.jpg`, `.png`, `.txt` o `.exe`).
2. Click en **"Simular envío de tarea"**.
3. **Lo que debes señalar:** Mensaje de error inmediato: *"Formatos permitidos: .pdf, .docx, .zip"*.

#### Caso 3.3: Simulación de caída del servicio de correo (CA-07)
1. Adjunta un archivo `.pdf` válido.
2. Marca la casilla **"Simular fallo del servicio de correo"**.
3. Click en **"Simular envío de tarea"**.
4. **Lo que debes señalar:** Cartel rojo de error: el servicio simulado no confirmó el envío y la entrega no es registrada en el buzón.

---

### HU-04: Revisión de Tareas y Feedback Estructurado

**Objetivo:** Demostrar la bandeja del docente, la descarga de adjuntos, la visualización de entregas revisadas/por revisar y el guardado de feedback en 3 campos obligatorios.

#### Caso 4.1: Consultar entregas recibidas
1. Abre [http://localhost:5173/docente](http://localhost:5173/docente).
2. En el formulario, deja el correo `docente@umss.edu` y la tarea `PRACTICA-01`.
3. Click en **"Consultar entregas"**.
4. **Lo que debes señalar:**
   - La lista muestra las entregas del ejercicio:
     - `estudiante@est.umss.edu` con estado **`POR REVISAR`**.
     - `carlos.ruiz@est.umss.edu` con estado **`REVISADA`**.

#### Caso 4.2: Descargar adjunto y registrar retroalimentación
1. Haz click sobre la entrega de `estudiante@est.umss.edu`.
2. **Lo que debes señalar:**
   - Aparece el enlace **"Descargar y abrir informe_practica1.pdf"** para descargar el archivo enviado por el estudiante.
   - Se despliegan los tres campos estructurados obligatorios (CA-04):
     - *Lo que está bien*
     - *Lo que está mal*
     - *Lo que debe corregir*
3. Escribe en los campos:
   - Bien: *"Estructura del documento ordenada y código modular."*
   - Mal: *"Faltan pruebas unitarias para excepciones."*
   - Corregir: *"Incorporar casos límite y validar tipos nulos."*
4. Click en **"Guardar feedback"**.
5. **Lo que debes señalar:** Mensaje de éxito y el estado del estudiante cambia inmediatamente a **`REVISADA`** (CA-06).

#### Caso 4.3: Inspeccionar entrega ya revisada
1. Haz click sobre `carlos.ruiz@est.umss.edu`.
2. **Lo que debes señalar:** Los campos de retroalimentación ya contienen el feedback previamente guardado, y el botón muestra *"Actualizar feedback"* permitiendo editarlo sin perder el estado (CA-07).

---

### HU-05: Asignación de Asientos y Control de Asistencia

**Objetivo:** Demostrar la cuadrícula interactiva de 50 asientos (10x5), asignación/liberación en vivo y alternancia de asistencia.

#### Caso 5.1: Cuadrícula física de 50 asientos
1. Abre [http://localhost:5173/docente/asientos](http://localhost:5173/docente/asientos).
2. **Lo que debes señalar:**
   - Se observa el plano del aula con la pizarra al frente y **50 asientos** organizados en 10 filas de 5 asientos cada una.
   - Los asientos ya ocupados están en **rojo** (ej. Asiento 1: Ana Pérez, Asiento 2: Carlos Ruiz, Asiento 15: Beatriz Morales, Asiento 28: David Flores).
   - Los asientos libres están en **verde** (Disponibles).

#### Caso 5.2: Asignar un asiento libre
1. Asegúrate de tener seleccionado el botón **"Asignar asiento"** (modo activo).
2. En el menú desplegable de estudiante, elige a **Elena Gómez (EST-202305)** (estudiante sin asiento asignado).
3. Haz click sobre cualquier asiento verde disponible (por ejemplo, el **Asiento 5**).
4. **Lo que debes señalar:** El asiento 5 cambia inmediatamente a color rojo con el nombre de Elena Gómez y su matrícula.

#### Caso 5.3: Liberar un asiento asignado
1. Haz click en el botón de modo **"Liberar asiento"**.
2. Haz click sobre el Asiento 5 (o cualquier asiento ocupado).
3. **Lo que debes señalar:** El asiento se libera al instante, regresando al estado verde "Disponible".

#### Caso 5.4: Control de asistencia docente
1. Haz click en la pestaña superior **"Control de Asistencia"**.
2. **Lo que debes señalar:**
   - Lista completa de los estudiantes registrados con su estado de asistencia de hoy (`Presente`, `Ausente` o `Atrasado`).
3. Haz click en el botón de estado de cualquier estudiante (ej. David Flores, que está en `Ausente`).
4. **Lo que debes señalar:** El estado rota cíclicamente a `Presente`, actualizando el registro en el backend sin recargar la página.

---

### HU-06: Gestión de Apuntes de Clase

**Objetivo:** Demostrar la toma de apuntes vinculada a materias, filtros por asignatura, selector de estudiante y confirmación obligatoria al eliminar.

#### Caso 6.1: Ver apuntes filtrados por materia
1. Abre [http://localhost:5173/estudiante/apuntes](http://localhost:5173/estudiante/apuntes).
2. El selector de estudiante tiene seleccionado a **Ana Pérez (EST-202301)**.
3. **Lo que debes señalar:** Se visualizan los apuntes tomados por Ana, cada uno con su título, materia asignada, contenido y fecha.
4. En la barra de filtros, haz click en el botón **"Base de Datos 2"**.
5. **Lo que debes señalar:** La lista se filtra automáticamente mostrando únicamente el apunte de esa materia (*"Optimización de Consultas e Índices B-Tree"*).
6. Haz click en **"Todas las materias"** para restaurar la vista completa.

#### Caso 6.2: Crear un nuevo apunte
1. En el formulario inferior **"Nuevo apunte"**, completa:
   - Materia: `Sistemas de Información 2`
   - Título: `Patrones Arquitecturales y TDD`
   - Contenido: `Resumen de clase sobre Domain-Driven Design y separación de capas.`
2. Click en **"Guardar apunte"**.
3. **Lo que debes señalar:** El apunte aparece de inmediato al inicio de la lista con su fecha de creación.

#### Caso 6.3: Aislamiento por estudiante (RN-01)
1. En el selector superior **"Estudiante activo"**, cambia a **Carlos Ruiz (EST-202302)**.
2. **Lo que debes señalar:** La lista se actualiza mostrando únicamente los apuntes propios de Carlos Ruiz (*"Integración Git y Co-authored-by"*), demostrando que ningún estudiante ve ni altera notas ajenas.

---

## 4. Validación de la Suite Completa con pnpm

Para demostrar al evaluador que el código cuenta con cobertura exhaustiva sin fallos:

```sh
pnpm test
```

* **74 pruebas:** Dominio y persistencia de HU-01 y HU-02 (`node --test`).
* **61 pruebas:** Backend Jest para HU-03, HU-04, HU-05 y HU-06.
* **13 pruebas:** Frontend Vitest montando los componentes reactivos de las 6 historias.
* **Total:** **148 pruebas automatizadas pasando al 100%.**
