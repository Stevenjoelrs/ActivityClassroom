# Tarjetas CRC - HU-01 y HU-02

Una tarjeta por clase implementada. Los colaboradores coinciden con el código.

## GrupoTrabajo (HU-02)

| Responsabilidades | Colaboradores |
| --- | --- |
| Representar un grupo por afinidad o por sorteo ya realizado | Ninguno (clase de dominio autónoma) |
| Conocer nombre, actividad, modalidad, integrantes y máximo | |
| Impedir integrantes duplicados | |
| Validar y respetar el tamaño máximo opcional | |
| Garantizar que sus datos e integrantes sean de solo lectura | |

**Atributos clave:** `nombre`, `actividadId`, `modalidad`, `integrantes`, `maximoIntegrantes`.

## RegistroGrupos (HU-02)

| Responsabilidades | Colaboradores |
| --- | --- |
| Registrar grupos en memoria | GrupoTrabajo |
| Validar que el objeto registrado sea `GrupoTrabajo` | |
| Consultar los grupos de una actividad | |
| Validar el identificador de la actividad consultada | |
| Entregar un arreglo congelado de resultados | |

**Atributos clave:** `#grupos` (privado).

## EventoAcademico (HU-01)

| Responsabilidades | Colaboradores |
| --- | --- |
| Representar una clase, entrega, actividad o suspensión | Ninguno |
| Conocer fecha, horario opcional y descripción | |
| Conocer si el evento está suspendido | |
| Validar sus datos y permanecer inmutable | |

**Atributos clave:** `id`, `materiaId`, `tipo`, `fecha`, `horario`, `descripcion`, `suspendido`.

## CalendarioAcademico (HU-01)

| Responsabilidades | Colaboradores |
| --- | --- |
| Registrar eventos académicos en memoria | EventoAcademico |
| Validar que el evento registrado sea `EventoAcademico` | |
| Consultar los eventos de una materia | |
| Informar cuando no existen eventos registrados | |
| Entregar `{mensaje, eventos}` de solo lectura | |

**Atributos clave:** `#eventos` (privado).
