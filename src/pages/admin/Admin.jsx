import { Container } from "react-bootstrap";
import FormularioTrabajador from "./FormularioTrabajador";

function Admin() {
  // Recibe los datos enviados desde FormularioTrabajador
  function guardarTrabajador(trabajador) {
    console.log("Trabajador recibido:", trabajador);
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