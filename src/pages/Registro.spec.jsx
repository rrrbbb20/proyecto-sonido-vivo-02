import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { describe, it, expect, vi, afterEach } from "vitest";
import Registro from "./Registro";

afterEach(() => {
  vi.useRealTimers();
});

describe("Componente Registro", () => {
  it("muestra errores visuales al enviar el formulario vacío", async () => {
    const usuario = userEvent.setup();

    render(
      <MemoryRouter>
        <Registro usuarios={[]} setUsuarios={vi.fn()} />
      </MemoryRouter>
    );

    await usuario.click(
      screen.getByRole("button", { name: /registrarme/i })
    );

    expect(screen.getByText("Ingresa tu nombre.")).toBeInTheDocument();
    expect(screen.getByText("Ingresa un RUT válido.")).toBeInTheDocument();
    expect(
      screen.getByText("Debes aceptar los términos y condiciones.")
    ).toBeInTheDocument();
  });

  it("registra un usuario válido, limpia el formulario y redirige al inicio", async () => {
    const usuario = userEvent.setup();
    const setUsuarios = vi.fn();

    render(
      <MemoryRouter initialEntries={["/registro"]}>
        <Routes>
          <Route
            path="/registro"
            element={
              <Registro usuarios={[]} setUsuarios={setUsuarios} />
            }
          />
          <Route path="/" element={<h1>Inicio</h1>} />
        </Routes>
      </MemoryRouter>
    );

    await usuario.type(screen.getByLabelText("Nombre"), "  Ana  ");
    await usuario.type(screen.getByLabelText("Apellido"), " Pérez ");
    await usuario.type(screen.getByLabelText("RUT"), "12345678-5");
    await usuario.type(
      screen.getByLabelText("Correo electrónico"),
      "ANA@EJEMPLO.CL"
    );
    await usuario.type(screen.getByLabelText("Teléfono"), "912345678");
    await usuario.type(screen.getByLabelText("Contraseña"), "Clave123");

    await usuario.click(
      screen.getByLabelText("Acepto los términos y condiciones")
    );

    await usuario.click(
      screen.getByRole("button", { name: /registrarme/i })
    );

    // Comprobamos que se intentó actualizar la lista de usuarios.
    expect(setUsuarios).toHaveBeenCalledTimes(1);
    expect(setUsuarios).toHaveBeenCalledWith(expect.any(Function));

    // Comprobamos el usuario que se agregaría a la lista.
    const actualizarUsuarios = setUsuarios.mock.calls[0][0];

    const usuariosAnteriores = [
      { nombre: "Usuario existente", rol: "cliente" },
    ];

    expect(actualizarUsuarios(usuariosAnteriores)).toEqual([
      { nombre: "Usuario existente", rol: "cliente" },
      {
        nombre: "Ana",
        apellido: "Pérez",
        rut: "12345678-5",
        correo: "ana@ejemplo.cl",
        telefono: "912345678",
        contrasena: "Clave123",
        rol: "cliente",
      },
    ]);

    // Comprobamos el mensaje de éxito.
    expect(screen.getByRole("status")).toHaveTextContent(
      "¡Registro completado correctamente! Redirigiendo..."
    );

    // Comprobamos que los campos se hayan limpiado.
    expect(screen.getByLabelText("Nombre")).toHaveValue("");
    expect(screen.getByLabelText("Apellido")).toHaveValue("");
    expect(screen.getByLabelText("RUT")).toHaveValue("");
    expect(screen.getByLabelText("Correo electrónico")).toHaveValue("");
    expect(screen.getByLabelText("Teléfono")).toHaveValue("");
    expect(screen.getByLabelText("Contraseña")).toHaveValue("");

    expect(
      screen.getByLabelText("Acepto los términos y condiciones")
    ).not.toBeChecked();


  });
});