import { useState } from "react";
import { Container, Form, Row, Col } from "react-bootstrap";

// Productos disponibles en el catálogo
const productos = [
  {
    id: 1,
    nombre: "Guitarra Eléctrica Epiphone SG Standard",
    categoria: "guitarras",
    categoriaNombre: "Guitarras eléctricas",
    precio: 319990,
    stock: 3,
  },
  {
    id: 2,
    nombre: "Batería Acústica Pearl Roadshow",
    categoria: "baterias",
    categoriaNombre: "Baterías",
    precio: 599990,
    stock: 2,
  },
  {
    id: 3,
    nombre: "Micrófono Condensador Audio-Tech AT2020",
    categoria: "microfonos",
    categoriaNombre: "Micrófonos",
    precio: 199990,
    stock: 4,
  },
];

function Catalogo() {

  // Estado para guardar el texto escrito en el buscador
  const [busqueda, setBusqueda] = useState("");

  // Estado para guardar la categoría seleccionada
  const [categoria, setCategoria] = useState("");

  // Filtra los productos según el texto y la categoría seleccionada
  const productosFiltrados = productos.filter((producto) => {
    const coincideBusqueda = producto.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());

    const coincideCategoria =
      categoria === "" || producto.categoria === categoria;

    return coincideBusqueda && coincideCategoria;
  });

  return (
    <Container className="py-4">
      <h1 className="mb-4">Catálogo</h1>

      <p className="mb-4">
        Explora nuestros instrumentos musicales y equipos de audio.
      </p>

      <Form className="mb-4">
        <Row className="g-3">
          <Col xs={12} md={8}>
            <Form.Control
              type="text"
              placeholder="Buscar productos..."
              value={busqueda}
              onChange={(evento) => setBusqueda(evento.target.value)}
            />
          </Col>

          <Col xs={12} md={4}>
            <Form.Select
              value={categoria}
              onChange={(evento) => setCategoria(evento.target.value)}
            >
              <option value="">Todas las categorías</option>
              <option value="guitarras">Guitarras</option>
              <option value="baterias">Baterías</option>
              <option value="microfonos">Micrófonos</option>
            </Form.Select>
          </Col>
        </Row>
      </Form>

      <h2 className="mb-3">Productos</h2>

      <Row className="g-4">
        {/* Se recorre el arreglo para mostrar todos los productos */}
        {productosFiltrados.map((producto) => (
          <Col key={producto.id} xs={12} md={6} lg={4}>
            <div className="border rounded p-3 h-100">
              <h3 className="h5">{producto.nombre}</h3>

              <p>{producto.categoriaNombre}</p>

              <p>Stock: {producto.stock}</p>

              <p>${producto.precio}</p>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Catalogo;