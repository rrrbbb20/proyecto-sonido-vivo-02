import { useState } from "react";
import { Form, Button } from "react-bootstrap";

function FormularioRegistro({ onRegistrar }) {
    const [datos, setDatos] = useState({
        nombre: "", apellido: "", correo: "", rut: "", telefono: "", direccion: "", contrasena: "", terminos: false
    });
    
    const [errores, setErrores] = useState({});

    const cambiarDato = (evento) => {
        const { name, value, type, checked } = evento.target;
        const valorReal = type === "checkbox" ? checked : value;
        
        setDatos({ ...datos, [name]: valorReal });
        setErrores({ ...errores, [name]: "" }); 
    };

    const enviarFormulario = (evento) => {
        evento.preventDefault();
        const nuevosErrores = {};

        // 1 y 2. VALIDAR NOMBRE Y APELLIDO
        if (!datos.nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio.";
        if (!datos.apellido.trim()) nuevosErrores.apellido = "El apellido es obligatorio.";

        // 3. VALIDAR CORREO (Tu lógica)
        const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!datos.correo.trim()) {
            nuevosErrores.correo = "El correo electrónico es obligatorio.";
        } else if (!formatoCorreo.test(datos.correo)) {
            nuevosErrores.correo = "Ingresa un correo electrónico válido.";
        }

        // 4. VALIDAR RUT (Tu formato estricto + Módulo 11)
        const formatoRut = /^\d{7,8}-[\dkK]$/;
        if (!datos.rut.trim()) {
            nuevosErrores.rut = "El RUT es obligatorio.";
        } else if (!formatoRut.test(datos.rut)) {
            nuevosErrores.rut = "Ingresa el RUT en formato 12345678-9.";
        } else {
            const partes = datos.rut.split("-");
            const cuerpo = partes[0];
            const digitoVerificador = partes[1].toUpperCase();
            let suma = 0;
            let multiplicador = 2;

            for (let i = cuerpo.length - 1; i >= 0; i--) {
                suma += Number(cuerpo[i]) * multiplicador;
                multiplicador++;
                if (multiplicador > 7) multiplicador = 2;
            }

            const resto = 11 - (suma % 11);
            let digitoCalculado = resto === 11 ? "0" : resto === 10 ? "K" : String(resto);

            if (digitoCalculado !== digitoVerificador) {
                nuevosErrores.rut = "El RUT ingresado no es válido.";
            }
        }

        // 5. VALIDAR TELÉFONO (Tu lógica)
        const formatoTelefono = /^[0-9]{9}$/;
        if (!datos.telefono.trim()) {
            nuevosErrores.telefono = "El celular es obligatorio.";
        } else if (!formatoTelefono.test(datos.telefono)) {
            nuevosErrores.telefono = "El celular debe tener 9 números.";
        }

        // 6. VALIDAR DIRECCIÓN (Tu lógica)
        if (!datos.direccion.trim()) {
            nuevosErrores.direccion = "La dirección es obligatoria.";
        } else if (datos.direccion.length < 5) {
            nuevosErrores.direccion = "La dirección debe tener al menos 5 caracteres.";
        }

        // 7. VALIDAR CONTRASEÑA (Tu lógica)
        if (!datos.contrasena) {
            nuevosErrores.contrasena = "La contraseña es obligatoria.";
        } else if (datos.contrasena.length < 8 || datos.contrasena.length > 12) {
            nuevosErrores.contrasena = "La contraseña debe tener entre 8 y 12 caracteres.";
        }

        // 8. VALIDAR TÉRMINOS (Adaptado a React)
        if (!datos.terminos) {
            nuevosErrores.terminos = "Debes aceptar los Términos y Condiciones.";
        }

        // Si hay errores, los mostramos en pantalla y detenemos el envío
        if (Object.keys(nuevosErrores).length > 0) {
            setErrores(nuevosErrores);
            return;
        }

        onRegistrar(datos);
    };

    return (
        <Form onSubmit={enviarFormulario} className="p-4 border rounded bg-white shadow-sm" noValidate>
            
            <div className="row">
                <Form.Group className="mb-3 col-md-6" controlId="nombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" name="nombre" value={datos.nombre} onChange={cambiarDato} isInvalid={Boolean(errores.nombre)} />
                    <Form.Control.Feedback type="invalid">{errores.nombre}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3 col-md-6" controlId="apellido">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control type="text" name="apellido" value={datos.apellido} onChange={cambiarDato} isInvalid={Boolean(errores.apellido)} />
                    <Form.Control.Feedback type="invalid">{errores.apellido}</Form.Control.Feedback>
                </Form.Group>
            </div>

            <div className="row">
                <Form.Group className="mb-3 col-md-6" controlId="correo">
                    <Form.Label>Correo electrónico</Form.Label>
                    <Form.Control type="email" name="correo" placeholder="ejemplo@correo.cl" value={datos.correo} onChange={cambiarDato} isInvalid={Boolean(errores.correo)} />
                    <Form.Control.Feedback type="invalid">{errores.correo}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3 col-md-6" controlId="rut">
                    <Form.Label>RUT</Form.Label>
                    <Form.Control type="text" name="rut" placeholder="12345678-9" value={datos.rut} onChange={cambiarDato} isInvalid={Boolean(errores.rut)} />
                    <Form.Control.Feedback type="invalid">{errores.rut}</Form.Control.Feedback>
                </Form.Group>
            </div>

            <div className="row">
                <Form.Group className="mb-3 col-md-6" controlId="telefono">
                    <Form.Label>Celular</Form.Label>
                    <Form.Control type="tel" name="telefono" placeholder="912345678" value={datos.telefono} onChange={cambiarDato} isInvalid={Boolean(errores.telefono)} />
                    <Form.Control.Feedback type="invalid">{errores.telefono}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3 col-md-6" controlId="direccion">
                    <Form.Label>Dirección de envío</Form.Label>
                    <Form.Control type="text" name="direccion" placeholder="Ej: Pasaje Los Pinos 123" value={datos.direccion} onChange={cambiarDato} isInvalid={Boolean(errores.direccion)} />
                    <Form.Control.Feedback type="invalid">{errores.direccion}</Form.Control.Feedback>
                </Form.Group>
            </div>

            <Form.Group className="mb-3" controlId="contrasena">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" name="contrasena" placeholder="Entre 8 y 12 caracteres" value={datos.contrasena} onChange={cambiarDato} isInvalid={Boolean(errores.contrasena)} />
                <Form.Control.Feedback type="invalid">{errores.contrasena}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4" controlId="terminos">
                <Form.Check type="checkbox" name="terminos" label="Acepto los Términos y Condiciones" checked={datos.terminos} onChange={cambiarDato} isInvalid={Boolean(errores.terminos)} />
                <Form.Control.Feedback type="invalid">{errores.terminos}</Form.Control.Feedback>
            </Form.Group>

            <Button variant="dark" type="submit" className="w-100 fw-bold py-2">
                Registrarme
            </Button>
        </Form>
    );
}

export default FormularioRegistro;