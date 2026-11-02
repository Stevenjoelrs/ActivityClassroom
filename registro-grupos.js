// registro-grupos.js
export class RegistroGrupos {
    #grupos = [];

    registrar(grupo) {
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