import { Container, Form, Button, Alert, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import { descontarStock, listarProductos } from "../services/productoService";

function Confirmacion({ carrito, setCarrito, setProductos, sesion }) {
  const [pedidoConfirmado, setPedidoConfirmado] = useState(false);
  const [procesando, setProcesando] = useState(false);
  const [errorServidor, setErrorServidor] = useState("");

  const [datosEnvio, setDatosEnvio] = useState({
    nombre: sesion?.nombre ? `${sesion.nombre} ${sesion.apellido || ""}`.trim() : "",
    direccion: "",
    region: "",
    comuna: "",
  });

  const regionesChile = [
    "Región de Arica y Parinacota",
    "Región de Tarapacá",
    "Región de Antofagasta",
    "Región de Atacama",
    "Región de Coquimbo",
    "Región de Valparaíso",
    "Región Metropolitana de Santiago",
    "Región del Libertador Gral. Bernardo O'Higgins",
    "Región del Maule",
    "Región de Ñuble",
    "Región del Biobío",
    "Región de La Araucanía",
    "Región de Los Ríos",
    "Región de Los Lagos",
    "Región de Aysén del Gral. Carlos Ibáñez del Campo",
    "Región de Magallanes y de la Antártica Chilena",
  ];

  function manejarCambio(evento) {
    const { name, value } = evento.target;
    setDatosEnvio({ ...datosEnvio, [name]: value });
  }

  async function manejarConfirmacion(evento) {
    evento.preventDefault();
    setErrorServidor("");

    if (!sesion?.token) {
      setErrorServidor("Debes iniciar sesión antes de confirmar tu compra.");
      return;
    }

    if (!carrito || carrito.length === 0) {
      setErrorServidor("Tu carrito está vacío.");
      return;
    }

    try {
      setProcesando(true);

      for (const item of carrito) {
        await descontarStock(item.id, item.cantidad);
      }

      const inventarioActualizado = await listarProductos();
      if (setProductos && Array.isArray(inventarioActualizado)) {
        setProductos(inventarioActualizado);
      }

      localStorage.setItem("datosEnvio", JSON.stringify(datosEnvio));

      if (setCarrito) {
        setCarrito([]);
      }

      setPedidoConfirmado(true);
    } catch (error) {
      setErrorServidor(error.message);
    } finally {
      setProcesando(false);
    }
  }

  if (pedidoConfirmado) {
    return (
      <Container className="py-5 text-center">
        <Alert variant="success">
          <h2>¡Pedido confirmado exitosamente!</h2>
          <p className="mb-0">
            El stock ha sido descontado del inventario y tus datos de envío fueron guardados.
          </p>
        </Alert>
        <Link to="/catalogo" className="btn btn-primary mt-3">
          Volver al catálogo
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h1>Detalles de envío</h1>
      <p>Ingresa tus datos para finalizar la compra.</p>

      {!sesion?.token && (
        <Alert variant="warning">
          Para confirmar tu pedido debes{" "}
          <Link to="/login" className="alert-link">
            iniciar sesión
          </Link>{" "}
          o{" "}
          <Link to="/registro" className="alert-link">
            crear una cuenta
          </Link>
          .
        </Alert>
      )}

      {errorServidor && <Alert variant="danger">{errorServidor}</Alert>}

      <Form onSubmit={manejarConfirmacion}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre completo</Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            value={datosEnvio.nombre}
            placeholder="Ej: Juan Pérez"
            onChange={manejarCambio}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Dirección de entrega (Calle y número)</Form.Label>
          <Form.Control
            type="text"
            name="direccion"
            value={datosEnvio.direccion}
            placeholder="Ej: Av. Siempreviva 742"
            onChange={manejarCambio}
            required
          />
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Región</Form.Label>
              <Form.Select
                name="region"
                value={datosEnvio.region}
                onChange={manejarCambio}
                required
              >
                <option value="">Selecciona tu región...</option>
                {regionesChile.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Comuna</Form.Label>
              <Form.Control
                type="text"
                name="comuna"
                value={datosEnvio.comuna}
                placeholder="Ej: La Florida"
                onChange={manejarCambio}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Button
          variant="success"
          type="submit"
          className="w-100 mt-3"
          disabled={procesando || !sesion?.token || carrito.length === 0}
        >
          {procesando ? "Procesando pedido..." : "Confirmar pedido"}
        </Button>
      </Form>
    </Container>
  );
}

export default Confirmacion;