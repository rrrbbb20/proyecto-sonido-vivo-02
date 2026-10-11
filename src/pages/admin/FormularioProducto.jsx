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
if (datos.nombre.trim().length < 3) {
      nuevosErrores.nombre = "El nombre debe tener al menos 3 caracteres.";
    }

    if (!datos.categoria) {
      nuevosErrores.categoria = "Selecciona una categoría.";
    }

    if (datos.precio === "" || Number(datos.precio) < 0) {
      nuevosErrores.precio = "El precio debe ser un número positivo.";
    }

    if (datos.stock === "" || Number(datos.stock) < 0) {
      nuevosErrores.stock = "El stock no puede ser negativo.";
    }

    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) return;