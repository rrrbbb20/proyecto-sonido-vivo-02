import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

function Admin() {
  // Estado que almacena los datos del trabajador
  const [datos, setDatos] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    direccion: "",
    rol: "",
    contrasena: "",
  });

  // Actualiza el campo correspondiente
  function cambiarCampo(evento) {
    const { name, value } = evento.target;

    setDatos({
      ...datos,
      [name]: value,
    });
  }

  // Evita el envío tradicional del formulario
  function enviarFormulario(evento) {
    evento.preventDefault();

    console.log(datos);
  }

  return (
    <Container className="py-4">
      <h1 className="mb-3">
        Administración
      </h1>

      <p className="mb-4">
        Registra trabajadores y asigna su rol dentro de Sonido Vivo.
      </p>

      <Form onSubmit={enviarFormulario}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>

          <Form.Control
            type="text"
            name="nombre"
            value={datos.nombre}
            onChange={cambiarCampo}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Apellido</Form.Label>

          <Form.Control
            type="text"
            name="apellido"
            value={datos.apellido}
            onChange={cambiarCampo}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Correo electrónico</Form.Label>

          <Form.Control
            type="email"
            name="correo"
            value={datos.correo}
            onChange={cambiarCampo}
            placeholder="trabajador@correo.cl"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Dirección</Form.Label>

          <Form.Control
            type="text"
            name="direccion"
            value={datos.direccion}
            onChange={cambiarCampo}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Rol</Form.Label>

          <Form.Select
            name="rol"
            value={datos.rol}
            onChange={cambiarCampo}
          >
            <option value="">
              Selecciona un rol
            </option>

            <option value="vendedor">
              Vendedor
            </option>

            <option value="administrador">
              Administrador
            </option>
          </Form.Select>
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
          Registrar trabajador
        </Button>
      </Form>
    </Container>
  );
}

export default Admin;