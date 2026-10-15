// Archivo: src/pages/admin/ListaProductos.spec.jsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import ListaProductos from "./ListaProductos";

describe("Componente ListaProductos", () => {
  it("muestra un mensaje amigable cuando no hay productos (Estado vacío)", () => {
    // Le pasamos un arreglo vacío de productos
    render(<ListaProductos productos={[]} onEditar={vi.fn()} onEliminar={vi.fn()} />);
    
    expect(screen.getByText("No hay productos registrados en el inventario.")).toBeInTheDocument();
  });

  it("renderiza los productos y dispara onEliminar al hacer clic (Interacción y Mock)", async () => {
    const mockEliminar = vi.fn(); // Creamos el espía
    const usuario = userEvent.setup();
    
    const productosPrueba = [
      { id: 1, nombre: "Batería Mapex", categoriaNombre: "Baterías", precio: 600000, stock: 3 }
    ];

    render(<ListaProductos productos={productosPrueba} onEditar={vi.fn()} onEliminar={mockEliminar} />);

    // Comprobamos que el nombre del producto se pintó en pantalla
    expect(screen.getByText("Batería Mapex")).toBeInTheDocument();

    // Buscamos el botón de eliminar y le hacemos clic
    const botonEliminar = screen.getByRole("button", { name: /eliminar/i });
    await usuario.click(botonEliminar);

    // Comprobamos que la función espía haya recibido el ID 1 al hacer clic
    expect(mockEliminar).toHaveBeenCalledWith(1);
  });
});