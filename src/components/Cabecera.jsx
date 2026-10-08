function Cabecera() {
  return (
    /* Fondo blanco, texto oscuro y un borde inferior ligero */
    <header className="py-4 bg-white text-dark border-bottom">
      <div className="container">
        {/* fw-bold hace que la letra sea negrita (font-weight: bold) */}
        <h1 className="h3 mb-0 fw-bold">Sonido Vivo</h1>
      </div>
    </header>
  );
}

export default Cabecera;