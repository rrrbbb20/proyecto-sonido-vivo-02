import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ItemCarrito from "../components/ItemCarrito";

function Carrito({ carrito, setCarrito }) {
  // Aumenta la cantidad respetando el stock
  function aumentarCantidad(id) {
    const carritoActualizado = carrito.map((producto) => {
      if (producto.id === id && producto.cantidad < producto.stock) {
        return { ...producto, cantidad: producto.cantidad + 1 };
      }

      return producto;
    });

    setCarrito(carritoActualizado);
  }

  // Disminuye la cantidad sin bajar de uno
  function disminuirCantidad(id) {
    const carritoActualizado = carrito.map((producto) => {
      if (producto.id === id && producto.cantidad > 1) {
        return { ...producto, cantidad: producto.cantidad - 1 };
      }

      return producto;
    });

    setCarrito(carritoActualizado);
  }

  // Elimina un producto del carrito
  function eliminarProducto(id) {
    const carritoActualizado = carrito.filter((producto) => producto.id !== id);
    setCarrito(carritoActualizado);
  }

  // Vacía completamente el carrito
  function vaciarCarrito() {
    setCarrito([]);
  }

  // Calcula los totales
  let subtotal = 0;
  let cantidadTotal = 0;

  for (const producto of carrito) {
    subtotal = subtotal + producto.precio * producto.cantidad;
    cantidadTotal = cantidadTotal + producto.cantidad;
  }

  return (
    <Container className="py-4">
      <h1 className="mb-4">Carrito de compras</h1>

      <Row className="g-4">
        <Col xs={12} lg={8}>
          <div className="border rounded p-3">
            <h2 className="h5">Productos agregados</h2>

            {carrito.length === 0 ? (
              <p className="mb-0">Aún no hay productos agregados al carrito.</p>
            ) : (
              carrito.map((producto) => (
                <ItemCarrito
                  key={producto.id}
                  producto={producto}
                  aumentarCantidad={aumentarCantidad}
                  disminuirCantidad={disminuirCantidad}
                  eliminarProducto={eliminarProducto}
                />
              ))
            )}
          </div>
        </Col>

        <Col xs={12} lg={4}>
          <div className="border rounded p-3">
            <h2 className="h5">Resumen del pedido</h2>

            <p>Productos distintos: {carrito.length}</p>
            <p>Cantidad total: {cantidadTotal}</p>
            <p>Subtotal: ${subtotal}</p>

            <hr />

            <p className="fw-bold">Total: ${subtotal}</p>

            <div className="d-grid gap-2">
              <Button variant="primary" disabled={carrito.length === 0}>
                Continuar compra
              </Button>

              <Button variant="outline-danger" onClick={vaciarCarrito} disabled={carrito.length === 0}>
                Vaciar carrito
              </Button>

              <Link to="/catalogo" className="btn btn-outline-secondary">
                Volver al catálogo
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Carrito;