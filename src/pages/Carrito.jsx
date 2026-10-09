import { Container, Row, Col, Button } from "react-bootstrap";

function Carrito() {
  return (
    <Container className="py-4">
      <h1 className="mb-4">Carrito de compras</h1>

      <Row className="g-4">
        <Col xs={12} lg={8}>
          <div className="border rounded p-3">
            <h2 className="h5">Productos agregados</h2>

            <p className="mb-0">
              Aún no hay productos agregados al carrito.
            </p>
          </div>
        </Col>

        <Col xs={12} lg={4}>
          <div className="border rounded p-3">
            <h2 className="h5">Resumen del pedido</h2>

            <p>Subtotal: $0</p>

            <hr />

            <p className="fw-bold">Total: $0</p>

            <Button variant="primary" className="w-100" disabled>
              Continuar compra
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Carrito;