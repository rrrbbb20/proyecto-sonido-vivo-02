import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

function Login() {
  // Estado que almacena los datos ingresados en el formulario
  const [datos, setDatos] = useState({
    correo: "",
    contrasena: "",
  });

  // Actualiza el campo correspondiente cuando el usuario escribe
  function cambiarCampo(evento) {
    const { name, value } = evento.target;

    setDatos({
      ...datos,
      [name]: value,
    });
  }

  function enviarFormulario(evento) {
    evento.preventDefault();

    console.log(datos);
  }

  return (
    <Container className="py-4">
      <h1 className="mb-3">Iniciar sesión</h1>

      <p>
        Ingresa tus datos para acceder a tu cuenta.
      </p>

      <Form onSubmit={enviarFormulario}>
        <Form.Group className="mb-3">
          <Form.Label>Correo electrónico</Form.Label>

          <Form.Control
            type="email"
            name="correo"
            value={datos.correo}
            onChange={cambiarCampo}
            placeholder="correo@ejemplo.cl"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label>

          <Form.Control
            type="password"
            name="contrasena"
            value={datos.contrasena}
            onChange={cambiarCampo}
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          Ingresar
        </Button>
      </Form>
    </Container>
  );
}

export default Login;