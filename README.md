# ActivityClassroom

Sistema integrado de gestión de aula que combina módulos de **ActivityClassroom** (HU-01 y HU-02) y **SistemaAula** (asignación de asientos y apuntes).

## Módulos

### HU-01 — Calendario Académico (`backend/calendario/`)
Registra y consulta eventos académicos (clases, entregas, actividades, suspensiones) de una materia.

### HU-02 — Grupos de Trabajo (`backend/grupos/`)
Registra grupos por afinidad o sorteo y valida integrantes, duplicados y máximos.

### Asignación de Asientos y Asistencia (`backend/asignacion_de_asientos/`)
Gestión de asientos en el aula (10 filas × 5 columnas), asignación de estudiantes y registro de asistencia. Datos persistidos en PostgreSQL.

### Apuntes (`backend/apuntes/`)
CRUD de apuntes asociados a estudiante y materia, con reglas de negocio de longitud y contenido. Backend Express + PostgreSQL. Requiere base de datos configurada.

---

## Ejecutar pruebas

```sh
npm install
npm test
```

Resultado esperado: **43 pruebas de ActivityClassroom + 5 de asientos = 48 en verde**.

> Los módulos de apuntes y el backend de asistencia no tienen pruebas unitarias aún.

---

## Levantar el servidor (asientos + apuntes)

### Requisitos

- Node.js 20.13 o posterior
- PostgreSQL

### Configuración

```sh
cp .env.example .env
# Editar .env con las credenciales de PostgreSQL
npm install
npm run db:setup   # Crea tablas en la base de datos
npm run dev        # Servidor con recarga automática
```

La aplicación estará en:
- Apuntes: `http://localhost:3000`
- Asientos: `http://localhost:3000/asignacion-de-asientos/`
- API: `http://localhost:3000/api`

> La configuración `.env` no debe subirse al repositorio. Los módulos de calendario y grupos corren sin PostgreSQL.

---

## Pendientes

- Unificar identificadores de estudiante (`EST-01` vs `matricula`) y de materia (`MAT-101` vs `materia.id`).
- Persistencia mixta: memoria (HU-01 y HU-02) vs PostgreSQL (asientos, apuntes).
- Pruebas unitarias para apuntes.
- Frontend de apuntes integrado a la estructura.
