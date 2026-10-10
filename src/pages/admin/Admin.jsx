import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import FormularioTrabajador from "./FormularioTrabajador";
import ListaTrabajadores from "./ListaTrabajadores";

function Admin() {
  // Recupera los trabajadores guardados
  const [trabajadores, setTrabajadores] = useState(() => {
    const guardados = localStorage.getItem("trabajadoresSonidoVivo");
    return guardados ? JSON.parse(guardados) : [];
  });

  // Guarda el trabajador seleccionado para edición
  const [trabajadorEditando, setTrabajadorEditando] = useState(null);

  // Mantiene los trabajadores sincronizados con localStorage
  useEffect(() => {
    localStorage.setItem("trabajadoresSonidoVivo", JSON.stringify(trabajadores));
  }, [trabajadores]);

  function guardarTrabajador(trabajador) {
    const correoExiste = trabajadores.some(
      (item) => item.correo === trabajador.correo
    );

    if (correoExiste) {
      return false;
    }

    // Genera un identificador mayor a los trabajadores existentes
    let nuevoId = 1;

    for (const trabajadorGuardado of trabajadores) {
      if (trabajadorGuardado.id >= nuevoId) {
        nuevoId = trabajadorGuardado.id + 1;
      }
    }

    // La contraseña se valida, pero no se almacena
    const nuevoTrabajador = {
      id: nuevoId,
      nombre: trabajador.nombre,
      apellido: trabajador.apellido,
      correo: trabajador.correo,
      direccion: trabajador.direccion,
      rol: trabajador.rol,
    };

    setTrabajadores([...trabajadores, nuevoTrabajador]);
    return true;
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

    // Reemplaza solamente al trabajador editado
    const trabajadoresActualizados = trabajadores.map((trabajador) => {
      if (trabajador.id === trabajadorActualizado.id) {
        return trabajadorActualizado;
      }

      return trabajador;
    });

    setTrabajadores(trabajadoresActualizados);
    setTrabajadorEditando(null);

    return true;
  }

  function cancelarEdicion() {
    setTrabajadorEditando(null);
  }

  function eliminarTrabajador(id) {
    const trabajadoresActualizados = trabajadores.filter(
      (trabajador) => trabajador.id !== id
    );

    setTrabajadores(trabajadoresActualizados);

    if (trabajadorEditando && trabajadorEditando.id === id) {
      setTrabajadorEditando(null);
    }
  }

  return (
    <Container className="py-4">
      <h1 className="mb-3">Administración</h1>

      <p className="mb-4">
        Registra y administra trabajadores de Sonido Vivo.
      </p>

      {/* Una columna en móvil y dos columnas en escritorio */}
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