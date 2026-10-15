import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Carrito from './Carrito'

// Pruebas del componente Carrito
describe('Carrito', () => {
  it('aumenta la cantidad de un producto al presionar el botón más', () => {
    const producto = {
      id: 1,
      nombre: 'Guitarra eléctrica',
      precio: 319990,
      stock: 3,
      cantidad: 1
    }

    // Simula la función que actualiza el carrito
    const setCarrito = vi.fn()

    render(
      <MemoryRouter>
        <Carrito carrito={[producto]} setCarrito={setCarrito} />
      </MemoryRouter>
    )

    // Simula que el usuario presiona el botón +
    fireEvent.click(screen.getByRole('button', { name: '+' }))

    // Comprueba que la cantidad aumentó de uno a dos
    expect(setCarrito).toHaveBeenCalledWith([
      { ...producto, cantidad: 2 }
    ])
  })

  it('disminuye la cantidad de un producto al presionar el botón menos', () => {
    const producto = {
        id: 1,
        nombre: 'Guitarra eléctrica',
        precio: 319990,
        stock: 3,
        cantidad: 2
    }

    // Simula la función que actualiza el carrito
    const setCarrito = vi.fn()

    render(
        <MemoryRouter>
        <Carrito carrito={[producto]} setCarrito={setCarrito} />
        </MemoryRouter>
    )

    // Simula que el usuario presiona el botón -
    fireEvent.click(screen.getByRole('button', { name: '-' }))

    // Comprueba que la cantidad disminuyó de dos a uno
    expect(setCarrito).toHaveBeenCalledWith([
        { ...producto, cantidad: 1 }
    ])
  })

  it('elimina un producto del carrito al presionar Eliminar', () => {
    const producto = {
        id: 1,
        nombre: 'Guitarra eléctrica',
        precio: 319990,
        stock: 3,
        cantidad: 2
    }

    // Simula la función que actualiza el carrito
    const setCarrito = vi.fn()

    render(
        <MemoryRouter>
        <Carrito carrito={[producto]} setCarrito={setCarrito} />
        </MemoryRouter>
    )

    // Simula que el usuario presiona Eliminar
    fireEvent.click(screen.getByRole('button', { name: 'Eliminar' }))

    // Comprueba que el producto fue eliminado del carrito
    expect(setCarrito).toHaveBeenCalledWith([])
  })
})