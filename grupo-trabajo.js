export class GrupoTrabajo {
  constructor({ nombre, actividadId, modalidad, integrantes, maximoIntegrantes = null }) {
    Object.assign(this, {
      nombre,
      actividadId,
      modalidad,
      integrantes,
      maximoIntegrantes,
    });
  }
}
