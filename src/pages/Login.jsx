import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

function Login() {
  // Estado que almacena los datos ingresados
  const [datos, setDatos] = useState({
    correo: "",
    contrasena: "",
  });

  // Estado que almacena los errores
  const [errores, setErrores] = useState({});

  // Estado para mostrar un mensaje
  const [mensaje, setMensaje] = useState("");

  // Actualiza el campo correspondiente
  function cambiarCampo(evento) {
    const { name, value } = evento.target;

    setDatos({
      ...datos,
      [name]: value,
    });
  }

  // Valida el formulario
  function enviarFormulario(evento) {
    evento.preventDefault();

    const nuevosErrores = {};

    const correo = datos.correo
      .trim()
      .toLowerCase();

    const contrasena = datos.contrasena;

    if (!correo) {
      nuevosErrores.correo =
        "Ingresa tu correo electrónico.";
    }

    if (!contrasena) {
      nuevosErrores.contrasena =
        "Ingresa tu contraseña.";
    } else if (
      contrasena.length < 8 ||
      contrasena.length > 12
    ) {
      nuevosErrores.contrasena =
        "La contraseña debe tener entre 8 y 12 caracteres.";
    }

    setErrores(nuevosErrores);
    setMensaje("");

    if (Object.keys(nuevosErrores).length > 0) {
      return;
    }

    setMensaje(
      "Los datos ingresados cumplen con las validaciones."
    );

    setDatos({
      correo: "",
      contrasena: "",
    });
  }

  return (
    <Container className="py-4">
      <h1 className="mb-3">
        Iniciar sesión
      </h1>

      <p>
        Ingresa tus datos para acceder a tu cuenta.
      </p>

      {mensaje !== "" && (
        <p className="text-success fw-bold">
          {mensaje}
        </p>
      )}

      <Form
        onSubmit={enviarFormulario}
        noValidate
      >
        <Form.Group className="mb-3">
          <Form.Label>
            Correo electrónico
          </Form.Label>

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
          <Form.Label>
            Contraseña
          </Form.Label>

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
        >
          Ingresar
        </Button>
      </Form>
    </Container>
  );
}

export default Login;