import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Cabecera from "./components/Cabecera";
import Navegacion from "./components/Navegacion";
import Inicio from "./pages/Inicio";
import Registro from "./pages/Registro";
import Catalogo from "./pages/Catalogo";
import Carrito from "./pages/Carrito";
import Login from "./pages/Login";
import Admin from "./pages/admin/Admin";

function App() {
  // Obtiene la cantidad total almacenada en el carrito
  function obtenerCantidadCarrito() {
    const carritoGuardado = localStorage.getItem("carritoSonidoVivo");
    const carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];
    let cantidad = 0;

    for (const producto of carrito) {
      cantidad = cantidad + producto.cantidad;
    }

    return cantidad;
  }

  const [cantidadCarrito, setCantidadCarrito] = useState(obtenerCantidadCarrito);

  // Actualiza el contador cuando cambia el carrito
  function actualizarCantidadCarrito(carrito) {
    let cantidad = 0;

    for (const producto of carrito) {
      cantidad = cantidad + producto.cantidad;
    }

    setCantidadCarrito(cantidad);
  }

  return (
    <>
      <Navegacion cantidadCarrito={cantidadCarrito} />

      <main className="container py-4 mb-5">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/catalogo" element={<Catalogo onCarritoActualizado={actualizarCantidadCarrito} />} />
          <Route path="/carrito" element={<Carrito onCarritoActualizado={actualizarCantidadCarrito} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
    </>
  );
}

export default App;