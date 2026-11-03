<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { BookOpen, Calendar, Edit3, Plus, Search, Trash2, FileText, User } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import {
  obtenerMaterias,
  obtenerEstudiantes,
  obtenerApuntes,
  crearApunte,
  editarApunte,
  eliminarApunte,
} from '@/services/apuntes.js'

const estudiantes = ref([])
const materias = ref([])
const estudianteId = ref(1)
const apuntes = ref([])
const materiaFiltro = ref('')
const busqueda = ref('')

const apunteSeleccionado = ref(null)
const modoFormulario = ref(null) // 'crear' | 'editar' | null

const formulario = reactive({
  id: null,
  titulo: '',
  idMateria: '',
  contenido: '',
})

const cargando = ref(false)
const guardando = ref(false)
const mensaje = ref('')
const error = ref('')

const apuntesFiltrados = computed(() => {
  let lista = apuntes.value
  if (materiaFiltro.value) {
    lista = lista.filter((a) => String(a.materia_id) === String(materiaFiltro.value))
  }
  const q = busqueda.value.trim().toLowerCase()
  if (q) {
    lista = lista.filter(
      (a) =>
        a.titulo.toLowerCase().includes(q) ||
        (a.contenido && a.contenido.toLowerCase().includes(q))
    )
  }
  return lista
})

async function cargarDatosIniciales() {
  cargando.value = true
  error.value = ''
  try {
    const [listaEst, listaMat] = await Promise.all([
      obtenerEstudiantes(),
      obtenerMaterias(),
    ])
    estudiantes.value = listaEst || []
    materias.value = listaMat || []
    if (estudiantes.value.length > 0 && !estudianteId.value) {
      estudianteId.value = estudiantes.value[0].id
    }
    await cargarApuntes()
  } catch (err) {
    error.value = err.message
  } finally {
    cargando.value = false
  }
}

async function cargarApuntes() {
  if (!estudianteId.value) return
  cargando.value = true
  error.value = ''
  try {
    const notas = await obtenerApuntes(estudianteId.value)
    apuntes.value = notas || []
    if (apunteSeleccionado.value) {
      const actual = apuntes.value.find((a) => a.id === apunteSeleccionado.value.id)
      apunteSeleccionado.value = actual || null
    }
  } catch (err) {
    error.value = err.message
  } finally {
    cargando.value = false
  }
}

function abrirCrear() {
  modoFormulario.value = 'crear'
  formulario.id = null
  formulario.titulo = ''
  formulario.idMateria = materias.value[0]?.id || ''
  formulario.contenido = ''
  mensaje.value = ''
  error.value = ''
}

function abrirEditar(apunte) {
  modoFormulario.value = 'editar'
  formulario.id = apunte.id
  formulario.titulo = apunte.titulo
  formulario.idMateria = apunte.materia_id
  formulario.contenido = apunte.contenido
  mensaje.value = ''
  error.value = ''
}

function cancelarFormulario() {
  modoFormulario.value = null
  formulario.id = null
  formulario.titulo = ''
  formulario.idMateria = ''
  formulario.contenido = ''
}

async function guardarApunte() {
  guardando.value = true
  error.value = ''
  mensaje.value = ''
  try {
    if (modoFormulario.value === 'crear') {
      await crearApunte(estudianteId.value, {
        titulo: formulario.titulo,
        contenido: formulario.contenido,
        idMateria: formulario.idMateria,
      })
      mensaje.value = 'Apunte creado exitosamente.'
    } else if (modoFormulario.value === 'editar') {
      await editarApunte(formulario.id, estudianteId.value, {
        titulo: formulario.titulo,
        contenido: formulario.contenido,
        idMateria: formulario.idMateria,
      })
      mensaje.value = 'Apunte actualizado exitosamente.'
    }
    cancelarFormulario()
    await cargarApuntes()
  } catch (err) {
    error.value = err.message
  } finally {
    guardando.value = false
  }
}

