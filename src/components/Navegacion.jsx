import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function Navegacion() {
  return (
   
    <Navbar expand="md" className="bg-white shadow-sm mb-4">
        { /* bg-white da el fondo blanco, shadow-sm le da una sombra suave para separarlo del contenido */}
      <Container>
        {/* Botón hamburguesa de Bootstrap para móviles */}
        <Navbar.Toggle aria-controls="menu-principal" />
        
        {/* Contenedor colapsable del menú */}
        <Navbar.Collapse id="menu-principal">
          <Nav className="w-100 justify-content-center gap-3">
            {/* Las clases nav-link son de Bootstrap. NavLink de React Router las activa automáticamente */}
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