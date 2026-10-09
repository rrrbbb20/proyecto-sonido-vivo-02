import { useState } from "react";
import { Alert, Container, Row, Col } from "react-bootstrap"; 
import { useNavigate } from "react-router-dom";
import FormularioRegistro from "../components/FormularioRegistro"; 

function Registro() {
    const navigate = useNavigate();
    const [mensajeExito, setMensajeExito] = useState("");

    // Función que se ejecuta cuando el formulario pasa todas las validaciones
    function registrar(usuario) {
        console.log("Usuario registrado exitosamente:", usuario);
        
        // Simulamos guardar el usuario en el navegador
        const usuariosGuardados = JSON.parse(localStorage.getItem("usuariosSonidoVivo")) || [];
        usuariosGuardados.push(usuario);
        localStorage.setItem("usuariosSonidoVivo", JSON.stringify(usuariosGuardados));

        setMensajeExito("¡Cuenta creada con éxito! Redirigiendo a inicio...");
        
        // Redirección SPA después de 2 segundos
        setTimeout(() => {
            navigate("/");
        }, 2000);
    }

    return (
        <Container id="pagina-registro" className="py-5">
            
            {/* Centramos el contenido horizontalmente */}
            <Row className="justify-content-center">
                
                {/* Aplicamos la grilla responsiva: celular 100%, tablet 66%, PC 50% */}
                <Col xs={12} md={8} lg={6}>
                    
                    <header className="text-center mb-4">
                        <h1 className="fw-bold">Regístrate y Forma Parte de SONIDO VIVO</h1>
                        <p className="text-muted">
                            Crea tu cuenta para realizar compras y hacer seguimiento a tus envíos.
                        </p>
                    </header>

                    {mensajeExito && (
                        <Alert variant="success" className="text-center">
                            {mensajeExito}
                        </Alert>
                    )}

                    <section>
                        {/* Insertamos tu componente reutilizable y le pasamos la función */}
                        <FormularioRegistro onRegistrar={registrar} />
                    </section>

                </Col>
            </Row>

        </Container>
    );
}

export default Registro;