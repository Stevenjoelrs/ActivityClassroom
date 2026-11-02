<script setup>
import Encabezado from './components/Encabezado.vue'
</script>

<template>
  <a class="saltar-contenido" href="#contenido">Saltar al contenido</a>
  <Encabezado />
  <main id="contenido" class="contenido" tabindex="-1">
    <RouterView />
  </main>
</template>

<style scoped>
.contenido {
  width: 100%;
  padding: var(--espacio-4) var(--espacio-3);
  text-align: left;
}
.saltar-contenido {
  position: absolute;
  left: var(--espacio-2);
  top: -100px;
  z-index: 30;
  padding: var(--espacio-2);
  color: var(--color-texto);
  background: var(--color-superficie);
}
.saltar-contenido:focus {
  top: var(--espacio-2);
}
</style>
