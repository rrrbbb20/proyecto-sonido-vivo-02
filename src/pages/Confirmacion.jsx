import { Container, Form, Button, Alert, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";

function Confirmacion({ vaciarCarrito }) {
  const [pedidoConfirmado, setPedidoConfirmado] = useState(false);

  // 1. Creamos un estado para guardar todo lo que el usuario escriba
  const [datosEnvio, setDatosEnvio] = useState({
    nombre: "",
    direccion: "",
    region: "",
    comuna: ""
  });

  // Lista básica de regiones para mostrar en el menú desplegable
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
    "Región de Magallanes y de la Antártica Chilena"
  ];

  // 2. Esta función actualiza el estado automáticamente cada vez que se teclea algo
  function manejarCambio(evento) {
    const { name, value } = evento.target;
    // Copia los datos actuales y actualiza solo el campo que se está modificando
    setDatosEnvio({ ...datosEnvio, [name]: value });
  }

  // 3. Esta función se ejecuta al hacer clic en "Confirmar pedido"
  function manejarConfirmacion(evento) {
    evento.preventDefault();
    
    // Guardamos los datos en el LocalStorage del navegador
    localStorage.setItem("datosEnvio", JSON.stringify(datosEnvio));
    
    setPedidoConfirmado(true);
    if (vaciarCarrito) {
      vaciarCarrito();
    }
  }

  if (pedidoConfirmado) {
    return (
      <Container className="py-5 text-center">
        <Alert variant="success">
          <h2>¡Pedido confirmado exitosamente!</h2>
          <p>Tus datos de envío han sido guardados.</p>
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
      
      <Form onSubmit={manejarConfirmacion}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre completo</Form.Label>
          <Form.Control 
            type="text" 
            name="nombre" 
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
            placeholder="Ej: Av. Siempreviva 742" 
            onChange={manejarCambio} 
            required 
          />
        </Form.Group>

        {/* Usamos Row y Col de Bootstrap para poner Región y Comuna uno al lado del otro en pantallas grandes */}
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Región</Form.Label>
              <Form.Select name="region" onChange={manejarCambio} required>
                <option value="">Selecciona tu región...</option>
                {/* Recorremos el arreglo de regiones para crear las opciones */}
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
                placeholder="Ej: La Florida" 
                onChange={manejarCambio} 
                required 
              />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="success" type="submit" className="w-100 mt-3">
          Confirmar pedido
        </Button>
      </Form>
    </Container>
  );
}

export default Confirmacion;