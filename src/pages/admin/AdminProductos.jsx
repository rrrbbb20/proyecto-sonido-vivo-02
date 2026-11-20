import { useState } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import FormularioProducto from "./FormularioProducto";
import ListaProductos from "./ListaProductos";
import {
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from "../../services/productoService";

function AdminProductos({ productos, setProductos, sesion }) {
  const [productoEditando, setProductoEditando] = useState(null);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");

  const esAdministrador = sesion?.rol === "ADMINISTRADOR";

  async function handleGuardar(nuevoProducto) {
    try {
      setGuardando(true);
      setError("");
      setExito("");
      const creado = await crearProducto(nuevoProducto);
      setProductos((prev) => [...prev, creado]);
      setExito("Producto registrado correctamente.");
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setGuardando(false);
    }
  }

  async function handleActualizar(id, datosActualizados) {
    try {
      setGuardando(true);
      setError("");
      setExito("");
      const actualizado = await actualizarProducto(id, datosActualizados);
      setProductos((prev) =>
        prev.map((prod) => (prod.id === id ? actualizado : prod))
      );
      setProductoEditando(null);
      setExito("Producto actualizado correctamente.");
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setGuardando(false);
    }
  }

  async function handleEliminar(id) {
    if (!window.confirm("¿Eliminar este producto del inventario?")) return;
    try {
      setError("");
      setExito("");
      await eliminarProducto(id);
      setProductos((prev) => prev.filter((prod) => prod.id !== id));
      if (productoEditando?.id === id) {
        setProductoEditando(null);
      }
      setExito("Producto eliminado correctamente.");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Administración de Inventario</h1>
        <Link to="/admin/panel" className="btn btn-outline-secondary">
          &larr; Volver al panel
        </Link>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}
      {exito && <Alert variant="success">{exito}</Alert>}

      <Row className="g-4">
        <Col xs={12} lg={5}>
          <div className="border rounded p-4 h-100 shadow-sm bg-white">
            <FormularioProducto
              onGuardar={handleGuardar}
              onActualizar={handleActualizar}
              productoEditando={productoEditando}
              onCancelarEdicion={() => setProductoEditando(null)}
              guardando={guardando}
            />
          </div>
        </Col>

        <Col xs={12} lg={7}>
          <div className="border rounded p-4 h-100 shadow-sm bg-white">
            <ListaProductos
              productos={productos}
              onEditar={setProductoEditando}
              onEliminar={handleEliminar}
              esAdministrador={esAdministrador}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminProductos;