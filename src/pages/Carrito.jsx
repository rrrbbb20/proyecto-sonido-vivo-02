import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import ItemCarrito from "../components/ItemCarrito";

function Carrito() {
  // Estado que recupera el carrito guardado en localStorage
  const [carrito, setCarrito] = useState(() => {
    const carritoGuardado = localStorage.getItem("carritoSonidoVivo");

    return carritoGuardado ? JSON.parse(carritoGuardado) : [
        {
        id: 1,
        nombre: "Guitarra Eléctrica Epiphone SG Standard",
        precio: 319990,
        cantidad: 1,
        },
        {
        id: 2,
        nombre: "Batería Acústica Pearl Roadshow",
        precio: 599990,
        cantidad: 1,
        },
        {
        id: 3,
        nombre: "Micrófono Condensador Audio-Tech AT2020",
        precio: 199990,
        cantidad: 2,
        },
    ];
  });

  // Guarda el carrito en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem(
        "carritoSonidoVivo",
        JSON.stringify(carrito)
    );
  }, [carrito]);

  // Aumenta en una unidad la cantidad del producto seleccionado
  function aumentarCantidad(id) {
    const carritoActualizado = carrito.map((producto) => {
      if (producto.id === id) {
        return {
          ...producto,
          cantidad: producto.cantidad + 1,
        };
      }

      return producto;
    });

    setCarrito(carritoActualizado);
  }

  // Disminuye la cantidad del producto sin permitir valores menores a 1
  function disminuirCantidad(id) {
    const carritoActualizado = carrito.map((producto) => {
      if (producto.id === id && producto.cantidad > 1) {
        return {
          ...producto,
          cantidad: producto.cantidad - 1,
        };
      }

      return producto;
    });

    setCarrito(carritoActualizado);
  }

  // Elimina del carrito el producto seleccionado
  function eliminarProducto(id) {
    const carritoActualizado = carrito.filter(
        (producto) => producto.id !== id
    );

    setCarrito(carritoActualizado);
  }
 
  // Calcula el subtotal sumando precio por cantidad de cada producto
  const subtotal = carrito.reduce(
    (total, producto) => total + producto.precio * producto.cantidad,
    0
  );

  // Calcula la cantidad total de unidades agregadas al carrito
  const cantidadTotal = carrito.reduce(
    (total, producto) => total + producto.cantidad,
    0
  );

  return (
    <Container className="py-4">
      <h1 className="mb-4">Carrito de compras</h1>

      <Row className="g-4">
        <Col xs={12} lg={8}>
          <div className="border rounded p-3">
            <h2 className="h5">Productos agregados</h2>

            {/* Si el carrito está vacío se muestra un mensaje */}
            {carrito.length === 0 ? (
              <p className="mb-0">
                Aún no hay productos agregados al carrito.
              </p>
            ) : (
              // Se recorre el carrito para mostrar cada producto
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

            <p>Productos en el carrito: {carrito.length}</p>
            <p>Cantidad total: {cantidadTotal}</p>

            <p>Subtotal: ${subtotal}</p>

            <hr />

            <p className="fw-bold">
              Total: ${subtotal}
            </p>

            <Button variant="primary" className="w-100" disabled={carrito.length === 0}>
              Continuar compra
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Carrito;