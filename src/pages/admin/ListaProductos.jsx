import { Row, Col, Button } from "react-bootstrap";

function ListaProductos({ productos, onEditar, onEliminar }) {
  if (productos.length === 0) {
    return <p>No hay productos registrados en el inventario.</p>;
  }