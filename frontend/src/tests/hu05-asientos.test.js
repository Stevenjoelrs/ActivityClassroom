import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import AsientosView from '../views/docente/AsientosView.vue'

vi.mock('../services/asientos.js', () => ({
  obtenerEstudiantes: vi.fn().mockResolvedValue([
    { id: 1, nombre: 'Ana Pérez', matricula: 'EST-01' },
    { id: 2, nombre: 'Carlos Ruiz', matricula: 'EST-02' },
  ]),
  obtenerAsientos: vi.fn().mockResolvedValue([
    { asiento: 1, estudiante_id: 1, nombre: 'Ana Pérez', matricula: 'EST-01' },
  ]),
  obtenerAsistencia: vi.fn().mockResolvedValue([
    { estudiante_id: 1, nombre: 'Ana Pérez', matricula: 'EST-01', estado: 'Presente' },
    { estudiante_id: 2, nombre: 'Carlos Ruiz', matricula: 'EST-02', estado: 'Ausente' },
  ]),
  asignarAsiento: vi.fn().mockResolvedValue({ asiento: 2, estudiante_id: 2 }),
  liberarAsiento: vi.fn().mockResolvedValue({ asiento: 1 }),
  actualizarAsistencia: vi.fn().mockResolvedValue({ estudiante_id: 2, estado: 'Presente' }),
}))

describe('HU-05 Frontend - Asignación de Asientos y Asistencia', () => {
  it('AsientosView renderiza 50 asientos en la cuadrícula de aula', async () => {
    const wrapper = mount(AsientosView)
    await new Promise((r) => setTimeout(r, 20))

    const asientos = wrapper.findAll('.asiento-btn')
    expect(asientos.length).toBe(50)
    expect(asientos[0].text()).toContain('#1')
    expect(asientos[49].text()).toContain('#50')
  })

  it('permite alternar entre pestaña de Mapa de Asientos y Control de Asistencia', async () => {
    const wrapper = mount(AsientosView)
    await new Promise((r) => setTimeout(r, 20))

    expect(wrapper.find('.cuadricula-asientos').exists()).toBe(true)
    const pestanas = wrapper.findAll('.pestanas button')
    expect(pestanas.length).toBe(2)

    // Click en Control de Asistencia
    await pestanas[1].trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.tabla-asistencia').exists()).toBe(true)
    expect(wrapper.text()).toContain('Control de Asistencia')
  })
})
