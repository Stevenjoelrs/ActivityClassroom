# ActivityClassroom

Primer incremento de **HU-02**: registrar y consultar los datos de un grupo de
trabajo asociado a una actividad académica. JavaScript con Node.js, sin
dependencias externas.

La clase `GrupoTrabajo` admite afinidad o sorteo, rechaza integrantes duplicados,
respeta un tamaño máximo opcional y conserva los integrantes de solo lectura.
La modalidad sorteo registra un resultado ya definido; no distribuye estudiantes.

## Ejecutar las pruebas

Desde la raíz del proyecto:

```sh
npm test
```

## Uso mínimo

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

La [documentación de la tarea 01](docs/tarea-01-grupo-trabajo.md) incluye UML, los
ciclos TDD y las tareas siguientes. La tarjeta CRC queda pendiente de elaboración
manual. El registro vive en memoria; todavía no hay interfaz ni almacenamiento
persistente. HU-01 y el resto de HU-02 permanecen pendientes.
