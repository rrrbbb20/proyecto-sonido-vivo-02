import { procesarRespuesta, obtenerHeadersAuth } from "./apiService";

const CLIENTES_URL = `${import.meta.env.VITE_CLIENTES_API_URL}/clientes`;

// Registrar cliente (orquesta Auth + Perfil en BD Clientes)
export async function registrarClientePerfil(datos) {
  const response = await fetch(`${CLIENTES_URL}/registro`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre: datos.nombre,
      apellido: datos.apellido,
      rut: datos.rut,
      telefono: datos.telefono,
      correo: datos.correo,
      password: datos.contrasena,
    }),
  });

  return procesarRespuesta(
    response,
    "Error al registrar la cuenta del cliente."
  );
}

// Obtener perfil del cliente mediante su usuarioId (Auth)
export async function obtenerPerfilPorUsuarioId(usuarioId) {
  const response = await fetch(`${CLIENTES_URL}/usuario/${usuarioId}`, {
    headers: obtenerHeadersAuth(false),
  });

  return procesarRespuesta(
    response,
    "No se pudo obtener el perfil del cliente."
  );
}