// Archivo: src/pages/DetalleProducto.jsx
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";

function DetalleProducto({ productos, carrito, setCarrito }) {
  // Extraemos el ID dinámico de la ruta
  const { id } = useParams();
  
  // Buscamos la información en el estado central
  const producto = productos.find((p) => p.id === Number(id));

  // Manejo de error si la URL ingresada no coincide con un producto válido
  if (!producto) {
    return (
      <Container className="py-5 text-center">
        <h2>Producto no encontrado</h2>
        <p className="text-muted">El artículo que buscas no existe o fue eliminado.</p>
        <Link to="/catalogo" className="btn btn-primary mt-3">Volver al catálogo</Link>
      </Container>
    );
  }

  // Protección contra sobreventas de stock
  const productoEnCarrito = carrito.find((item) => item.id === producto.id);
  const cantidadEnCarrito = productoEnCarrito ? productoEnCarrito.cantidad : 0;
  const stockDisponible = producto.stock - cantidadEnCarrito;
  const stockAgotado = stockDisponible <= 0;

  function agregarAlCarrito() {
    if (stockAgotado) return;
    
    if (productoEnCarrito) {
      setCarrito(carrito.map((item) =>
        item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
      ));
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  }

  return (
    <Container className="py-5">
      <Link to="/catalogo" className="text-decoration-none mb-4 d-inline-block fw-semibold">
        &larr; Volver al catálogo
      </Link>
      
      <Row className="g-5 align-items-center">
        
        {/* COLUMNA IZQUIERDA: LÓGICA DE IMAGEN CON FALLBACK */}
        <Col md={6}>
          {producto.imagen ? (
            <img 
              src={producto.imagen} 
              alt={`Imagen de ${producto.nombre}`} 
              className="img-fluid rounded shadow-sm w-100" 
              style={{ objectFit: 'cover', maxHeight: '500px' }}
            />
          ) : (
            <div 
              className="bg-light d-flex align-items-center justify-content-center border rounded shadow-sm" 
              style={{ height: '500px' }}
            >
              <span className="text-muted fs-4">Sin imagen disponible</span>
            </div>
          )}
        </Col>
        
        {/* COLUMNA DERECHA: INFORMACIÓN Y ACCIONES */}
        <Col md={6} className="d-flex flex-column">
          {/* Badge nativo para la categoría */}
          <Badge bg="secondary" className="align-self-start mb-3 fs-6 text-uppercase px-2 py-1">
            {producto.categoriaNombre || producto.categoria}
          </Badge>
          
          <h1 className="mb-2 fw-bold display-5">{producto.nombre}</h1>
          <p className="text-muted mb-4 fs-5">
            {producto.descripcion || "Descripción detallada del instrumento musical y sus características principales."}
          </p>
          
          {/* Formato de precio en línea */}
          <h2 className="text-primary mb-4 display-6 fw-bold">
            ${producto.precio.toLocaleString("es-CL")}
          </h2>
          
          <div className="bg-light p-3 rounded mb-4 border">
            <p className="mb-0 fs-5">
              Stock disponible: <strong className={stockAgotado ? "text-danger" : "text-success"}>{stockDisponible}</strong> unidades
            </p>
          </div>
          
          <Button 
            variant="primary" 
            size="lg" 
            onClick={agregarAlCarrito} 
            disabled={stockAgotado}
            className="w-100 fw-bold py-3 shadow-sm"
          >
            {stockAgotado ? "Sin stock disponible" : "Agregar al carrito"}
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default DetalleProducto;