import { useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { productos } from "../data/productos";

function Catalogo({ onCarritoActualizado }) {
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

  // Agrega un producto al carrito respetando el stock disponible
  function agregarAlCarrito(producto) {
    const carritoGuardado = localStorage.getItem("carritoSonidoVivo");
    const carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];
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

    localStorage.setItem("carritoSonidoVivo", JSON.stringify(carritoActualizado));
    onCarritoActualizado(carritoActualizado);
    setMensaje(`${producto.nombre} fue agregado al carrito.`);
  }

  return (
    <Container className="py-4">
      <h1 className="mb-4">Catálogo</h1>

      <p className="mb-4">
        Explora nuestros instrumentos musicales y equipos de audio.
      </p>

      {mensaje !== "" && <p className="fw-bold">{mensaje}</p>}

      <Form className="mb-4">
        <Row className="g-3">
          <Col xs={12} md={6}>
            <Form.Control
              type="text"
              placeholder="Buscar productos..."
              value={busqueda}
              onChange={(evento) => setBusqueda(evento.target.value)}
            />
          </Col>

          <Col xs={12} md={4}>
            <Form.Select value={categoria} onChange={(evento) => setCategoria(evento.target.value)}>
              <option value="">Todas las categorías</option>
              <option value="guitarras">Guitarras</option>
              <option value="baterias">Baterías</option>
              <option value="microfonos">Micrófonos</option>
            </Form.Select>
          </Col>

          <Col xs={12} md={2}>
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
              <div className="border rounded p-3 h-100">
                <h3 className="h5">{producto.nombre}</h3>
                <p>{producto.categoriaNombre}</p>
                <p>Stock: {producto.stock}</p>
                <p>${producto.precio}</p>

                <Button variant="primary" onClick={() => agregarAlCarrito(producto)}>
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