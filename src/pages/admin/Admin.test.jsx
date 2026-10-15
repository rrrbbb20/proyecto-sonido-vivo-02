import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Admin from './Admin'

// Pruebas del módulo de administración
describe('Admin', () => {
  it('no permite registrar trabajadores con correos repetidos', () => {
    // Prepara un trabajador que ya está registrado
    const trabajadores = [
      {
        id: 1,
        nombre: 'Juan',
        apellido: 'Pérez',
        correo: 'juan@correo.cl',
        direccion: 'Calle Principal 123',
        rol: 'vendedor'
      }
    ]

    localStorage.setItem(
      'trabajadoresSonidoVivo',
      JSON.stringify(trabajadores)
    )

    render(<Admin />)

    // Completa el formulario con un correo repetido
    fireEvent.change(document.querySelector('[name="nombre"]'), {
      target: { value: 'Pedro' }
    })

    fireEvent.change(document.querySelector('[name="apellido"]'), {
      target: { value: 'González' }
    })

    fireEvent.change(document.querySelector('[name="correo"]'), {
      target: { value: 'juan@correo.cl' }
    })

    fireEvent.change(document.querySelector('[name="direccion"]'), {
      target: { value: 'Calle Nueva 456' }
    })

    fireEvent.change(document.querySelector('[name="rol"]'), {
      target: { value: 'administrador' }
    })

    fireEvent.change(document.querySelector('[name="contrasena"]'), {
      target: { value: '12345678' }
    })

    // Intenta registrar al nuevo trabajador
    fireEvent.click(
      screen.getByRole('button', { name: 'Registrar trabajador' })
    )

    // Comprueba que se muestra el mensaje de error
    expect(
      screen.getByText('Ya existe un trabajador con este correo.')
    ).toBeInTheDocument()
  })
})