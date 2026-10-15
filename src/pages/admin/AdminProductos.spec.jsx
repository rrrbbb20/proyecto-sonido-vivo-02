// Archivo: src/pages/admin/AdminProductos.spec.jsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import AdminProductos from "./AdminProductos";

describe("Componente AdminProductos", () => {
  it("renderiza correctamente la vista principal de administración", () => {
    // Le pasamos un arreglo vacío y una función falsa para que no se caiga
    render(<AdminProductos productos={[]} setProductos={vi.fn()} />);
    
    // Verificamos que el título gigante se muestre en pantalla
    expect(screen.getByText("Administración de Inventario")).toBeInTheDocument();
  });
});