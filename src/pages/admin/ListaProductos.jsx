
import { Row, Col, Button } from "react-bootstrap";

function ListaProductos({ productos, onEliminar }) {
  if (productos.length === 0) {
    return <p>No hay productos registrados en el inventario.</p>;
  }

  return (
    <div>
      <h2 className="h4 mb-3">Inventario actual</h2>

      <Row className="g-3">
        {productos.map((producto) => (
          <Col key={producto.id} xs={12} md={6}>
            <div className="border rounded p-3 h-100 d-flex flex-column">
              <h3 className="h6">{producto.nombre}</h3>

              <p className="mb-1 text-muted">
                {producto.categoriaNombre}
              </p>

              <p className="mb-1">
                Precio: ${producto.precio}
              </p>

              <p className="mb-3">
                Stock: {producto.stock} unidades
              </p>

              <div className="d-flex gap-2 mt-auto">
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => onEliminar(producto.id)}
                >
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

export default ListaProductos;
