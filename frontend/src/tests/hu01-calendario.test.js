import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import CalendarioView from '../views/estudiante/CalendarioView.vue'
import EventosView from '../views/docente/EventosView.vue'

vi.mock('../services/calendario.js', () => ({
  consultarCalendario: vi.fn().mockResolvedValue({
    mensaje: '',
    eventos: [
      {
        id: 'EV-01',
        tipo: 'clase',
        fecha: '2026-11-10',
        horario: '08:00 - 10:00',
        descripcion: 'Clase magistral',
        suspendido: false,
      },
      {
        id: 'EV-02',
        tipo: 'clase',
        fecha: '2026-11-12',
        horario: '10:00 - 12:00',
        descripcion: 'Clase de laboratorio',
        suspendido: true,
      },
    ],
  }),
  registrarEvento: vi.fn().mockResolvedValue({
    evento: { id: 'EV-03', descripcion: 'Nueva entrega' },
  }),
}))

describe('HU-01 Frontend - Calendario Académico', () => {
  it('CalendarioView renderiza título, formulario de consulta y botón', () => {
    const wrapper = mount(CalendarioView)
    expect(wrapper.text()).toContain('Calendario académico')
    // El campo usa id="materia" (sin sufijo -calendario)
    expect(wrapper.find('input#materia').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
  })

  it('CalendarioView muestra eventos consultados y badge de suspensión', async () => {
    const wrapper = mount(CalendarioView)
    await wrapper.find('form').trigger('submit.prevent')
    await wrapper.vm.$nextTick()
    // Esperar a que la promesa resuelva
    await new Promise((r) => setTimeout(r, 10))

    expect(wrapper.text()).toContain('Clase magistral')
    expect(wrapper.text()).toContain('Clase de laboratorio')
    expect(wrapper.text()).toContain('Clase suspendida')
  })

  it('EventosView renderiza campos de registro de eventos docentes', () => {
    const wrapper = mount(EventosView)
    // El h1 dice "Registrar evento académico"
    expect(wrapper.text()).toContain('Registrar evento académico')
    expect(wrapper.find('input#evento-id').exists()).toBe(true)
    expect(wrapper.find('input#evento-materia').exists()).toBe(true)
    expect(wrapper.find('select#evento-tipo').exists()).toBe(true)
    expect(wrapper.find('input#evento-fecha').exists()).toBe(true)
  })
})
