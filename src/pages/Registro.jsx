import { useState } from "react";
import { Container, Form, Button, Alert, Row, Col, Card } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import CampoFormulario from "../components/CampoFormulario";
import { validarRegistro } from "../utils/validacionesRegistro";
import { registrarClientePerfil } from "../services/clienteService";

const datosIniciales = {
  nombre: "",
  apellido: "",
  rut: "",
  correo: "",
  telefono: "",
  contrasena: "",
  terminos: false,
};

function Registro({ sesion, setSesion }) {
  const [datos, setDatos] = useState(datosIniciales);
  const [errores, setErrores] = useState({});
  const [errorServidor, setErrorServidor] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  const navegar = useNavigate();

  if (sesion?.token) {
    return <Navigate to="/" replace />;
  }

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
    setErrorServidor("");
    setMensaje("");
  }

  async function enviarFormulario(evento) {
    evento.preventDefault();
    setMensaje("");
    setErrorServidor("");

    const nuevosErrores = validarRegistro(datos);
    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) {
      return;
    }

    const payload = {
      nombre: datos.nombre.trim(),
      apellido: datos.apellido.trim(),
      rut: datos.rut.trim().toUpperCase(),
      correo: datos.correo.trim().toLowerCase(),
      telefono: datos.telefono.trim(),
      contrasena: datos.contrasena,
    };

    try {
      setCargando(true);
      const respuesta = await registrarClientePerfil(payload);

      const nuevaSesion = {
        idUsuario: respuesta.usuarioId,
        clienteId: respuesta.id,
        nombre: respuesta.nombre,
        apellido: respuesta.apellido,
        correo: respuesta.correo,
        rol: respuesta.rol,
        token: respuesta.token,
      };

      sessionStorage.setItem("sesionSonidoVivo", JSON.stringify(nuevaSesion));
      if (setSesion) {
        setSesion(nuevaSesion);
      }

      setDatos({ ...datosIniciales });
      setErrores({});
      setMensaje("¡Registro completado correctamente! Redirigiendo...");

      setTimeout(() => {
        navegar("/");
      }, 1500);
    } catch (error) {
      setErrorServidor(error.message);
    } finally {
      setCargando(false);
    }
  }

  return (
    <Container className="py-5" style={{ maxWidth: "800px" }}>
      <Card className="shadow-sm border-0 rounded-4">
        <Card.Body className="p-4 p-md-5">
          <h2 className="mb-4 text-center fw-bold">Crear cuenta</h2>

          {errorServidor && (
            <Alert variant="danger" role="alert" className="text-center">
              {errorServidor}
            </Alert>
          )}

          {mensaje && (
            <Alert variant="success" role="status" className="text-center">
              {mensaje}
            </Alert>
          )}

          <Form onSubmit={enviarFormulario} noValidate>
            <Row className="g-3 mb-3">
              <Col xs={12} md={12} lg={6}>
                <CampoFormulario
                  label="Nombre"
                  nombre="nombre"
                  placeholder="Ingresa tu nombre"
                  datos={datos}
                  errores={errores}
                  onChange={cambiarCampo}
                />
              </Col>
              <Col xs={12} md={12} lg={6}>
                <CampoFormulario
                  label="Apellido"
                  nombre="apellido"
                  placeholder="Ingresa tu apellido"
                  datos={datos}
                  errores={errores}
                  onChange={cambiarCampo}
                />
              </Col>
            </Row>

            <Row className="g-3 mb-3">
              <Col xs={12} md={12} lg={6}>
                <CampoFormulario
                  label="RUT"
                  nombre="rut"
                  placeholder="12345678-5"
                  datos={datos}
                  errores={errores}
                  onChange={cambiarCampo}
                />
              </Col>
              <Col xs={12} md={12} lg={6}>
                <CampoFormulario
                  label="Teléfono"
                  nombre="telefono"
                  tipo="tel"
                  placeholder="912345678"
                  datos={datos}
                  errores={errores}
                  onChange={cambiarCampo}
                />
              </Col>
            </Row>

            <div className="mb-3">
              <CampoFormulario
                label="Correo electrónico"
                nombre="correo"
                tipo="email"
                placeholder="correo@ejemplo.cl"
                datos={datos}
                errores={errores}
                onChange={cambiarCampo}
              />
            </div>

            <div className="mb-4">
              <CampoFormulario
                label="Contraseña"
                nombre="contrasena"
                tipo="password"
                placeholder="Entre 8 y 12 caracteres"
                datos={datos}
                errores={errores}
                onChange={cambiarCampo}
              />
            </div>

            <Form.Check
              className="mb-4"
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

            <Button
              variant="primary"
              type="submit"
              size="lg"
              className="w-100 fw-bold shadow-sm"
              disabled={cargando}
            >
              {cargando ? "Registrando..." : "Registrarme"}
            </Button>
          </Form>

          <p className="mt-4 text-center mb-0 text-muted">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className="text-decoration-none fw-semibold">
              Inicia sesión aquí
            </Link>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Registro;