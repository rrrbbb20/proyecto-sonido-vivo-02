
// src/utils/validacionesRegistro.js

// Valida el RUT chileno mediante módulo 11.
export function validarRutChileno(rut) {
  const rutLimpio = rut
    .replace(/\./g, "")
    .trim()
    .toUpperCase();

  if (!/^\d{7,8}-[\dK]$/.test(rutLimpio)) {
    return false;
  }

  const [numero, digitoIngresado] = rutLimpio.split("-");

  let suma = 0;
  let multiplicador = 2;

  for (let i = numero.length - 1; i >= 0; i--) {
    suma += Number(numero[i]) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }

  const resto = 11 - (suma % 11);

  let digitoEsperado;

  if (resto === 11) {
    digitoEsperado = "0";
  } else if (resto === 10) {
    digitoEsperado = "K";
  } else {
    digitoEsperado = String(resto);
  }

  return digitoIngresado === digitoEsperado;
}

// Valida el formato del correo electrónico.
export function validarCorreo(correo) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim());
}

// Valida que el teléfono tenga exactamente 9 dígitos.
export function validarTelefono(telefono) {
  return /^\d{9}$/.test(telefono.trim());
}

// Valida que la contraseña tenga entre 8 y 12 caracteres.
export function validarContrasena(contrasena) {
  return contrasena.length >= 8 && contrasena.length <= 12;
}

// Valida todos los campos del formulario de registro.
export function validarRegistro(datos, usuarios) {
  const nuevosErrores = {};

  if (!datos.nombre.trim()) {
    nuevosErrores.nombre = "Ingresa tu nombre.";
  }

  if (!datos.apellido.trim()) {
    nuevosErrores.apellido = "Ingresa tu apellido.";
  }

  if (!validarRutChileno(datos.rut)) {
    nuevosErrores.rut = "Ingresa un RUT válido.";
  }

  if (!validarCorreo(datos.correo)) {
    nuevosErrores.correo = "Ingresa un correo válido.";
  }

  if (!validarTelefono(datos.telefono)) {
    nuevosErrores.telefono =
      "Ingresa 9 dígitos, sin espacios ni +56.";
  }

  if (!validarContrasena(datos.contrasena)) {
    nuevosErrores.contrasena =
      "La contraseña debe tener entre 8 y 12 caracteres.";
  }

  if (!datos.terminos) {
    nuevosErrores.terminos =
      "Debes aceptar los términos y condiciones.";
  }

  // Comprueba si el correo ya está registrado.
  const correoExiste = usuarios.some(
    (usuario) =>
      usuario.correo.toLowerCase() ===
      datos.correo.trim().toLowerCase()
  );

  if (correoExiste) {
    nuevosErrores.correo = "Este correo ya está registrado.";
  }

  return nuevosErrores;
}
