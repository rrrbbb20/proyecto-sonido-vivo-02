
import {
  procesarRespuesta,
  obtenerHeadersAuth,
} from "./apiService";

const PRODUCTOS_URL = `${import.meta.env.VITE_PRODUCTOS_API_URL}/productos`;

// Listar todos los productos
export async function listarProductos() {
  const response = await fetch(PRODUCTOS_URL);

  return procesarRespuesta(
    response,
    "Error al cargar los productos."
  );
}

// Buscar un producto por ID
export async function buscarProductoPorId(id) {
  const response = await fetch(`${PRODUCTOS_URL}/${id}`);

  return procesarRespuesta(
    response,
    "No se pudo encontrar el producto."
  );
}

// Crear un producto
export async function crearProducto(producto) {
  const response = await fetch(PRODUCTOS_URL, {
    method: "POST",
    headers: obtenerHeadersAuth(true),
    body: JSON.stringify(producto),
  });

  return procesarRespuesta(
    response,
    "Error al registrar el producto."
  );
}

// Actualizar un producto
export async function actualizarProducto(id, producto) {
  const response = await fetch(`${PRODUCTOS_URL}/${id}`, {
    method: "PUT",
    headers: obtenerHeadersAuth(true),
    body: JSON.stringify(producto),
  });

  return procesarRespuesta(
    response,
    "Error al actualizar el producto."
  );
}

// Eliminar un producto
export async function eliminarProducto(id) {
  const response = await fetch(`${PRODUCTOS_URL}/${id}`, {
    method: "DELETE",
    headers: obtenerHeadersAuth(false),
  });

  return procesarRespuesta(
    response,
    "Error al eliminar el producto."
  );
}
