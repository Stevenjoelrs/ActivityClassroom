import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ApuntesView from '../views/estudiante/ApuntesView.vue'

vi.mock('../services/apuntes.js', () => ({
  obtenerEstudiantes: vi.fn().mockResolvedValue([
    { id: 1, nombre: 'Ana Pérez' },
    { id: 2, nombre: 'Carlos Ruiz' },
  ]),
  obtenerMaterias: vi.fn().mockResolvedValue([
    { id: 1, nombre: 'Sistemas de Información 2' },
    { id: 2, nombre: 'Base de Datos' },
  ]),
  obtenerApuntes: vi.fn().mockResolvedValue([
    {
      id: 1,
      materia_id: 1,
      materia: 'Sistemas de Información 2',
      titulo: 'Diagramas CRC',
      contenido: 'Clases, responsabilidades y colaboraciones.',
      fecha_creacion: '2026-11-02T10:00:00.000Z',
    },
  ]),
  crearApunte: vi.fn().mockResolvedValue({ id: 2 }),
  editarApunte: vi.fn().mockResolvedValue({ id: 1 }),
  eliminarApunte: vi.fn().mockResolvedValue({ mensaje: 'Eliminado' }),
}))

describe('HU-06 Frontend - Gestión de Apuntes de Clase', () => {
  it('ApuntesView renderiza listado de notas, filtros y selector de estudiante', async () => {
    const wrapper = mount(ApuntesView)
    await new Promise((r) => setTimeout(r, 20))

    expect(wrapper.text()).toContain('Gestión de Apuntes de Clase')
    expect(wrapper.find('select#select-estudiante-apuntes').exists()).toBe(true)
    expect(wrapper.find('select#filtro-materia').exists()).toBe(true)
    expect(wrapper.text()).toContain('Diagramas CRC')
    expect(wrapper.text()).toContain('Clases, responsabilidades y colaboraciones.')
  })

  it('permite abrir el formulario para crear un nuevo apunte', async () => {
    const wrapper = mount(ApuntesView)
    await new Promise((r) => setTimeout(r, 20))

    const botonNuevo = wrapper.find('.controles-cabecera button')
    await botonNuevo.trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.find('section.formulario-apunte').exists()).toBe(true)
    expect(wrapper.find('input#titulo-apunte').exists()).toBe(true)
    expect(wrapper.find('textarea#contenido-apunte').exists()).toBe(true)
  })
})
