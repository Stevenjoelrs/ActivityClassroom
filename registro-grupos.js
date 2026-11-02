// registro-grupos.js
import { GrupoTrabajo } from "./grupo-trabajo.js";

export class RegistroGrupos {
    #grupos = [];

    registrar(grupo) {
        if (!(grupo instanceof GrupoTrabajo)) {
            throw new Error("El grupo debe ser una instancia de GrupoTrabajo.");
        }
        this.#grupos.push(grupo);
    }

    consultarPorActividad(actividadId) {
        if (typeof actividadId !== "string" || !actividadId.trim()) {
            throw new Error("El id de la actividad debe ser válido.");
        }
        return Object.freeze(
            this.#grupos.filter((g) => g.actividadId === actividadId)
        );
    }
}