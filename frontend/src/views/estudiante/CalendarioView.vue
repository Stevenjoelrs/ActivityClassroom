<script setup>
import { ref } from 'vue'
import { CalendarDays } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { consultarCalendario } from '@/services/calendario.js'

const materia = ref('MAT-101')
const eventos = ref([])
const mensaje = ref('')
const error = ref('')
const cargando = ref(false)
const consultado = ref(false)

const TIPOS_LEGIBLES = {
  clase: 'Clase',
  entrega_tarea: 'Entrega de tarea',
  actividad: 'Actividad académica',
  suspension: 'Suspensión',
}

function formatearFecha(fechaStr) {
  if (!fechaStr) return ''
  const fechaUtc = new Date(`${fechaStr}T00:00:00Z`)
  return Number.isNaN(fechaUtc.getTime())
    ? fechaStr
    : fechaUtc.toLocaleDateString('es-BO', { timeZone: 'UTC' })
}

async function consultar() {
  cargando.value = true
  error.value = ''
  mensaje.value = ''
  eventos.value = []
  consultado.value = false

  try {
    const respuesta = await consultarCalendario(materia.value.trim())
    eventos.value = respuesta.eventos || []
    mensaje.value = respuesta.mensaje || ''
    consultado.value = true
  } catch (err) {
    error.value = err.message
  } finally {
    cargando.value = false
  }
}
</script>

<template>
  <section class="tarjeta">
    <h1>Calendario académico</h1>
    <form class="formulario-academico" @submit.prevent="consultar">
      <div class="grupo-campo">
        <label class="etiqueta" for="materia">Identificador de la materia</label>
        <input
          id="materia"
          v-model="materia"
          class="campo"
          required
          maxlength="64"
          :disabled="cargando"
        />
      </div>
      <Button type="submit" :disabled="cargando">
        <CalendarDays aria-hidden="true" />
        {{ cargando ? 'Consultando…' : 'Consultar calendario' }}
      </Button>
    </form>

    <p v-if="error" class="aviso aviso--error" role="alert">{{ error }}</p>

    <p
      v-if="consultado && (!eventos.length || mensaje)"
      class="aviso aviso--info"
      role="status"
    >
      {{ mensaje || 'No existen eventos programados para esta materia.' }}
    </p>

    <ul v-if="eventos.length" class="lista-tarjetas">
      <li v-for="evento in eventos" :key="evento.id" class="tarjeta">
        <h2>{{ TIPOS_LEGIBLES[evento.tipo] || evento.tipo }}</h2>
        <p><strong>Fecha:</strong> {{ formatearFecha(evento.fecha) }}</p>
        <p v-if="evento.horario"><strong>Horario:</strong> {{ evento.horario }}</p>
        <p>{{ evento.descripcion }}</p>
        <p v-if="evento.suspendido" class="aviso aviso--advertencia" role="status">
          Clase suspendida
        </p>
      </li>
    </ul>
  </section>
</template>
