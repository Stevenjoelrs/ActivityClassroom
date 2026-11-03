class GrupoTrabajo {
  constructor({ nombre, actividadId, modalidad, integrantes, maximoIntegrantes = null }) {
    if (typeof nombre !== "string" || !nombre.trim()) {
      throw new Error("El grupo debe tener un nombre.");
    }
    if (!["afinidad", "sorteo"].includes(modalidad)) {
      throw new Error("La modalidad debe ser afinidad o sorteo.");
    }
    if (!Array.isArray(integrantes) || integrantes.length === 0) {
      throw new Error("El grupo debe tener una colección de integrantes.");
    }
    if ([actividadId, ...integrantes].some(
      (id) => typeof id !== "string" || !id || id !== id.trim(),
    )) {
      throw new Error(
        "La actividad y los integrantes requieren identificadores no vacíos y sin espacios en los extremos.",
      );
    }
    if (new Set(integrantes).size !== integrantes.length) {
      throw new Error("Un estudiante no puede aparecer dos veces en el grupo.");
    }
    if (maximoIntegrantes !== null) {
      if (!Number.isSafeInteger(maximoIntegrantes) || maximoIntegrantes < 1) {
        throw new Error("El tamaño máximo debe ser un entero positivo seguro.");
      }
      if (integrantes.length > maximoIntegrantes) {
        throw new Error("El grupo supera el tamaño máximo de la actividad.");
      }
    }
    Object.assign(this, {
      nombre,
      actividadId,
      modalidad,
      integrantes: Object.freeze([...integrantes]),
      maximoIntegrantes,
    });
    Object.freeze(this);
  }
}

module.exports = { GrupoTrabajo };
