// Archivo: src/utils/inventario.js

// Calcula el próximo ID disponible buscando el ID más alto en una lista
export function calcularNuevoId(elementos) {
  let nuevoId = 1;
  
  for (const item of elementos) {
    if (item.id >= nuevoId) {
      nuevoId = item.id + 1;
    }
  }
  
  return nuevoId;
}