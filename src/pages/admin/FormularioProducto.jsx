import { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const datosIniciales = {
  nombre: "",
  categoria: "",
  precio: "",
  stock: "",
};
function FormularioProducto({ onGuardar, onActualizar, productoEditando, onCancelarEdicion }) {
  const [datos, setDatos] = useState(datosIniciales);
  const [errores, setErrores] = useState({});

  useEffect(() => {
    if (productoEditando) {
      setDatos({
        nombre: productoEditando.nombre,
        categoria: productoEditando.categoria,
        precio: productoEditando.precio,
        stock: productoEditando.stock,
      });
    } else {
      setDatos(datosIniciales);
    }
    setErrores({});
  }, [productoEditando]);

  function cambiarCampo(evento) {
    const { name, value } = evento.target;
    setDatos({ ...datos, [name]: value });
  }

  function enviarFormulario(evento) {
    evento.preventDefault();
    const nuevosErrores = {};