import { useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { productos } from "../data/productos";

function Catalogo({ carrito, setCarrito }) {
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("");
  const [mensaje, setMensaje] = useState("");

  // Filtra los productos según búsqueda y categoría
  const productosFiltrados = productos.filter((producto) => {
    const coincideBusqueda = producto.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria = categoria === "" || producto.categoria === categoria;

    return coincideBusqueda && coincideCategoria;
  });

  // Restablece la búsqueda y categoría seleccionada
  function limpiarFiltros() {
    setBusqueda("");
    setCategoria("");
  }

  // Agrega un producto respetando el stock disponible
  function agregarAlCarrito(producto) {
    const productoExistente = carrito.find((item) => item.id === producto.id);

    if (productoExistente && productoExistente.cantidad >= producto.stock) {
      setMensaje(`No hay más stock disponible de ${producto.nombre}.`);
      return;
    }

    let carritoActualizado;

    if (productoExistente) {
      carritoActualizado = carrito.map((item) => {
        if (item.id === producto.id) {
          return { ...item, cantidad: item.cantidad + 1 };
        }

        return item;
      });
    } else {
      carritoActualizado = [...carrito, { ...producto, cantidad: 1 }];
    }

    // Actualiza el estado compartido del carrito
    setCarrito(carritoActualizado);
    setMensaje(`${producto.nombre} fue agregado al carrito.`);
  }

  return (
    <Container className="py-4">
      <h1 className="mb-3">Catálogo</h1>

      <p className="mb-4">
        Explora nuestros instrumentos musicales y equipos de audio.
      </p>

      {/* Muestra el resultado de la última acción realizada */}
      {mensaje !== "" && (
        <div className="border rounded p-3 mb-4">
          <p className="fw-bold mb-0">{mensaje}</p>
        </div>
      )}

      {/* Controles de búsqueda y filtrado */}
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

            <Form.Select value={categoria} onChange={(evento) => setCategoria(evento.target.value)}>
              <option value="">Todas las categorías</option>
              <option value="guitarras">Guitarras</option>
              <option value="baterias">Baterías</option>
              <option value="microfonos">Micrófonos</option>
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

      {/* Informa cuando ningún producto coincide con los filtros */}
      {productosFiltrados.length === 0 ? (
        <div className="border rounded p-4 text-center">
          <p className="mb-3">No se encontraron productos con los filtros seleccionados.</p>

          <Button variant="outline-primary" onClick={limpiarFiltros}>
            Mostrar todos
          </Button>
        </div>
      ) : (
        <Row className="g-4">
          {productosFiltrados.map((producto) => (
            <Col key={producto.id} xs={12} md={6} lg={4}>
              <div className="border rounded p-3 h-100 d-flex flex-column">
                <h3 className="h5">{producto.nombre}</h3>
                <p className="mb-2">Categoría: {producto.categoriaNombre}</p>
                <p className="mb-2">Stock disponible: {producto.stock}</p>
                <p className="fw-bold mb-4">Precio: ${producto.precio}</p>

                <Button variant="primary" className="w-100 mt-auto" onClick={() => agregarAlCarrito(producto)}>
                  Agregar al carrito
                </Button>
              </div>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Catalogo;