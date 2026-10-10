import { Button } from "react-bootstrap";

function ItemCarrito({
  producto,
  aumentarCantidad,
  disminuirCantidad,
  eliminarProducto,
}) {
  return (
    <div className="border-bottom py-3">
      {/* Información principal del producto */}
      <h3 className="h6">
        {producto.nombre}
      </h3>

      <p>
        Precio: ${producto.precio}
      </p>

      <p>
        Stock disponible: {producto.stock}
      </p>

      {/* Controles para modificar la cantidad */}
      <div className="d-flex align-items-center gap-2 mb-3">
        <Button
          variant="outline-secondary"
          onClick={() =>
            disminuirCantidad(producto.id)
          }
          disabled={producto.cantidad === 1}
        >
          -
        </Button>

        <span>
          Cantidad: {producto.cantidad}
        </span>

        <Button
          variant="outline-secondary"
          onClick={() =>
            aumentarCantidad(producto.id)
          }
          disabled={
            producto.cantidad >= producto.stock
          }
        >
          +
        </Button>
      </div>

      {/* Informa cuando se alcanzó el máximo disponible */}
      {producto.cantidad >= producto.stock && (
        <p className="text-danger">
          No hay más stock disponible.
        </p>
      )}

      <p>
        Subtotal producto: $
        {producto.precio * producto.cantidad}
      </p>

      <Button
        variant="danger"
        onClick={() =>
          eliminarProducto(producto.id)
        }
      >
        Eliminar producto
      </Button>
    </div>
  );
}

export default ItemCarrito;