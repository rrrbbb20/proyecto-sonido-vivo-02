// Archivo: src/utils/stock.js

export function calcularEstadoStock(stockTotal, idProducto, carrito) {
  // Buscamos si ya hay de este producto en el carrito
  const productoEnCarrito = carrito.find((item) => item.id === idProducto);
  const cantidadEnCarrito = productoEnCarrito ? productoEnCarrito.cantidad : 0;
  
  // Calculamos el stock real disponible
  const stockDisponible = stockTotal - cantidadEnCarrito;

  // Devolvemos 3 variables listas para usar en cualquier componente
  return {
    stockDisponible: stockDisponible,
    stockAgotado: stockDisponible === 0,
    bajoStock: stockDisponible > 0 && stockDisponible < 3 // Es bajo stock si queda 1 o 2
  };
}