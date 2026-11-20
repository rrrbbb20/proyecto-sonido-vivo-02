import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function PanelAdmin({ sesion, setSesion }) {
  const navegar = useNavigate();
  const esAdministrador = sesion?.rol === "ADMINISTRADOR";

  function cerrarSesion() {
    sessionStorage.removeItem("sesionSonidoVivo");
    if (setSesion) {
      setSesion(null);
    }
    navegar("/admin/login");
  }

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4 pb-3 border-bottom">
        <div>
          <h1 className="h2 fw-bold mb-1">Panel de Administración</h1>
          <p className="text-muted mb-0">
            Sesión iniciada como <strong>{sesion?.correo}</strong>{" "}
            <Badge bg={esAdministrador ? "danger" : "primary"} className="ms-1">
              {sesion?.rol}
            </Badge>
          </p>
        </div>

        <Button variant="outline-secondary" onClick={cerrarSesion}>
          Cerrar sesión
        </Button>
      </div>

      <Row className="g-4">
        <Col xs={12} md={6}>
          <Card className="h-100 shadow-sm border-0 rounded-4">
            <Card.Body className="p-4 d-flex flex-column">
              <div className="mb-3">
                <Badge bg="primary" className="mb-2">
                  Inventario y Tienda
                </Badge>
                <h2 className="h4 fw-bold">Gestionar Catálogo</h2>
                <p className="text-muted mb-0">
                  Agrega nuevos instrumentos, actualiza precios o stock disponible
                  {esAdministrador ? " y elimina productos del catálogo." : "."}
                </p>
              </div>

              <div className="mt-auto pt-3">
                <Link
                  to="/admin/productos"
                  className="btn btn-primary w-100 fw-semibold"
                >
                  Ir a Gestionar Catálogo
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {esAdministrador && (
          <Col xs={12} md={6}>
            <Card className="h-100 shadow-sm border-0 rounded-4">
              <Card.Body className="p-4 d-flex flex-column">
                <div className="mb-3">
                  <Badge bg="danger" className="mb-2">
                    Exclusivo Administrador
                  </Badge>
                  <h2 className="h4 fw-bold">Gestionar Trabajadores</h2>
                  <p className="text-muted mb-0">
                    Registra cuentas de vendedores y administradores para la
                    operación interna de Sonido Vivo.
                  </p>
                </div>

                <div className="mt-auto pt-3">
                  <Link
                    to="/admin/trabajadores"
                    className="btn btn-dark w-100 fw-semibold"
                  >
                    Ir a Gestionar Trabajadores
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default PanelAdmin;