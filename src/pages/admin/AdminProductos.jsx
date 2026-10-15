
import { Container, Row, Col } from "react-bootstrap";
import FormularioProducto from "./FormularioProducto";
import ListaProductos from "./ListaProductos";
import { calcularNuevoId } from "../../utils/inventario";

function AdminProductos({ productos, setProductos }) {
  function guardarProducto(nuevoProducto) {
    const nuevoId = calcularNuevoId(productos);

    setProductos([
      ...productos,
      { ...nuevoProducto, id: nuevoId },
    ]);
  }

  function eliminarProducto(id) {
    setProductos(productos.filter((prod) => prod.id !== id));
  }

  return (
    <Container className="py-4">
      <h1 className="mb-4 text-center text-lg-start">
        Administración de Inventario
      </h1>

      <Row className="g-4">
        <Col xs={12} md={12} lg={5}>
          <div className="border rounded p-4 h-100 shadow-sm bg-white">
            <FormularioProducto onGuardar={guardarProducto} />
          </div>
        </Col>

        <Col xs={12} md={12} lg={7}>
          <div className="border rounded p-4 h-100 shadow-sm bg-white">
            <ListaProductos
              productos={productos}
              onEliminar={eliminarProducto}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminProductos;
