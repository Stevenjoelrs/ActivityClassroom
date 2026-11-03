import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import GruposView from '../views/docente/GruposView.vue'

vi.mock('../services/grupos.js', () => ({
  registrarGrupo: vi.fn().mockResolvedValue({
    grupo: { nombre: 'Grupo Delta', actividadId: 'ACT-01', modalidad: 'afinidad' },
  }),
  consultarGrupos: vi.fn().mockResolvedValue({
    grupos: [
      {
        nombre: 'Grupo Alfa',
        actividadId: 'ACT-01',
        modalidad: 'afinidad',
        integrantes: ['EST-01', 'EST-02'],
      },
    ],
  }),
}))

describe('HU-02 Frontend - Grupos de Trabajo', () => {
  it('GruposView renderiza formulario de registro y consulta por actividad', () => {
    const wrapper = mount(GruposView)
    expect(wrapper.text()).toContain('Grupos de trabajo')
    expect(wrapper.find('input#grupo-nombre').exists()).toBe(true)
    expect(wrapper.find('input#grupo-actividad').exists()).toBe(true)
    expect(wrapper.find('select#grupo-modalidad').exists()).toBe(true)
    expect(wrapper.find('textarea#grupo-integrantes').exists()).toBe(true)
    // El input de consulta tiene id="consulta-actividad" (no "actividad-consulta")
    expect(wrapper.find('input#consulta-actividad').exists()).toBe(true)
  })

  it('permite consultar grupos por actividad y visualiza integrantes', async () => {
    const wrapper = mount(GruposView)
    // Hay dos form.formulario-academico: el segundo es el de búsqueda
    const forms = wrapper.findAll('form.formulario-academico')
    await forms[1].trigger('submit.prevent')
    await new Promise((r) => setTimeout(r, 10))

    expect(wrapper.text()).toContain('Grupo Alfa')
    expect(wrapper.text()).toContain('EST-01')
    expect(wrapper.text()).toContain('EST-02')
  })
})
