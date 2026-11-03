const pool = require('../config/db');

class ApunteRepository {
  async listarPorEstudiante(idEstudiante) {
    const r = await pool.query(
      `SELECT a.id, a.titulo, a.fecha_creacion, a.fecha_modificacion,
              m.nombre AS materia
       FROM apunte a
       JOIN materia m ON m.id = a.id_materia
       WHERE a.id_estudiante = $1
       ORDER BY a.fecha_creacion DESC`,
      [idEstudiante]
    );
    return r.rows;
  }

  async obtenerPorId(id) {
    const r = await pool.query(
      `SELECT a.id, a.titulo, a.contenido, a.fecha_creacion, a.fecha_modificacion,
              a.id_estudiante, a.id_materia, m.nombre AS materia
       FROM apunte a
       JOIN materia m ON m.id = a.id_materia
       WHERE a.id = $1`,
      [id]
    );
    return r.rows[0] || null;
  }

  async crear({ titulo, contenido, idEstudiante, idMateria }) {
    const r = await pool.query(
      `INSERT INTO apunte (titulo, contenido, id_estudiante, id_materia)
       VALUES ($1, $2, $3, $4)
       RETURNING id`,
      [titulo, contenido, idEstudiante, idMateria]
    );
    return r.rows[0].id;
  }

  async actualizar(id, { titulo, contenido, idMateria }) {
    await pool.query(
      `UPDATE apunte
       SET titulo = $1, contenido = $2, id_materia = $3,
           fecha_modificacion = NOW()
       WHERE id = $4`,
      [titulo, contenido, idMateria, id]
    );
  }

  async eliminar(id) {
    await pool.query('DELETE FROM apunte WHERE id = $1', [id]);
  }

  async listarMaterias() {
    const r = await pool.query('SELECT id, nombre FROM materia ORDER BY nombre');
    return r.rows;
  }

  async listarEstudiantes() {
    const r = await pool.query('SELECT id, nombre FROM estudiante ORDER BY nombre');
    return r.rows;
  }
}

module.exports = ApunteRepository;