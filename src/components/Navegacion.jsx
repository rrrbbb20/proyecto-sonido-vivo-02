import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom"; // Importamos Link para el logo

function Navegacion() {
  return (
    
    <Navbar expand="md" className="bg-white shadow-sm border-bottom py-3 mb-4">
      <Container>
        
        {/* LOGO a la izquierda: as={Link} hace que funcione como un enlace al inicio sin recargar */}
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-3 text-dark">
          Sonido Vivo
        </Navbar.Brand>

        {/* Botón hamburguesa para móviles */}
        <Navbar.Toggle aria-controls="menu-principal" />
        
        {/* Contenedor colapsable del menú */}
        <Navbar.Collapse id="menu-principal">
          {/* ms-auto empuja todos los enlaces hacia la derecha */}
          <Nav className="ms-auto gap-3 align-items-center">
            <NavLink className="nav-link text-dark" to="/">Inicio</NavLink>
            <NavLink className="nav-link text-dark" to="/catalogo">Catálogo</NavLink>
            <NavLink className="nav-link text-dark" to="/ubicacion">Ubicación</NavLink>
            <NavLink className="nav-link text-dark" to="/contacto">Contacto</NavLink>
            <NavLink className="nav-link text-dark" to="/login">Iniciar sesión</NavLink>
            
            
          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}

export default Navegacion;

