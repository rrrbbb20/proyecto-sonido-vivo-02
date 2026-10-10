import { Button, Row, Col } from "react-bootstrap";

function ListaTrabajadores({ trabajadores, onEditar, onEliminar }) {
  // Muestra un mensaje cuando todavía no existen trabajadores registrados
  if (trabajadores.length === 0) {
    return <p className="mb-0">No hay trabajadores registrados.</p>;
  }

  return (
    <div>
      <h2 className="h4 mb-3">Trabajadores registrados</h2>

      {/* Distribuye las tarjetas de forma responsiva */}
      <Row className="g-3">
        {trabajadores.map((trabajador) => (
          <Col key={trabajador.id} xs={12} md={6} lg={4}>
            <div className="border rounded p-3 h-100">
              <h3 className="h5">
                {trabajador.nombre} {trabajador.apellido}
              </h3>

              <p className="mb-2">Correo: {trabajador.correo}</p>
              <p className="mb-2">Dirección: {trabajador.direccion}</p>
              <p className="mb-3">Rol: {trabajador.rol}</p>

              {/* Acciones disponibles para cada trabajador */}
              <div className="d-flex gap-2 flex-wrap">
                <Button variant="primary" onClick={() => onEditar(trabajador)}>
                  Editar
                </Button>

                <Button variant="danger" onClick={() => onEliminar(trabajador.id)}>
                  Eliminar
                </Button>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default ListaTrabajadores;