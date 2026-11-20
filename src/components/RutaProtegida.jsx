import { Navigate } from "react-router-dom";

function RutaProtegida({ sesion, rolesPermitidos, children }) {
  // 1. Si no hay sesión activa, redirige al login interno
  if (!sesion || !sesion.token) {
    return <Navigate to="/admin/login" replace />;
  }

  // 2. Si el rol no está permitido para esta vista:
  if (rolesPermitidos && !rolesPermitidos.includes(sesion.rol)) {
    const rutaDestino = sesion.rol === "VENDEDOR" ? "/admin/panel" : "/";
    return <Navigate to={rutaDestino} replace />;
  }

  // 3. Sesión válida y rol autorizado
  return children;
}

export default RutaProtegida;