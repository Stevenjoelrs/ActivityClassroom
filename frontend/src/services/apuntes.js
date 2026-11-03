import { request } from './entregas.js';

export const obtenerMaterias = () => request('/materias');

export const crearMateria = (nombre) =>
  request('/materias', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre }),
  });

export const obtenerEstudiantes = () => request('/estudiantes');

export const obtenerApuntes = (estudianteId) =>
  request('/apuntes', {
    headers: { 'x-estudiante-id': String(estudianteId) },
  });

export const obtenerApunte = (id, estudianteId) =>
  request(`/apuntes/${id}`, {
    headers: { 'x-estudiante-id': String(estudianteId) },
  });

export const crearApunte = (estudianteId, datos) =>
  request('/apuntes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-estudiante-id': String(estudianteId),
    },
    body: JSON.stringify(datos),
  });

export const editarApunte = (id, estudianteId, datos) =>
  request(`/apuntes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-estudiante-id': String(estudianteId),
    },
    body: JSON.stringify(datos),
  });

export const eliminarApunte = (id, estudianteId) =>
  request(`/apuntes/${id}?confirmar=true`, {
    method: 'DELETE',
    headers: { 'x-estudiante-id': String(estudianteId) },
  });
