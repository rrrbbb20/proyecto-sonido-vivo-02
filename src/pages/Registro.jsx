
import { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

import CampoFormulario from "../components/CampoFormulario";

// Valores iniciales del formulario
const datosIniciales = {
  nombre: "",
  apellido: "",
  rut: "",
  correo: "",
  telefono: "",
  contrasena: "",
  terminos: false,
};

// Validación del RUT chileno mediante módulo 11
export function validarRutChileno(rut) {
  const rutLimpio = rut
    .replace(/\./g, "")
    .trim()
    .toUpperCase();

  if (!/^\d{7,8}-[\dK]$/.test(rutLimpio)) {
    return false;
  }

  const [numero, digitoIngresado] = rutLimpio.split("-");

  let suma = 0;
  let multiplicador = 2;

  for (let i = numero.length - 1; i >= 0; i--) {
    suma += Number(numero[i]) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }

  const resto = 11 - (suma % 11);

  let digitoEsperado;

  if (resto === 11) {
    digitoEsperado = "0";
  } else if (resto === 10) {
    digitoEsperado = "K";
  } else {
    digitoEsperado = String(resto);
  }

  return digitoIngresado === digitoEsperado;
}

function Registro({ usuarios, setUsuarios }) {
  const [datos, setDatos] = useState(datosIniciales);
  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState("");

  // Actualiza los campos del formulario
  function cambiarCampo(evento) {
    const { name, value, type, checked } = evento.target;

    setDatos((datosAnteriores) => ({
      ...datosAnteriores,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrores((erroresAnteriores) => ({
      ...erroresAnteriores,
      [name]: "",
    }));

    setMensaje("");
  }

  // Valida los datos ingresados
  function validarFormulario() {
    const nuevosErrores = {};

    if (!datos.nombre.trim()) {
      nuevosErrores.nombre = "Ingresa tu nombre.";
    }

    if (!datos.apellido.trim()) {
      nuevosErrores.apellido = "Ingresa tu apellido.";
    }

    if (!validarRutChileno(datos.rut)) {
      nuevosErrores.rut = "Ingresa un RUT válido.";
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.correo.trim())
    ) {
      nuevosErrores.correo = "Ingresa un correo válido.";
    }

    if (!/^\d{9}$/.test(datos.telefono.trim())) {
      nuevosErrores.telefono =
        "Ingresa 9 dígitos, sin espacios ni +56.";
    }

    if (
      datos.contrasena.length < 8 ||
      datos.contrasena.length > 12
    ) {
      nuevosErrores.contrasena =
        "La contraseña debe tener entre 8 y 12 caracteres.";
    }

    if (!datos.terminos) {
      nuevosErrores.terminos =
        "Debes aceptar los términos y condiciones.";
    }

    // Evita registrar dos veces el mismo correo
    const correoExiste = usuarios.some(
      (usuario) =>
        usuario.correo.toLowerCase() ===
        datos.correo.trim().toLowerCase()
    );

    if (correoExiste) {
      nuevosErrores.correo =
        "Este correo ya está registrado.";
    }

    setErrores(nuevosErrores);

    return Object.keys(nuevosErrores).length === 0;
  }

  // Registra al usuario
  function enviarFormulario(evento) {
    evento.preventDefault();
    setMensaje("");

    if (!validarFormulario()) {
      return;
    }

    // Usuario sin atributo id
    const nuevoUsuario = {
      nombre: datos.nombre.trim(),
      apellido: datos.apellido.trim(),
      rut: datos.rut.trim(),
      correo: datos.correo.trim().toLowerCase(),
      telefono: datos.telefono.trim(),
      contrasena: datos.contrasena,
      rol: "cliente",
    };

    // Agrega el usuario a la lista compartida
    setUsuarios((usuariosAnteriores) => [
      ...usuariosAnteriores,
      nuevoUsuario,
    ]);

    setDatos({ ...datosIniciales });
    setErrores({});
    setMensaje("¡Registro completado correctamente!");
  }

  return (
    <Container className="py-4" style={{ maxWidth: "650px" }}>
      <h1 className="mb-4">Crear cuenta</h1>

      {mensaje && (
        <Alert variant="success" role="status">
          {mensaje}
        </Alert>
      )}

      <Form onSubmit={enviarFormulario} noValidate>
        <CampoFormulario
          label="Nombre"
          nombre="nombre"
          placeholder="Ingresa tu nombre"
          datos={datos}
          errores={errores}
          onChange={cambiarCampo}
        />

        <CampoFormulario
          label="Apellido"
          nombre="apellido"
          placeholder="Ingresa tu apellido"
          datos={datos}
          errores={errores}
          onChange={cambiarCampo}
        />

        <CampoFormulario
          label="RUT"
          nombre="rut"
          placeholder="12345678-5"
          datos={datos}
          errores={errores}
          onChange={cambiarCampo}
        />

        <CampoFormulario
          label="Correo electrónico"
          nombre="correo"
          tipo="email"
          placeholder="correo@ejemplo.cl"
          datos={datos}
          errores={errores}
          onChange={cambiarCampo}
        />

        <CampoFormulario
          label="Teléfono"
          nombre="telefono"
          tipo="tel"
          placeholder="912345678"
          datos={datos}
          errores={errores}
          onChange={cambiarCampo}
        />

        <CampoFormulario
          label="Contraseña"
          nombre="contrasena"
          tipo="password"
          placeholder="Entre 8 y 12 caracteres"
          datos={datos}
          errores={errores}
          onChange={cambiarCampo}
        />

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            name="terminos"
            label="Acepto los términos y condiciones"
            checked={datos.terminos}
            onChange={cambiarCampo}
            isInvalid={Boolean(errores.terminos)}
            feedback={errores.terminos}
            feedbackType="invalid"
          />
        </Form.Group>

        <Button type="submit" className="w-100">
          Registrarme
        </Button>
      </Form>

      <p className="mt-3 text-center">
        ¿Ya tienes una cuenta?{" "}
        <Link to="/login">Inicia sesión</Link>
      </p>
    </Container>
  );
}

export default Registro;
