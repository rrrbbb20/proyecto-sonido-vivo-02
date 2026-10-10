import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Login() {
  // Datos ingresados en el formulario
  const [datos, setDatos] = useState({
    correo: "",
    contrasena: "",
  });

  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState("");

  // Actualiza el campo correspondiente
  function cambiarCampo(evento) {
    const { name, value } = evento.target;
    setDatos({ ...datos, [name]: value });
  }

  // Valida los datos antes de aceptar el formulario
  function enviarFormulario(evento) {
    evento.preventDefault();

    const nuevosErrores = {};
    const correo = datos.correo.trim().toLowerCase();
    const contrasena = datos.contrasena;

    // Validación del correo
    if (correo === "") {
      nuevosErrores.correo = "Ingresa tu correo electrónico.";
    } else if (!correo.includes("@")) {
      nuevosErrores.correo = "Ingresa un correo electrónico válido.";
    }

    // Validación de la contraseña
    if (contrasena === "") {
      nuevosErrores.contrasena = "Ingresa tu contraseña.";
    } else if (contrasena.length < 8 || contrasena.length > 12) {
      nuevosErrores.contrasena = "La contraseña debe tener entre 8 y 12 caracteres.";
    }

    setErrores(nuevosErrores);
    setMensaje("");

    if (Object.keys(nuevosErrores).length > 0) {
      return;
    }

    setMensaje("Los datos ingresados cumplen con las validaciones.");
    setDatos({ correo: "", contrasena: "" });
  }

  return (
    <Container className="py-4">
      {/* Centra el formulario y adapta su ancho según la pantalla */}
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={5}>
          <div className="border rounded p-4">
            <h1 className="mb-3">Iniciar sesión</h1>

            <p className="mb-4">
              Ingresa tus datos para acceder a tu cuenta.
            </p>

            {/* Mensaje mostrado después de una validación correcta */}
            {mensaje !== "" && (
              <p className="text-success fw-bold">{mensaje}</p>
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

              <Button type="submit" variant="primary" className="w-100">
                Ingresar
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