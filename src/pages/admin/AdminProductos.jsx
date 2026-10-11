import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import FormularioProducto from "./FormularioProducto";
import ListaProductos from "./ListaProductos";

function AdminProductos({ productos, setProductos }) {
  const [productoEditando, setProductoEditando] = useState(null);

function guardarProducto(nuevoProducto) {
    let nuevoId = 1;
    for (const prod of productos) {
      if (prod.id >= nuevoId) nuevoId = prod.id + 1;
    }
    
    setProductos([...productos, { ...nuevoProducto, id: nuevoId }]);
  }

  function editarProducto(producto) {
    setProductoEditando(producto);
  }

  function actualizarProducto(productoActualizado) {
    const productosActualizados = productos.map((prod) => 
      prod.id === productoActualizado.id ? productoActualizado : prod
    );
    setProductos(productosActualizados);
    setProductoEditando(null);
  }

  function eliminarProducto(id) {
    setProductos(productos.filter((prod) => prod.id !== id));
    if (productoEditando && productoEditando.id === id) {
      setProductoEditando(null);
    }
  }
return (
    <Container className="py-4">
      <h1 className="mb-4">Administración de Inventario</h1>
      <Row className="g-4">
        <Col xs={12} lg={5}>
          <div className="border rounded p-4 h-100">
            <FormularioProducto 
              onGuardar={guardarProducto}
              onActualizar={actualizarProducto}
              productoEditando={productoEditando}
              onCancelarEdicion={() => setProductoEditando(null)}
            />
          </div>
        </Col>
        <Col xs={12} lg={7}>
          <div className="border rounded p-4 h-100">
            <ListaProductos 
              productos={productos}
              onEditar={editarProducto}
              onEliminar={eliminarProducto}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminProductos;  