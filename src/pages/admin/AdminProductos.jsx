import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import FormularioProducto from "./FormularioProducto";
import ListaProductos from "./ListaProductos";

function AdminProductos({ productos, setProductos }) {
  const [productoEditando, setProductoEditando] = useState(null);
  
function guardarProducto(nuevoProducto) {
    let nuevoId = 1;
    for (const prod of productos) {
      if (prod.id >= nuevoId) nuevoId = prod.id + 1;
    }
    
    setProductos([...productos, { ...nuevoProducto, id: nuevoId }]);
  }

  function editarProducto(producto) {
    setProductoEditando(producto);
  }

  function actualizarProducto(productoActualizado) {
    const productosActualizados = productos.map((prod) => 
      prod.id === productoActualizado.id ? productoActualizado : prod
    );
    setProductos(productosActualizados);
    setProductoEditando(null);
  }

  function eliminarProducto(id) {
    setProductos(productos.filter((prod) => prod.id !== id));
    if (productoEditando && productoEditando.id === id) {
      setProductoEditando(null);
    }
  }