import { Container, Form, Button } from "react-bootstrap";

function Contacto() {
  function enviarMensaje(evento) {
    evento.preventDefault();
    alert("¡Mensaje enviado! Te responderemos pronto.");
  }

  return (
    <Container className="py-4">
      <h1>Contacto</h1>
      <p>¿Tienes dudas? Escríbenos y nos pondremos en contacto contigo.</p>
      
      <Form onSubmit={enviarMensaje}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" placeholder="Tu nombre" required />
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control type="email" placeholder="tu@correo.com" required />
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Mensaje</Form.Label>
          <Form.Control as="textarea" rows={4} placeholder="Escribe tu consulta aquí..." required />
        </Form.Group>
        
        <Button variant="primary" type="submit">
          Enviar mensaje
        </Button>
      </Form>
    </Container>
  );
}

export default Contacto;