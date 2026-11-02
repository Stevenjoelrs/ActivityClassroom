<script setup>
import { onMounted, ref } from 'vue'
import { consultarApi } from '../services/api.js'

const mensaje = ref('Cargando…')

onMounted(async () => {
  try {
    const datos = await consultarApi()
    mensaje.value = datos.mensaje
  } catch {
    mensaje.value = 'No se pudo conectar con el backend.'
  }
})
</script>

<template>
  <section class="tarjeta">
    <h1>Inicio</h1>
    <p>{{ mensaje }}</p>
    <p class="texto-secundario">Estas vistas son ejemplos de navegación; no verifican identidad ni permisos.</p>
  </section>
</template>
