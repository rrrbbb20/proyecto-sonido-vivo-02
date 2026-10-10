import { useState } from "react";
import { Container } from "react-bootstrap";
import FormularioTrabajador from "./FormularioTrabajador";

function Admin() {
  // Recupera los trabajadores guardados
  const [trabajadores, setTrabajadores] = useState(() => {
    const trabajadoresGuardados =
      localStorage.getItem("trabajadoresSonidoVivo");

    return trabajadoresGuardados
      ? JSON.parse(trabajadoresGuardados)
      : [];
  });

  // Guarda un nuevo trabajador sin almacenar la contraseña
  function guardarTrabajador(trabajador) {
    const nuevoTrabajador = {
      id: trabajadores.length + 1,
      nombre: trabajador.nombre,
      apellido: trabajador.apellido,
      correo: trabajador.correo,
      direccion: trabajador.direccion,
      rol: trabajador.rol,
    };

    const trabajadoresActualizados = [
      ...trabajadores,
      nuevoTrabajador,
    ];

    setTrabajadores(trabajadoresActualizados);

    localStorage.setItem(
      "trabajadoresSonidoVivo",
      JSON.stringify(trabajadoresActualizados)
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

      <FormularioTrabajador
        onGuardar={guardarTrabajador}
      />
    </Container>
  );
}

export default Admin;