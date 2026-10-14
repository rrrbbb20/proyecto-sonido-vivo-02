// src/utils/validacionesInventarioProducto.js

// Valida los datos ingresados en el formulario del inventario.
export function validarProducto(datos) {
  const nuevosErrores = {};

  // El nombre debe tener al menos 3 caracteres.
  if (datos.nombre.trim().length < 3) {
    nuevosErrores.nombre =
      "El nombre debe tener al menos 3 caracteres.";
  }

  // La categoría es obligatoria.
  if (!datos.categoria) {
    nuevosErrores.categoria = "Selecciona una categoría.";
  }

  // El precio debe ser un número mayor que cero.
  if (
    datos.precio === "" ||
    !Number.isFinite(Number(datos.precio)) ||
    Number(datos.precio) <= 0
  ) {
    nuevosErrores.precio =
      "El precio debe ser un número mayor que cero.";
  }

  // El stock debe ser un número entero mayor o igual a cero.
  if (
    datos.stock === "" ||
    !Number.isFinite(Number(datos.stock)) ||
    !Number.isInteger(Number(datos.stock)) ||
    Number(datos.stock) < 0
  ) {
    nuevosErrores.stock =
      "El stock debe ser un número entero mayor o igual a cero.";
  }

  return nuevosErrores;
}
