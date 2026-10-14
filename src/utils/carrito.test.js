import { describe, it, expect } from 'vitest'
import { agregarProductoAlCarrito } from './carrito'

// Pruebas de la función que agrega productos al carrito
describe('agregarProductoAlCarrito', () => {
  it('agrega un producto nuevo con cantidad uno', () => {
    const carrito = []
    const producto = {
      id: 1,
      nombre: 'Guitarra eléctrica',
      precio: 319990,
      stock: 3
    }

    const resultado = agregarProductoAlCarrito(carrito, producto)

    expect(resultado).toEqual([
      { ...producto, cantidad: 1 }
    ])
  })

  it('aumenta la cantidad de un producto existente', () => {
    const producto = {
        id: 1,
        nombre: 'Guitarra eléctrica',
        precio: 319990,
        stock: 3
    }

    const carrito = [
        { ...producto, cantidad: 1 }
    ]

    const resultado = agregarProductoAlCarrito(carrito, producto)

    expect(resultado[0].cantidad).toBe(2)
  })

  it('no agrega productos cuando el stock es cero', () => {
    const carrito = []
    const producto = {
        id: 1,
        nombre: 'Guitarra eléctrica',
        precio: 319990,
        stock: 0
    }

    const resultado = agregarProductoAlCarrito(carrito, producto)

    expect(resultado).toEqual([])
  })

  it('no permite superar el stock disponible', () => {
    const producto = {
        id: 1,
        nombre: 'Guitarra eléctrica',
        precio: 319990,
        stock: 3
    }

    const carrito = [
        { ...producto, cantidad: 3 }
    ]

    const resultado = agregarProductoAlCarrito(carrito, producto)

    expect(resultado).toEqual(carrito)
  })
})