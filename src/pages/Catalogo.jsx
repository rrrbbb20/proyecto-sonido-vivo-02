import { useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { agregarProductoAlCarrito } from "../utils/carrito";

function Catalogo({ productos, carrito, setCarrito }) {
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("");
  const [mensaje, setMensaje] = useState("");

  const productosFiltrados = productos.filter((producto) => {
    const coincideBusqueda = producto.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());
    const coincideCategoria =
      categoria === "" ||
      producto.categoria?.toLowerCase() === categoria.toLowerCase();
    return coincideBusqueda && coincideCategoria;
  });

  function limpiarFiltros() {
    setBusqueda("");
    setCategoria("");
  }

  function agregarAlCarrito(producto) {
    const carritoActualizado = agregarProductoAlCarrito(carrito, producto);

    if (carritoActualizado === carrito) {
      setMensaje(`No hay más stock disponible de ${producto.nombre}.`);
      return;
    }

    setCarrito(carritoActualizado);
    setMensaje(`${producto.nombre} fue agregado al carrito.`);
  }

  return (
    <Container className="py-4">
      <h1 className="mb-3">Catálogo</h1>
      <p className="mb-4">Explora nuestros instrumentos musicales y equipos de audio.</p>

      {mensaje !== "" && (
        <div className="border rounded p-3 mb-4">
          <p className="fw-bold mb-0">{mensaje}</p>
        </div>
      )}

      <Form className="border rounded p-3 mb-4">
        <Row className="g-3">
          <Col xs={12} md={6}>
            <Form.Label>Buscar producto</Form.Label>
            <Form.Control
              type="text"
              placeholder="Buscar productos..."
              value={busqueda}
              onChange={(evento) => setBusqueda(evento.target.value)}
            />
          </Col>

          <Col xs={12} md={4}>
            <Form.Label>Categoría</Form.Label>
            <Form.Select
              value={categoria}
              onChange={(evento) => setCategoria(evento.target.value)}
            >
              <option value="">Todas las categorías</option>
              <option value="Guitarras">Guitarras</option>
              <option value="Baterías">Baterías</option>
              <option value="Micrófonos">Micrófonos</option>
              <option value="Audio">Audio</option>
            </Form.Select>
          </Col>

          <Col xs={12} md={2} className="d-flex align-items-end">
            <Button variant="outline-secondary" className="w-100" onClick={limpiarFiltros}>
              Limpiar
            </Button>
          </Col>
        </Row>
      </Form>

      <h2 className="mb-3">Productos</h2>

      {productosFiltrados.length === 0 ? (
        <div className="border rounded p-4 text-center">
          <p className="mb-3">No se encontraron productos con los filtros seleccionados.</p>

          <Button variant="outline-primary" onClick={limpiarFiltros}>
            Mostrar todos
          </Button>
        </div>
      ) : (
        <Row className="g-4">
          {productosFiltrados.map((producto) => {
            const productoEnCarrito = carrito.find((item) => item.id === producto.id);
            const cantidadEnCarrito = productoEnCarrito ? productoEnCarrito.cantidad : 0;
            const stockDisponible = producto.stock - cantidadEnCarrito;
            const stockAgotado = stockDisponible === 0;

            return (
              <Col key={producto.id} xs={12} md={6} lg={4}>
                <div className="border rounded p-3 h-100 d-flex flex-column">
                  <h3 className="h5">{producto.nombre}</h3>
                  <p className="mb-2">Categoría: {producto.categoria}</p>
                  <p className="mb-2">Stock disponible: {stockDisponible}</p>
                  <p className="fw-bold mb-4">
                    Precio: ${producto.precio.toLocaleString("es-CL")}
                  </p>

                  <Button
                    variant="primary"
                    className="w-100 mt-auto"
                    onClick={() => agregarAlCarrito(producto)}
                    disabled={stockAgotado}
                  >
                    {stockAgotado ? "Sin stock disponible" : "Agregar al carrito"}
                  </Button>
                </div>
              </Col>
            );
          })}
        </Row>
      )}
    </Container>
  );
}

export default Catalogo;