import fs from 'node:fs';
import path from 'node:path';
import { EventoAcademico } from '../modulos/calendario-academico/calendario-academico.js';
import { GrupoTrabajo } from '../modulos/grupos-trabajo/grupo-trabajo.js';

/**
 * Puebla el almacén en memoria y los archivos de persistencia local
 * con datos de muestra realistas para demostración y validación docente.
 */
export function poblarDatosIniciales(almacen) {
  // 1. HU-01: Calendario Académico
  if (!almacen.eventos || almacen.eventos.length === 0) {
    almacen.eventos = [
      new EventoAcademico({
        id: 'EV-01',
        materiaId: 'MAT-101',
        tipo: 'clase',
        fecha: '2026-11-10',
        horario: '08:15 - 09:45',
        descripcion: 'Clase magistral: Introducción a Matrices y Espacios Vectoriales.',
        suspendido: false,
      }),
      new EventoAcademico({
        id: 'EV-02',
        materiaId: 'MAT-101',
        tipo: 'entrega_tarea',
        fecha: '2026-11-14',
        horario: '23:59',
        descripcion: 'Fecha límite de envío: Práctica 1 - Álgebra Matricial.',
        suspendido: false,
      }),
      new EventoAcademico({
        id: 'EV-03',
        materiaId: 'MAT-101',
        tipo: 'clase',
        fecha: '2026-11-17',
        horario: '08:15 - 09:45',
        descripcion: 'Clase de transformaciones lineales (Suspendida por consejo facultativo).',
        suspendido: true,
      }),
      new EventoAcademico({
        id: 'EV-04',
        materiaId: 'MAT-101',
        tipo: 'actividad',
        fecha: '2026-11-24',
        horario: '08:15 - 10:15',
        descripcion: 'Primer Examen Parcial presencial en Aula Magna.',
        suspendido: false,
      }),
      new EventoAcademico({
        id: 'EV-05',
        materiaId: 'SIS-211',
        tipo: 'clase',
        fecha: '2026-11-12',
        horario: '14:15 - 16:45',
        descripcion: 'Taller de Arquitectura Limpia, TDD y Pair Programming.',
        suspendido: false,
      }),
      new EventoAcademico({
        id: 'EV-06',
        materiaId: 'SIS-211',
        tipo: 'actividad',
        fecha: '2026-11-19',
        horario: '14:15 - 16:45',
        descripcion: 'Revisión y defensa de entregables del Sprint 1.',
        suspendido: false,
      }),
    ];
  }

  // 2. HU-02: Grupos de Trabajo
  if (!almacen.grupos || almacen.grupos.length === 0) {
    almacen.grupos = [
      new GrupoTrabajo({
        nombre: 'Equipo Alpha',
        actividadId: 'PRACTICA-01',
        modalidad: 'afinidad',
        integrantes: ['EST-202301', 'EST-202302'],
        maximoIntegrantes: 3,
      }),
      new GrupoTrabajo({
        nombre: 'Equipo Beta',
        actividadId: 'PRACTICA-01',
        modalidad: 'sorteo',
        integrantes: ['EST-202303', 'EST-202304', 'EST-202305'],
        maximoIntegrantes: 4,
      }),
      new GrupoTrabajo({
        nombre: 'Scrum Masters',
        actividadId: 'PROYECTO-FINAL',
        modalidad: 'afinidad',
        integrantes: ['EST-202301', 'EST-202305'],
        maximoIntegrantes: 2,
      }),
    ];
  }

  // 3. HU-03 y HU-04: Entregas y Revisión
  if (!almacen.entregas || almacen.entregas.size === 0) {
    if (!almacen.entregas) almacen.entregas = new Map();

    almacen.entregas.set('ENT-DEMO-01', {
      id: 'ENT-DEMO-01',
      tarea: 'PRACTICA-01',
      estudiante: { correo: 'estudiante@est.umss.edu' },
      docente: { correo: 'docente@umss.edu' },
      recibido: new Date(Date.now() - 3600000 * 2).toISOString(),
      enviado: new Date(Date.now() - 3600000 * 2).toISOString(),
      estado: 'POR REVISAR',
      archivo: {
        nombre: 'informe_practica1.pdf',
        tipo: 'application/pdf',
        contenido: Buffer.from('%PDF-1.4 Informe de práctica de álgebra y algoritmos.'),
      },
      feedback: null,
    });

    almacen.entregas.set('ENT-DEMO-02', {
      id: 'ENT-DEMO-02',
      tarea: 'PRACTICA-01',
      estudiante: { correo: 'carlos.ruiz@est.umss.edu' },
      docente: { correo: 'docente@umss.edu' },
      recibido: new Date(Date.now() - 3600000 * 24).toISOString(),
      enviado: new Date(Date.now() - 3600000 * 24).toISOString(),
      estado: 'REVISADA',
      archivo: {
        nombre: 'matrices_solucion.zip',
        tipo: 'application/zip',
        contenido: Buffer.from('PK... archivo zip simulado con ejercicios resueltos.'),
      },
      feedback: {
        correcto: 'La resolución de sistemas de ecuaciones mediante el método de Gauss está impecable y bien justificada.',
        incorrecto: 'Omitió el análisis de consistencia para matrices singulares en el ejercicio 3.',
        corregir: 'Agregar la demostración del teorema de Rouché-Frobenius e incluir el paso de verificación por determinante.',
        actualizado: new Date(Date.now() - 3600000 * 12).toISOString(),
      },
    });

    almacen.entregas.set('ENT-DEMO-03', {
      id: 'ENT-DEMO-03',
      tarea: 'PRACTICA-02',
      estudiante: { correo: 'beatriz.morales@est.umss.edu' },
      docente: { correo: 'docente@umss.edu' },
      recibido: new Date(Date.now() - 3600000 * 4).toISOString(),
      enviado: new Date(Date.now() - 3600000 * 4).toISOString(),
      estado: 'POR REVISAR',
      archivo: {
        nombre: 'diagramas_arquitectura.docx',
        tipo: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        contenido: Buffer.from('Documento Word de diagramas de componentes y clases.'),
      },
      feedback: null,
    });
  }

  // 4. HU-05: Asignación de Asientos y Asistencia
  if (!almacen.estudiantes || almacen.estudiantes.length === 0) {
    almacen.estudiantes = [
      { id: 1, nombre: 'Ana Pérez', matricula: 'EST-202301' },
      { id: 2, nombre: 'Carlos Ruiz', matricula: 'EST-202302' },
      { id: 3, nombre: 'Beatriz Morales', matricula: 'EST-202303' },
      { id: 4, nombre: 'David Flores', matricula: 'EST-202304' },
      { id: 5, nombre: 'Elena Gómez', matricula: 'EST-202305' },
    ];
  }

  if (!almacen.asientos || almacen.asientos.size === 0) {
    if (!almacen.asientos) almacen.asientos = new Map();
    almacen.asientos.set(1, { estudiante_id: 1, nombre: 'Ana Pérez', matricula: 'EST-202301' });
    almacen.asientos.set(2, { estudiante_id: 2, nombre: 'Carlos Ruiz', matricula: 'EST-202302' });
    almacen.asientos.set(15, { estudiante_id: 3, nombre: 'Beatriz Morales', matricula: 'EST-202303' });
    almacen.asientos.set(28, { estudiante_id: 4, nombre: 'David Flores', matricula: 'EST-202304' });
  }

  if (!almacen.asistencia || almacen.asistencia.size === 0) {
    if (!almacen.asistencia) almacen.asistencia = new Map();
    const hoy = new Date().toISOString().slice(0, 10);
    almacen.asistencia.set(`1_${hoy}`, 'Presente');
    almacen.asistencia.set(`2_${hoy}`, 'Atrasado');
    almacen.asistencia.set(`3_${hoy}`, 'Presente');
    almacen.asistencia.set(`4_${hoy}`, 'Ausente');
    almacen.asistencia.set(`5_${hoy}`, 'Presente');
  }

  // 5. HU-06: Materias y Apuntes
  if (!almacen.materias || almacen.materias.length === 0) {
    almacen.materias = [
      { id: 1, nombre: 'Sistemas de Información 2' },
      { id: 2, nombre: 'Base de Datos 2' },
      { id: 3, nombre: 'Ingeniería de Software' },
      { id: 4, nombre: 'Taller de Grado' },
    ];
  }

  if (!almacen.apuntes || almacen.apuntes.length === 0) {
    almacen.apuntes = [
      {
        id: 1,
        estudiante_id: 1,
        materia_id: 1,
        materia: 'Sistemas de Información 2',
        titulo: 'Arquitectura Hexagonal y TDD',
        contenido: 'Aislamiento de la lógica de dominio con puertos y adaptadores. Ciclo estricto Red-Green-Refactor.',
        fecha_creacion: '2026-11-01T10:00:00.000Z',
        fecha_modificacion: null,
      },
      {
        id: 2,
        estudiante_id: 1,
        materia_id: 2,
        materia: 'Base de Datos 2',
        titulo: 'Optimización de Consultas e Índices B-Tree',
        contenido: 'Uso de EXPLAIN ANALYZE en PostgreSQL. Creación de índices compuestos sobre claves foráneas.',
        fecha_creacion: '2026-11-02T14:30:00.000Z',
        fecha_modificacion: null,
      },
      {
        id: 3,
        estudiante_id: 1,
        materia_id: 3,
        materia: 'Ingeniería de Software',
        titulo: 'Metodologías Ágiles: XP y Pair Programming',
        contenido: 'Dinámica de conductor y copiloto, rotación de roles, tarjetas CRC y diseño evolutivo.',
        fecha_creacion: '2026-11-02T16:00:00.000Z',
        fecha_modificacion: null,
      },
      {
        id: 4,
        estudiante_id: 2,
        materia_id: 1,
        materia: 'Sistemas de Información 2',
        titulo: 'Integración Git y Co-authored-by',
        contenido: 'Fusión de historiales no relacionados, normalización ESM/CJS y atribución precisa por commit.',
        fecha_creacion: '2026-11-03T09:00:00.000Z',
        fecha_modificacion: null,
      },
    ];
  }

  // 6. Archivos JSON de persistencia en backend/data/ (para pruebas que leen disco)
  try {
    const dirData = path.resolve('backend/data');
    if (!fs.existsSync(dirData)) {
      fs.mkdirSync(dirData, { recursive: true });
    }
    const rutaEventos = path.join(dirData, 'eventos.json');
    if (!fs.existsSync(rutaEventos)) {
      fs.writeFileSync(
        rutaEventos,
        JSON.stringify(almacen.eventos, null, 2),
        'utf8',
      );
    }
    const rutaGrupos = path.join(dirData, 'grupos.json');
    if (!fs.existsSync(rutaGrupos)) {
      fs.writeFileSync(
        rutaGrupos,
        JSON.stringify(almacen.grupos, null, 2),
        'utf8',
      );
    }
  } catch (e) {
    // Si no se puede escribir el archivo en el FS actual, no interrumpe el arranque en memoria.
  }
}
