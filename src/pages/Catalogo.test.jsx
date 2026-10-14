import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Catalogo from './Catalogo'

// Pruebas del componente Catálogo
describe('Catalogo', () => {
  it('actualiza el carrito al presionar Agregar al carrito', () => {
    const producto = {
      id: 1,
      nombre: 'Guitarra eléctrica',
      categoria: 'guitarras',
      categoriaNombre: 'Guitarras',
      precio: 319990,
      stock: 3
    }

    // Simula la función que actualiza el carrito
    const setCarrito = vi.fn()

    render(
      <Catalogo
        productos={[producto]}
        carrito={[]}
        setCarrito={setCarrito}
      />
    )

    // Simula que el usuario presiona el botón
    fireEvent.click(
      screen.getByRole('button', { name: 'Agregar al carrito' })
    )

    // Comprueba que se actualiza el carrito con una unidad
    expect(setCarrito).toHaveBeenCalledWith([
      { ...producto, cantidad: 1 }
    ])
  })

  it('filtra los productos al escribir en el buscador', () => {
    const productos = [
        {
        id: 1,
        nombre: 'Guitarra eléctrica',
        categoria: 'guitarras',
        categoriaNombre: 'Guitarras',
        precio: 319990,
        stock: 3
        },
        {
        id: 2,
        nombre: 'Micrófono',
        categoria: 'microfonos',
        categoriaNombre: 'Micrófonos',
        precio: 49990,
        stock: 5
        }
    ]

    render(
        <Catalogo
        productos={productos}
        carrito={[]}
        setCarrito={vi.fn()}
        />
    )

    // Escribe el nombre de un producto en el buscador
    fireEvent.change(screen.getByPlaceholderText('Buscar productos...'), {
        target: { value: 'Guitarra' }
    })

    // Comprueba que solo aparece el producto buscado
    expect(screen.getByText('Guitarra eléctrica')).toBeInTheDocument()
    expect(screen.queryByText('Micrófono')).not.toBeInTheDocument()
  })

  
})