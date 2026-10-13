import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import TarjetaProducto from "../components/TarjetaProducto";
function Inicio({ productos, carrito, setCarrito }) {
  return (
    <Container className="py-4">
      {/* Presentación principal de la tienda */}
      <section className="text-center py-5">
        <h1 className="display-5 fw-bold mb-3">
          Sonido Vivo
        </h1>

        <p className="lead mb-4">
          Instrumentos musicales y equipos de audio para músicos,
          estudiantes y amantes de la música.
        </p>

        {/* Navegación hacia las principales acciones de la tienda */}
        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <Link
            to="/catalogo"
            className="btn btn-primary"
          >
            Ver catálogo
          </Link>

          <Link
            to="/registro"
            className="btn btn-outline-primary"
          >
            Crear cuenta
          </Link>
        </div>
      </section>

      {/* Información general de las categorías disponibles */}
      <section className="py-4">
        <h2 className="text-center mb-4">
          Encuentra lo que necesitas
        </h2>

        <Row className="g-4">
          <Col xs={12} md={4}>
            <div className="border rounded p-4 h-100 text-center">
              <h3 className="h5">
                Instrumentos
              </h3>

              <p className="mb-0">
                Encuentra instrumentos para comenzar,
                practicar o mejorar tu equipo.
              </p>
            </div>
          </Col>

          <Col xs={12} md={4}>
            <div className="border rounded p-4 h-100 text-center">
              <h3 className="h5">
                Audio
              </h3>

              <p className="mb-0">
                Equipos y accesorios para grabación,
                sonido y producción musical.
              </p>
            </div>
          </Col>

          <Col xs={12} md={4}>
            <div className="border rounded p-4 h-100 text-center">
              <h3 className="h5">
                Compra simple
              </h3>

              <p className="mb-0">
                Revisa nuestro catálogo, agrega productos
                al carrito y continúa con tu compra.
              </p>
            </div>
          </Col>
        </Row>
      </section>

      {/* SECCIÓN DE PRODUCTOS RECOMENDADOS */}
      <section className="py-5 mt-4 border-top">
        <h2 className="text-center mb-4 fw-bold">
          Productos Destacados
        </h2>
        
        <Row className="g-4">
          {/* Ciclo para mostrar los primeros 3 productos con grilla responsiva */}
          {productos.slice(0, 3).map((producto) => (
            <Col key={producto.id} xs={12} md={6} lg={4}>
              <TarjetaProducto 
                producto={producto} 
                carrito={carrito} 
                setCarrito={setCarrito} 
              />
            </Col>
          ))}
        </Row>
      </section>
    </Container>
  );
}

export default Inicio;