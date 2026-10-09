import { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

function Carrito() {
  const [carrito, setCarrito] = useState([
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
  ]);

  return (
    <Container className="py-4">
      <h1 className="mb-4">Carrito de compras</h1>

      <Row className="g-4">
        <Col xs={12} lg={8}>
          <div className="border rounded p-3">
            <h2 className="h5">Productos agregados</h2>

            {carrito.length === 0 ? (
              <p className="mb-0">
                Aún no hay productos agregados al carrito.
              </p>
            ) : (
              carrito.map((producto) => (
                <div key={producto.id} className="border-bottom py-3">
                  <h3 className="h6">{producto.nombre}</h3>
                  <p>Precio: ${producto.precio}</p>
                  <p>Cantidad: {producto.cantidad}</p>
                </div>
              ))
            )}
          </div>
        </Col>

        <Col xs={12} lg={4}>
          <div className="border rounded p-3">
            <h2 className="h5">Resumen del pedido</h2>

            <p>Productos en el carrito: {carrito.length}</p>

            <hr />

            <Button variant="primary" className="w-100">
              Continuar compra
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Carrito;