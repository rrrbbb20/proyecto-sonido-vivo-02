import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function TarjetaProducto({ producto, carrito, setCarrito }) {
  // 1. Restauramos la lógica para saber si hay stock
  const productoEnCarrito = carrito.find((item) => item.id === producto.id);
  const cantidadEnCarrito = productoEnCarrito ? productoEnCarrito.cantidad : 0;
  const stockDisponible = producto.stock - cantidadEnCarrito;
  const stockAgotado = stockDisponible <= 0;

  // 2. Restauramos la función de comprar
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
    <Card className="h-100 shadow-sm border-0">
      {/* 
        Envolvemos la imagen y los textos en el Link. 
        Al hacer clic en cualquier parte de la foto o el título, irá al detalle.
      */}
      <Link to={`/producto/${producto.id}`} className="text-decoration-none text-dark d-flex flex-column h-100">
        
        {producto.imagen ? (
          <Card.Img 
            variant="top" 
            src={producto.imagen} 
            alt={producto.nombre} 
            style={{ height: '200px', objectFit: 'cover' }}
          />
        ) : (
          <div 
            className="bg-light d-flex align-items-center justify-content-center border-bottom" 
            style={{ height: '200px' }}
          >
            <span className="text-muted text-center px-2">Sin imagen</span>
          </div>
        )}

        <Card.Body className="d-flex flex-column text-center pb-0">
          <Card.Title className="fw-bold fs-5 mb-3">
            {producto.nombre}
          </Card.Title>
          
          <Card.Text className="fs-4 text-primary fw-bold mt-auto mb-3">
            ${producto.precio.toLocaleString("es-CL")}
          </Card.Text>
        </Card.Body>

      </Link>

      {/* 
        El botón de comprar queda AFUERA del Link.
        Usamos Card.Footer para anclarlo siempre al fondo de la tarjeta.
      */}
      <Card.Footer className="bg-white border-0 pt-0 pb-3 px-3">
        <Button
          variant="primary"
          className="w-100 fw-semibold shadow-sm"
          onClick={agregarAlCarrito}
          disabled={stockAgotado}
        >
          {stockAgotado ? "Sin stock" : "Al carrito"}
        </Button>
      </Card.Footer>
    </Card>
  );
}

export default TarjetaProducto;