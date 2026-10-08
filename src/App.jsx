import { Routes, Route } from "react-router-dom"; 
import Cabecera from "./components/Cabecera";
import Navegacion from "./components/Navegacion";
// import Registro from "./pages/Registro";

function App() {
  return (
    <>
      {/* 1. Componentes estáticos: Siempre se ven en todas las páginas */}
      <Cabecera />
      <Navegacion />

      {/* 2. Contenedor principal dinámico */}
      <main className="container py-4 mb-5">
        
        {/* <Routes> actúa como un "televisor" que cambia de canal */}
        <Routes>
          {/* Cada <Route> es un canal diferente. El "path" es la URL y el "element" es lo que muestra */}
          
          <Route path="/" element={<h2 className="text-center mt-5">Bienvenido a la página de Inicio</h2>} />
          <Route path="/catalogo" element={<h2 className="text-center mt-5">Aquí irá la grilla de productos</h2>} />
          <Route path="/ubicacion" element={<h2 className="text-center mt-5">Aquí irá el mapa de Ubicación</h2>} />
          <Route path="/contacto" element={<h2 className="text-center mt-5">Aquí irá el formulario de Contacto</h2>} />
          <Route path="/login" element={<h2 className="text-center mt-5">Aquí irá el Iniciar Sesión</h2>} />
          <Route path="/carrito" element={<h2 className="text-center mt-5">Aquí irá el Carrito de Compras</h2>} />
          
          {/* Ruta especial: Si el usuario escribe una URL que no existe (Error 404) */}
          <Route path="*" element={<h2 className="text-center text-danger mt-5">Error 404: Página no encontrada</h2>} />
        </Routes>

      </main>
    </>
  );
}

export default App;