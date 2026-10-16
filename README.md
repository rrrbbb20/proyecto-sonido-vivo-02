# Sonido Vivo V2

Proyecto desarrollado para la asignatura **Desarrollo Full Stack II de Duoc UC**.

Sonido Vivo V2 es una aplicación web orientada a la venta de instrumentos musicales, equipos de sonido y accesorios. Su objetivo es permitir a los usuarios consultar productos, revisar su disponibilidad y gestionar un carrito de compras mediante una interfaz sencilla y adaptable a distintos dispositivos.

Esta segunda versión corresponde a la migración del proyecto original a **React**, incorporando componentes reutilizables, manejo de estados, navegación y pruebas automatizadas.

## Tecnologías utilizadas

- React
- Vite
- JavaScript
- React Bootstrap y Bootstrap
- React Router
- Vitest
- React Testing Library
- Git y GitHub
- AWS EC2, Ubuntu Server y Nginx

## Funcionalidades

**Catálogo de productos**
- Visualización de productos musicales.
- Búsqueda y filtros.
- Consulta del detalle de cada producto.
- Visualización de precios y disponibilidad.

**Carrito de compras**
- Agregar productos al carrito.
- Aumentar o disminuir cantidades.
- Eliminar productos.
- Calcular el total de la compra.
- Controlar las cantidades según el stock disponible.

**Usuarios**
- Formulario de registro con validaciones.
- Inicio de sesión.
- Navegación entre las distintas secciones de la aplicación.

**Administración**
- Registro y listado de trabajadores.
- Edición y eliminación de trabajadores.
- Búsqueda y filtros por rol.
- Validación de correos duplicados.
- Administración de productos e inventario.

## Instalación del proyecto

Para ejecutar el proyecto localmente es necesario contar con Node.js y npm instalados.

**1. Clonar el repositorio**

```bash
git clone https://github.com/rrrbbb20/proyecto-sonido-vivo-02.git
```

**2. Ingresar al directorio**

```bash
cd proyecto-sonido-vivo-02
```

**3. Instalar dependencias**

```bash
npm install
```

**4. Iniciar el servidor de desarrollo**

```bash
npm run dev
```

Vite mostrará una dirección local para abrir la aplicación en el navegador.

## Pruebas automatizadas

El proyecto utiliza Vitest y React Testing Library para verificar el comportamiento de las funciones y componentes.

Las pruebas incluyen validaciones de formularios, operaciones del carrito, control de stock, catálogo, registro de usuarios y administración.

Para ejecutar todas las pruebas:

```bash
npm run test:run
```

Para generar el informe de cobertura:

```bash
npm run coverage
```

### Resultados de la última ejecución

| Métrica | Resultado |
|---|---:|
| Archivos de pruebas | 14 |
| Pruebas aprobadas | 42 |
| Cobertura de sentencias | 89,00 % |
| Cobertura de condiciones | 79,09 % |
| Cobertura de funciones | 90,36 % |
| Cobertura de líneas | 88,97 % |

Estos resultados corresponden a la última ejecución local realizada durante el desarrollo.

**Dirección del despliegue:**

http://54.226.39.182
