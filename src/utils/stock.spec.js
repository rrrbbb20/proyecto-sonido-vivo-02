// Archivo: src/utils/stock.spec.js
import { calcularEstadoStock } from "./stock";
import { describe, it, expect } from "vitest";

describe("Función calcularEstadoStock", () => {
  it("calcula correctamente el stock cuando el carrito está vacío", () => {
    const carritoVacio = [];
    const resultado = calcularEstadoStock(5, 1, carritoVacio);
    
    expect(resultado.stockDisponible).toBe(5);
    expect(resultado.bajoStock).toBe(false);
  });

  it("activa bajoStock (true) cuando quedan menos de 3 unidades", () => {
    const carrito = [{ id: 1, cantidad: 3 }];
    // Stock total 5, menos 3 en carrito = 2 disponibles (Bajo stock)
    const resultado = calcularEstadoStock(5, 1, carrito);
    
    expect(resultado.stockDisponible).toBe(2);
    expect(resultado.bajoStock).toBe(true);
  });

  it("activa stockAgotado (true) cuando el carrito consume todo", () => {
    const carrito = [{ id: 2, cantidad: 4 }];
    const resultado = calcularEstadoStock(4, 2, carrito);
    
    expect(resultado.stockAgotado).toBe(true);
  });
});