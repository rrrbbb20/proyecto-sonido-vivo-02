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
    // Obtener el nombre visible de la categoría para el catálogo
    const nombresCategorias = {
      guitarras: "Guitarras eléctricas",
      baterias: "Baterías",
      microfonos: "Micrófonos",
    };

    const productoProcesado = {
      nombre: datos.nombre.trim(),
      categoria: datos.categoria,
      categoriaNombre: nombresCategorias[datos.categoria],
      precio: Number(datos.precio),
      stock: Number(datos.stock),
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