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
    const usuario = userEvent.setup();
    const mockSetCarrito = vi.fn();    
    
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
    

    const boton = screen.getByRole("button", { name: /agregar al carrito/i });
    

    await usuario.click(boton);
    

    expect(mockSetCarrito).toHaveBeenCalled();
  });
});