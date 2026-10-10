import { useEffect, useState } from "react";
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
  // Recupera el carrito guardado al cargar la aplicación
  const [carrito, setCarrito] = useState(() => {
    const carritoGuardado = localStorage.getItem("carritoSonidoVivo");
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });

  // Mantiene el carrito sincronizado con localStorage
  useEffect(() => {
    localStorage.setItem("carritoSonidoVivo", JSON.stringify(carrito));
  }, [carrito]);

  // Calcula la cantidad total de unidades del carrito
  let cantidadCarrito = 0;

  for (const producto of carrito) {
    cantidadCarrito = cantidadCarrito + producto.cantidad;
  }

  return (
    <>
      <Navegacion cantidadCarrito={cantidadCarrito} />

      <main className="container py-4 mb-5">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/catalogo" element={<Catalogo carrito={carrito} setCarrito={setCarrito} />} />
          <Route path="/carrito" element={<Carrito carrito={carrito} setCarrito={setCarrito} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
    </>
  );
}

export default App;