# Backend — Sistema Académico Universitario

API REST con Node.js, Express y JavaScript. El acceso a PostgreSQL utiliza `pg`, SQL directo y consultas parametrizadas, sin ORM.

## Iniciar el backend

Desde la raíz del proyecto:

```bash
cd backend
npm ci
```

Configura en `.env`:

```dotenv
PORT=3000
FRONTEND_ORIGIN=http://localhost:5173
DATABASE_URL=
```

Inicia el servidor:

```bash
npm run dev
```

`dev` usa nodemon para reiniciar al guardar cambios. `npm start` ejecuta sin reinicio automático. Para detenerlo, presiona **Ctrl+C**.

`DATABASE_URL` puede quedar vacía: Express y el endpoint de prueba funcionan sin PostgreSQL. Cuando tengas una base disponible, configura su URL únicamente en `.env`, con el formato `postgresql://usuario:clave@localhost:5432/sistema_academico`. No subas credenciales a Git.

## Estructura y responsabilidades

```text
backend/
├── src/
│   ├── config/                # Variables de entorno y conexión PostgreSQL
│   │   ├── env.js             # Lee y valida la configuración
│   │   └── database.js        # Pool de pg y comprobación de conexión
│   ├── routes/                # Métodos HTTP y direcciones de los endpoints
│   │   └── status.routes.js   # Endpoints de prueba y estado
│   ├── controllers/           # Reciben datos HTTP y construyen respuestas
│   ├── services/              # Reglas de negocio y validaciones
│   ├── repositories/          # Consultas SQL a PostgreSQL
│   ├── middlewares/           # Carpeta prevista para verificaciones comunes
│   ├── app.js                 # Configura Express, CORS, rutas y errores
│   └── server.js              # Inicia el servidor y cierra las conexiones
├── .env.example               # Variables de ejemplo, sin credenciales reales
├── package.json               # Dependencias y scripts npm
└── package-lock.json          # Versiones exactas de las dependencias
```

Las carpetas sin implementación se irán completando al desarrollar las HU. El manejo de errores actual está en `app.js`; `middlewares/` se creará cuando sea necesario extraer lógica compartida. Git no conserva carpetas vacías.

## ¿Dónde van los endpoints?

Se definen en `src/routes/`. Cada ruta indica un método HTTP (`GET`, `POST`, etc.) y una dirección. `app.js` registra el prefijo de esas rutas.

Por ejemplo, en `app.js`:

```js
app.use('/api', statusRoutes);
```

Y en `routes/status.routes.js`:

```js
router.get('/', (req, res) => {
  res.json({ mensaje: 'API del sistema académico funcionando' });
});
```

Al combinar el prefijo `/api` con `/`, el endpoint final es `GET /api`.

### Endpoints existentes

| Método | Dirección | Respuesta |
| --- | --- | --- |
| GET | `/api` | Mensaje JSON para comprobar que Express responde |
| GET | `/api/health` | Estado de la API y de PostgreSQL por separado |

Puedes comprobarlos en `http://localhost:3000/api` y `http://localhost:3000/api/health`.

`/api/health` responde HTTP 200 con el estado de cada servicio. `database.estado` puede ser `sin_configurar`, `disponible` o `no_disponible`. Una base no disponible no impide iniciar el servidor ni usar `/api`.

## Cómo organizar una funcionalidad

Agrupamos los archivos por funcionalidad dentro de cada capa. Por ejemplo, si una HU requiere gestionar cursos:

```text
routes/cursos.routes.js
controllers/cursos.controller.js
services/cursos.service.js
repositories/cursos.repository.js
```

Es un ejemplo de nombres; no significa que esa funcionalidad ya exista.

El recorrido de una solicitud será:

```text
Frontend → ruta → controlador → servicio → repositorio → PostgreSQL
```

- La **ruta** relaciona el endpoint con el controlador.
- El **controlador** recibe parámetros y datos de la solicitud, llama al servicio y envía una respuesta HTTP en JSON.
- El **servicio** valida los datos y aplica las reglas de negocio.
- El **repositorio** ejecuta SQL mediante el pool de `pg`. Los valores recibidos deben pasar como parámetros, nunca concatenarse al SQL.
- Los **middlewares** realizan verificaciones compartidas antes de continuar o manejan errores.

Los endpoints de prueba actuales responden directamente desde sus rutas porque no tienen reglas académicas. Las funcionalidades nuevas usarán las capas que correspondan.

## Roles y alcance

No separamos todo el backend en carpetas `docente/` y `estudiante/`: ambos pueden trabajar con los mismos recursos. Los permisos se verificarán en el backend mediante middlewares y reglas de negocio, incluyendo el acceso al curso o registro correspondiente.

Una ruta, un rol enviado desde el navegador o seleccionar un nombre no demuestra identidad. El mecanismo de acceso sin login tradicional está pendiente de definir.

Solo se implementarán las funcionalidades validadas de las HU 01 y 02 y sus tarjetas CRC. No crear endpoints, tablas ni reglas adicionales antes de esa validación.
