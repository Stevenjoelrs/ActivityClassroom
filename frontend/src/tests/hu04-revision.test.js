import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import InicioDocenteView from '../views/docente/InicioDocenteView.vue'

vi.mock('../services/entregas.js', () => ({
  listarEntregas: vi.fn().mockResolvedValue({
    entregas: [
      {
        id: 'ENT-01',
        // La vista usa entrega.remitente (no .estudiante)
        remitente: 'estudiante@est.umss.edu',
        tarea: 'PRACTICA-01',
        estado: 'POR REVISAR',
        adjuntos: [{ nombre: 'tarea.pdf' }],
        recibido: '2026-11-03T10:00:00.000Z',
        correcto: '',
        incorrecto: '',
        corregir: '',
      },
    ],
  }),
  guardarFeedback: vi.fn().mockResolvedValue({
    id: 'ENT-01',
    estado: 'REVISADA',
    correcto: 'Buen código',
    incorrecto: 'Faltan pruebas',
    corregir: 'Añadir tests',
  }),
  enlaceAdjunto: vi.fn().mockReturnValue('/api/revision/entregas/ENT-01/adjunto'),
}))

describe('HU-04 Frontend - Revisión de Tareas y Feedback', () => {
  it('InicioDocenteView renderiza formulario de búsqueda de entregas', () => {
    const wrapper = mount(InicioDocenteView)
    // El h1 dice "Revisión de tareas"
    expect(wrapper.text()).toContain('Revisión de tareas')
    expect(wrapper.find('input#docente-revision').exists()).toBe(true)
    expect(wrapper.find('input#tarea-revision').exists()).toBe(true)
  })

  it('permite listar entregas y muestra los campos de retroalimentación estructurada', async () => {
    const wrapper = mount(InicioDocenteView)
    await wrapper.find('form.formulario-academico').trigger('submit.prevent')
    await new Promise((r) => setTimeout(r, 10))

    expect(wrapper.text()).toContain('estudiante@est.umss.edu')
    expect(wrapper.text()).toContain('POR REVISAR')

    // El botón de entrega tiene clase "seleccionar-entrega" (no "revision-entrega")
    const entregaBtn = wrapper.find('button.seleccionar-entrega')
    expect(entregaBtn.exists()).toBe(true)
    await entregaBtn.trigger('click')
    await wrapper.vm.$nextTick()

    // Los ids del feedback son: correcto, incorrecto, corregir (sin prefijo feedback-)
    expect(wrapper.find('#correcto').exists()).toBe(true)
    expect(wrapper.find('#incorrecto').exists()).toBe(true)
    expect(wrapper.find('#corregir').exists()).toBe(true)
  })
})
