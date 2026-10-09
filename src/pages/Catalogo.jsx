import { Container, Form, Row, Col } from "react-bootstrap";

function Catalogo() {
  return (
    <Container className="py-4">
      <h1 className="mb-4">Catálogo</h1>

      <p className="mb-4">
        Explora nuestros instrumentos musicales y equipos de audio.
      </p>

      <Form className="mb-4">
        <Row className="g-3">
          <Col xs={12} md={8}>
            <Form.Control
              type="text"
              placeholder="Buscar productos..."
            />
          </Col>

          <Col xs={12} md={4}>
            <Form.Select>
              <option value="">Todas las categorías</option>
              <option value="guitarras">Guitarras</option>
              <option value="baterias">Baterías</option>
              <option value="microfonos">Micrófonos</option>
            </Form.Select>
          </Col>
        </Row>
      </Form>

      <h2>Productos</h2>
    </Container>
  );
}

export default Catalogo;