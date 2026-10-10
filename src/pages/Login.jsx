import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

function Login() {
  // Estado que almacena los datos ingresados en el formulario
  const [datos, setDatos] = useState({
    correo: "",
    contrasena: "",
  });

  // Estado que almacena los mensajes de error del formulario
  const [errores, setErrores] = useState({});

  // Actualiza el campo correspondiente cuando el usuario escribe
  function cambiarCampo(evento) {
    const { name, value } = evento.target;

    setDatos({
      ...datos,
      [name]: value,
    });
  }

  // Valida los datos antes de intentar iniciar sesión
  function enviarFormulario(evento) {
    evento.preventDefault();

    const nuevosErrores = {};

    // Valida que el correo haya sido ingresado
    if (!datos.correo.trim()) {
      nuevosErrores.correo = "Ingresa tu correo electrónico.";
    }

    // Valida que la contraseña haya sido ingresada
    if (!datos.contrasena) {
      nuevosErrores.contrasena = "Ingresa tu contraseña.";
    } else if (datos.contrasena.length < 8) {
      nuevosErrores.contrasena =
        "La contraseña debe tener al menos 8 caracteres.";
    }

    setErrores(nuevosErrores);

    // Detiene el proceso si existen errores
    if (Object.keys(nuevosErrores).length > 0) {
      return;
    }

    console.log(datos);
  }

  return (
    <Container className="py-4">
      <h1 className="mb-3">Iniciar sesión</h1>

      <p>
        Ingresa tus datos para acceder a tu cuenta.
      </p>

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

        <Form.Group className="mb-3">
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

        <Button type="submit" variant="primary">
          Ingresar
        </Button>
      </Form>
    </Container>
  );
}

export default Login;