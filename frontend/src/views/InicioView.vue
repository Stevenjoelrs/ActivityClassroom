<script setup>
import { onMounted, ref } from 'vue'
import {
  CalendarDays,
  CalendarPlus,
  Users,
  GraduationCap,
  Presentation,
  Armchair,
  FileText,
  CheckCircle2,
  ExternalLink,
} from '@lucide/vue'
import { consultarApi } from '../services/api.js'

const mensaje = ref('Cargando estado de la API…')
const conectado = ref(false)

const historias = [
  {
    id: 'HU-01',
    titulo: 'Calendario Académico',
    descripcion: 'Consulta de horarios, entregas, actividades y suspensión de clases.',
    enlaces: [
      { texto: 'Ver Calendario (Estudiante)', to: '/estudiante/calendario', icono: CalendarDays },
      { texto: 'Gestionar Eventos (Docente)', to: '/docente/eventos', icono: CalendarPlus },
    ],
  },
  {
    id: 'HU-02',
    titulo: 'Grupos de Trabajo',
    descripcion: 'Registro y consulta de grupos formados por afinidad o sorteo.',
    enlaces: [
      { texto: 'Administrar Grupos (Docente)', to: '/docente/grupos', icono: Users },
    ],
  },
  {
    id: 'HU-03',
    titulo: 'Envío de Tareas por Correo',
    descripcion: 'Envío formal simulado con archivo adjunto (.pdf, .docx, .zip hasta 10 MB).',
    enlaces: [
      { texto: 'Simular Envío (Estudiante)', to: '/estudiante', icono: GraduationCap },
    ],
  },
  {
    id: 'HU-04',
    titulo: 'Revisión y Feedback',
    descripcion: 'Descarga de adjuntos y registro de feedback estructurado (correcto, incorrecto, corregir).',
    enlaces: [
      { texto: 'Revisar Tareas (Docente)', to: '/docente', icono: Presentation },
    ],
  },
  {
    id: 'HU-05',
    titulo: 'Asignación de Asientos y Asistencia',
    descripcion: 'Distribución física del aula (50 asientos en 10x5) y control diario de presencia.',
    enlaces: [
      { texto: 'Mapa de Aula y Asistencia', to: '/docente/asientos', icono: Armchair },
    ],
  },
  {
    id: 'HU-06',
    titulo: 'Tomar Apuntes de Clase',
    descripcion: 'Gestión y organización cronológica de notas académicas por materia.',
    enlaces: [
      { texto: 'Mis Apuntes de Clase', to: '/estudiante/apuntes', icono: FileText },
    ],
  },
]

onMounted(async () => {
  try {
    const datos = await consultarApi()
    mensaje.value = datos.mensaje
    conectado.value = true
  } catch {
    mensaje.value = 'No se pudo conectar con el backend.'
    conectado.value = false
  }
})
</script>

<template>
  <div class="contenedor-inicio">
    <section class="tarjeta hero">
      <div class="hero-estado">
        <span class="punto-conexion" :class="{ activo: conectado }"></span>
        <span class="texto-conexion">{{ mensaje }}</span>
      </div>
      <h1 class="hero-titulo">Sistema Académico Universitario</h1>
      <p class="hero-descripcion">
        Plataforma académica integral con soporte completo para las <strong>6 Historias de Usuario (HU-01 a HU-06)</strong>.
      </p>
    </section>

    <section class="cuadricula-hu">
      <article v-for="hu in historias" :key="hu.id" class="tarjeta tarjeta-hu">
        <div class="cabecera-hu">
          <span class="badge-hu">{{ hu.id }}</span>
          <h2 class="titulo-hu">{{ hu.titulo }}</h2>
        </div>
        <p class="descripcion-hu">{{ hu.descripcion }}</p>

        <div class="enlaces-hu">
          <RouterLink
            v-for="enlace in hu.enlaces"
            :key="enlace.to"
            :to="enlace.to"
            class="boton-enlace"
          >
            <component :is="enlace.icono" class="h-4 w-4" />
            <span>{{ enlace.texto }}</span>
          </RouterLink>
        </div>
      </article>
    </section>
  </div>
</template>

<style scoped>
.contenedor-inicio {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.hero {
  text-align: center;
  padding: 2.5rem 1.5rem;
}

.hero-estado {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--color-fondo);
  padding: 0.35rem 0.85rem;
  border-radius: 9999px;
  border: 1px solid var(--color-borde);
  font-size: 0.85rem;
  margin-bottom: 1.25rem;
}

.punto-conexion {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #ef4444;
}

.punto-conexion.activo {
  background-color: #22c55e;
}

.hero-titulo {
  font-size: 2.25rem;
  font-weight: 800;
  color: var(--color-texto);
  margin-bottom: 0.75rem;
}

.hero-descripcion {
  font-size: 1.1rem;
  color: var(--color-texto-secundario);
  max-width: 700px;
  margin: 0 auto;
}

.cuadricula-hu {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 1.5rem;
}

.tarjeta-hu {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid var(--color-borde);
  transition: transform 0.2s, box-shadow 0.2s;
}

.tarjeta-hu:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
}

.cabecera-hu {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.badge-hu {
  background: var(--color-primario);
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
}

.titulo-hu {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--color-texto);
}

.descripcion-hu {
  font-size: 0.9rem;
  color: var(--color-texto-secundario);
  line-height: 1.5;
  margin-bottom: 1.5rem;
  flex: 1;
}

.enlaces-hu {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.boton-enlace {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 0.85rem;
  background: var(--color-fondo);
  border: 1px solid var(--color-borde);
  border-radius: var(--radio);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-texto);
  text-decoration: none;
  transition: all 0.2s ease;
}

.boton-enlace:hover {
  background: var(--color-superficie-elevada);
  border-color: var(--color-primario);
  color: var(--color-primario);
}
</style>
