export function validarProducto(datos) {
  const nuevosErrores = {};

  if (!datos.nombre || datos.nombre.trim().length < 3) {
    nuevosErrores.nombre = "El nombre debe tener al menos 3 caracteres.";
  }

  if (!datos.categoria || !datos.categoria.trim()) {
    nuevosErrores.categoria = "Selecciona una categoría.";
  }

  if (!datos.marca || !datos.marca.trim()) {
    nuevosErrores.marca = "La marca es obligatoria.";
  }

  if (!datos.modelo || !datos.modelo.trim()) {
    nuevosErrores.modelo = "El modelo es obligatorio.";
  }

  if (
    datos.precio === "" ||
    !Number.isFinite(Number(datos.precio)) ||
    Number(datos.precio) < 0
  ) {
    nuevosErrores.precio = "El precio debe ser un número mayor o igual a cero.";
  }

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