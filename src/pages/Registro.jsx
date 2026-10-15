import { useState } from "react";
import { Container, Form, Button, Alert, Row, Col, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CampoFormulario from "../components/CampoFormulario";
import { validarRegistro } from "../utils/validacionesRegistro"; 

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
  
  const navegar = useNavigate();

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

  function enviarFormulario(evento) {
    evento.preventDefault();
    setMensaje("");

    const nuevosErrores = validarRegistro(datos, usuarios);
    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) {
      return;
    }

    const nuevoUsuario = {
      nombre: datos.nombre.trim(),
      apellido: datos.apellido.trim(),
      rut: datos.rut.trim(),
      correo: datos.correo.trim().toLowerCase(),
      telefono: datos.telefono.trim(),
      contrasena: datos.contrasena,
      rol: "cliente",
    };

    setUsuarios((usuariosAnteriores) => [
      ...usuariosAnteriores,
      nuevoUsuario,
    ]);

    setDatos({ ...datosIniciales });
    setErrores({});
    setMensaje("¡Registro completado correctamente! Redirigiendo...");
    
    setTimeout(() => {
      navegar("/");
    }, 2000);
  }

  return (
    <Container className="py-5" style={{ maxWidth: "800px" }}>
      <Card className="shadow-sm border-0 rounded-4">
        <Card.Body className="p-4 p-md-5">
          <h2 className="mb-4 text-center fw-bold">Crear cuenta</h2>

          {mensaje && (
            <Alert variant="success" role="status" className="text-center">
              {mensaje}
            </Alert>
          )}

          <Form onSubmit={enviarFormulario} noValidate>
            
            {/* xs=12 (Celular: 100%), md=12 (Tablet: 100%), lg=6 (PC: 50%) */}
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

            {/* xs=12 (Celular: 100%), md=12 (Tablet: 100%), lg=6 (PC: 50%) */}
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

            <Button variant="primary" type="submit" size="lg" className="w-100 fw-bold shadow-sm">
              Registrarme
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