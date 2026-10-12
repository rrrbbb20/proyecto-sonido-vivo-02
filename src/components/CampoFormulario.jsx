
import { Form } from "react-bootstrap";

function CampoFormulario({
  label,
  nombre,
  tipo = "text",
  placeholder = "",
  datos,
  errores,
  onChange,
}) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>

      <Form.Control
        type={tipo}
        name={nombre}
        placeholder={placeholder}
        value={datos[nombre]}
        onChange={onChange}
        isInvalid={Boolean(errores[nombre])}
      />

      <Form.Control.Feedback type="invalid">
        {errores[nombre]}
      </Form.Control.Feedback>
    </Form.Group>
  );
}

export default CampoFormulario;
