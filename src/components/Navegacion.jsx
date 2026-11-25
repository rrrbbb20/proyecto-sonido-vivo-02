import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";

function Navegacion({ cantidadCarrito, sesion, setSesion }) {
  const navegar = useNavigate();

  const esPersonal =
    sesion?.rol === "ADMINISTRADOR" || sesion?.rol === "VENDEDOR";

  function cerrarSesion() {
    sessionStorage.removeItem("sesionSonidoVivo");
    if (setSesion) {
      setSesion(null);
    }
    navegar("/");
  }

  return (
    <Navbar expand="md" className="bg-white shadow-sm border-bottom py-3 mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-3 text-dark">
          Sonido Vivo
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="menu-principal" />

        <Navbar.Collapse id="menu-principal">
          <Nav className="ms-auto gap-3 align-items-center">
            <NavLink className="nav-link text-dark" to="/">Inicio</NavLink>
            <NavLink className="nav-link text-dark" to="/catalogo">Catálogo</NavLink>
            <NavLink className="nav-link text-dark" to="/ubicacion">Ubicación</NavLink>
            <NavLink className="nav-link text-dark" to="/contacto">Contacto</NavLink>

            <NavLink className="nav-link text-dark" to="/carrito">
              Carrito ({cantidadCarrito})
            </NavLink>

            {esPersonal && (
              <NavLink className="nav-link fw-semibold text-primary" to="/admin/panel">
                Panel Admin
              </NavLink>
            )}

            {sesion?.token ? (
              <div className="d-flex align-items-center gap-2">
                <span className="small text-muted">
                  Hola, <strong>{sesion.nombre || sesion.correo}</strong>
                </span>
                <Button variant="outline-danger" size="sm" onClick={cerrarSesion}>
                  Salir
                </Button>
              </div>
            ) : (
              <NavLink className="nav-link text-dark" to="/login">
                Iniciar sesión
              </NavLink>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navegacion;