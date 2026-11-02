import { request } from './entregas.js';

export const registrarGrupo = (datos) =>
  request('/grupos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  });

export const consultarGrupos = (actividad) =>
  request(`/grupos?${new URLSearchParams({ actividad })}`);
