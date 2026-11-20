import { useState } from "react";
import { Container, Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { loginUsuario } from "../../services/authService";

function LoginAdmin({ sesion, setSesion }) {
  const [datos, setDatos] = useState({
    correo: "",
    contrasena: "",
  });

  const [errores, setErrores] = useState({});
  const [errorServidor, setErrorServidor] = useState("");
  const [cargando, setCargando] = useState(false);

  const navegar = useNavigate();

  if (sesion && (sesion.rol === "ADMINISTRADOR" || sesion.rol === "VENDEDOR")) {
    return <Navigate to="/admin/panel" replace />;
  }

  function cambiarCampo(evento) {
    const { name, value } = evento.target;
    setDatos((prev) => ({ ...prev, [name]: value }));
    setErrores((prev) => ({ ...prev, [name]: "" }));
    setErrorServidor("");
  }

  async function enviarFormulario(evento) {
    evento.preventDefault();

    const nuevosErrores = {};
    const correo = datos.correo.trim().toLowerCase();
    const contrasena = datos.contrasena;

    if (correo === "") {
      nuevosErrores.correo = "Ingresa tu correo institucional.";
    } else if (!correo.includes("@")) {
      nuevosErrores.correo = "Ingresa un correo electrónico válido.";
    }

    if (contrasena === "") {
      nuevosErrores.contrasena = "Ingresa tu contraseña.";
    } else if (contrasena.length < 8 || contrasena.length > 12) {
      nuevosErrores.contrasena = "La contraseña debe tener entre 8 y 12 caracteres.";
    }

    setErrores(nuevosErrores);
    setErrorServidor("");

    if (Object.keys(nuevosErrores).length > 0) {
      return;
    }

    try {
      setCargando(true);
      const dataSesion = await loginUsuario(correo, contrasena);

      if (dataSesion.rol !== "ADMINISTRADOR" && dataSesion.rol !== "VENDEDOR") {
        setErrorServidor("Acceso denegado: esta cuenta no tiene permisos de personal.");
        return;
      }

      sessionStorage.setItem("sesionSonidoVivo", JSON.stringify(dataSesion));
      if (setSesion) {
        setSesion(dataSesion);
      }

      navegar("/admin/panel");
    } catch (error) {
      setErrorServidor(error.message);
    } finally {
      setCargando(false);
    }
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={5}>
          <Card className="shadow-sm border-0 rounded-4">
            <Card.Body className="p-4 p-md-5">
              <div className="text-center mb-4">
                <span className="badge bg-dark mb-2">Portal Interno</span>
                <h1 className="h3 fw-bold mb-1">Acceso Administración</h1>
                <p className="text-muted small mb-0">
                  Ingreso exclusivo para Vendedores y Administradores
                </p>
              </div>

              {errorServidor && (
                <Alert variant="danger" role="alert">
                  {errorServidor}
                </Alert>
              )}

              <Form onSubmit={enviarFormulario} noValidate>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="correoAdmin">Correo electrónico</Form.Label>
                  <Form.Control
                    id="correoAdmin"
                    type="email"
                    name="correo"
                    value={datos.correo}
                    onChange={cambiarCampo}
                    placeholder="admin@sonidovivo.cl"
                    isInvalid={Boolean(errores.correo)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errores.correo}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label htmlFor="contrasenaAdmin">Contraseña</Form.Label>
                  <Form.Control
                    id="contrasenaAdmin"
                    type="password"
                    name="contrasena"
                    value={datos.contrasena}
                    onChange={cambiarCampo}
                    placeholder="Entre 8 y 12 caracteres"
                    isInvalid={Boolean(errores.contrasena)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errores.contrasena}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button
                  type="submit"
                  variant="dark"
                  className="w-100 fw-semibold"
                  disabled={cargando}
                >
                  {cargando ? "Verificando..." : "Ingresar al panel"}
                </Button>
              </Form>

              <p className="text-center mt-4 mb-0 small text-muted">
                ¿Eres cliente?{" "}
                <Link to="/login" className="text-decoration-none">
                  Inicia sesión en la tienda aquí
                </Link>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginAdmin;