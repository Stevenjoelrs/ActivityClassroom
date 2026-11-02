<script setup>
import { Button } from '@/components/ui/button'
import { ArrowLeft } from '@lucide/vue'
</script>

<template>
  <section class="tarjeta">
    <h1>Inicio de docente</h1>
    <p>Pantalla inicial de ejemplo para docente.</p>
    <Button variant="secondary" as-child>
      <RouterLink to="/"><ArrowLeft :size="18" aria-hidden="true" />Volver al inicio</RouterLink>
    </Button>
  </section>
</template>
