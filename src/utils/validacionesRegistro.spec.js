// Archivo: src/utils/validacionesRegistro.spec.js
import { validarTelefono, validarContrasena, validarRegistro } from "./validacionesRegistro";
import { describe, it, expect } from "vitest";

describe("Validaciones del Formulario de Registro", () => {
  it("valida que el teléfono tenga exactamente 9 dígitos", () => {
    expect(validarTelefono("912345678")).toBe(true);
    expect(validarTelefono("12345")).toBe(false); // Muy corto
    expect(validarTelefono("abcdefghi")).toBe(false); // Texto en vez de números
  });

  it("valida que la contraseña tenga entre 8 y 12 caracteres", () => {
    expect(validarContrasena("1234567")).toBe(false); // 7 caracteres (corto)
    expect(validarContrasena("12345678")).toBe(true); // 8 caracteres (justo)
    expect(validarContrasena("1234567890123")).toBe(false); // 13 caracteres (largo)
  });

  it("devuelve error si los campos obligatorios están vacíos", () => {
    const datosVacios = { nombre: "", apellido: "", rut: "", correo: "", telefono: "", contrasena: "", terminos: false };
    const usuarios = []; // Base de datos vacía
    
    const errores = validarRegistro(datosVacios, usuarios);
    
    expect(errores.nombre).toBe("Ingresa tu nombre.");
    expect(errores.terminos).toBe("Debes aceptar los términos y condiciones.");
  });

  it("detecta si el correo ya existe en la base de datos", () => {
    const usuarios = [{ correo: "juan@correo.cl" }];
    const datosNuevos = {
      nombre: "Pedro", apellido: "Díaz", rut: "12345678-5", 
      correo: "juan@correo.cl", // ¡Correo repetido!
      telefono: "912345678", contrasena: "12345678", terminos: true
    };

    const errores = validarRegistro(datosNuevos, usuarios);
    
    expect(errores.correo).toBe("Este correo ya está registrado.");
  });
});