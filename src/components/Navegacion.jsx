import { useState } from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";

function Navegacion() {
  // Recupera el usuario guardado en sessionStorage
  const [usuarioActivo, setUsuarioActivo] = useState(() => {
    const usuarioGuardado =
      sessionStorage.getItem("usuarioActivoSonidoVivo");

    return usuarioGuardado
      ? JSON.parse(usuarioGuardado)
      : null;
  });

  // Elimina la sesión activa
  function cerrarSesion() {
    sessionStorage.removeItem("usuarioActivoSonidoVivo");

    setUsuarioActivo(null);
  }

  return (
    <Navbar
      expand="md"
      className="bg-white shadow-sm border-bottom py-3 mb-4"
    >
      <Container>
        {/* Logo con navegación interna de React Router */}
        <Navbar.Brand
          as={Link}
          to="/"
          className="fw-bold fs-3 text-dark"
        >
          Sonido Vivo
        </Navbar.Brand>

        {/* Botón hamburguesa para pantallas pequeñas */}
        <Navbar.Toggle aria-controls="menu-principal" />

        <Navbar.Collapse id="menu-principal">
          <Nav className="ms-auto gap-3 align-items-center">
            <NavLink
              className="nav-link text-dark"
              to="/"
            >
              Inicio
            </NavLink>

            <NavLink
              className="nav-link text-dark"
              to="/catalogo"
            >
              Catálogo
            </NavLink>

            <NavLink
              className="nav-link text-dark"
              to="/ubicacion"
            >
              Ubicación
            </NavLink>

            <NavLink
              className="nav-link text-dark"
              to="/contacto"
            >
              Contacto
            </NavLink>

            {/* Cambia la navegación dependiendo de la sesión */}
            {usuarioActivo ? (
              <>
                <span className="navbar-text">
                  Hola, {usuarioActivo.nombre}
                </span>

                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={cerrarSesion}
                >
                  Cerrar sesión
                </Button>
              </>
            ) : (
              <NavLink
                className="nav-link text-dark"
                to="/login"
              >
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