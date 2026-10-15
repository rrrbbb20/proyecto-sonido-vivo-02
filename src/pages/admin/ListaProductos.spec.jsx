
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import ListaProductos from "./ListaProductos";

describe("Componente ListaProductos", () => {
  it("muestra un mensaje cuando no hay productos", () => {
    render(
      <ListaProductos
        productos={[]}
        onEliminar={vi.fn()}
      />
    );

    expect(
      screen.getByText(
        "No hay productos registrados en el inventario."
      )
    ).toBeInTheDocument();
  });

  it("muestra los productos y permite eliminarlos", async () => {
    const usuario = userEvent.setup();
    const mockEliminar = vi.fn();

    const productosPrueba = [
      {
        id: 1,
        nombre: "Batería Mapex",
        categoriaNombre: "Baterías",
        precio: 600000,
        stock: 3,
      },
    ];

    render(
      <ListaProductos
        productos={productosPrueba}
        onEliminar={mockEliminar}
      />
    );

    expect(
      screen.getByText("Batería Mapex")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Baterías")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Stock: 3 unidades")
    ).toBeInTheDocument();

    await usuario.click(
      screen.getByRole("button", { name: /eliminar/i })
    );

    expect(mockEliminar).toHaveBeenCalledTimes(1);
    expect(mockEliminar).toHaveBeenCalledWith(1);

    
    expect(
      screen.queryByRole("button", { name: /editar/i })
    ).not.toBeInTheDocument();
  });
});
