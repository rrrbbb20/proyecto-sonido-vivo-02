const AUTH_URL = `${import.meta.env.VITE_AUTH_API_URL}/auth`;

async function procesarRespuesta(response, mensajePorDefecto) {
  const texto = await response.text();
  const result = texto ? JSON.parse(texto) : null;

  if (!response.ok || (result && result.success === false)) {
    if (response.status === 401) {
      throw new Error(
        result?.error || result?.message || "Credenciales inválidas o sesión expirada."
      );
    }
    if (response.status === 403) {
      throw new Error(
        result?.error || result?.message || "No tienes permisos para realizar esta acción."
      );
    }
    throw new Error(result?.error || result?.message || mensajePorDefecto);
  }

  return result ? result.data : null;
}

// POST /api/v1/auth/login -> Devuelve { token, correo, rol }
export async function loginUsuario(correo, contrasena) {
  const response = await fetch(`${AUTH_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ correo, contrasena }),
  });

  return procesarRespuesta(response, "Error al iniciar sesión.");
}

// POST /api/v1/auth/registro -> Registra CLIENTE y devuelve { token, correo, rol }
export async function registrarCliente(correo, contrasena) {
  const response = await fetch(`${AUTH_URL}/registro`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ correo, contrasena }),
  });

  return procesarRespuesta(response, "Error al registrar usuario.");
}

// POST /api/v1/auth/trabajadores -> Requiere JWT de ADMINISTRADOR
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
      rol: datos.rol.toUpperCase(), // "VENDEDOR" o "ADMINISTRADOR"
    }),
  });

  return procesarRespuesta(response, "Error al registrar trabajador.");
}