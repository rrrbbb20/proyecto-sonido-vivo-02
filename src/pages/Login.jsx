import { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { loginUsuario } from "../services/authService";
import { obtenerPerfilPorUsuarioId } from "../services/clienteService";

function Login({ sesion, setSesion }) {
  const [datos, setDatos] = useState({
    correo: "",
    contrasena: "",
  });

  const [errores, setErrores] = useState({});
  const [errorServidor, setErrorServidor] = useState("");
  const [cargando, setCargando] = useState(false);

  const navegar = useNavigate();

  if (sesion?.token) {
    return <Navigate to="/" replace />;
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
      nuevosErrores.correo = "Ingresa tu correo electrónico.";
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
      const dataAuth = await loginUsuario(correo, contrasena);

      let nuevaSesion = {
        idUsuario: dataAuth.idUsuario,
        correo: dataAuth.correo,
        rol: dataAuth.rol,
        token: dataAuth.token,
      };

      sessionStorage.setItem("sesionSonidoVivo", JSON.stringify(nuevaSesion));

      if (dataAuth.rol === "CLIENTE") {
        try {
          const perfil = await obtenerPerfilPorUsuarioId(dataAuth.idUsuario);
          nuevaSesion = {
            ...nuevaSesion,
            clienteId: perfil.id,
            nombre: perfil.nombre,
            apellido: perfil.apellido,
            rut: perfil.rut,
            telefono: perfil.telefono,
          };
          sessionStorage.setItem("sesionSonidoVivo", JSON.stringify(nuevaSesion));
        } catch {
          // Si no tiene perfil asociado aún, conserva la sesión base de Auth
        }
      }

      if (setSesion) {
        setSesion(nuevaSesion);
      }

      navegar("/catalogo");
    } catch (error) {
      setErrorServidor(error.message);
    } finally {
      setCargando(false);
    }
  }

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={5}>
          <div className="border rounded p-4 shadow-sm bg-white">
            <h1 className="mb-3">Iniciar sesión</h1>

            <p className="mb-4 text-muted">
              Ingresa tus datos para acceder a tu cuenta.
            </p>

            {errorServidor && (
              <Alert variant="danger" role="alert">
                {errorServidor}
              </Alert>
            )}

            <Form onSubmit={enviarFormulario} noValidate>
              <Form.Group className="mb-3">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control
                  type="email"
                  name="correo"
                  value={datos.correo}
                  onChange={cambiarCampo}
                  placeholder="correo@ejemplo.cl"
                  isInvalid={Boolean(errores.correo)}
                />
                <Form.Control.Feedback type="invalid">
                  {errores.correo}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  name="contrasena"
                  value={datos.contrasena}
                  onChange={cambiarCampo}
                  isInvalid={Boolean(errores.contrasena)}
                />
                <Form.Control.Feedback type="invalid">
                  {errores.contrasena}
                </Form.Control.Feedback>
              </Form.Group>

              <Button
                type="submit"
                variant="primary"
                className="w-100"
                disabled={cargando}
              >
                {cargando ? "Ingresando..." : "Ingresar"}
              </Button>
            </Form>

            <p className="text-center mt-4 mb-0">
              ¿No tienes una cuenta? <Link to="/registro">Regístrate aquí</Link>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;