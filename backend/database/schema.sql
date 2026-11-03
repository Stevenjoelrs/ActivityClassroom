-- PROPUESTA OPCIONAL. La demo utiliza memoria y NO necesita ejecutar este archivo.
-- Para una futura base nueva; no migra ni elimina las tablas del prototipo de Google.
BEGIN;
CREATE TABLE IF NOT EXISTS estudiantes (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  correo TEXT NOT NULL UNIQUE
);
CREATE TABLE IF NOT EXISTS docentes (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  correo TEXT NOT NULL UNIQUE
);
CREATE TABLE IF NOT EXISTS tareas (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  docente_id BIGINT NOT NULL REFERENCES docentes(id),
  codigo VARCHAR(64) NOT NULL,
  UNIQUE(docente_id, codigo)
);
CREATE TABLE IF NOT EXISTS entregas (
  id UUID PRIMARY KEY,
  estudiante_id BIGINT NOT NULL REFERENCES estudiantes(id),
  tarea_id BIGINT NOT NULL REFERENCES tareas(id),
  enviado TIMESTAMPTZ NOT NULL,
  recibido TIMESTAMPTZ NOT NULL,
  archivo_nombre TEXT NOT NULL,
  archivo_contenido BYTEA NOT NULL
);
CREATE TABLE IF NOT EXISTS feedback (
  entrega_id UUID PRIMARY KEY REFERENCES entregas(id),
  correcto TEXT NOT NULL CHECK (length(trim(correcto)) > 0),
  incorrecto TEXT NOT NULL CHECK (length(trim(incorrecto)) > 0),
  corregir TEXT NOT NULL CHECK (length(trim(corregir)) > 0),
  actualizado TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS eventos_academicos (
  id VARCHAR(64) PRIMARY KEY,
  materia_id VARCHAR(64) NOT NULL,
  tipo VARCHAR(32) NOT NULL CHECK (tipo IN ('clase', 'entrega_tarea', 'actividad', 'suspension')),
  fecha DATE NOT NULL,
  horario VARCHAR(64),
  descripcion TEXT NOT NULL,
  suspendido BOOLEAN NOT NULL DEFAULT FALSE
);
CREATE TABLE IF NOT EXISTS grupos_trabajo (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nombre VARCHAR(128) NOT NULL,
  actividad_id VARCHAR(64) NOT NULL,
  modalidad VARCHAR(32) NOT NULL CHECK (modalidad IN ('afinidad', 'sorteo')),
  maximo_integrantes INT
);
CREATE TABLE IF NOT EXISTS grupo_integrantes (
  grupo_id BIGINT NOT NULL REFERENCES grupos_trabajo(id) ON DELETE CASCADE,
  estudiante_id VARCHAR(64) NOT NULL,
  PRIMARY KEY (grupo_id, estudiante_id)
);
COMMIT;
