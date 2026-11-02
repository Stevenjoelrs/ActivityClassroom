# Tareas pendientes: Interfaz HU-01 (Calendario) y HU-02 (Grupos)

## 1. Estado actual del repositorio

- **Rama activa**: `feature/ui-hu-01-02`
- **Árbol de trabajo**: Limpio (`git status` limpio)
- **Procesos en segundo plano**: Todos detenidos
- **Pruebas unitarias**: **74 pruebas pasando** (`node --test`)
- **Historial de commits completados en esta rama**:
  1. `chore(integration): import base frontend and express backend from external repo` (precondición satisfecha)
  2. `test(calendar): add calendar service tests` (PASO 1 backend calendario)
  3. `feat(calendar): expose calendar over http` (PASO 1 rutas y controlador)
  4. `feat(groups): expose groups service and routes over http` (PASO 2 servicio, rutas, controlador y curl verificado)

---

## 2. Reglas obligatorias para continuar

### Identidad de commits
Ejecutar al inicio del chat:
```bash
KN_NAME=$(git config --get user.name); KN_EMAIL=$(git config --get user.email)
```
Cada commit debe realizarse estrictamente con el autor Steven y kn0wles de copiloto:
```bash
git -c user.name="Steven Joel Ramos Salazar" -c user.email="stevenjramossalazar@gmail.com" \
  commit -m "<mensaje>" -m "Co-authored-by: $KN_NAME <$KN_EMAIL>"
```
- No usar `--amend` sobre commits previos.
- No hacer `push` ni `merge`.
- No editar `docs/bitacora.md` ni `docs/roles.md`.
- No agregar dependencias nuevas (`@lucide/vue` y `Button` de shadcn-vue ya están instalados).
- Sin validaciones de negocio en la UI: solo atributos HTML (`required`, `maxlength`, `pattern`) y mostrar el mensaje de error devuelto por el backend.

---

## 3. Tareas pendientes (Roadmap para el siguiente chat)

### TAREA 1: Servicios del Frontend (HTTP)
Reutilizar la función `request` de `frontend/src/services/entregas.js`:

1. **`frontend/src/services/calendario.js`**:
   - `registrarEvento(evento)`: `POST /api/calendario/eventos` enviando JSON.
   - `consultarCalendario(materia)`: `GET /api/calendario?materia=${encodeURIComponent(materia)}`.

2. **`frontend/src/services/grupos.js`**:
   - `registrarGrupo(grupo)`: `POST /api/grupos` enviando JSON.
   - `consultarGrupos(actividad)`: `GET /api/grupos?actividad=${encodeURIComponent(actividad)}`.

---

### TAREA 2: Vistas del Frontend (Estilo exacto de `InicioEstudianteView` / `InicioDocenteView`)

Clases CSS compartidas obligatorias: `.tarjeta`, `.grupo-campo`, `.etiqueta`, `.campo`, `.texto-secundario`, `.aviso--info|exito|advertencia|error`, `.acciones`, `.formulario-academico`. Variables CSS (`variables.css`). `Button` de `@/components/ui/button`. Iconos con `@lucide/vue` y `aria-hidden="true"`. Fechas con `.toLocaleString('es-BO')`.

1. **`frontend/src/views/estudiante/CalendarioView.vue`** (`/estudiante/calendario`):
   - Título `h1`: "Calendario académico".
   - Campo para ingresar la materia (valor inicial sugerido: `MAT-101`).
   - Botón: "Consultar calendario".
   - Lista de eventos con tipo legible: `Clase`, `Entrega de tarea`, `Actividad académica`, `Suspensión`.
   - Muestra fecha, horario (si existe) y descripción.
   - Si `evento.suspendido === true`, mostrar `.aviso--advertencia` con texto "Clase suspendida".
   - Si no hay eventos, mostrar el `mensaje` devuelto por el backend en `.aviso--info`.
   - Sin ordenamiento ni filtros en el cliente.

2. **`frontend/src/views/docente/EventosView.vue`** (`/docente/eventos`):
   - Título `h1`: "Registrar evento académico".
   - Formulario para registrar: `id`, `materiaId`, `tipo` (select con: `clase`, `entrega_tarea`, `actividad`, `suspension`), `fecha` (`type="date"`), `horario` (opcional), `descripcion` y checkbox para `suspendido` ("Clase suspendida").
   - Avisos `.aviso--exito` y `.aviso--error`.

3. **`frontend/src/views/docente/GruposView.vue`** (`/docente/grupos`):
   - Título `h1`: "Grupos de trabajo".
   - Sección de registro: `nombre`, `actividadId`, `modalidad` (`afinidad` / `sorteo`), `integrantes` (textarea con un estudiante por línea, recortando espacios y líneas vacías antes de enviar), `maximoIntegrantes` (opcional, número).
   - Sección de consulta: buscar por `actividadId`. Lista de grupos con su modalidad e integrantes. Si no hay resultados, `.aviso--info`.

---

### TAREA 3: Enrutamiento y Navegación

1. **`frontend/src/router/index.js`**:
   - Agregar las 3 nuevas rutas:
     - `{ path: '/estudiante/calendario', name: 'calendario-estudiante', component: CalendarioView }`
     - `{ path: '/docente/eventos', name: 'eventos-docente', component: EventosView }`
     - `{ path: '/docente/grupos', name: 'grupos-docente', component: GruposView }`

2. **`frontend/src/components/Encabezado.vue`**:
   - Agregar a `enlaces`:
     - `{ to: '/estudiante/calendario', texto: 'Calendario', icono: CalendarDays }`
     - `{ to: '/docente/eventos', texto: 'Eventos', icono: CalendarPlus }`
     - `{ to: '/docente/grupos', texto: 'Grupos', icono: Users }`
   - Si con 6 enlaces hay desbordamiento entre 720 y 1024 px en el navbar de escritorio, ajustar a `1024px` el breakpoint del menú móvil (`@media (max-width: 1024px)`).

3. **Verificación frontend**:
   ```bash
   cd frontend && npm run build
   ```

4. **Commits requeridos**:
   - `feat(ui): add calendar and group views matching existing style`
   - `feat(ui): add navigation links for calendar and groups`

---

### TAREA 4: Documentación

1. **`README.md`**:
   - Agregar la sección "Interfaz" documentando las rutas disponibles y comandos para ejecutar backend y frontend en desarrollo.
2. **`docs/matriz-aceptacion.md`**:
   - Agregar las filas de las pruebas de servicios HTTP de calendario y grupos con estado real `✅`.
3. **`docs/class.puml`**:
   - Agregar nota/comentario `PENDIENTE` mencionando los nuevos servicios, controladores y rutas.
4. **`docs/crc.md`**:
   - Agregar nota/comentario `PENDIENTE` con las nuevas tarjetas de servicios y controladores.
5. **Commit requerido**:
   - `docs(ui): document routes and api tests`

---

## 4. Checklist final de entrega (en el siguiente chat)

- [x] `npm test` verde (reportar: 64 antes de esta fase, 74 actualmente tras backend de calendario/grupos, y verificar al final).
- [x] `cd frontend && npm run build` finaliza sin errores.
- [x] `git status` limpio.
- [x] `git log --format='%an | %s' -n 8` con autor Steven Joel Ramos Salazar.
- [x] `git log -n 8 --format=%b` con el trailer de `Co-authored-by: kn0wles <figueredojose27@gmail.com>`.
- [x] Ningún push ni merge realizado.
