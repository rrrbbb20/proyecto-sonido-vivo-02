import { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CampoFormulario from "../components/CampoFormulario";

// IMPORTAMOS LA NUEVA HERRAMIENTA DESDE UTILS
import { validarRegistro } from "../utils/validacionesRegistro"; 

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

function Registro({ usuarios, setUsuarios }) {
  const [datos, setDatos] = useState(datosIniciales);
  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState("");
  
  // Inicializamos el hook de navegación
  const navegar = useNavigate();

  // Actualiza los campos del formulario mientras el usuario escribe
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

  // Registra al usuario
  function enviarFormulario(evento) {
    evento.preventDefault();
    setMensaje("");

    // 1. Validamos usando nuestra función externa pura
    const nuevosErrores = validarRegistro(datos, usuarios);
    
    // 2. Guardamos los errores para que se muestren en pantalla
    setErrores(nuevosErrores);

    // 3. Si hay al menos 1 error, detenemos el envío
    if (Object.keys(nuevosErrores).length > 0) {
      return;
    }

    // 4. Si todo está correcto, creamos el usuario
    const nuevoUsuario = {
      nombre: datos.nombre.trim(),
      apellido: datos.apellido.trim(),
      rut: datos.rut.trim(),
      correo: datos.correo.trim().toLowerCase(),
      telefono: datos.telefono.trim(),
      contrasena: datos.contrasena,
      rol: "cliente",
    };

    // Agregamos el usuario a la lista compartida (base de datos temporal)
    setUsuarios((usuariosAnteriores) => [
      ...usuariosAnteriores,
      nuevoUsuario,
    ]);

    // Limpiamos y mostramos éxito
    setDatos({ ...datosIniciales });
    setErrores({});
    setMensaje("¡Registro completado correctamente! Redirigiendo...");
    
    // Redirigimos a la página principal después de 2 segundos
    setTimeout(() => {
      navegar("/");
    }, 2000);
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

        
        <Form.Check
          id="terminos"
          type="checkbox"
          name="terminos"
          label="Acepto los términos y condiciones"
          checked={datos.terminos}
          onChange={cambiarCampo}
          isInvalid={Boolean(errores.terminos)}
          feedback={errores.terminos}
          feedbackType="invalid"
        />


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