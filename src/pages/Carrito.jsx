import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import ItemCarrito from "../components/ItemCarrito";

function Carrito() {
  // Recupera el carrito guardado al cargar el componente
  const [carrito, setCarrito] = useState(() => {
    const carritoGuardado =
      localStorage.getItem("carritoSonidoVivo");

    return carritoGuardado
      ? JSON.parse(carritoGuardado)
      : [];
  });

  // Mantiene localStorage sincronizado con el estado del carrito
  useEffect(() => {
    localStorage.setItem(
      "carritoSonidoVivo",
      JSON.stringify(carrito)
    );
  }, [carrito]);

  // Aumenta la cantidad solamente si todavía existe stock disponible
  function aumentarCantidad(id) {
    const carritoActualizado = carrito.map((producto) => {
      if (
        producto.id === id &&
        producto.cantidad < producto.stock
      ) {
        return {
          ...producto,
          cantidad: producto.cantidad + 1,
        };
      }

      return producto;
    });

    setCarrito(carritoActualizado);
  }

  // Disminuye la cantidad sin permitir valores menores a uno
  function disminuirCantidad(id) {
    const carritoActualizado = carrito.map((producto) => {
      if (
        producto.id === id &&
        producto.cantidad > 1
      ) {
        return {
          ...producto,
          cantidad: producto.cantidad - 1,
        };
      }

      return producto;
    });

    setCarrito(carritoActualizado);
  }

  // Elimina completamente un producto del carrito
  function eliminarProducto(id) {
    const carritoActualizado = carrito.filter(
      (producto) => producto.id !== id
    );

    setCarrito(carritoActualizado);
  }

  // Recorre el carrito para calcular los totales
  let subtotal = 0;
  let cantidadTotal = 0;

  for (const producto of carrito) {
    subtotal =
      subtotal +
      producto.precio * producto.cantidad;

    cantidadTotal =
      cantidadTotal +
      producto.cantidad;
  }

  return (
    <Container className="py-4">
      <h1 className="mb-4">
        Carrito de compras
      </h1>

      <Row className="g-4">
        <Col xs={12} lg={8}>
          <div className="border rounded p-3">
            <h2 className="h5">
              Productos agregados
            </h2>

            {/* Informa cuando todavía no existen productos */}
            {carrito.length === 0 ? (
              <p className="mb-0">
                Aún no hay productos agregados al carrito.
              </p>
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
            <h2 className="h5">
              Resumen del pedido
            </h2>

            <p>
              Productos en el carrito: {carrito.length}
            </p>

            <p>
              Cantidad total: {cantidadTotal}
            </p>

            <p>
              Subtotal: ${subtotal}
            </p>

            <hr />

            <p className="fw-bold">
              Total: ${subtotal}
            </p>

            <Button
              variant="primary"
              className="w-100"
              disabled={carrito.length === 0}
            >
              Continuar compra
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Carrito;