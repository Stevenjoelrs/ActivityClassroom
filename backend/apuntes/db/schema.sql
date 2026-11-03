-- Tabla de estudiantes
CREATE TABLE IF NOT EXISTS estudiante (
    id      SERIAL PRIMARY KEY,
    nombre  VARCHAR(100) NOT NULL
);

-- Catálogo de materias
CREATE TABLE IF NOT EXISTS materia (
    id      SERIAL PRIMARY KEY,
    nombre  VARCHAR(100) NOT NULL UNIQUE
);

-- Apuntes
CREATE TABLE IF NOT EXISTS apunte (
    id                  SERIAL PRIMARY KEY,
    titulo              VARCHAR(150) NOT NULL CHECK (btrim(titulo) <> ''),
    contenido           TEXT         NOT NULL CHECK (btrim(contenido) <> ''),
    fecha_creacion      TIMESTAMP    NOT NULL DEFAULT NOW(),
    fecha_modificacion  TIMESTAMP,
    id_estudiante       INTEGER      NOT NULL REFERENCES estudiante(id),
    id_materia          INTEGER      NOT NULL REFERENCES materia(id)
);
