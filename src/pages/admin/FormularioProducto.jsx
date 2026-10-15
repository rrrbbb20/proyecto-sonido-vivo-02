
import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { validarProducto } from "../../utils/validacionesInventarioProducto";

const datosIniciales = {
  nombre: "",
  categoria: "",
  precio: "",
  stock: "",
  imagen: "",
};

function FormularioProducto({ onGuardar }) {
  const [datos, setDatos] = useState(datosIniciales);
  const [errores, setErrores] = useState({});

  function cambiarCampo(evento) {
    const { name, value } = evento.target;

    setDatos((datosAnteriores) => ({
      ...datosAnteriores,
      [name]: value,
    }));
  }

  function enviarFormulario(evento) {
    evento.preventDefault();

    const nuevosErrores = validarProducto(datos);
    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) {
      return;
    }

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
      imagen: datos.imagen.trim(),
    };

    onGuardar(productoProcesado);

    setDatos({ ...datosIniciales });
    setErrores({});
  }

  return (
    <Form onSubmit={enviarFormulario} noValidate>
      <h2 className="h4 mb-3">Registrar producto</h2>

      <Row className="g-3">
        <Col xs={12}>
          <Form.Group>
            <Form.Label htmlFor="nombre">
              Nombre del producto
            </Form.Label>

            <Form.Control
              id="nombre"
              type="text"
              name="nombre"
              value={datos.nombre}
              onChange={cambiarCampo}
              isInvalid={Boolean(errores.nombre)}
            />

            <Form.Control.Feedback type="invalid">
              {errores.nombre}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col xs={12}>
          <Form.Group>
            <Form.Label htmlFor="imagen">
              URL de la imagen
            </Form.Label>

            <Form.Control
              id="imagen"
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
            <Form.Label htmlFor="categoria">
              Categoría
            </Form.Label>

            <Form.Select
              id="categoria"
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

            <Form.Control.Feedback type="invalid">
              {errores.categoria}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col xs={12} md={4}>
          <Form.Group>
            <Form.Label htmlFor="precio">Precio ($)</Form.Label>

            <Form.Control
              id="precio"
              type="number"
              name="precio"
              value={datos.precio}
              onChange={cambiarCampo}
              isInvalid={Boolean(errores.precio)}
            />

            <Form.Control.Feedback type="invalid">
              {errores.precio}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col xs={12} md={4}>
          <Form.Group>
            <Form.Label htmlFor="stock">Stock</Form.Label>

            <Form.Control
              id="stock"
              type="number"
              name="stock"
              value={datos.stock}
              onChange={cambiarCampo}
              isInvalid={Boolean(errores.stock)}
            />

            <Form.Control.Feedback type="invalid">
              {errores.stock}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <div className="d-flex gap-2 flex-wrap mt-4">
        <Button type="submit" variant="primary">
          Registrar producto
        </Button>
      </div>
    </Form>
  );
}

export default FormularioProducto;
