<script setup>
import { reactive, ref } from 'vue'
import { CalendarPlus } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { registrarEvento } from '@/services/calendario.js'

const evento = reactive({
  id: '',
  materiaId: '',
  tipo: 'clase',
  fecha: '',
  horario: '',
  descripcion: '',
  suspendido: false,
})

const guardando = ref(false)
const mensaje = ref('')
const error = ref('')

async function guardar() {
  guardando.value = true
  mensaje.value = ''
  error.value = ''

  try {
    const datos = {
      id: evento.id.trim(),
      materiaId: evento.materiaId.trim(),
      tipo: evento.tipo,
      fecha: evento.fecha,
      horario: evento.horario ? evento.horario.trim() : null,
      descripcion: evento.descripcion.trim(),
      suspendido: Boolean(evento.suspendido),
    }

    const resultado = await registrarEvento(datos)
    mensaje.value = `Evento ${resultado.evento?.id || datos.id} registrado exitosamente.`
    evento.id = ''
    evento.descripcion = ''
    evento.horario = ''
    evento.suspendido = false
  } catch (err) {
    error.value = err.message
  } finally {
    guardando.value = false
  }
}
</script>

<template>
  <section class="tarjeta">
    <h1>Registrar evento académico</h1>
    <form class="formulario-academico" @submit.prevent="guardar">
      <fieldset :disabled="guardando">
        <div class="grupo-campo">
          <label class="etiqueta" for="evento-id">Identificador del evento</label>
          <input
            id="evento-id"
            v-model="evento.id"
            class="campo"
            required
            maxlength="64"
          />
        </div>

        <div class="grupo-campo">
          <label class="etiqueta" for="evento-materia">Identificador de la materia</label>
          <input
            id="evento-materia"
            v-model="evento.materiaId"
            class="campo"
            required
            maxlength="64"
          />
        </div>

        <div class="grupo-campo">
          <label class="etiqueta" for="evento-tipo">Tipo de evento</label>
          <select id="evento-tipo" v-model="evento.tipo" class="campo" required>
            <option value="clase">Clase</option>
            <option value="entrega_tarea">Entrega de tarea</option>
            <option value="actividad">Actividad académica</option>
            <option value="suspension">Suspensión</option>
          </select>
        </div>

        <div class="grupo-campo">
          <label class="etiqueta" for="evento-fecha">Fecha del evento</label>
          <input
            id="evento-fecha"
            v-model="evento.fecha"
            class="campo"
            type="date"
            required
          />
        </div>

        <div class="grupo-campo">
          <label class="etiqueta" for="evento-horario">Horario (opcional)</label>
          <input
            id="evento-horario"
            v-model="evento.horario"
            class="campo"
            maxlength="64"
            placeholder="Ej: 08:00 - 10:00"
          />
        </div>

        <div class="grupo-campo">
          <label class="etiqueta" for="evento-descripcion">Descripción</label>
          <textarea
            id="evento-descripcion"
            v-model="evento.descripcion"
            class="campo"
            required
            maxlength="1000"
          />
        </div>

        <label class="opcion-simulacion">
          <input v-model="evento.suspendido" type="checkbox" />
          Clase suspendida
        </label>

        <Button type="submit" :disabled="guardando">
          <CalendarPlus aria-hidden="true" />
          {{ guardando ? 'Registrando…' : 'Registrar evento' }}
        </Button>
      </fieldset>
    </form>

    <p v-if="mensaje" class="aviso aviso--exito" role="status">{{ mensaje }}</p>
    <p v-if="error" class="aviso aviso--error" role="alert">{{ error }}</p>
  </section>
</template>
