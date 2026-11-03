# Roles y responsables

Responsabilidades según la matriz de pair programming y la integración de módulos de SistemaAula.

| Componente | Descripción | Responsable | Respaldo | Archivos |
|---|---|---|---|---|
| Dominio (grupos) | GrupoTrabajo, RegistroGrupos | Stevenjoelrs | kn0wles | backend/grupos/grupo-trabajo.js, backend/grupos/registro-grupos.js |
| Dominio (calendario) | EventoAcademico, CalendarioAcademico | kn0wles | Stevenjoelrs | backend/calendario/calendario-academico.js |
| Asignación de Asientos | Aula, Asiento, Estudiante, asistencia | Camila Araoz | - | backend/asignacion_de_asientos/ |
| Apuntes | CRUD de apuntes, persistencia PostgreSQL | Camila Araoz, Ximena | - | backend/apuntes/ |
| Persistencia | Memoria (calendario/grupos), PostgreSQL (asientos/apuntes) | Pendiente unificación | - | backend/apuntes/db/, backend/schema.sql |
| Pruebas / CI | Jest | kn0wles | Stevenjoelrs | backend/**/*.test.js, pruebas.test.js |
| Documentación | Historias, CRC, matriz, bitácora, fuentes, tareas | Stevenjoelrs | kn0wles | docs/, README.md |
| Integración / repo | Fusión SistemaAula, reorganización y adaptación CJS | kn0wles | Stevenjoelrs | .git/, package.json, README.md |
