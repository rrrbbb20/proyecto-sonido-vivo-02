// Archivo: src/pages/DetalleProducto.spec.jsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import DetalleProducto from "./DetalleProducto";

describe("Componente DetalleProducto", () => {
  const productosPrueba = [
    { id: 1, nombre: "Batería Tama", precio: 500000, stock: 5, categoriaNombre: "Baterías" }
  ];

  it("muestra la pantalla de error si el ID del producto no existe (Error)", () => {
    // Simulamos que el usuario navegó a /producto/999 (MemoryRouter es ideal para esto)
    render(
      <MemoryRouter initialEntries={["/producto/999"]}>
        <Routes>
          <Route 
            path="/producto/:id" 
            element={<DetalleProducto productos={productosPrueba} carrito={[]} setCarrito={vi.fn()} />} 
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Producto no encontrado")).toBeInTheDocument();
  });

  it("ejecuta setCarrito al presionar 'Agregar al carrito' (Evento y Mock)", async () => {
    const usuario = userEvent.setup(); // Creamos al usuario virtual
    const mockSetCarrito = vi.fn();    // Creamos el espía que pide la Guía 14
    
    render(
      <MemoryRouter initialEntries={["/producto/1"]}>
        <Routes>
          <Route 
            path="/producto/:id" 
            element={<DetalleProducto productos={productosPrueba} carrito={[]} setCarrito={mockSetCarrito} />} 
          />
        </Routes>
      </MemoryRouter>
    );
    
    // Buscamos el botón por su rol (buenas prácticas de accesibilidad)
    const boton = screen.getByRole("button", { name: /agregar al carrito/i });
    
    // El usuario hace clic
    await usuario.click(boton);
    
    // Comprobamos que el botón efectivamente llamó a nuestra función espía
    expect(mockSetCarrito).toHaveBeenCalled();
  });
});