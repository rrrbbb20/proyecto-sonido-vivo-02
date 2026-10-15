import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { calcularEstadoStock } from "../utils/stock";

import { agregarProductoAlCarrito } from "../utils/carrito";

function TarjetaProducto({ producto, carrito, setCarrito }) {
  const { stockAgotado } = calcularEstadoStock(producto.stock, producto.id, carrito);


  function agregarAlCarrito() {
    // Paso 1: Calculamos y guardamos en una variable temporal
    const nuevoCarrito = agregarProductoAlCarrito(carrito, producto);
  
  // Paso 2: pasamos esa variable 
    setCarrito(nuevoCarrito);
  }

  return (
    <Card className="h-100 shadow-sm border-0">
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