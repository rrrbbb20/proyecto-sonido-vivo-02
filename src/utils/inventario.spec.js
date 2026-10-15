// Archivo: src/utils/inventario.spec.js
import { calcularNuevoId } from "./inventario";
import { describe, it, expect } from "vitest";

describe("Función calcularNuevoId", () => {
  it("devuelve 1 si el arreglo está completamente vacío", () => {
    const inventarioVacio = [];
    const id = calcularNuevoId(inventarioVacio);
    
    expect(id).toBe(1);
  });

  it("devuelve el ID máximo + 1 si ya existen elementos", () => {
    const inventario = [
      { id: 1, nombre: "Guitarra" },
      { id: 5, nombre: "Batería" }, // ID máximo es 5
      { id: 3, nombre: "Piano" }
    ];
    const id = calcularNuevoId(inventario);
    
    expect(id).toBe(6);
  });
});