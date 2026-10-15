// Archivo: src/utils/validacionesInventarioProducto.spec.js
import { validarProducto } from "./validacionesInventarioProducto";
import { describe, it, expect } from "vitest";

describe("Validaciones del Inventario de Productos", () => {
  it("rechaza precios en cero, negativos o con texto infiltrado", () => {
    const erroresCero = validarProducto({ nombre: "Batería", categoria: "baterias", precio: "0", stock: "5" });
    expect(erroresCero.precio).toBe("El precio debe ser un número mayor que cero.");

    const erroresLetras = validarProducto({ nombre: "Batería", categoria: "baterias", precio: "mil pesos", stock: "5" });
    expect(erroresLetras.precio).toBe("El precio debe ser un número mayor que cero.");
  });

  it("rechaza stock con números decimales", () => {
    // Intentando guardar "2.5" unidades
    const erroresDecimal = validarProducto({ nombre: "Guitarra", categoria: "guitarras", precio: "150000", stock: "2.5" });
    expect(erroresDecimal.stock).toBe("El stock debe ser un número entero mayor o igual a cero.");
  });

  it("aprueba un producto con datos perfectos", () => {
    const productoCorrecto = { nombre: "Guitarra Acústica", categoria: "guitarras", precio: "150000", stock: "10" };
    const errores = validarProducto(productoCorrecto);
    
    // Si no hay errores, el objeto de devoluciones debe estar vacío
    expect(Object.keys(errores).length).toBe(0);
  });
});