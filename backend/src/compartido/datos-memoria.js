// Almacenamiento compartido del ejercicio: se pierde al reiniciar Express.
// Cada instancia permite aislar los datos en pruebas.
export function crearAlmacen() {
  return {
    entregas: new Map(),
    eventos: [],
    grupos: [],
  };
}
export const almacen = crearAlmacen();
