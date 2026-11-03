const { GrupoTrabajo } = require("./grupo-trabajo");

function esIdentificadorValido(valor) {
  return typeof valor === "string" && valor.length > 0 && valor === valor.trim();
}

class RegistroGrupos {
  #grupos = [];

  registrar(grupo) {
    if (!(grupo instanceof GrupoTrabajo)) {
      throw new Error("El grupo debe ser una instancia de GrupoTrabajo.");
    }
    this.#grupos.push(grupo);
  }

  consultarPorActividad(actividadId) {
    if (!esIdentificadorValido(actividadId)) {
      throw new Error("El id de la actividad debe ser válido.");
    }
    return Object.freeze(
      this.#grupos.filter((grupo) => grupo.actividadId === actividadId),
    );
  }
}

module.exports = { RegistroGrupos };
