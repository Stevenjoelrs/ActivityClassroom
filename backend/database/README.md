# Base de datos

Esta carpeta contiene los scripts SQL del proyecto.

- `schema.sql`: propuesta de esquema relacional para PostgreSQL con estudiantes, docentes, tareas, entregas, feedback (HU-03 y HU-04), eventos académicos (HU-01) y grupos de trabajo con sus integrantes (HU-02).
- `seed.sql`: reservado para futuros datos ficticios de desarrollo; todavía no existe.

La aplicación utiliza almacenamiento en memoria compartida por defecto (`datos-memoria.js`), por lo que no requiere una base de datos PostgreSQL activa ni la ejecución manual de este esquema para su funcionamiento normal o la ejecución de pruebas.
