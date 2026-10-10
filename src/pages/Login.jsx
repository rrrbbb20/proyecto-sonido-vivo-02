import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

function Login() {
  // Estado que almacena los datos ingresados
  const [datos, setDatos] = useState({
    correo: "",
    contrasena: "",
  });

  // Estado que almacena los errores encontrados
  const [errores, setErrores] = useState({});

  // Estado utilizado para informar un resultado correcto
  const [mensaje, setMensaje] = useState("");

  // Actualiza el campo correspondiente mientras el usuario escribe
  function cambiarCampo(evento) {
    const { name, value } = evento.target;

    setDatos({
      ...datos,
      [name]: value,
    });
  }

  // Valida los datos antes de aceptar el formulario
  function enviarFormulario(evento) {
    evento.preventDefault();

    const nuevosErrores = {};

    // Normaliza el correo antes de validarlo
    const correo = datos.correo
      .trim()
      .toLowerCase();

    const contrasena = datos.contrasena;

    // Comprueba que el correo exista y contenga @
    if (correo === "") {
      nuevosErrores.correo =
        "Ingresa tu correo electrónico.";
    } else if (!correo.includes("@")) {
      nuevosErrores.correo =
        "Ingresa un correo electrónico válido.";
    }

    // Comprueba que la contraseña tenga la longitud permitida
    if (contrasena === "") {
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

    // Detiene el proceso si existe algún error
    if (Object.keys(nuevosErrores).length > 0) {
      return;
    }

    setMensaje(
      "Los datos ingresados cumplen con las validaciones."
    );

    // Limpia el formulario después de una validación correcta
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

      {/* Mensaje mostrado solo después de una validación correcta */}
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