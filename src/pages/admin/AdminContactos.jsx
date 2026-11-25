import { useEffect, useState } from "react";
import { Alert, Badge, Button, Container, Spinner, Table } from "react-bootstrap";
import {
  eliminarMensajeContacto,
  listarMensajesContacto,
  marcarMensajeLeido,
} from "../../services/contactoService";

export default function AdminContactos() {
  const [mensajes, setMensajes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargar() {
      try {
        setError("");
        const data = await listarMensajesContacto();
        setMensajes(data || []);
      } catch (e) {
        setError(e.message || "Error al cargar mensajes de contacto");
      } finally {
        setCargando(false);
      }
    }
    cargar();
  }, []);

  async function handleMarcarLeido(id) {
    try {
      const actualizado = await marcarMensajeLeido(id);
      setMensajes((prev) =>
        prev.map((m) => (m.id === id ? actualizado : m))
      );
    } catch (e) {
      setError(e.message);
    }
  }

  async function handleEliminar(id) {
    if (!window.confirm("¿Eliminar este mensaje de contacto?")) return;
    try {
      await eliminarMensajeContacto(id);
      setMensajes((prev) => prev.filter((m) => m.id !== id));
    } catch (e) {
      setError(e.message);
    }
  }

  if (cargando) {
    return (
      <Container className="py-4 text-center">
        <Spinner animation="border" aria-label="Cargando mensajes" />
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h1 className="mb-3">Mensajes de Contacto</h1>
      {error && <Alert variant="danger">{error}</Alert>}

      {mensajes.length === 0 ? (
        <Alert variant="info">No hay mensajes recibidos todavía.</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Mensaje</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {mensajes.map((m) => (
              <tr key={m.id}>
                <td>
                  {m.fechaCreacion
                    ? new Date(m.fechaCreacion).toLocaleString("es-CL")
                    : "-"}
                </td>
                <td>{m.nombre}</td>
                <td>{m.correo}</td>
                <td>{m.mensaje}</td>
                <td>
                  {m.leido ? (
                    <Badge bg="success">Leído</Badge>
                  ) : (
                    <Badge bg="warning" text="dark">
                      Pendiente
                    </Badge>
                  )}
                </td>
                <td className="d-flex gap-2">
                  {!m.leido && (
                    <Button
                      size="sm"
                      variant="outline-success"
                      onClick={() => handleMarcarLeido(m.id)}
                    >
                      Marcar leído
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => handleEliminar(m.id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}