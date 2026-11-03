<script setup>
import { nextTick, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import {
  BookOpen,
  House,
  Presentation,
  GraduationCap,
  CalendarDays,
  CalendarPlus,
  Users,
  Menu,
  X,
  ArrowUpRight,
} from '@lucide/vue'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu'

const route = useRoute()
const abierto = ref(false)
const controlMenu = ref(null)
const enlaces = [
  { to: '/', texto: 'Inicio', icono: House },
  { to: '/docente', texto: 'Docente', icono: Presentation },
  { to: '/docente/eventos', texto: 'Eventos', icono: CalendarPlus },
  { to: '/docente/grupos', texto: 'Grupos', icono: Users },
  { to: '/estudiante', texto: 'Estudiante', icono: GraduationCap },
  { to: '/estudiante/calendario', texto: 'Calendario', icono: CalendarDays },
]
watch(() => route.path, () => { abierto.value = false })
async function cerrarMenu() {
  if (!abierto.value) return
  abierto.value = false
  await nextTick()
  controlMenu.value?.$el?.focus()
}
</script>

<template>
  <header class="encabezado" @keydown.esc="cerrarMenu">
    <div class="barra">
      <RouterLink class="marca" to="/" @click="abierto = false">
        <span class="marca-icono"><BookOpen :size="23" aria-hidden="true" /></span>
        <span class="marca-texto">
          <span class="marca-titulo">Sistema Académico</span>
          <span class="marca-subtitulo">Universitario</span>
        </span>
      </RouterLink>

      <NavigationMenu :viewport="false" class="navegacion-escritorio" aria-label="Navegación principal">
        <NavigationMenuList class="lista-enlaces">
          <NavigationMenuItem v-for="enlace in enlaces" :key="enlace.to">
            <NavigationMenuLink :active="route.path === enlace.to" as-child>
              <RouterLink :to="enlace.to" class="enlace-nav">
                <component :is="enlace.icono" :size="17" aria-hidden="true" />
                {{ enlace.texto }}
              </RouterLink>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <Button
        ref="controlMenu"
        class="control-menu"
        variant="ghost"
        size="icon"
        type="button"
        :aria-expanded="abierto"
        aria-controls="menu-movil"
        :aria-label="abierto ? 'Cerrar navegación' : 'Abrir navegación'"
        @click="abierto = !abierto"
      >
        <component :is="abierto ? X : Menu" aria-hidden="true" />
      </Button>
    </div>

    <nav v-show="abierto" id="menu-movil" class="menu-movil" aria-label="Navegación móvil">
      <RouterLink
        v-for="enlace in enlaces"
        :key="enlace.to"
        :to="enlace.to"
        class="enlace-nav"
        @click="abierto = false"
      >
        <component :is="enlace.icono" :size="18" aria-hidden="true" />
        {{ enlace.texto }}
        <ArrowUpRight class="flecha" :size="16" aria-hidden="true" />
      </RouterLink>
    </nav>
  </header>
</template>

<style scoped>
.encabezado {
  position: sticky;
  top: 0;
  z-index: 20;
  border-bottom: 1px solid var(--color-borde);
  background: var(--color-superficie);
  box-shadow: 0 3px 18px rgb(33 34 45 / 4%);
}
.barra {
  width: 100%;
  min-height: 88px;
  padding: var(--espacio-2) var(--espacio-3);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--espacio-3);
}
.marca {
  display: inline-flex;
  align-items: center;
  gap: var(--espacio-1);
  color: var(--color-texto);
  text-decoration: none;
  flex-shrink: 0;
}
.marca-icono {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 14px;
  background: var(--color-marino);
  color: var(--color-sobre-marino);
}
.marca-texto { display: grid; gap: 2px; }
.marca-titulo { font-size: var(--texto-normal); font-weight: var(--peso-fuerte); line-height: 1.3; }
.marca-titulo { color: var(--color-marino); }
.marca-subtitulo { font-size: var(--texto-pequeno); color: var(--color-texto-secundario); line-height: 1.3; }
.lista-enlaces {
  margin: 0;
  padding: 5px;
  gap: 4px;
  border: 1px solid var(--color-borde);
  border-radius: 14px;
  background: var(--color-fondo);
  list-style: none;
}
.enlace-nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--espacio-1);
  min-height: 42px;
  padding: 10px 14px;
  border-radius: 10px;
  color: var(--color-texto-secundario);
  font-size: var(--texto-pequeno);
  font-weight: var(--peso-medio);
  text-decoration: none;
  transition: background-color 150ms, color 150ms;
}
.enlace-nav:hover { background: var(--color-marino-suave); color: var(--color-marino); }
.enlace-nav.router-link-exact-active {
  position: relative;
  background: transparent;
  color: var(--color-marino);
  font-weight: var(--peso-fuerte);
  box-shadow: none;
}
.enlace-nav.router-link-exact-active::after {
  content: '';
  position: absolute;
  bottom: 2px;
  left: 14px;
  right: 14px;
  height: 2px;
  border-radius: 999px;
  background: var(--color-marino);
}
.control-menu, .menu-movil { display: none; }
.flecha { margin-left: auto; }
.enlace-nav :deep(svg) { color: inherit; }
.marca:focus-visible, .enlace-nav:focus-visible, .control-menu:focus-visible {
  outline: 3px solid var(--color-marino);
  outline-offset: 3px;
}
.control-menu { color: var(--color-marino); }
.control-menu:hover { background: var(--color-marino-suave); }
@media (max-width: 1024px) {
  .barra { min-height: 76px; padding: var(--espacio-2); gap: var(--espacio-1); }
  .navegacion-escritorio { display: none; }
  .control-menu { display: inline-flex; flex-shrink: 0; }
  .menu-movil {
    display: grid;
    gap: var(--espacio-1);
    padding: 0 var(--espacio-2) var(--espacio-2);
  }
}
@media (prefers-reduced-motion: reduce) {
  .enlace-nav { transition: none; }
}
</style>
