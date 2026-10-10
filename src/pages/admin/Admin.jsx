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

  // Mantiene localStorage sincronizado con el estado
  useEffect(() => {
    localStorage.setItem(
      "trabajadoresSonidoVivo",
      JSON.stringify(trabajadores)
    );
  }, [trabajadores]);

  // Guarda un trabajador nuevo
  function guardarTrabajador(trabajador) {
    // Comprueba si el correo ya pertenece a otro trabajador
    const correoExiste = trabajadores.some(
      (item) =>
        item.correo === trabajador.correo
    );

    // Evita registrar dos trabajadores con el mismo correo
    if (correoExiste) {
      return false;
    }

    const nuevoTrabajador = {
      id: trabajadores.length + 1,
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
  }

  return (
    <Container className="py-4">
      <h1 className="mb-3">
        Administración
      </h1>

      <p className="mb-4">
        Registra trabajadores y asigna su rol dentro de Sonido Vivo.
      </p>

      <div className="mb-5">
        <FormularioTrabajador
          onGuardar={guardarTrabajador}
        />
      </div>

      <ListaTrabajadores
        trabajadores={trabajadores}
        onEliminar={eliminarTrabajador}
      />
    </Container>
  );
}

export default Admin;