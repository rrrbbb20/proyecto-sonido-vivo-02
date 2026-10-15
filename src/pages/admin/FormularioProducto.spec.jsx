// Archivo: src/pages/admin/FormularioProducto.spec.jsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import FormularioProducto from "./FormularioProducto";

describe("Componente FormularioProducto", () => {
  it("muestra errores si se intenta guardar un producto vacío (Validación visual)", async () => {
    const mockGuardar = vi.fn();
    const usuario = userEvent.setup();

    render(<FormularioProducto onGuardar={mockGuardar} onActualizar={vi.fn()} onCancelarEdicion={vi.fn()} />);

    // Buscamos el botón de registrar y le damos clic sin llenar nada
    const botonSubmit = screen.getByRole("button", { name: /registrar producto/i });
    await usuario.click(botonSubmit);

    // Comprobamos que aparezca la advertencia roja
    expect(screen.getByText("El nombre debe tener al menos 3 caracteres.")).toBeInTheDocument();
    
    // Y verificamos que NO se haya llamado a la función de guardar
    expect(mockGuardar).not.toHaveBeenCalled();
  });

  it("permite escribir en los campos y envía los datos correctamente (Simulación de tipeo)", async () => {
    const mockGuardar = vi.fn();
    const usuario = userEvent.setup();

    render(<FormularioProducto onGuardar={mockGuardar} onActualizar={vi.fn()} onCancelarEdicion={vi.fn()} />);

    // 1. Simulamos a un administrador tecleando en los campos
    await usuario.type(screen.getByLabelText(/nombre del producto/i), "Pedal de Efecto");
    await usuario.selectOptions(screen.getByLabelText(/categoría/i), "guitarras");
    await usuario.type(screen.getByLabelText(/precio/i), "45000");
    await usuario.type(screen.getByLabelText(/stock/i), "15");

    // 2. Hacemos clic en guardar
    const botonSubmit = screen.getByRole("button", { name: /registrar producto/i });
    await usuario.click(botonSubmit);

    // 3. Comprobamos que la función espía se haya ejecutado exitosamente 1 vez
    expect(mockGuardar).toHaveBeenCalledTimes(1);
  });
});