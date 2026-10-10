import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const datosIniciales = {
  nombre: "",
  apellido: "",
  correo: "",
  direccion: "",
  rol: "",
  contrasena: "",
};

function FormularioTrabajador({ onGuardar }) {
  // Estado que almacena los datos del formulario
  const [datos, setDatos] = useState(datosIniciales);

  // Estado que almacena los errores encontrados
  const [errores, setErrores] = useState({});

  // Actualiza el campo correspondiente mientras el usuario escribe
  function cambiarCampo(evento) {
    const { name, value } = evento.target;

    setDatos({
      ...datos,
      [name]: value,
    });
  }

  // Valida los datos antes de enviarlos al componente padre
  function enviarFormulario(evento) {
    evento.preventDefault();

    const nuevosErrores = {};

    // Normaliza el correo antes de comprobarlo
    const correo = datos.correo
      .trim()
      .toLowerCase();

    // Validación del nombre
    if (datos.nombre.trim().length < 3) {
      nuevosErrores.nombre =
        "El nombre debe tener al menos 3 caracteres.";
    }

    // Validación del apellido
    if (datos.apellido.trim().length < 3) {
      nuevosErrores.apellido =
        "El apellido debe tener al menos 3 caracteres.";
    }

    // Validación del correo electrónico
    if (correo === "") {
      nuevosErrores.correo =
        "Ingresa un correo electrónico.";
    } else if (!correo.includes("@")) {
      nuevosErrores.correo =
        "Ingresa un correo electrónico válido.";
    }

    // Validación de la dirección
    if (datos.direccion.trim().length < 5) {
      nuevosErrores.direccion =
        "La dirección debe tener al menos 5 caracteres.";
    }

    // Validación del rol
    if (!datos.rol) {
      nuevosErrores.rol =
        "Selecciona un rol.";
    }

    // Validación de la contraseña
    if (
      datos.contrasena.length < 8 ||
      datos.contrasena.length > 12
    ) {
      nuevosErrores.contrasena =
        "La contraseña debe tener entre 8 y 12 caracteres.";
    }

    setErrores(nuevosErrores);

    // Si existen errores, no se envían los datos
    if (Object.keys(nuevosErrores).length > 0) {
      return;
    }

    // Entrega los datos validados al componente padre
    onGuardar({
      ...datos,
      correo: correo,
    });

    // Limpia el formulario después de guardar
    setDatos(datosIniciales);
    setErrores({});
  }

  return (
    <Form
      onSubmit={enviarFormulario}
      noValidate
    >
      <Form.Group className="mb-3">
        <Form.Label>
          Nombre
        </Form.Label>

        <Form.Control
          type="text"
          name="nombre"
          value={datos.nombre}
          onChange={cambiarCampo}
          isInvalid={Boolean(errores.nombre)}
        />

        <Form.Control.Feedback type="invalid">
          {errores.nombre}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>
          Apellido
        </Form.Label>

        <Form.Control
          type="text"
          name="apellido"
          value={datos.apellido}
          onChange={cambiarCampo}
          isInvalid={Boolean(errores.apellido)}
        />

        <Form.Control.Feedback type="invalid">
          {errores.apellido}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>
          Correo electrónico
        </Form.Label>

        <Form.Control
          type="email"
          name="correo"
          value={datos.correo}
          onChange={cambiarCampo}
          placeholder="trabajador@correo.cl"
          isInvalid={Boolean(errores.correo)}
        />

        <Form.Control.Feedback type="invalid">
          {errores.correo}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>
          Dirección
        </Form.Label>

        <Form.Control
          type="text"
          name="direccion"
          value={datos.direccion}
          onChange={cambiarCampo}
          isInvalid={Boolean(errores.direccion)}
        />

        <Form.Control.Feedback type="invalid">
          {errores.direccion}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>
          Rol
        </Form.Label>

        <Form.Select
          name="rol"
          value={datos.rol}
          onChange={cambiarCampo}
          isInvalid={Boolean(errores.rol)}
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

        <Form.Control.Feedback type="invalid">
          {errores.rol}
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
        Registrar trabajador
      </Button>
    </Form>
  );
}

export default FormularioTrabajador;