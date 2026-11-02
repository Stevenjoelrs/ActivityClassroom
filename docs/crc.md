# Tarjetas CRC - HU-01 y HU-02

Una tarjeta por clase implementada. Los colaboradores coinciden con el código.

## GrupoTrabajo (HU-02)

```
┌─────────────────────────────────────────────────────────────┐
│ Clase: GrupoTrabajo                                HU: 02   │
├──────────────────────────────────────┬──────────────────────┤
│ Responsabilidades                    │ Colaboradores        │
│ - Representar un grupo por afinidad  │ - Ninguno (clase de  │
│   o por sorteo ya realizado          │   dominio autónoma)  │
│ - Conocer nombre, actividad e        │                      │
│   integrantes                        │                      │
│ - Impedir integrantes duplicados     │                      │
│ - Validar y respetar el tamaño       │                      │
│   máximo opcional                    │                      │
│ - Garantizar que sus datos son de    │                      │
│   solo lectura                       │                      │
├──────────────────────────────────────┴──────────────────────┤
│ Atributos clave: nombre, actividadId, modalidad,            │
│ integrantes, maximoIntegrantes                              │
└─────────────────────────────────────────────────────────────┘
```

## RegistroGrupos (HU-02)

```
┌─────────────────────────────────────────────────────────────┐
│ Clase: RegistroGrupos                              HU: 02   │
├──────────────────────────────────────┬──────────────────────┤
│ Responsabilidades                    │ Colaboradores        │
│ - Registrar grupos en memoria        │ - GrupoTrabajo       │
│ - Consultar los grupos de una        │                      │
│   actividad                          │                      │
│ - Entregar resultados de solo        │                      │
│   lectura                            │                      │
│ - Validar el id de la actividad      │                      │
│   consultada                         │                      │
├──────────────────────────────────────┴──────────────────────┤
│ Atributos clave: #grupos (privado)                          │
└─────────────────────────────────────────────────────────────┘
```

## EventoAcademico (HU-01)

```
┌─────────────────────────────────────────────────────────────┐
│ Clase: EventoAcademico                             HU: 01   │
├──────────────────────────────────────┬──────────────────────┤
│ Responsabilidades                    │ Colaboradores        │
│ - Conocer el tipo (clase, entrega    │ - Ninguno            │
│   de tarea, actividad, suspensión)   │                      │
│ - Conocer fecha, horario opcional    │                      │
│   y descripción                      │                      │
│ - Conocer si está suspendido         │                      │
│ - Validar sus datos y ser            │                      │
│   inmutable                          │                      │
├──────────────────────────────────────┴──────────────────────┤
│ Atributos clave: id, materiaId, tipo, fecha, horario,       │
│ descripcion, suspendido                                     │
└─────────────────────────────────────────────────────────────┘
```

## CalendarioAcademico (HU-01)

```
┌─────────────────────────────────────────────────────────────┐
│ Clase: CalendarioAcademico                         HU: 01   │
├──────────────────────────────────────┬──────────────────────┤
│ Responsabilidades                    │ Colaboradores        │
│ - Registrar eventos académicos       │ - EventoAcademico    │
│ - Consultar los eventos de una       │                      │
│   materia                            │                      │
│ - Informar cuando no existen         │                      │
│   eventos registrados                │                      │
│ - Entregar resultados de solo        │                      │
│   lectura                            │                      │
├──────────────────────────────────────┴──────────────────────┤
│ Atributos clave: #eventos (privado)                         │
└─────────────────────────────────────────────────────────────┘
```