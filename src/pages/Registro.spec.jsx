// Archivo: src/pages/Registro.spec.jsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import Registro from "./Registro";

describe("Componente Registro", () => {

  it("muestra errores visuales al intentar enviar el formulario vacío (Interacción)", async () => {
    const usuario = userEvent.setup();
    
    render(
      <BrowserRouter>
        <Registro usuarios={[]} setUsuarios={vi.fn()} />
      </BrowserRouter>
    );

    // Encontramos el botón de enviar
    const botonRegistro = screen.getByRole("button", { name: /registrarme/i });
    
    // Hacemos clic sin haber escrito nada en los inputs
    await usuario.click(botonRegistro);

    // Comprobamos que el componente renderice los textos de error de nuestra validación
    expect(screen.getByText("Ingresa tu nombre.")).toBeInTheDocument();
    expect(screen.getByText("Ingresa un RUT válido.")).toBeInTheDocument();
    expect(screen.getByText("Debes aceptar los términos y condiciones.")).toBeInTheDocument();
  });

});