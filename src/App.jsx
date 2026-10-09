import { Routes, Route } from "react-router-dom"; 
import Cabecera from "./components/Cabecera";
import Navegacion from "./components/Navegacion";
import Registro from "./pages/Registro";

function App() {
  return (
    <>
      {/* 1. Componentes estáticos: Siempre se ven en todas las páginas */}
      <Navegacion />

      {/* 2. Contenedor principal dinámico */}
      <main className="container py-4 mb-5">
        
        {/* <Routes> actúa como un "televisor" que cambia de canal */}
        <Routes>
          {/* Cada <Route> es un canal diferente. El "path" es la URL y el "element" es lo que muestra */}
          

          <Route path="/registro" element={<Registro />} />
          
        </Routes>

      </main>
    </>
  );
}

export default App;