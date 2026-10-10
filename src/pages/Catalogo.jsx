import { useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { productos } from "../data/productos";

function Catalogo() {
  // Estado para guardar el texto escrito en el buscador
  const [busqueda, setBusqueda] = useState("");

  // Estado para guardar la categoría seleccionada
  const [categoria, setCategoria] = useState("");

  // Estado para mostrar mensajes al agregar productos
  const [mensaje, setMensaje] = useState("");

  // Filtra los productos según búsqueda y categoría
  const productosFiltrados = productos.filter((producto) => {
    const coincideBusqueda = producto.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());

    const coincideCategoria =
      categoria === "" ||
      producto.categoria === categoria;

    return coincideBusqueda && coincideCategoria;
  });

  // Agrega un producto al carrito guardado en localStorage
  function agregarAlCarrito(producto) {
    const carritoGuardado =
      localStorage.getItem("carritoSonidoVivo");

    const carrito = carritoGuardado
      ? JSON.parse(carritoGuardado)
      : [];

    // Busca si el producto ya se encuentra en el carrito
    const productoExistente = carrito.find(
      (item) => item.id === producto.id
    );

    // Evita superar el stock disponible
    if (
      productoExistente &&
      productoExistente.cantidad >= producto.stock
    ) {
      setMensaje(
        `No hay más stock disponible de ${producto.nombre}.`
      );

      return;
    }

    let carritoActualizado;

    // Si ya existe, aumenta solamente su cantidad
    if (productoExistente) {
      carritoActualizado = carrito.map((item) => {
        if (item.id === producto.id) {
          return {
            ...item,
            cantidad: item.cantidad + 1,
          };
        }

        return item;
      });
    } else {
      // Si no existe, agrega el producto con cantidad inicial uno
      carritoActualizado = [
        ...carrito,
        {
          ...producto,
          cantidad: 1,
        },
      ];
    }

    // Guarda el carrito actualizado
    localStorage.setItem(
      "carritoSonidoVivo",
      JSON.stringify(carritoActualizado)
    );

    // Informa el resultado al usuario
    setMensaje(
      `${producto.nombre} fue agregado al carrito.`
    );
  }

  return (
    <Container className="py-4">
      <h1 className="mb-4">
        Catálogo
      </h1>

      <p className="mb-4">
        Explora nuestros instrumentos musicales y equipos de audio.
      </p>

      {/* Muestra el último mensaje generado */}
      {mensaje !== "" && (
        <p className="fw-bold">
          {mensaje}
        </p>
      )}

      <Form className="mb-4">
        <Row className="g-3">
          <Col xs={12} md={8}>
            <Form.Control
              type="text"
              placeholder="Buscar productos..."
              value={busqueda}
              onChange={(evento) =>
                setBusqueda(evento.target.value)
              }
            />
          </Col>

          <Col xs={12} md={4}>
            <Form.Select
              value={categoria}
              onChange={(evento) =>
                setCategoria(evento.target.value)
              }
            >
              <option value="">
                Todas las categorías
              </option>

              <option value="guitarras">
                Guitarras
              </option>

              <option value="baterias">
                Baterías
              </option>

              <option value="microfonos">
                Micrófonos
              </option>
            </Form.Select>
          </Col>
        </Row>
      </Form>

      <h2 className="mb-3">
        Productos
      </h2>

      <Row className="g-4">
        {/* Genera una tarjeta por cada producto filtrado */}
        {productosFiltrados.map((producto) => (
          <Col
            key={producto.id}
            xs={12}
            md={6}
            lg={4}
          >
            <div className="border rounded p-3 h-100">
              <h3 className="h5">
                {producto.nombre}
              </h3>

              <p>
                {producto.categoriaNombre}
              </p>

              <p>
                Stock: {producto.stock}
              </p>

              <p>
                ${producto.precio}
              </p>

              <Button
                variant="primary"
                onClick={() =>
                  agregarAlCarrito(producto)
                }
              >
                Agregar al carrito
              </Button>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Catalogo;