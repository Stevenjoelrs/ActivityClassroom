import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import InicioEstudianteView from '../views/estudiante/InicioEstudianteView.vue'

vi.mock('../services/entregas.js', () => ({
  enviarEntrega: vi.fn().mockResolvedValue({
    id: 'ENT-01',
    estado: 'POR REVISAR',
    enviado: '2026-11-03T10:00:00.000Z',
    mensaje: 'Entrega enviada con éxito',
  }),
}))

describe('HU-03 Frontend - Envío de Tareas por Correo', () => {
  it('InicioEstudianteView renderiza formulario de envío con campos requeridos', () => {
    const wrapper = mount(InicioEstudianteView)
    // El h1 dice "Enviar tarea" (no "Envío de tareas")
    expect(wrapper.text()).toContain('Enviar tarea')
    // IDs reales: remitente, destinatario, tarea, archivo (sin sufijo -entrega)
    expect(wrapper.find('input#remitente').exists()).toBe(true)
    expect(wrapper.find('input#destinatario').exists()).toBe(true)
    expect(wrapper.find('input#tarea').exists()).toBe(true)
    expect(wrapper.find('input#archivo').exists()).toBe(true)
    // El checkbox de simular fallo es un input[type=checkbox] dentro de label.opcion-simulacion
    expect(wrapper.find('label.opcion-simulacion input[type="checkbox"]').exists()).toBe(true)
  })

  it('el input de archivo requiere formatos válidos .pdf, .docx, .zip', () => {
    const wrapper = mount(InicioEstudianteView)
    const fileInput = wrapper.find('input#archivo')
    expect(fileInput.attributes('accept')).toContain('.pdf')
    expect(fileInput.attributes('accept')).toContain('.docx')
    expect(fileInput.attributes('accept')).toContain('.zip')
  })
})
