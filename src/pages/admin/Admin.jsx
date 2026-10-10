import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import FormularioTrabajador from "./FormularioTrabajador";
import ListaTrabajadores from "./ListaTrabajadores";

function Admin() {
  // Recupera los trabajadores guardados al cargar el componente
  const [trabajadores, setTrabajadores] = useState(() => {
    const trabajadoresGuardados =
      localStorage.getItem("trabajadoresSonidoVivo");

    return trabajadoresGuardados
      ? JSON.parse(trabajadoresGuardados)
      : [];
  });

  // Guarda el trabajador que se encuentra actualmente en edición
  const [trabajadorEditando, setTrabajadorEditando] =
    useState(null);

  // Mantiene localStorage sincronizado con el estado
  useEffect(() => {
    localStorage.setItem(
      "trabajadoresSonidoVivo",
      JSON.stringify(trabajadores)
    );
  }, [trabajadores]);

  // Registra un trabajador nuevo
  function guardarTrabajador(trabajador) {
    // Comprueba si el correo ya pertenece a otro trabajador
    const correoExiste = trabajadores.some(
      (item) => item.correo === trabajador.correo
    );

    if (correoExiste) {
      return false;
    }

    // Genera un identificador sencillo para el trabajador
    let nuevoId = 1;

    if (trabajadores.length > 0) {
      nuevoId =
        trabajadores[trabajadores.length - 1].id + 1;
    }

    // La contraseña se valida en el formulario,
    // pero no se almacena en localStorage
    const nuevoTrabajador = {
      id: nuevoId,
      nombre: trabajador.nombre,
      apellido: trabajador.apellido,
      correo: trabajador.correo,
      direccion: trabajador.direccion,
      rol: trabajador.rol,
    };

    setTrabajadores([
      ...trabajadores,
      nuevoTrabajador,
    ]);

    return true;
  }

  // Selecciona un trabajador para modificar sus datos
  function editarTrabajador(trabajador) {
    setTrabajadorEditando(trabajador);
  }

  // Actualiza los datos del trabajador seleccionado
  function actualizarTrabajador(trabajadorActualizado) {
    // Revisa si el nuevo correo pertenece a otro trabajador
    const correoExiste = trabajadores.some(
      (trabajador) =>
        trabajador.correo === trabajadorActualizado.correo &&
        trabajador.id !== trabajadorActualizado.id
    );

    if (correoExiste) {
      return false;
    }

    // Reemplaza solamente el trabajador que coincide con el id
    const trabajadoresActualizados = trabajadores.map(
      (trabajador) => {
        if (trabajador.id === trabajadorActualizado.id) {
          return trabajadorActualizado;
        }

        return trabajador;
      }
    );

    setTrabajadores(trabajadoresActualizados);
    setTrabajadorEditando(null);

    return true;
  }

  // Cancela la edición y vuelve al modo de registro
  function cancelarEdicion() {
    setTrabajadorEditando(null);
  }

  // Elimina el trabajador que coincide con el id recibido
  function eliminarTrabajador(id) {
    const trabajadoresActualizados =
      trabajadores.filter(
        (trabajador) =>
          trabajador.id !== id
      );

    setTrabajadores(
      trabajadoresActualizados
    );

    // Si se elimina el trabajador que estaba en edición,
    // también se cancela la edición
    if (
      trabajadorEditando &&
      trabajadorEditando.id === id
    ) {
      setTrabajadorEditando(null);
    }
  }

  return (
    <Container className="py-4">
      <h1 className="mb-3">
        Administración
      </h1>

      <p className="mb-4">
        Registra y administra trabajadores de Sonido Vivo.
      </p>

      <div className="mb-5">
        <FormularioTrabajador
          onGuardar={guardarTrabajador}
          onActualizar={actualizarTrabajador}
          trabajadorEditando={trabajadorEditando}
          onCancelarEdicion={cancelarEdicion}
        />
      </div>

      <ListaTrabajadores
        trabajadores={trabajadores}
        onEditar={editarTrabajador}
        onEliminar={eliminarTrabajador}
      />
    </Container>
  );
}

export default Admin;