# Roles y Responsables

Este documento detalla los roles, responsabilidades y contribuciones del equipo y de los autores externos incorporados en el repositorio, sustentado directamente en el historial de commits (`git shortlog -sne --all`).

---

## 1. Identidad de los Contribuidores

| Nombre / Alias | Correo electrónico | Rol Principal | Commits directos |
|---|---|---|---|
| **kn0wles** | `figueredojose27@gmail.com` | Conductor HU-01, Persistencia, Integración y Tooling | 34 |
| **Steven Joel Ramos Salazar** (`stevenjramossalazar`) | `stevenjramossalazar@gmail.com` | Conductor HU-02, Arquitectura HTTP, Vistas Frontend | 16 |
| **arubis** (Wendy Puma Uribe) | `wendypumauribe@gmail.com` | QA / Pruebas unitarias en Jest (HU-03 y HU-04) | 7 |
| **Joyce** | `joyfq23@gmail.com` | Implementación base y esquema SQL de HU-03 y HU-04 | 6 |
| **Camila Araoz** (`araozcamila313`) | `araozcamila313@gmail.com` | Autora HU-05 (Asignación de asientos y asistencia), frontend interactivo y pruebas Jest | 14 |
| **Ximena Mendoza Humerez** (`Ximena`) | `mendozahumerezximena@gmail.com` | Autora HU-06 (Tomar apuntes), backend Express, persistencia PostgreSQL para apuntes y asientos | 7 |

---

## 2. Matriz de Responsabilidades por Componente

| Componente | Descripción | Responsable Principal | Copiloto / Respaldo | Evidencia de Commits |
|---|---|---|---|---|
| **Dominio HU-01** (Calendario) | `EventoAcademico`, `CalendarioAcademico`, TDD `node:test` | kn0wles | Stevenjoelrs | `d218674`, `bb65ad6`, `9971a52` |
| **Dominio HU-02** (Grupos) | `GrupoTrabajo`, `RegistroGrupos`, TDD `node:test` | Stevenjoelrs | kn0wles | `f35aac5`, `0d53237`, `3fe843a` |
| **Dominio / Backend HU-03** (Entregas) | `ServicioEntregas`, `ControladorEntregas`, validaciones de adjuntos | Joyce | Stevenjoelrs / kn0wles | `9328652`, `54f2348` |
| **Dominio / Backend HU-04** (Revisión) | `ServicioRevision`, `ControladorRevision`, validaciones de feedback | Joyce | Stevenjoelrs / kn0wles | `9328652`, `54f2348` |
| **Dominio / Backend HU-05** (Asientos) | `Aula`, `Asiento`, `Estudiante`, persistencia en `datos.json` | Camila Araoz | Ximena Mendoza | `commits de modulo-asientos` |
| **Pruebas HU-05** (Jest) | 9 pruebas unitarias normalizadas en `backend/asignacion_de_asientos/pruebas.test.js` (incluye búsqueda y persistencia) | Camila Araoz | kn0wles | `3949acf` |
| **Frontend HU-05** (Asientos) | Vista Vue 3 en `frontend/src/views/docente/AsientosView.vue` y assets estáticos en `frontend/public/` | Camila Araoz | kn0wles | `1aaf3e8` |
| **Backend HU-06** (Apuntes) | `ApunteService`, `ApunteRepository`, rutas Express en `backend/apuntes/` y rutas ESM | Ximena Mendoza | Camila Araoz / kn0wles | `commits de feature/backend-apuntes`, `8040ab9` |
| **Pruebas HU-06** (Jest) | 26 pruebas unitarias (15 en `apunteService.test.js` y 11 en `validation.test.js`) | Ximena Mendoza | kn0wles | `dc1f5bf` |
| **Frontend HU-06** (Apuntes) | Vista Vue 3 en `frontend/src/views/estudiante/ApuntesView.vue` y assets estáticos en `frontend/public/` | Ximena Mendoza | kn0wles | `9d74208` |
| **Persistencia Relacional PostgreSQL** | Esquema SQL y endpoints de base de datos (`backend/server.js`, `backend/schema.sql`, `backend/setup-db.js`) | Ximena Mendoza | - | `346f3f5`, `5cde6c4` |
| **Pruebas HU-03 y HU-04** (Jest) | 4 suites y 23 pruebas unitarias para validaciones y servicios | arubis | Joyce | `f73a649`, `ef10fa4`, `91c5289`, `3dc8577` |
| **Pruebas HU-01 y HU-02** (`node:test`) | 74 pruebas unitarias de dominio, repositorios y servicios | kn0wles | Stevenjoelrs | `00d7dc6`, `0944352`, `e51e25c` |
| **Pruebas Frontend** (Vitest) | 13 pruebas unitarias de componentes para HU-01 a HU-06 (`frontend/src/tests/`) | kn0wles | Stevenjoelrs | `57fc6a1` |
| **API REST / HTTP (HU-01 y HU-02)** | Controladores y rutas Express para Calendario y Grupos | Stevenjoelrs | kn0wles | `176188a`, `60e077c` |
| **Frontend / Vistas UI** | Vistas Vue 3 de Calendario, Grupos, Docente y Estudiante | Stevenjoelrs | Joyce (base UI) | `83715ab`, `cc78677`, `8e7cb07` |
| **Persistencia Unificada** | Almacén en memoria compartido (`datos-memoria.js`), adaptadores atómicos JSON (`repositorio-archivo.js`) y esquema SQL (`schema.sql`) | kn0wles | Stevenjoelrs | `af3bb30`, `6eb244f`, `e51e25c` |
| **Integración de Historial** | Fusión no trivial con `--allow-unrelated-histories`, resolución de conflictos y doble padre | kn0wles | Stevenjoelrs | `6310ad9`, `b9bc28f` |
| **Tooling y Entorno** | Estandarización a `pnpm`, red IPv4 (`127.0.0.1`) y compatibilidad con sistemas de archivos | kn0wles | Stevenjoelrs | `ca71ed8`, `a1490d7`, `fac0c26` |
| **Documentación** | Historias de usuario, CRC, tareas TDD, informe de integración y trazabilidad | Stevenjoelrs / kn0wles | - | `99d2777`, `3ff98eb`, `7131987` |

