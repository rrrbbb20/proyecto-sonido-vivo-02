import { useState } from "react";
import { Alert, Button, Container, Form, Spinner } from "react-bootstrap";
import { enviarMensajeContacto } from "../services/contactoService";

function Contacto() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [exito, setExito] = useState("");
  const [error, setError] = useState("");

  async function enviarMensaje(evento) {
    evento.preventDefault();
    setEnviando(true);
    setExito("");
    setError("");

    try {
      await enviarMensajeContacto({ nombre, correo, mensaje });
      setExito("¡Mensaje enviado! Te responderemos pronto.");
      setNombre("");
      setCorreo("");
      setMensaje("");
    } catch (e) {
      setError(e.message || "No se pudo enviar el mensaje. Intenta nuevamente.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <Container className="py-4" style={{ maxWidth: "650px" }}>
      <h1>Contacto</h1>
      <p>¿Tienes dudas? Escríbenos y nos pondremos en contacto contigo.</p>

      {exito && <Alert variant="success">{exito}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={enviarMensaje}>
        <Form.Group className="mb-3" controlId="contactoNombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Tu nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            maxLength={100}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="contactoCorreo">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control
            type="email"
            placeholder="tu@correo.com"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            maxLength={150}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="contactoMensaje">
          <Form.Label>Mensaje</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Escribe tu consulta aquí..."
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            maxLength={1000}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={enviando}>
          {enviando ? (
            <>
              <Spinner size="sm" animation="border" className="me-2" />
              Enviando...
            </>
          ) : (
            "Enviar mensaje"
          )}
        </Button>
      </Form>
    </Container>
  );
}

export default Contacto;