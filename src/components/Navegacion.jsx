import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";

function Navegacion({ cantidadCarrito }) {
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

            <NavLink className="nav-link text-dark" to="/login">
              Iniciar sesión
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navegacion;