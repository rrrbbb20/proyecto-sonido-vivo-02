// Calcula el carrito actualizado al agregar un producto
export function agregarProductoAlCarrito(carrito, producto) {
  // Busca si el producto ya está agregado
  const productoExistente = carrito.find(
    (item) => item.id === producto.id
  );

  // No agrega productos sin stock disponible
  if (producto.stock <= 0) {
    return carrito;
  }

  // Evita superar el stock disponible
  if (productoExistente && productoExistente.cantidad >= producto.stock) {
    return carrito;
  }

  // Aumenta la cantidad si el producto ya existe
  if (productoExistente) {
    return carrito.map((item) =>
      item.id === producto.id
        ? { ...item, cantidad: item.cantidad + 1 }
        : item
    );
  }

  // Agrega el producto con cantidad inicial de uno
  return [...carrito, { ...producto, cantidad: 1 }];
}