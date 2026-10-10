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

  // Estado para mostrar el resultado del inicio de sesión
  const [mensaje, setMensaje] = useState("");

  // Actualiza el campo correspondiente cuando el usuario escribe
  function cambiarCampo(evento) {
    const { name, value } = evento.target;

    setDatos({
      ...datos,
      [name]: value,
    });
  }

  // Obtiene los usuarios registrados desde localStorage
  function obtenerUsuarios() {
    const usuariosGuardados =
      localStorage.getItem("usuariosSonidoVivo");

    if (!usuariosGuardados) {
      return [];
    }

    return JSON.parse(usuariosGuardados);
  }

  // Valida los datos e intenta iniciar sesión
  function enviarFormulario(evento) {
    evento.preventDefault();

    const nuevosErrores = {};

    const correo = datos.correo.trim().toLowerCase();
    const contrasena = datos.contrasena;

    // Valida que el correo haya sido ingresado
    if (!correo) {
      nuevosErrores.correo =
        "Ingresa tu correo electrónico.";
    }

    // Valida que la contraseña haya sido ingresada
    if (!contrasena) {
      nuevosErrores.contrasena =
        "Ingresa tu contraseña.";
    } else if (contrasena.length < 8) {
      nuevosErrores.contrasena =
        "La contraseña debe tener al menos 8 caracteres.";
    }

    setErrores(nuevosErrores);
    setMensaje("");

    // Detiene el proceso si existen errores
    if (Object.keys(nuevosErrores).length > 0) {
      return;
    }

    // Recupera los usuarios registrados
    const usuarios = obtenerUsuarios();

    // Busca una cuenta que coincida con correo y contraseña
    const usuarioEncontrado = usuarios.find(
      (usuario) =>
        usuario.correo.toLowerCase() === correo &&
        usuario.contrasena === contrasena
    );

    // Muestra error si las credenciales no coinciden
    if (!usuarioEncontrado) {
      setErrores({
        correo: "Correo o contraseña incorrectos.",
        contrasena: "Correo o contraseña incorrectos.",
      });

      return;
    }

    // Crea un objeto con los datos necesarios para la sesión
    const usuarioActivo = {
      nombre: usuarioEncontrado.nombre,
      apellido: usuarioEncontrado.apellido,
      correo: usuarioEncontrado.correo,
    };

    // Guarda la sesión activa
    sessionStorage.setItem(
      "usuarioActivoSonidoVivo",
      JSON.stringify(usuarioActivo)
    );

    // Muestra confirmación del inicio de sesión
    setMensaje(
      `Bienvenido, ${usuarioEncontrado.nombre}.`
    );

    // Limpia el formulario después de iniciar sesión
    setDatos({
      correo: "",
      contrasena: "",
    });

    setErrores({});
  }

  return (
    <Container className="py-4">
      <h1 className="mb-3">Iniciar sesión</h1>

      <p>
        Ingresa tus datos para acceder a tu cuenta.
      </p>

      {mensaje !== "" && (
        <p className="text-success fw-bold">
          {mensaje}
        </p>
      )}

      <Form onSubmit={enviarFormulario} noValidate>
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

        <Button type="submit" variant="primary">
          Ingresar
        </Button>
      </Form>
    </Container>
  );
}

export default Login;