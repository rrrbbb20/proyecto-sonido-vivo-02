import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import FormularioProducto from "./FormularioProducto";
import ListaProductos from "./ListaProductos";
import { calcularNuevoId } from "../../utils/inventario";

function AdminProductos({ productos, setProductos }) {
  const [productoEditando, setProductoEditando] = useState(null);

  function guardarProducto(nuevoProducto) {
    // Usamos nuestra calculadora externa para obtener el ID
    const nuevoId = calcularNuevoId(productos);
    
    // Guardamos el producto con su nuevo ID
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
      <h1 className="mb-4 text-center text-lg-start">Administración de Inventario</h1>
      
      <Row className="g-4">
        {/* xs=12 (Celular), md=12 (Tablet apilada), lg=5 (PC lado izquierdo) */}
        <Col xs={12} md={12} lg={5}>
          <div className="border rounded p-4 h-100 shadow-sm bg-white">
            <FormularioProducto 
              onGuardar={guardarProducto}
              onActualizar={actualizarProducto}
              productoEditando={productoEditando}
              onCancelarEdicion={() => setProductoEditando(null)}
            />
          </div>
        </Col>

        {/* xs=12 (Celular), md=12 (Tablet apilada), lg=7 (PC lado derecho) */}
        <Col xs={12} md={12} lg={7}>
          <div className="border rounded p-4 h-100 shadow-sm bg-white">
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