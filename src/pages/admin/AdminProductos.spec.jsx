
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AdminProductos from "./AdminProductos";

describe("Componente AdminProductos", () => {
  it("muestra el título de administración del inventario", () => {
    render(
      <AdminProductos productos={[]} setProductos={vi.fn()} />
    );

    expect(
      screen.getByRole("heading", {
        name: /administración de inventario/i,
      })
    ).toBeInTheDocument();
  });

  it("guarda un producto nuevo con su ID y datos procesados", async () => {
    const usuario = userEvent.setup();
    const setProductos = vi.fn();

    render(
      <AdminProductos productos={[]} setProductos={setProductos} />
    );

    await usuario.type(
      screen.getByLabelText(/nombre del producto/i),
      "Pedal de Efecto"
    );

    await usuario.selectOptions(
      screen.getByLabelText(/categoría/i),
      "guitarras"
    );

    await usuario.type(
      screen.getByLabelText(/precio/i),
      "45000"
    );

    await usuario.type(
      screen.getByLabelText(/stock/i),
      "15"
    );

    await usuario.click(
      screen.getByRole("button", { name: /registrar producto/i })
    );

    expect(setProductos).toHaveBeenCalledWith([
      {
        id: 1,
        nombre: "Pedal de Efecto",
        categoria: "guitarras",
        categoriaNombre: "Guitarras eléctricas",
        precio: 45000,
        stock: 15,
        imagen: "",
      },
    ]);
  });

 

  it("elimina un producto del inventario", async () => {
    const usuario = userEvent.setup();
    const setProductos = vi.fn();

    const producto = {
      id: 5,
      nombre: "Guitarra antigua",
      categoria: "guitarras",
      categoriaNombre: "Guitarras eléctricas",
      precio: 300000,
      stock: 4,
      imagen: "",
    };

    render(
      <AdminProductos
        productos={[producto]}
        setProductos={setProductos}
      />
    );

    await usuario.click(
      screen.getByRole("button", { name: /eliminar/i })
    );

    expect(setProductos).toHaveBeenCalledWith([]);
  });
});
