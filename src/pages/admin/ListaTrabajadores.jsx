import { useState } from "react";
import { Button, Row, Col, Form } from "react-bootstrap";

function ListaTrabajadores({ trabajadores, onEditar, onEliminar }) {
  const [busqueda, setBusqueda] = useState("");
  const [rol, setRol] = useState("");

  // Filtra trabajadores por nombre, apellido, correo y rol
  const trabajadoresFiltrados = trabajadores.filter((trabajador) => {
    const texto = busqueda.toLowerCase();

    const coincideBusqueda =
      trabajador.nombre.toLowerCase().includes(texto) ||
      trabajador.apellido.toLowerCase().includes(texto) ||
      trabajador.correo.toLowerCase().includes(texto);

    const coincideRol = rol === "" || trabajador.rol === rol;

    return coincideBusqueda && coincideRol;
  });

  // Restablece los filtros aplicados
  function limpiarFiltros() {
    setBusqueda("");
    setRol("");
  }

  return (
    <div>
      <h2 className="h4 mb-3">Trabajadores registrados</h2>

      {/* Controles para buscar y filtrar trabajadores */}
      <Row className="g-2 mb-4">
        <Col xs={12} md={6}>
          <Form.Control
            type="text"
            placeholder="Buscar trabajador..."
            value={busqueda}
            onChange={(evento) => setBusqueda(evento.target.value)}
          />
        </Col>

        <Col xs={12} md={4}>
          <Form.Select value={rol} onChange={(evento) => setRol(evento.target.value)}>
            <option value="">Todos los roles</option>
            <option value="vendedor">Vendedor</option>
            <option value="administrador">Administrador</option>
          </Form.Select>
        </Col>

        <Col xs={12} md={2}>
          <Button variant="outline-secondary" className="w-100" onClick={limpiarFiltros}>
            Limpiar
          </Button>
        </Col>
      </Row>

      {/* Informa cuando todavía no existen trabajadores */}
      {trabajadores.length === 0 ? (
        <p className="mb-0">No hay trabajadores registrados.</p>
      ) : trabajadoresFiltrados.length === 0 ? (
        <p className="mb-0">No se encontraron trabajadores con los filtros seleccionados.</p>
      ) : (
        <Row className="g-3">
          {trabajadoresFiltrados.map((trabajador) => (
            <Col key={trabajador.id} xs={12} md={6} lg={4}>
              <div className="border rounded p-3 h-100">
                <h3 className="h5">{trabajador.nombre} {trabajador.apellido}</h3>
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
      )}
    </div>
  );
}

export default ListaTrabajadores;