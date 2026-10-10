import { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const datosIniciales = {
  nombre: "",
  apellido: "",
  correo: "",
  direccion: "",
  rol: "",
  contrasena: "",
};

function FormularioTrabajador({
  onGuardar,
  onActualizar,
  trabajadorEditando,
  onCancelarEdicion,
}) {
  // Estados del formulario y sus validaciones
  const [datos, setDatos] = useState(datosIniciales);
  const [errores, setErrores] = useState({});

  // Carga los datos cuando se selecciona un trabajador para editar
  useEffect(() => {
    if (trabajadorEditando) {
      setDatos({
        nombre: trabajadorEditando.nombre,
        apellido: trabajadorEditando.apellido,
        correo: trabajadorEditando.correo,
        direccion: trabajadorEditando.direccion,
        rol: trabajadorEditando.rol,
        contrasena: "",
      });
    } else {
      setDatos(datosIniciales);
    }

    setErrores({});
  }, [trabajadorEditando]);

  // Actualiza el campo modificado
  function cambiarCampo(evento) {
    const { name, value } = evento.target;
    setDatos({ ...datos, [name]: value });
  }

  // Valida los datos antes de guardar o actualizar
  function enviarFormulario(evento) {
    evento.preventDefault();

    const nuevosErrores = {};
    const correo = datos.correo.trim().toLowerCase();

    if (datos.nombre.trim().length < 3) {
      nuevosErrores.nombre = "El nombre debe tener al menos 3 caracteres.";
    }

    if (datos.apellido.trim().length < 3) {
      nuevosErrores.apellido = "El apellido debe tener al menos 3 caracteres.";
    }

    if (correo === "") {
      nuevosErrores.correo = "Ingresa un correo electrónico.";
    } else if (!correo.includes("@")) {
      nuevosErrores.correo = "Ingresa un correo electrónico válido.";
    }

    if (datos.direccion.trim().length < 5) {
      nuevosErrores.direccion = "La dirección debe tener al menos 5 caracteres.";
    }

    if (!datos.rol) {
      nuevosErrores.rol = "Selecciona un rol.";
    }

    // La contraseña se solicita solamente al registrar
    if (
      !trabajadorEditando &&
      (datos.contrasena.length < 8 || datos.contrasena.length > 12)
    ) {
      nuevosErrores.contrasena = "La contraseña debe tener entre 8 y 12 caracteres.";
    }

    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) {
      return;
    }

    // Actualiza un trabajador existente
    if (trabajadorEditando) {
      const actualizado = onActualizar({
        id: trabajadorEditando.id,
        nombre: datos.nombre.trim(),
        apellido: datos.apellido.trim(),
        correo: correo,
        direccion: datos.direccion.trim(),
        rol: datos.rol,
      });

      if (!actualizado) {
        setErrores({ correo: "Ya existe un trabajador con este correo." });
        return;
      }
    } else {
      // Registra un trabajador nuevo
      const guardado = onGuardar({
        ...datos,
        nombre: datos.nombre.trim(),
        apellido: datos.apellido.trim(),
        correo: correo,
        direccion: datos.direccion.trim(),
      });

      if (!guardado) {
        setErrores({ correo: "Ya existe un trabajador con este correo." });
        return;
      }
    }

    // Limpia el formulario al terminar
    setDatos(datosIniciales);
    setErrores({});
  }

  return (
    <Form onSubmit={enviarFormulario} noValidate>
      <h2 className="h4 mb-3">
        {trabajadorEditando ? "Editar trabajador" : "Registrar trabajador"}
      </h2>

      {/* Nombre y apellido se adaptan según el ancho */}
      <Row className="g-3">
        <Col xs={12} md={6}>
          <Form.Group>
            <Form.Label>Nombre</Form.Label>

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
        </Col>

        <Col xs={12} md={6}>
          <Form.Group>
            <Form.Label>Apellido</Form.Label>

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
        </Col>

        <Col xs={12} md={6}>
          <Form.Group>
            <Form.Label>Correo electrónico</Form.Label>

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
        </Col>

        <Col xs={12} md={6}>
          <Form.Group>
            <Form.Label>Dirección</Form.Label>

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
        </Col>

        <Col xs={12} md={6}>
          <Form.Group>
            <Form.Label>Rol</Form.Label>

            <Form.Select
              name="rol"
              value={datos.rol}
              onChange={cambiarCampo}
              isInvalid={Boolean(errores.rol)}
            >
              <option value="">Selecciona un rol</option>
              <option value="vendedor">Vendedor</option>
              <option value="administrador">Administrador</option>
            </Form.Select>

            <Form.Control.Feedback type="invalid">
              {errores.rol}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        {/* La contraseña se muestra solamente al registrar */}
        {!trabajadorEditando && (
          <Col xs={12} md={6}>
            <Form.Group>
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
          </Col>
        )}
      </Row>

      {/* Acciones principales del formulario */}
      <div className="d-flex gap-2 flex-wrap mt-4">
        <Button type="submit" variant="primary">
          {trabajadorEditando ? "Guardar cambios" : "Registrar trabajador"}
        </Button>

        {trabajadorEditando && (
          <Button type="button" variant="secondary" onClick={onCancelarEdicion}>
            Cancelar edición
          </Button>
        )}
      </div>
    </Form>
  );
}

export default FormularioTrabajador;