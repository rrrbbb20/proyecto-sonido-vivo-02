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

  it('registra un trabajador nuevo y lo guarda en localStorage', () => {
    // Comienza con una lista vacía
    localStorage.removeItem('trabajadoresSonidoVivo')

    render(<Admin />)

    // Completa los datos del trabajador
    fireEvent.change(document.querySelector('[name="nombre"]'), {
      target: { value: 'Pedro' }
    })

    fireEvent.change(document.querySelector('[name="apellido"]'), {
      target: { value: 'González' }
    })

    fireEvent.change(document.querySelector('[name="correo"]'), {
      target: { value: 'pedro@correo.cl' }
    })

    fireEvent.change(document.querySelector('[name="direccion"]'), {
      target: { value: 'Calle Nueva 456' }
    })

    fireEvent.change(document.querySelector('[name="rol"]'), {
      target: { value: 'vendedor' }
    })

    fireEvent.change(document.querySelector('[name="contrasena"]'), {
      target: { value: '12345678' }
    })

    // Registra al trabajador
    fireEvent.click(
      screen.getByRole('button', { name: 'Registrar trabajador' })
    )

    // Comprueba los datos almacenados
    const trabajadores = JSON.parse(
      localStorage.getItem('trabajadoresSonidoVivo')
    )

    expect(trabajadores).toHaveLength(1)
    expect(trabajadores[0].id).toBe(1)
    expect(trabajadores[0].nombre).toBe('Pedro')
    expect(trabajadores[0].correo).toBe('pedro@correo.cl')

    // La contraseña no debe quedar almacenada
    expect(trabajadores[0]).not.toHaveProperty('contrasena')
  })

  it('elimina un trabajador y actualiza localStorage', () => {
    // Prepara dos trabajadores registrados
    const trabajadores = [
      {
        id: 1,
        nombre: 'Juan',
        apellido: 'Pérez',
        correo: 'juan@correo.cl',
        direccion: 'Calle Principal 123',
        rol: 'vendedor'
      },
      {
        id: 2,
        nombre: 'Pedro',
        apellido: 'González',
        correo: 'pedro@correo.cl',
        direccion: 'Calle Nueva 456',
        rol: 'administrador'
      }
    ]

    localStorage.setItem(
      'trabajadoresSonidoVivo',
      JSON.stringify(trabajadores)
    )

    render(<Admin />)

    // Comprueba que ambos trabajadores aparecen
    expect(screen.getByText('Juan Pérez')).toBeInTheDocument()
    expect(screen.getByText('Pedro González')).toBeInTheDocument()

    // Elimina al primer trabajador
    fireEvent.click(screen.getAllByRole('button', { name: 'Eliminar' })[0])

    // Comprueba que Juan desaparece de la lista
    expect(screen.queryByText('Juan Pérez')).not.toBeInTheDocument()
    expect(screen.getByText('Pedro González')).toBeInTheDocument()

    // Comprueba que localStorage también se actualizó
    const guardados = JSON.parse(
      localStorage.getItem('trabajadoresSonidoVivo')
    )

    expect(guardados).toHaveLength(1)
    expect(guardados[0].id).toBe(2)
  })

  it('edita un trabajador y guarda sus cambios', () => {
    // Prepara un trabajador registrado
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

    // Selecciona el trabajador para editar
    fireEvent.click(
      screen.getByRole('button', { name: 'Editar' })
    )

    // Comprueba que el formulario cambió a modo edición
    expect(
      screen.getByRole('heading', { name: 'Editar trabajador' })
    ).toBeInTheDocument()

    // Modifica el nombre y la dirección
    fireEvent.change(document.querySelector('[name="nombre"]'), {
      target: { value: 'Juan Carlos' }
    })

    fireEvent.change(document.querySelector('[name="direccion"]'), {
      target: { value: 'Nueva Dirección 456' }
    })

    // Guarda los cambios
    fireEvent.click(
      screen.getByRole('button', { name: 'Guardar cambios' })
    )

    // Comprueba que se actualizaron los datos en pantalla
    expect(screen.getByText('Juan Carlos Pérez')).toBeInTheDocument()

    // Comprueba que localStorage contiene los datos actualizados
    const guardados = JSON.parse(
      localStorage.getItem('trabajadoresSonidoVivo')
    )

    expect(guardados).toHaveLength(1)
    expect(guardados[0].id).toBe(1)
    expect(guardados[0].nombre).toBe('Juan Carlos')
    expect(guardados[0].direccion).toBe('Nueva Dirección 456')
  })

  it('cancela la edición sin modificar al trabajador', () => {
    // Prepara un trabajador registrado
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

    // Selecciona al trabajador para editar
    fireEvent.click(
      screen.getByRole('button', { name: 'Editar' })
    )

    // Modifica el nombre, pero sin guardar
    fireEvent.change(document.querySelector('[name="nombre"]'), {
      target: { value: 'Juan Carlos' }
    })

    // Cancela la edición
    fireEvent.click(
      screen.getByRole('button', { name: 'Cancelar edición' })
    )

    // Comprueba que volvió al formulario de registro
    expect(
      screen.getByRole('heading', { name: 'Registrar trabajador' })
    ).toBeInTheDocument()

    // Comprueba que el formulario quedó limpio
    expect(
      document.querySelector('[name="nombre"]')
    ).toHaveValue('')

    // Comprueba que los datos originales no cambiaron
    const guardados = JSON.parse(
      localStorage.getItem('trabajadoresSonidoVivo')
    )

    expect(guardados).toHaveLength(1)
    expect(guardados[0].nombre).toBe('Juan')
  })
})