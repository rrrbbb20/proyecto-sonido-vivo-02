import { Button } from "react-bootstrap";

function ListaTrabajadores({
  trabajadores,
  onEliminar,
}) {
  // Informa cuando todavía no existen trabajadores registrados
  if (trabajadores.length === 0) {
    return (
      <p>
        No hay trabajadores registrados.
      </p>
    );
  }

  return (
    <div>
      <h2 className="h4 mb-3">
        Trabajadores registrados
      </h2>

      {/* Genera una tarjeta por cada trabajador */}
      {trabajadores.map((trabajador) => (
        <div
          key={trabajador.id}
          className="border rounded p-3 mb-3"
        >
          <h3 className="h5">
            {trabajador.nombre} {trabajador.apellido}
          </h3>

          <p>
            Correo: {trabajador.correo}
          </p>

          <p>
            Dirección: {trabajador.direccion}
          </p>

          <p>
            Rol: {trabajador.rol}
          </p>

          <Button
            variant="danger"
            onClick={() =>
              onEliminar(trabajador.id)
            }
          >
            Eliminar trabajador
          </Button>
        </div>
      ))}
    </div>
  );
}

export default ListaTrabajadores;