async function borrarApunte(id) {
  if (!window.confirm('¿Confirmas que deseas eliminar este apunte? Esta acción no se puede deshacer.')) {
    return
  }
  guardando.value = true
  error.value = ''
  mensaje.value = ''
  try {
    await eliminarApunte(id, estudianteId.value)
    mensaje.value = 'Apunte eliminado.'
    if (apunteSeleccionado.value?.id === id) {
      apunteSeleccionado.value = null
    }
    await cargarApuntes()
  } catch (err) {
    error.value = err.message
  } finally {
    guardando.value = false
  }
}

onMounted(() => {
  cargarDatosIniciales()
})
</script>

<template>
  <div class="contenedor-apuntes">
    <header class="cabecera-modulo">
      <div>
        <h1 class="titulo-modulo">Gestión de Apuntes de Clase</h1>
        <p class="descripcion-modulo">
          HU-06: Consulta, organiza y redacta tus notas de clase vinculadas a tus materias.
        </p>
      </div>

      <div class="controles-cabecera">
        <div class="selector-estudiante">
          <label for="select-estudiante-apuntes" class="etiqueta-inline">
            <User class="h-4 w-4" /> Estudiante:
          </label>
          <select
            id="select-estudiante-apuntes"
            v-model="estudianteId"
            class="campo campo-sm"
            @change="cargarApuntes"
          >
            <option v-for="est in estudiantes" :key="est.id" :value="est.id">
              {{ est.nombre }}
            </option>
          </select>
        </div>

        <Button size="sm" @click="abrirCrear">
          <Plus class="mr-1.5 h-4 w-4" /> Nuevo Apunte
        </Button>
      </div>
    </header>

    <div v-if="mensaje" class="alerta alerta--exito" role="status">{{ mensaje }}</div>
    <div v-if="error" class="alerta alerta--error" role="alert">{{ error }}</div>

    <!-- FORMULARIO CREAR / EDITAR -->
    <section v-if="modoFormulario" class="tarjeta formulario-apunte">
      <h2>{{ modoFormulario === 'crear' ? 'Crear Nuevo Apunte' : 'Editar Apunte' }}</h2>

      <form @submit.prevent="guardarApunte">
        <div class="grupo-campo">
          <label class="etiqueta" for="titulo-apunte">Título del Apunte *</label>
          <input
            id="titulo-apunte"
            v-model="formulario.titulo"
            type="text"
            class="campo"
            placeholder="Ej. Modelo Vista Controlador en Express"
            required
          />
        </div>

        <div class="grupo-campo">
          <label class="etiqueta" for="materia-apunte">Materia Académica *</label>
          <select
            id="materia-apunte"
            v-model="formulario.idMateria"
            class="campo"
            required
          >
            <option v-for="m in materias" :key="m.id" :value="m.id">
              {{ m.nombre }}
            </option>
          </select>
        </div>

        <div class="grupo-campo">
          <label class="etiqueta" for="contenido-apunte">Contenido de la Nota *</label>
          <textarea
            id="contenido-apunte"
            v-model="formulario.contenido"
            class="campo textarea"
            rows="6"
            placeholder="Escribe el resumen o apunte detallado de la clase..."
            required
          ></textarea>
        </div>

        <div class="acciones-formulario">
          <Button type="button" variant="outline" @click="cancelarFormulario">
            Cancelar
          </Button>
          <Button type="submit" :disabled="guardando">
            {{ guardando ? 'Guardando...' : (modoFormulario === 'crear' ? 'Publicar Apunte' : 'Actualizar Apunte') }}
          </Button>
        </div>
      </form>
    </section>

    <!-- LISTADO Y FILTROS -->
    <div class="distribucion-apuntes">
      <aside class="panel-filtros tarjeta">
        <div class="grupo-campo">
          <label class="etiqueta" for="busqueda-apuntes">Buscar en apuntes</label>
          <div class="input-con-icono">
            <Search class="icono-input" />
            <input
              id="busqueda-apuntes"
              v-model="busqueda"
              type="text"
              class="campo"
              placeholder="Palabra clave..."
            />
          </div>
        </div>

        <div class="grupo-campo">
          <label class="etiqueta" for="filtro-materia">Filtrar por Materia</label>
          <select id="filtro-materia" v-model="materiaFiltro" class="campo">
            <option value="">Todas las materias</option>
            <option v-for="m in materias" :key="m.id" :value="m.id">
              {{ m.nombre }}
            </option>
          </select>
        </div>

        <div class="resumen-contador">
          <span>Total notas:</span>
          <strong>{{ apuntesFiltrados.length }}</strong>
        </div>
      </aside>

      <main class="panel-lista">
        <div v-if="apuntesFiltrados.length === 0" class="tarjeta aviso-vacio">
          <FileText class="h-10 w-10 texto-atenuado mx-auto mb-2" />
          <p>No se encontraron apuntes para este estudiante o con los filtros seleccionados.</p>
        </div>

        <div v-else class="cuadricula-notas">
          <article
            v-for="apunte in apuntesFiltrados"
            :key="apunte.id"
            class="tarjeta tarjeta-nota"
            @click="apunteSeleccionado = apunte"
          >
            <div class="cabecera-nota">
              <span class="badge-materia">{{ apunte.materia }}</span>
              <div class="acciones-nota" @click.stop>
                <button
                  type="button"
                  class="btn-icono"
                  title="Editar apunte"
                  @click="abrirEditar(apunte)"
                >
                  <Edit3 class="h-4 w-4" />
                </button>
                <button
                  type="button"
                  class="btn-icono btn-peligro"
                  title="Eliminar apunte"
                  @click="borrarApunte(apunte.id)"
                >
                  <Trash2 class="h-4 w-4" />
                </button>
              </div>
            </div>

            <h3 class="titulo-nota">{{ apunte.titulo }}</h3>
            <p class="resumen-nota">{{ apunte.contenido }}</p>

            <footer class="pie-nota">
              <span class="fecha-nota">
                <Calendar class="inline h-3.5 w-3.5 mr-1" />
                {{ new Date(apunte.fecha_creacion).toLocaleDateString('es-BO') }}
              </span>
            </footer>
          </article>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.contenedor-apuntes {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.cabecera-modulo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.titulo-modulo {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-texto);
}

