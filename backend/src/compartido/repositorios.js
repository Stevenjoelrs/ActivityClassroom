import path from "node:path";

import {
  crearRepositorioCalendarioArchivo,
} from "../modulos/calendario-academico/calendario.repository.js";
import {
  crearRepositorioGruposArchivo,
} from "../modulos/grupos-trabajo/grupos.repository.js";

export function crearRepositoriosPersistentes({ directorio } = {}) {
  const dir = directorio || process.env.DATA_DIR || path.resolve("backend/data");
  const calendario = crearRepositorioCalendarioArchivo(
    path.join(dir, "eventos.json"),
  );
  const grupos = crearRepositorioGruposArchivo(path.join(dir, "grupos.json"));

  return {
    directorio: dir,
    calendario,
    grupos,
    repositorioCalendario: calendario,
    repositorioGrupos: grupos,
  };
}

export const repositorios = crearRepositoriosPersistentes();

