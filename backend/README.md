# Backend — Sistema Académico Universitario

Base del backend con Node.js, Express y JavaScript. Se organiza por funcionalidad, con la misma estructura de módulos que la rama `US-01-02`.

## Iniciar

Desde la raíz:

```bash
cd backend
npm ci
npm run dev
```

El puerto predeterminado es `3000`. El archivo `.env` es opcional; si ya existe, verifica que use `PORT=3000`. `.env.example` muestra las variables disponibles. `npm start` ejecuta sin nodemon; **Ctrl+C** detiene el servidor.

`DATABASE_URL` puede quedar vacía. Express y el endpoint de prueba funcionan sin PostgreSQL. La configuración con `pg` está preparada para una conexión futura, sin ORM.

## Estructura por funcionalidad

```text
src/
├── modulos/
│   ├── entregas-tareas/      # Carpeta preparada para la US-01
│   └── revision-tareas/      # Carpeta preparada para la US-02
├── compartido/              # Utilidades que usan varios módulos
├── config/
│   ├── env.js               # Variables de entorno y validación del puerto
│   └── database.js          # Pool de PostgreSQL y comprobación de conexión
├── routes/
│   └── status.routes.js     # Endpoints generales de prueba y estado
├── app.js                   # Configura Express y registra las rutas
└── server.js                # Inicia el servidor y cierra conexiones
```

Las carpetas de módulos y `compartido/` contienen `.gitkeep` para que Git las conserve mientras están vacías. En `main` todavía no incluyen la implementación de las historias.

### Archivos dentro de cada módulo

Al implementar una funcionalidad, usa este patrón:

```text
modulos/entregas-tareas/
├── entregas.routes.js        # Define los endpoints
├── entregas.controller.js    # Recibe solicitudes y construye respuestas HTTP
├── entregas.service.js       # Aplica las reglas de negocio
├── entregas.validaciones.js  # Validaciones propias de la funcionalidad
└── entregas.repository.js    # Consulta y guarda datos
```

El módulo `revision-tareas/` sigue el mismo patrón con el prefijo `revision`. Este árbol explica la convención; esos archivos se crean al desarrollar la historia.

El recorrido de una solicitud es **ruta → controlador → servicio → repositorio**. El servicio concentra las reglas para poder probarlas sin levantar Express ni conectarse a servicios externos. Las funciones comunes entre módulos van en `compartido/`.

No separamos todo el backend en docente y estudiante: las carpetas representan funcionalidades. Una ruta o un correo recibido en un formulario no demuestra identidad ni concede permisos.

## ¿Dónde van los endpoints?

Los endpoints de cada funcionalidad van en su archivo `.routes.js`, dentro de su módulo. `app.js` registra el prefijo. Por ejemplo, al implementar entregas se podrá registrar un router bajo `/api/entregas`.

Los endpoints generales actuales están en `routes/status.routes.js`:

| Método | Dirección | Función |
| --- | --- | --- |
| GET | `/api` | Responde JSON para comprobar que Express funciona |
| GET | `/api/health` | Informa el estado de la API y de PostgreSQL por separado |

`app.js` registra `statusRoutes` bajo `/api`. Por eso `router.get('/')` responde en `http://localhost:3000/api`.

`/api/health` responde HTTP 200 con el estado de cada servicio. `database.estado` puede ser `sin_configurar`, `disponible` o `no_disponible`. Una base no disponible no impide iniciar Express ni consultar `/api`.

## Alcance de las ramas

`main` contiene la base compartida, los endpoints de prueba y las carpetas preparadas. La implementación de envío simulado y revisión con feedback permanece en `US-01-02`, junto a sus instrucciones específicas. Preparar la estructura no registra ni activa esos módulos en `main`.

La carpeta `database/` de la raíz queda reservada para esquemas y datos iniciales cuando se defina su uso. No se crean ni modifican bases automáticamente.
