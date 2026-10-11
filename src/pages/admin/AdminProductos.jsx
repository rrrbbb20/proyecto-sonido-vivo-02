import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import FormularioProducto from "./FormularioProducto";
import ListaProductos from "./ListaProductos";

function AdminProductos({ productos, setProductos }) {
  const [productoEditando, setProductoEditando] = useState(null);