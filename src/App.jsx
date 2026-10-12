import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Cabecera from "./components/Cabecera";
import { productos as productosIniciales } from "./data/productos";
import Navegacion from "./components/Navegacion";
import Inicio from "./pages/Inicio";
import Registro from "./pages/Registro";
import Catalogo from "./pages/Catalogo";
import Carrito from "./pages/Carrito";
import Login from "./pages/Login";
import Admin from "./pages/admin/Admin";
import AdminProductos from "./pages/admin/AdminProductos";
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

  // ESTADO DE PRODUCTOS Aqui ocurre la conexion rb
  const [productos, setProductos] = useState(() => {
    const guardados = localStorage.getItem("productosSonidoVivo");
    // Si hay datos en localStorage, los usa. Si está vacío, carga tu data/productos.js
    return guardados ? JSON.parse(guardados) : productosIniciales; 
  });

  useEffect(() => {
    localStorage.setItem("productosSonidoVivo", JSON.stringify(productos));
  }, [productos]);
  // ---rb

  // Sincroniza los productos del carrito cuando cambia el inventario
  useEffect(() => {
    setCarrito((carritoAnterior) => {
      const carritoActualizado = carritoAnterior.map((productoCarrito) => {
        // Busca el producto actualizado en el inventario
        const productoInventario = productos.find(
          (producto) => producto.id === productoCarrito.id
        );

        // Quita productos eliminados o sin stock
        if (!productoInventario || productoInventario.stock <= 0) {
          return null;
        }

        // Ajusta la cantidad si supera el stock actual
        const cantidadActualizada =
          productoCarrito.cantidad > productoInventario.stock
            ? productoInventario.stock
            : productoCarrito.cantidad;

        // Actualiza precio, stock y demás datos del producto
        return {
          ...productoCarrito,
          ...productoInventario,
          cantidad: cantidadActualizada,
        };
      });

      // Elimina los productos marcados como null
      return carritoActualizado.filter((producto) => producto !== null);
    });
  }, [productos]);
  
//usuarios
  const [usuarios, setUsuarios] = useState(() => {
  const guardados = localStorage.getItem("usuariosSonidoVivo");
  return guardados ? JSON.parse(guardados) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "usuariosSonidoVivo",
      JSON.stringify(usuarios)
    );
  }, [usuarios]);


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
          <Route path="/registro" element={<Registro usuarios={usuarios} setUsuarios={setUsuarios}/>} />
          {/* anadir esto dentro de element de catalogo: 
          <Catalogo productos={productos}*/}
          
          <Route path="/catalogo" element={<Catalogo productos={productos} carrito={carrito} setCarrito={setCarrito} />} />
          <Route path="/carrito" element={<Carrito carrito={carrito} setCarrito={setCarrito} />} />
          {/* anadir esto dentro de element de login: 
          <Route path="/login" element={<Login usuarios={usuarios} />}/>*/}
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/productos" element={<AdminProductos productos={productos} setProductos={setProductos} />} />
        </Routes>
      </main>
    </>
  );
}

export default App;