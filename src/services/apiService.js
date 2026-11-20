
// Procesar las respuestas de los microservicios
export async function procesarRespuesta(response, mensajePorDefecto) {
  const texto = await response.text();
  let result = null;

  // Convertir la respuesta a JSON
  if (texto.trim()) {
    try {
      result = JSON.parse(texto);
    } catch {
      throw new Error(
        response.ok
          ? "El servidor devolvió una respuesta con formato no válido."
          : `Error del servidor (${response.status}).`
      );
    }
  }

  // Comprobar si ocurrió un error
  if (!response.ok || result?.success === false) {
    const mensajeBackend =
      result?.message ||
      (typeof result?.error === "string" ? result.error : null);

    if (response.status === 401) {
      throw new Error(
        mensajeBackend || "Credenciales inválidas o sesión expirada."
      );
    }

    if (response.status === 403) {
      throw new Error(
        mensajeBackend || "No tienes permisos para realizar esta acción."
      );
    }

    throw new Error(mensajeBackend || mensajePorDefecto);
  }

  // Devolver los datos de la respuesta
  return result?.data ?? null;
}

// Obtener encabezados de autenticación
export function obtenerHeadersAuth(conJson = true, token = null) {
  let sesion = null;

  try {
    sesion = JSON.parse(
      sessionStorage.getItem("sesionSonidoVivo") || "null"
    );
  } catch {
    sesion = null;
  }

  const headers = {};

  // Agregar Content-Type cuando se envía JSON
  if (conJson) {
    headers["Content-Type"] = "application/json";
  }

  // Obtener el token de la sesión o utilizar el recibido
  const tokenFinal = token || sesion?.token;

  if (tokenFinal) {
    headers.Authorization = `Bearer ${tokenFinal}`;
  }

  return headers;
}