.descripcion-modulo {
  font-size: 0.95rem;
  color: var(--color-texto-secundario);
}

.controles-cabecera {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.selector-estudiante {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--color-superficie);
  padding: 0.25rem 0.5rem;
  border-radius: var(--radio);
  border: 1px solid var(--color-borde);
}

.etiqueta-inline {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-texto);
}

.campo-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.85rem;
}

.distribucion-apuntes {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 1.5rem;
}

@media (max-width: 840px) {
  .distribucion-apuntes {
    grid-template-columns: 1fr;
  }
}

.panel-filtros {
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.resumen-contador {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid var(--color-borde);
  padding-top: 0.75rem;
  font-size: 0.9rem;
}

.cuadricula-notas {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
}

.tarjeta-nota {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  min-height: 180px;
}

.tarjeta-nota:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.cabecera-nota {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.badge-materia {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  background: rgba(59, 130, 246, 0.1);
  color: #2563eb;
}

.acciones-nota {
  display: flex;
  gap: 0.25rem;
}

.btn-icono {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  color: var(--color-texto-secundario);
}

.btn-icono:hover {
  color: var(--color-texto);
  background: var(--color-fondo);
}

.btn-peligro:hover {
  color: #dc2626;
}

.titulo-nota {
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--color-texto);
  margin-bottom: 0.5rem;
}

.resumen-nota {
  font-size: 0.875rem;
  color: var(--color-texto-secundario);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 1rem;
}

.pie-nota {
  border-top: 1px solid var(--color-borde);
  padding-top: 0.5rem;
  font-size: 0.75rem;
  color: var(--color-texto-secundario);
}

.aviso-vacio {
  text-align: center;
  padding: 3rem 1rem;
}

.formulario-apunte {
  margin-bottom: 1rem;
}

.acciones-formulario {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1rem;
}

.input-con-icono {
  position: relative;
  display: flex;
  align-items: center;
}

.icono-input {
  position: absolute;
  left: 0.75rem;
  width: 1rem;
  height: 1rem;
  color: var(--color-texto-secundario);
}

.input-con-icono input {
  padding-left: 2.25rem;
}
</style>
