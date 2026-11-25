import { useEffect, useState } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import FormularioTrabajador from "./FormularioTrabajador";
import ListaTrabajadores from "./ListaTrabajadores";
import { registrarTrabajador } from "../../services/authService";

function Admin({ sesion }) {
  const [trabajadores, setTrabajadores] = useState(() => {
    const guardados = localStorage.getItem("trabajadoresSonidoVivo");
    return guardados ? JSON.parse(guardados) : [];
  });

  const [trabajadorEditando, setTrabajadorEditando] = useState(null);
  const [errorServidor, setErrorServidor] = useState("");
  const [exito, setExito] = useState("");

  useEffect(() => {
    localStorage.setItem("trabajadoresSonidoVivo", JSON.stringify(trabajadores));
  }, [trabajadores]);

  async function guardarTrabajador(trabajador) {
    setErrorServidor("");
    setExito("");

    const correoExiste = trabajadores.some(
      (item) => item.correo === trabajador.correo
    );

    if (correoExiste) {
      return false;
    }

    try {
      const creadoBackend = await registrarTrabajador(trabajador, sesion?.token);

      const nuevoTrabajador = {
        id: creadoBackend?.idUsuario || Date.now(),
        nombre: trabajador.nombre,
        apellido: trabajador.apellido,
        correo: trabajador.correo,
        direccion: trabajador.direccion,
        rol: trabajador.rol,
      };

      setTrabajadores((prev) => [...prev, nuevoTrabajador]);
      setExito("Trabajador registrado correctamente en el servicio de autenticación.");
      return true;
    } catch (error) {
      setErrorServidor(error.message);
      return false;
    }
  }

  function editarTrabajador(trabajador) {
    setTrabajadorEditando(trabajador);
  }

  function actualizarTrabajador(trabajadorActualizado) {
    const correoExiste = trabajadores.some(
      (trabajador) =>
        trabajador.correo === trabajadorActualizado.correo &&
        trabajador.id !== trabajadorActualizado.id
    );

    if (correoExiste) {
      return false;
    }

    const trabajadoresActualizados = trabajadores.map((trabajador) =>
      trabajador.id === trabajadorActualizado.id
        ? trabajadorActualizado
        : trabajador
    );

    setTrabajadores(trabajadoresActualizados);
    setTrabajadorEditando(null);
    return true;
  }

  function cancelarEdicion() {
    setTrabajadorEditando(null);
  }

  function eliminarTrabajador(id) {
    setTrabajadores((prev) => prev.filter((trabajador) => trabajador.id !== id));

    if (trabajadorEditando && trabajadorEditando.id === id) {
      setTrabajadorEditando(null);
    }
  }

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="mb-0">Administración</h1>
        <Link to="/admin/panel" className="btn btn-outline-secondary">
          &larr; Volver al panel
        </Link>
      </div>

      <p className="mb-4">
        Registra y administra trabajadores de Sonido Vivo.
      </p>

      {errorServidor && <Alert variant="danger">{errorServidor}</Alert>}
      {exito && <Alert variant="success">{exito}</Alert>}

      <Row className="g-4">
        <Col xs={12} lg={5}>
          <div className="border rounded p-4 h-100">
            <FormularioTrabajador
              onGuardar={guardarTrabajador}
              onActualizar={actualizarTrabajador}
              trabajadorEditando={trabajadorEditando}
              onCancelarEdicion={cancelarEdicion}
            />
          </div>
        </Col>

        <Col xs={12} lg={7}>
          <div className="border rounded p-4 h-100">
            <ListaTrabajadores
              trabajadores={trabajadores}
              onEditar={editarTrabajador}
              onEliminar={eliminarTrabajador}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Admin;