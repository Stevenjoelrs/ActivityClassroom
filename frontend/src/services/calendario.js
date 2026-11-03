import { request } from './entregas.js';

export const registrarEvento = (datos) =>
  request('/calendario/eventos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  });

export const consultarCalendario = (materia) =>
  request(`/calendario?${new URLSearchParams({ materia })}`);
