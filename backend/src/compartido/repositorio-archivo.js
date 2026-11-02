import fs from "node:fs";
import path from "node:path";

export function crearRepositorioArchivo({ ruta, hidratar = (d) => d }) {
  let datos = [];

  if (fs.existsSync(ruta)) {
    const contenido = fs.readFileSync(ruta, "utf8");
    let parsed;
    try {
      parsed = JSON.parse(contenido);
    } catch {
      throw new Error(
        `El archivo JSON en "${ruta}" no tiene un formato válido.`,
      );
    }

    if (!Array.isArray(parsed)) {
      throw new Error(`El archivo JSON en "${ruta}" debe contener un arreglo.`);
    }

    datos = parsed.map((item) => hidratar(item));
  }

  function persistir() {
    const dir = path.dirname(ruta);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const tempRuta = path.join(
      dir,
      `.${path.basename(ruta)}.${Date.now()}.${Math.random().toString(36).slice(2)}.tmp`,
    );
    fs.writeFileSync(tempRuta, JSON.stringify(datos, null, 2), "utf8");
    fs.renameSync(tempRuta, ruta);
  }

  return {
    guardar(entidad) {
      datos.push(entidad);
      persistir();
    },
    listar() {
      return [...datos];
    },
  };
}
