<script setup>
import { reactive, ref } from 'vue'
import { Users, Search } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { consultarGrupos, registrarGrupo } from '@/services/grupos.js'

const grupo = reactive({
  nombre: '',
  actividadId: '',
  modalidad: 'afinidad',
  maximoIntegrantes: null,
})

const integrantesTexto = ref('')
const guardando = ref(false)
const mensajeRegistro = ref('')
const errorRegistro = ref('')

const actividadConsulta = ref('')
const grupos = ref([])
const consultando = ref(false)
const consultado = ref(false)
const errorConsulta = ref('')

async function registrar() {
  guardando.value = true
  mensajeRegistro.value = ''
  errorRegistro.value = ''

  try {
    const integrantes = integrantesTexto.value
      .split('\n')
      .map((linea) => linea.trim())
      .filter(Boolean)

    const datos = {
      nombre: grupo.nombre.trim(),
      actividadId: grupo.actividadId.trim(),
      modalidad: grupo.modalidad,
      integrantes,
      maximoIntegrantes:
        grupo.maximoIntegrantes && Number(grupo.maximoIntegrantes) > 0
          ? Number(grupo.maximoIntegrantes)
          : null,
    }

    const resultado = await registrarGrupo(datos)
    mensajeRegistro.value = `Grupo "${resultado.grupo?.nombre || datos.nombre}" registrado exitosamente.`
    grupo.nombre = ''
    integrantesTexto.value = ''
    grupo.maximoIntegrantes = null

    if (actividadConsulta.value.trim() === datos.actividadId) {
      await consultar()
    }
  } catch (err) {
    errorRegistro.value = err.message
  } finally {
    guardando.value = false
  }
}

async function consultar() {
  consultando.value = true
  errorConsulta.value = ''
  grupos.value = []
  consultado.value = false

  try {
    const respuesta = await consultarGrupos(actividadConsulta.value.trim())
    grupos.value = respuesta.grupos || []
    consultado.value = true
  } catch (err) {
    errorConsulta.value = err.message
  } finally {
    consultando.value = false
  }
}
</script>

<template>
  <section class="tarjeta">
    <h1>Grupos de trabajo</h1>

    <section aria-labelledby="titulo-registro-grupo">
      <h2 id="titulo-registro-grupo">Registrar grupo</h2>
      <form class="formulario-academico" @submit.prevent="registrar">
        <fieldset :disabled="guardando">
          <div class="grupo-campo">
            <label class="etiqueta" for="grupo-nombre">Nombre del grupo</label>
            <input
              id="grupo-nombre"
              v-model="grupo.nombre"
              class="campo"
              required
              maxlength="128"
            />
          </div>

          <div class="grupo-campo">
            <label class="etiqueta" for="grupo-actividad">Identificador de la actividad</label>
            <input
              id="grupo-actividad"
              v-model="grupo.actividadId"
              class="campo"
              required
              maxlength="64"
            />
          </div>

          <div class="grupo-campo">
            <label class="etiqueta" for="grupo-modalidad">Modalidad</label>
            <select
              id="grupo-modalidad"
              v-model="grupo.modalidad"
              class="campo"
              required
            >
              <option value="afinidad">Afinidad</option>
              <option value="sorteo">Sorteo</option>
            </select>
          </div>

          <div class="grupo-campo">
            <label class="etiqueta" for="grupo-integrantes">
              Integrantes (uno por línea)
            </label>
            <textarea
              id="grupo-integrantes"
              v-model="integrantesTexto"
              class="campo"
              required
              aria-describedby="ayuda-integrantes"
            />
            <small id="ayuda-integrantes" class="texto-secundario">
              Escribe un identificador de estudiante por línea.
            </small>
          </div>

          <div class="grupo-campo">
            <label class="etiqueta" for="grupo-maximo">
              Tamaño máximo (opcional)
            </label>
            <input
              id="grupo-maximo"
              v-model.number="grupo.maximoIntegrantes"
              class="campo"
              type="number"
              min="1"
            />
          </div>

          <Button type="submit" :disabled="guardando">
            <Users aria-hidden="true" />
            {{ guardando ? 'Registrando…' : 'Registrar grupo' }}
          </Button>
        </fieldset>
      </form>

      <p v-if="mensajeRegistro" class="aviso aviso--exito" role="status">
        {{ mensajeRegistro }}
      </p>
      <p v-if="errorRegistro" class="aviso aviso--error" role="alert">
        {{ errorRegistro }}
      </p>
    </section>

    <section aria-labelledby="titulo-consulta-grupos">
      <h2 id="titulo-consulta-grupos">Consultar grupos por actividad</h2>
      <form class="formulario-academico" @submit.prevent="consultar">
        <div class="grupo-campo">
          <label class="etiqueta" for="consulta-actividad">Identificador de la actividad</label>
          <input
            id="consulta-actividad"
            v-model="actividadConsulta"
            class="campo"
            required
            maxlength="64"
            :disabled="consultando"
          />
        </div>
        <Button type="submit" :disabled="consultando">
          <Search aria-hidden="true" />
          {{ consultando ? 'Consultando…' : 'Consultar grupos' }}
        </Button>
      </form>

      <p v-if="errorConsulta" class="aviso aviso--error" role="alert">
        {{ errorConsulta }}
      </p>

      <p
        v-if="consultado && !grupos.length"
        class="aviso aviso--info"
        role="status"
      >
        Sin grupos registrados para esta actividad.
      </p>

      <ul v-if="grupos.length" class="lista-tarjetas">
        <li v-for="item in grupos" :key="item.nombre" class="tarjeta">
          <h3>{{ item.nombre }}</h3>
          <p>
            <strong>Modalidad:</strong>
            {{ item.modalidad === 'afinidad' ? 'Afinidad' : 'Sorteo' }}
          </p>
          <p>
            <strong>Integrantes ({{ item.integrantes.length }}):</strong>
            {{ item.integrantes.join(', ') }}
          </p>
          <p v-if="item.maximoIntegrantes">
            <strong>Máximo permitido:</strong>
            {{ item.maximoIntegrantes }}
          </p>
        </li>
      </ul>
    </section>
  </section>
</template>
