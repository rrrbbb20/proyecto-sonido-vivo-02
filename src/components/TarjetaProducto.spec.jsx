
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import TarjetaProducto from "./TarjetaProducto";

describe("Componente TarjetaProducto", () => {
  const productoPrueba = {
    id: 1,
    nombre: "Guitarra Fender Stratocaster",
    precio: 850000,
    stock: 5,
    imagen: "fender.jpg",
  };

  it("renderiza el nombre y el precio formateado correctamente", () => {
    render(
      <BrowserRouter>
        <TarjetaProducto
          producto={productoPrueba}
          carrito={[]}
          setCarrito={vi.fn()}
        />
      </BrowserRouter>
    );

    expect(
      screen.getByText("Guitarra Fender Stratocaster")
    ).toBeInTheDocument();

    expect(screen.getByText("$850.000")).toBeInTheDocument();
  });

  it("muestra el mensaje 'Sin imagen' si el producto no tiene URL", () => {
    const productoSinImagen = {
      ...productoPrueba,
      imagen: "",
    };

    render(
      <BrowserRouter>
        <TarjetaProducto
          producto={productoSinImagen}
          carrito={[]}
          setCarrito={vi.fn()}
        />
      </BrowserRouter>
    );

    expect(screen.getByText("Sin imagen")).toBeInTheDocument();
  });

  it("enlaza la tarjeta con el detalle del producto correcto", () => {
    render(
      <BrowserRouter>
        <TarjetaProducto
          producto={productoPrueba}
          carrito={[]}
          setCarrito={vi.fn()}
        />
      </BrowserRouter>
    );

    const enlace = screen.getByRole("link", {
      name: /Guitarra Fender Stratocaster/,
    });

    expect(enlace).toHaveAttribute("href", "/producto/1");
  });

  it("permite agregar al carrito un producto con stock", async () => {
    const usuario = userEvent.setup();
    const setCarrito = vi.fn();

    render(
      <BrowserRouter>
        <TarjetaProducto
          producto={productoPrueba}
          carrito={[]}
          setCarrito={setCarrito}
        />
      </BrowserRouter>
    );

    const boton = screen.getByRole("button", {
      name: "Al carrito",
    });

    expect(boton).toBeEnabled();

    await usuario.click(boton);

    expect(setCarrito).toHaveBeenCalledTimes(1);
    expect(setCarrito).toHaveBeenCalledWith(expect.any(Array));
  });

  it("deshabilita el botón cuando el producto no tiene stock", () => {
    const productoAgotado = {
      ...productoPrueba,
      stock: 0,
    };

    render(
      <BrowserRouter>
        <TarjetaProducto
          producto={productoAgotado}
          carrito={[]}
          setCarrito={vi.fn()}
        />
      </BrowserRouter>
    );

    const boton = screen.getByRole("button", {
      name: "Sin stock",
    });

    expect(boton).toBeDisabled();
  });
});
