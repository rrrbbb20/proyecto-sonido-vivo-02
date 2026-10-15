
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import FormularioProducto from "./FormularioProducto";

describe("Componente FormularioProducto", () => {
  it("muestra errores si se intenta guardar un producto vacío", async () => {
    const usuario = userEvent.setup();
    const mockGuardar = vi.fn();

    render(<FormularioProducto onGuardar={mockGuardar} />);

    await usuario.click(
      screen.getByRole("button", { name: /registrar producto/i })
    );

    expect(
      screen.getByText("El nombre debe tener al menos 3 caracteres.")
    ).toBeInTheDocument();

    expect(mockGuardar).not.toHaveBeenCalled();
  });

  it("registra un producto válido con sus datos procesados", async () => {
    const usuario = userEvent.setup();
    const mockGuardar = vi.fn();

    render(<FormularioProducto onGuardar={mockGuardar} />);

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

    expect(mockGuardar).toHaveBeenCalledTimes(1);
    expect(mockGuardar).toHaveBeenCalledWith({
      nombre: "Pedal de Efecto",
      categoria: "guitarras",
      categoriaNombre: "Guitarras eléctricas",
      precio: 45000,
      stock: 15,
      imagen: "",
    });

    expect(
      screen.getByLabelText(/nombre del producto/i)
    ).toHaveValue("");
  });
});
