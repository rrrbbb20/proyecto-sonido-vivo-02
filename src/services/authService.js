
import { procesarRespuesta } from "./apiService";

const AUTH_URL = `${import.meta.env.VITE_AUTH_API_URL}/auth`;

// Iniciar sesión
export async function loginUsuario(correo, contrasena) {
  const response = await fetch(`${AUTH_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ correo, contrasena }),
  });

  return procesarRespuesta(
    response,
    "Error al iniciar sesión."
  );
}

// Registrar cliente
export async function registrarCliente(correo, contrasena) {
  const response = await fetch(`${AUTH_URL}/registro`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ correo, contrasena }),
  });

  return procesarRespuesta(
    response,
    "Error al registrar usuario."
  );
}

// Registrar trabajador
export async function registrarTrabajador(datos, token) {
  const response = await fetch(`${AUTH_URL}/trabajadores`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      correo: datos.correo,
      contrasena: datos.contrasena,
      rol: datos.rol.toUpperCase(),
    }),
  });

  return procesarRespuesta(
    response,
    "Error al registrar trabajador."
  );
}
