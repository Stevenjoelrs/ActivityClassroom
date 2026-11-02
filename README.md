# ActivityClassroom

Primeros incrementos de **HU-01** (calendario académico) y **HU-02** (registro de
grupos de trabajo). JavaScript con Node.js, sin dependencias externas.

## Ejecutar las pruebas

Desde la raíz del proyecto:

```sh
npm test
```

Si `npm` no está disponible, las pruebas también se ejecutan con:

```sh
node --test
```

El suite actual ejecuta **43 pruebas** nativas con `node:test` y
`node:assert/strict`.

## Calendario académico (HU-01)

La clase `EventoAcademico` representa una clase, una entrega de tarea, una
actividad o una suspensión, con fecha, horario opcional y descripción.
`CalendarioAcademico` registra eventos y consulta únicamente los de una materia;
si no existen eventos, devuelve un mensaje informativo y un arreglo vacío. Tanto
los eventos como los resultados de las consultas son de solo lectura.

### Uso mínimo

```javascript
import { CalendarioAcademico, EventoAcademico } from "./calendario-academico.js";

const calendario = new CalendarioAcademico();
calendario.registrarEvento(
  new EventoAcademico({
    id: "EV-01",
    materiaId: "MAT-101",
    tipo: "entrega_tarea",
    fecha: "2026-11-10",
    horario: "08:00 - 10:00",
    descripcion: "Entrega del primer avance",
  }),
);

console.log(calendario.consultarMateria("MAT-101").eventos);
```

Los identificadores son cadenas no vacías sin espacios en sus extremos y la
fecha debe ser una fecha real en formato `AAAA-MM-DD`. Los tipos admitidos son
`clase`, `entrega_tarea`, `actividad` y `suspension`. El horario es opcional. Los
datos inválidos producen `Error` con un mensaje descriptivo.

La [documentación de la tarea de calendario](docs/tarea-01-calendario-academico.md)
incluye UML, los ciclos TDD y las tareas siguientes.

## Grupos de trabajo (HU-02)

Primer incremento de **HU-02**: registrar y consultar los datos de un grupo de
trabajo asociado a una actividad académica.

La clase `GrupoTrabajo` admite afinidad o sorteo, rechaza integrantes duplicados,
respeta un tamaño máximo opcional y conserva los integrantes de solo lectura.
La modalidad sorteo registra un resultado ya definido; no distribuye estudiantes.

### Uso mínimo

```javascript
import { GrupoTrabajo } from "./grupo-trabajo.js";

const grupo = new GrupoTrabajo({
  nombre: "Equipo Alfa",
  actividadId: "ACT-01",
  modalidad: "afinidad",
  integrantes: ["EST-01", "EST-02"],
  maximoIntegrantes: 3,
});

console.log(grupo.nombre, grupo.actividadId, grupo.modalidad);
console.log(grupo.integrantes);
```

Los identificadores son cadenas no vacías sin espacios en sus extremos. Los
integrantes se reciben como un arreglo y se guardan en una copia congelada. El
grupo también se congela para impedir reasignaciones. El máximo es opcional
(`null` cuando no existe) y debe ser un entero positivo seguro. Los datos
inválidos producen `Error` con un mensaje descriptivo.

La [documentación de la tarea 01 de grupos](docs/tarea-01-grupo-trabajo.md) incluye
UML, los ciclos TDD y las tareas siguientes. El registro vive en memoria; todavía
no hay interfaz ni almacenamiento persistente.

La [documentación de historias de usuario](docs/US.md) y las
[tarjetas CRC](docs/crc.md) resumen ambas historias. También están disponibles la
[matriz de aceptación](docs/matriz-aceptacion.md), los [roles](docs/roles.md), la
[bitácora](docs/bitacora.md) y las [fuentes](docs/fuentes.md).
