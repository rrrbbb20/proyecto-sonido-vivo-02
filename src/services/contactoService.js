const CONTACTO_URL = `${import.meta.env.VITE_CONTACTO_API_URL}/contactos`;

async function procesarRespuesta(response) {
  const body = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(body?.message || `Error en solicitud: ${response.status}`);
  }
  return body?.data ?? body;
}

function headersConAuth() {
  const sesion = JSON.parse(sessionStorage.getItem("sesionSonidoVivo") || "null");
  const token = sessionStorage.getItem("token") || sesion?.token;
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function enviarMensajeContacto(datos) {
  const response = await fetch(CONTACTO_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });
  return procesarRespuesta(response);
}

export async function listarMensajesContacto() {
  const response = await fetch(CONTACTO_URL, {
    headers: headersConAuth(),
  });
  return procesarRespuesta(response);
}

export async function marcarMensajeLeido(id) {
  const response = await fetch(`${CONTACTO_URL}/${id}/leido`, {
    method: "PUT",
    headers: headersConAuth(),
  });
  return procesarRespuesta(response);
}

export async function eliminarMensajeContacto(id) {
  const response = await fetch(`${CONTACTO_URL}/${id}`, {
    method: "DELETE",
    headers: headersConAuth(),
  });
  return procesarRespuesta(response);
}