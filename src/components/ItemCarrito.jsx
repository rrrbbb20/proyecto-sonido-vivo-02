import { Button, Row, Col } from "react-bootstrap";

function ItemCarrito({
  producto,
  aumentarCantidad,
  disminuirCantidad,
  eliminarProducto,
}) {
  // Calcula cuántas unidades todavía se pueden agregar
  const stockDisponible = producto.stock - producto.cantidad;
  const stockAgotado = stockDisponible === 0;

  return (
    <div className="border-bottom py-3">
      {/* Distribuye la información del producto de forma responsiva */}
      <Row className="g-3 align-items-center">
        <Col xs={12} md={5}>
          <h3 className="h6 mb-2">{producto.nombre}</h3>
          <p className="mb-1">Precio: ${producto.precio}</p>
          <p className="mb-0">Stock disponible: {stockDisponible}</p>
        </Col>

        <Col xs={12} md={4}>
          {/* Controles para modificar la cantidad */}
          <div className="d-flex align-items-center gap-2">
            <Button
              variant="outline-secondary"
              onClick={() => disminuirCantidad(producto.id)}
              disabled={producto.cantidad === 1}
            >
              -
            </Button>

            <span>Cantidad: {producto.cantidad}</span>

            <Button
              variant="outline-secondary"
              onClick={() => aumentarCantidad(producto.id)}
              disabled={stockAgotado}
            >
              +
            </Button>
          </div>

          {/* Informa cuando ya no quedan unidades disponibles */}
          {stockAgotado && (
            <p className="text-danger mt-2 mb-0">
              No hay más stock disponible.
            </p>
          )}
        </Col>

        <Col xs={12} md={3}>
          <p className="fw-bold mb-2">
            Subtotal: ${producto.precio * producto.cantidad}
          </p>

          <Button
            variant="danger"
            className="w-100"
            onClick={() => eliminarProducto(producto.id)}
          >
            Eliminar
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default ItemCarrito;