---

## 3. Dinámica de Trabajo y Pair Programming

Para el desarrollo conjunto entre **kn0wles** y **Steven Joel Ramos Salazar**, se adoptó la práctica de Programación en Pareja (Pair Programming de eXtreme Programming):

1. **Rotación Conductor / Copiloto:**
   - Para la HU-01 (Calendario Académico), **kn0wles** actuó como conductor en la formulación de las pruebas y la implementación del dominio, con **Steven** como copiloto revisando el diseño y la especificación.
   - Para la HU-02 (Grupos de Trabajo), **Steven** asumió el rol de conductor en los ciclos TDD, con **kn0wles** como copiloto validando la inmutabilidad y el manejo de errores.
   - En la integración de endpoints HTTP y componentes UI, **Steven** lideró la construcción de controladores y vistas Vue 3, con **kn0wles** asegurando la compatibilidad de módulos y tipado.
   - En la persistencia y fusión de ramas externas, **kn0wles** condujo la unificación de repositorios y el runner híbrido de pruebas, acompañado por **Steven**.

2. **Atribución en Commits:**
   - Todos los commits de integración y desarrollo conjunto llevan la autoría del conductor y el tráiler oficial de Git:
     ```text
     Co-authored-by: Steven Joel Ramos Salazar <stevenjramossalazar@gmail.com>
     ```
   - Se preservó íntegramente la autoría original de **Joyce** y **arubis** en los commits importados del repositorio externo mediante el merge de dos padres (`6310ad9`).
   - Se preservó íntegramente la autoría original de **Camila Araoz** y **Ximena Mendoza Humerez** en los commits importados del repositorio `SistemaAula` mediante la fusión de historias no relacionadas (`9480897`).
