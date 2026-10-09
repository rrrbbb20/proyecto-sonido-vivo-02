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

      <h2 className="mb-3">Productos</h2>

      <Row className="g-4">
        <Col xs={12} md={6} lg={4}>
          <div className="border rounded p-3 h-100">
            <h3 className="h5">Guitarra Eléctrica Epiphone SG Standard</h3>
            <p>Guitarras eléctricas</p>
            <p>Stock: 3</p>
            <p>$319.990</p>
          </div>
        </Col>

        <Col xs={12} md={6} lg={4}>
          <div className="border rounded p-3 h-100">
            <h3 className="h5">Batería Acústica Pearl Roadshow</h3>
            <p>Baterías</p>
            <p>Stock: 2</p>
            <p>$599.990</p>
          </div>
        </Col>

        <Col xs={12} md={6} lg={4}>
          <div className="border rounded p-3 h-100">
            <h3 className="h5">Micrófono Condensador Audio-Tech AT2020</h3>
            <p>Micrófonos</p>
            <p>Stock: 4</p>
            <p>$199.990</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Catalogo;