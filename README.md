# SistemaAula
Proyecto de gestión de aula sobre (Tomar apuntes y Asignación de asientos)

## Requisitos

- Node.js 20.13 o posterior
- PostgreSQL

## Configuración

1. Instala las dependencias con `npm install`.
2. Copia `.env.example` a `.env` y configura la conexión a PostgreSQL.
3. Ejecuta `npm run db:setup`. El comando crea la base de datos configurada si hace falta, crea las tablas y agrega materias iniciales de ejemplo.
4. Inicia la API con `npm run dev`. Está disponible en `http://localhost:3000/api`.
5. Puedes comprobar `http://localhost:3000/api/estudiantes` y `http://localhost:3000/api/materias`.

Los apuntes se asocian al estudiante mediante el encabezado `x-estudiante-id`. Usa `npm start` para iniciar el servidor sin recarga automática. La configuración local `.env` no debe subirse al repositorio.

## Interfaz

Abre `http://localhost:3000` para usar la interfaz. Permite crear, editar, consultar y eliminar apuntes, cambiar de estudiante, y agregar estudiantes y materias. Los nombres de materias iniciales incluyen cursos universitarios como Sistemas de Información II y Base de Datos II.

Los archivos del frontend están en `public/`: `index.html`, `styles.css` y `app.js`. La interfaz envía los datos a la API mediante `fetch` y muestra mensajes cuando faltan campos obligatorios.
