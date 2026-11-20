import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Cabecera from "./components/Cabecera";
import Navegacion from "./components/Navegacion";
import RutaProtegida from "./components/RutaProtegida";
import Inicio from "./pages/Inicio";
import Registro from "./pages/Registro";
import Catalogo from "./pages/Catalogo";
import Carrito from "./pages/Carrito";
import Confirmacion from "./pages/Confirmacion";
import Contacto from "./pages/Contacto";
import Ubicacion from "./pages/Ubicacion";
import Login from "./pages/Login";
import LoginAdmin from "./pages/admin/LoginAdmin";
import PanelAdmin from "./pages/admin/PanelAdmin";
import Admin from "./pages/admin/Admin";
import AdminProductos from "./pages/admin/AdminProductos";
import DetalleProducto from "./pages/DetalleProducto";
import { listarProductos } from "./services/productoService";

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

  // Sesión JWT en sessionStorage
  const [sesion, setSesion] = useState(() => {
    try {
      const guardada = sessionStorage.getItem("sesionSonidoVivo");
      return guardada ? JSON.parse(guardada) : null;
    } catch {
      return null;
    }
  });

  // ESTADO DE PRODUCTOS cargado desde ms-producto (puerto 8090)
  const [productos, setProductos] = useState([]);
  const [cargandoProductos, setCargandoProductos] = useState(true);
  const [errorProductos, setErrorProductos] = useState("");

  useEffect(() => {
    async function cargarCatalogo() {
      try {
        setErrorProductos("");
        const data = await listarProductos();
        setProductos(Array.isArray(data) ? data : []);
      } catch (error) {
        setErrorProductos(error.message);
      } finally {
        setCargandoProductos(false);
      }
    }

    cargarCatalogo();
  }, []);

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

  // Calcula la cantidad total de unidades del carrito
  let cantidadCarrito = 0;

  for (const producto of carrito) {
    cantidadCarrito = cantidadCarrito + producto.cantidad;
  }

  return (
    <>
      <Navegacion cantidadCarrito={cantidadCarrito} />

      <main className="container py-4 mb-5">
        {errorProductos && (
          <div className="alert alert-warning" role="alert">
            No se pudo conectar con el catálogo: {errorProductos}
          </div>
        )}

        <Routes>
          <Route path="/" element={<Inicio productos={productos} carrito={carrito} setCarrito={setCarrito} />} />
          <Route path="/registro" element={<Registro sesion={sesion} setSesion={setSesion} />} />
          {/* anadir esto dentro de element de catalogo: 
          <Catalogo productos={productos}*/}

          <Route path="/catalogo" element={<Catalogo productos={productos} carrito={carrito} setCarrito={setCarrito} />} />
          <Route path="/carrito" element={<Carrito carrito={carrito} setCarrito={setCarrito} />} />
          {/* anadir esto dentro de element de login: 
          <Route path="/login" element={<Login usuarios={usuarios} />}/>*/}
          <Route path="/login" element={<Login />} />

          {/* Rutas administrativas protegidas */}
          <Route path="/admin/login" element={<LoginAdmin sesion={sesion} setSesion={setSesion} />} />
          <Route
            path="/admin/panel"
            element={
              <RutaProtegida sesion={sesion} rolesPermitidos={["VENDEDOR", "ADMINISTRADOR"]}>
                <PanelAdmin sesion={sesion} setSesion={setSesion} />
              </RutaProtegida>
            }
          />
          <Route
            path="/admin/productos"
            element={
              <RutaProtegida sesion={sesion} rolesPermitidos={["VENDEDOR", "ADMINISTRADOR"]}>
                <AdminProductos productos={productos} setProductos={setProductos} sesion={sesion} />
              </RutaProtegida>
            }
          />
          <Route
            path="/admin/trabajadores"
            element={
              <RutaProtegida sesion={sesion} rolesPermitidos={["ADMINISTRADOR"]}>
                <Admin sesion={sesion} />
              </RutaProtegida>
            }
          />
          <Route path="/admin" element={<Navigate to="/admin/panel" replace />} />

          <Route path="/confirmacion" element={<Confirmacion />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/ubicacion" element={<Ubicacion />} />

          <Route
            path="/producto/:id"
            element={
              <DetalleProducto
                productos={productos}
                carrito={carrito}
                setCarrito={setCarrito}
                cargando={cargandoProductos}
              />
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default App;