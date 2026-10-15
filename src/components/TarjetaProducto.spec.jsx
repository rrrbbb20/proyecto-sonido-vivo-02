// Archivo: src/components/TarjetaProducto.spec.jsx
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom"; 
import { describe, it, expect, vi } from "vitest";
import TarjetaProducto from "./TarjetaProducto";

describe("Componente TarjetaProducto", () => {
  const productoPrueba = {
    id: 1,
    nombre: "Guitarra Fender Stratocaster",
    precio: 850000,
    stock: 5,
    imagen: "fender.jpg"
  };

  it("renderiza el nombre y el precio formateado correctamente (Props)", () => {
    // Renderizamos la tarjeta envuelta en BrowserRouter porque usa <Link>
    render(
      <BrowserRouter>
        <TarjetaProducto producto={productoPrueba} carrito={[]} setCarrito={vi.fn()} />
      </BrowserRouter>
    );

    // Comprobamos que el texto esté visible en el documento
    expect(screen.getByText("Guitarra Fender Stratocaster")).toBeInTheDocument();
    expect(screen.getByText("$850.000")).toBeInTheDocument();
  });

  it("muestra el mensaje 'Sin imagen' si el producto no tiene URL (Condicional)", () => {
    const productoSinImagen = { ...productoPrueba, imagen: "" };

    render(
      <BrowserRouter>
        <TarjetaProducto producto={productoSinImagen} carrito={[]} setCarrito={vi.fn()} />
      </BrowserRouter>
    );

    expect(screen.getByText("Sin imagen")).toBeInTheDocument();
  });
});