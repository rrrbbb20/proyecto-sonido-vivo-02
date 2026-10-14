// src/pages/admin/FormularioProducto.jsx
import { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";


import { validarProducto } from "../../../utils/validacionesInventarioProducto";

const datosIniciales = {
  nombre: "",
  categoria: "",
  precio: "",
  stock: "",
  imagen: "", 
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
        imagen: productoEditando.imagen || "", // Cargamos la imagen si existe
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
    
    // 1. Usamos tu función ultra robusta para validar los datos
    const nuevosErrores = validarProducto(datos);
    
    // 2. Guardamos los errores para que se pinten de rojo en la pantalla
    setErrores(nuevosErrores);

    // 3. Si hay al menos un error, detenemos el guardado
    if (Object.keys(nuevosErrores).length > 0) return;

    // Obtener el nombre visible de la categoría para el catálogo
    const nombresCategorias = {
      guitarras: "Guitarras eléctricas",
      baterias: "Baterías",
      microfonos: "Micrófonos",
    };

    // 4. Si todo está perfecto, armamos el objeto
    const productoProcesado = {
      nombre: datos.nombre.trim(),
      categoria: datos.categoria,
      categoriaNombre: nombresCategorias[datos.categoria],
      precio: Number(datos.precio),
      stock: Number(datos.stock),
      imagen: datos.imagen.trim(), // Incluimos la imagen procesada
    };

    if (productoEditando) {
      onActualizar({ id: productoEditando.id, ...productoProcesado });
    } else {
      onGuardar(productoProcesado);
    }

    setDatos(datosIniciales);
    setErrores({});
  }

  return (
    <Form onSubmit={enviarFormulario} noValidate>
      <h2 className="h4 mb-3">
        {productoEditando ? "Editar producto" : "Registrar producto"}
      </h2>

      <Row className="g-3">
        <Col xs={12}>
          <Form.Group>
            <Form.Label>Nombre del producto</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={datos.nombre}
              onChange={cambiarCampo}
              isInvalid={Boolean(errores.nombre)}
            />
            <Form.Control.Feedback type="invalid">{errores.nombre}</Form.Control.Feedback>
          </Form.Group>
        </Col>

        {/* campo de entrada para la URL de la imagen */}
        <Col xs={12}>
          <Form.Group>
            <Form.Label>URL de la imagen </Form.Label>
            <Form.Control
              type="text"
              name="imagen"
              placeholder="https://ejemplo.com/imagen.jpg"
              value={datos.imagen}
              onChange={cambiarCampo}
            />
          </Form.Group>
        </Col>

        <Col xs={12} md={4}>
          <Form.Group>
            <Form.Label>Categoría</Form.Label>
            <Form.Select
              name="categoria"
              value={datos.categoria}
              onChange={cambiarCampo}
              isInvalid={Boolean(errores.categoria)}
            >
              <option value="">Seleccionar...</option>
              <option value="guitarras">Guitarras</option>
              <option value="baterias">Baterías</option>
              <option value="microfonos">Micrófonos</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errores.categoria}</Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col xs={12} md={4}>
          <Form.Group>
            <Form.Label>Precio ($)</Form.Label>
            <Form.Control
              type="number"
              name="precio"
              value={datos.precio}
              onChange={cambiarCampo}
              isInvalid={Boolean(errores.precio)}
            />
            <Form.Control.Feedback type="invalid">{errores.precio}</Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col xs={12} md={4}>
          <Form.Group>
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              name="stock"
              value={datos.stock}
              onChange={cambiarCampo}
              isInvalid={Boolean(errores.stock)}
            />
            <Form.Control.Feedback type="invalid">{errores.stock}</Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <div className="d-flex gap-2 flex-wrap mt-4">
        <Button type="submit" variant="primary">
          {productoEditando ? "Guardar cambios" : "Registrar producto"}
        </Button>
        {productoEditando && (
          <Button type="button" variant="secondary" onClick={onCancelarEdicion}>
            Cancelar edición
          </Button>
        )}
      </div>
    </Form>
  );
}

export default FormularioProducto;