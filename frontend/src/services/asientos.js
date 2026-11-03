import { request } from './entregas.js';

export const obtenerEstudiantes = () => request('/estudiantes');

export const crearEstudiante = (datos) =>
  request('/estudiantes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  });

export const obtenerAsientos = () => request('/asientos');

export const asignarAsiento = (numero, estudianteId) =>
  request(`/asientos/${numero}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ estudianteId }),
  });

export const liberarAsiento = (numero) =>
  request(`/asientos/${numero}`, {
    method: 'DELETE',
  });

export const obtenerAsistencia = (fecha) =>
  request(`/asistencia?${new URLSearchParams({ fecha })}`);

export const actualizarAsistencia = (estudianteId, estado, fecha) =>
  request(`/asistencia/${estudianteId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ estado, fecha }),
  });
