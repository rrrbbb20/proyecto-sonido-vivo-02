import { Container, Row, Col } from "react-bootstrap";

function Ubicacion() {
  return (
    <Container className="py-4">
      <h1 className="mb-4">Nuestra Ubicación</h1>
      <Row>
        <Col md={6} className="mb-4">
          <h3>Visita nuestra tienda física</h3>
          <p>
            <strong>Dirección:</strong> La Florida, Región Metropolitana, Chile.
          </p>
          <p>
            <strong>Horario de atención:</strong><br />
            Lunes a Viernes: 09:00 - 19:00 hrs.<br />
            Sábados: 10:00 - 14:00 hrs.
          </p>
          <p>
            Contamos con estacionamiento para clientes y zona de prueba de instrumentos.
          </p>
        </Col>
        
        <Col md={6}>
          {/* Iframe básico de Google Maps */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106325.29815049969!2d-70.65593881476685!3d-33.522631553483984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662d16c1cbdfb67%3A0xcad03215c0e1815b!2sLa%20Florida%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses-419!2scl!4v1714589255012!5m2!1ses-419!2scl"
            width="100%"
            height="300"
            style={{ border: 0, borderRadius: "8px" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </Col>
      </Row>
    </Container>
  );
}

export default Ubicacion;