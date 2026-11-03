class ErrorNegocio extends Error {
  constructor(mensaje, estado = 400) {
    super(mensaje);
    this.estado = estado;
  }
}

class ApunteService {
  constructor(repositorio) {
    this.repo = repositorio;
  }

  validarDatos({ titulo, contenido, idMateria }) {
    if (typeof titulo !== 'string' || titulo.trim() === '') {
      throw new ErrorNegocio('El título es obligatorio');
    }
    if (typeof contenido !== 'string' || contenido.trim() === '') {
      throw new ErrorNegocio('El contenido es obligatorio');
    }
    const materia = Number(idMateria);
    if (!Number.isInteger(materia) || materia <= 0) {
      throw new ErrorNegocio('La materia es obligatoria');
    }
  }

  async obtenerPropio(id, idEstudiante) {
    if (!Number.isInteger(id) || id <= 0) {
      throw new ErrorNegocio('Identificador de apunte inválido');
    }
    const apunte = await this.repo.obtenerPorId(id);
    if (!apunte) {
      throw new ErrorNegocio('El apunte no existe', 404);
    }
    if (apunte.id_estudiante !== idEstudiante) {
      throw new ErrorNegocio('No puedes acceder a apuntes de otro estudiante', 403);
    }
    return apunte;
  }

  async listar(idEstudiante) {
    return this.repo.listarPorEstudiante(idEstudiante);
  }

  async obtener(id, idEstudiante) {
    return this.obtenerPropio(id, idEstudiante);
  }

  async crear(idEstudiante, datos) {
    this.validarDatos(datos);
    const id = await this.repo.crear({
      titulo: datos.titulo.trim(),
      contenido: datos.contenido.trim(),
      idEstudiante,
      idMateria: Number(datos.idMateria),
    });
    return this.repo.obtenerPorId(id);
  }

  async editar(id, idEstudiante, datos) {
    await this.obtenerPropio(id, idEstudiante);
    this.validarDatos(datos);
    await this.repo.actualizar(id, {
      titulo: datos.titulo.trim(),
      contenido: datos.contenido.trim(),
      idMateria: Number(datos.idMateria),
    });
    return this.repo.obtenerPorId(id);
  }

  async eliminar(id, idEstudiante, confirmado) {
    await this.obtenerPropio(id, idEstudiante);
    if (confirmado !== true) {
      throw new ErrorNegocio('Debes confirmar la eliminación');
    }
    await this.repo.eliminar(id);
  }

  async listarMaterias() {
    return this.repo.listarMaterias();
  }

  async listarEstudiantes() {
    return this.repo.listarEstudiantes();
  }
}

module.exports = { ApunteService, ErrorNegocio };