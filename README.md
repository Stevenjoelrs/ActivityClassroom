# Sistema Académico Universitario

Proyecto académico con frontend Vue 3 y backend Express, ambos en JavaScript y con npm. PostgreSQL se contempla mediante `pg` y SQL parametrizado, sin ORM.

## Ejecutar localmente

Desde la raíz, en una terminal:

```bash
cd backend
npm ci
npm run dev
```

En otra terminal, también desde la raíz:

```bash
cd frontend
npm ci
npm run dev
```

Abre el frontend en la dirección que muestra Vite, normalmente `http://localhost:5173`. El backend usa `http://localhost:3000`; Vite reenvía las peticiones `/api` a ese puerto. PostgreSQL no es necesario para iniciar la base del proyecto. Detén cada servidor con **Ctrl+C**.

## Organización

```text
sistema-academico/
├── frontend/              # Vistas, componentes, navegación, estilos y llamadas HTTP
├── backend/
│   └── src/
│       ├── modulos/       # Funcionalidades; cada una tiene sus propias capas
│       │   ├── entregas-tareas/
│       │   └── revision-tareas/
│       ├── compartido/    # Utilidades comunes entre funcionalidades
│       ├── config/        # Variables de entorno y conexión PostgreSQL
│       ├── routes/        # Rutas generales de prueba y estado
│       ├── app.js
│       └── server.js
├── database/              # Espacio para futuros scripts SQL
└── .gitignore             # Excluye dependencias, compilaciones y configuración local
```

Consulta [frontend/README.md](frontend/README.md) para las vistas, estilos y componentes, y [backend/README.md](backend/README.md) para las capas y los endpoints.

`main` mantiene la estructura común y las pantallas iniciales. Las funcionalidades de envío simulado y revisión de tareas se desarrollan en `US-01-02`. Las carpetas preparadas en `main` no contienen esa implementación.

Se versionan los `package-lock.json` y los `.env.example`; no los archivos `.env`, `node_modules/` ni `dist/`.
