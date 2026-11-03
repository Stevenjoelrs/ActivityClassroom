<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { Armchair, CheckCircle2, UserPlus, Users, Search, Trash2 } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import {
  obtenerEstudiantes,
  obtenerAsientos,
  asignarAsiento,
  liberarAsiento,
  obtenerAsistencia,
  actualizarAsistencia,
} from '@/services/asientos.js'

const pestana = ref('mapa') // 'mapa' o 'asistencia'
const estudiantes = ref([])
const asignaciones = ref({})
const asistencia = ref([])
const asientoSeleccionado = ref(null)
const estudianteSeleccionado = ref('')
const busqueda = ref('')
const fechaAsistencia = ref(new Date().toISOString().slice(0, 10))

const cargando = ref(false)
const guardando = ref(false)
const mensaje = ref('')
const error = ref('')

const totalAsientos = 50

const estudiantesFiltrados = computed(() => {
  const texto = busqueda.value.trim().toLowerCase()
  if (!texto) return estudiantes.value
  return estudiantes.value.filter(
    (e) =>
      e.nombre.toLowerCase().includes(texto) ||
      (e.matricula && e.matricula.toLowerCase().includes(texto))
  )
})

async function cargarDatos() {
  cargando.value = true
  error.value = ''
  try {
    const [listaEst, listaAsientos, listaAsist] = await Promise.all([
      obtenerEstudiantes(),
      obtenerAsientos(),
      obtenerAsistencia(fechaAsistencia.value),
    ])
    estudiantes.value = listaEst || []
    const mapa = {}
    ;(listaAsientos || []).forEach((item) => {
      mapa[item.asiento] = item
    })
    asignaciones.value = mapa
    asistencia.value = listaAsist || []
  } catch (err) {
    error.value = err.message
  } finally {
    cargando.value = false
  }
}

function seleccionarAsiento(numero) {
  asientoSeleccionado.value = numero
  mensaje.value = ''
  error.value = ''
  const ocupante = asignaciones.value[numero]
  estudianteSeleccionado.value = ocupante ? ocupante.estudiante_id : ''
}

async function guardarAsignacion() {
  if (!asientoSeleccionado.value) return
  if (!estudianteSeleccionado.value) {
    error.value = 'Selecciona un estudiante para asignar al asiento'
    return
  }
  guardando.value = true
  error.value = ''
  mensaje.value = ''
  try {
    await asignarAsiento(asientoSeleccionado.value, Number(estudianteSeleccionado.value))
    mensaje.value = `Asiento #${asientoSeleccionado.value} asignado correctamente.`
    await cargarDatos()
  } catch (err) {
    error.value = err.message
  } finally {
    guardando.value = false
  }
}

async function liberarAsientoActual() {
  if (!asientoSeleccionado.value) return
  guardando.value = true
  error.value = ''
  mensaje.value = ''
  try {
    await liberarAsiento(asientoSeleccionado.value)
    mensaje.value = `Asiento #${asientoSeleccionado.value} liberado.`
    await cargarDatos()
  } catch (err) {
    error.value = err.message
  } finally {
    guardando.value = false
  }
}

async function cambiarAsistencia(estudianteId, nuevoEstado) {
  try {
    await actualizarAsistencia(estudianteId, nuevoEstado, fechaAsistencia.value)
    const item = asistencia.value.find((a) => a.estudiante_id === estudianteId)
    if (item) item.estado = nuevoEstado
  } catch (err) {
    error.value = err.message
  }
}

onMounted(() => {
  cargarDatos()
})
</script>

<template>
  <div class="contenedor-asientos">
    <header class="cabecera-modulo">
      <div>
        <h1 class="titulo-modulo">Asignación de Asientos y Asistencia</h1>
        <p class="descripcion-modulo">
          HU-05: Distribución de los 50 asientos del aula (10 filas x 5 columnas) y control de presencia diaria.
        </p>
      </div>

      <div class="pestanas">
        <Button
          :variant="pestana === 'mapa' ? 'default' : 'outline'"
          size="sm"
          @click="pestana = 'mapa'"
        >
          <Armchair class="mr-1.5 h-4 w-4" /> Mapa de Asientos
        </Button>
        <Button
          :variant="pestana === 'asistencia' ? 'default' : 'outline'"
          size="sm"
          @click="pestana = 'asistencia'"
        >
          <CheckCircle2 class="mr-1.5 h-4 w-4" /> Control de Asistencia
        </Button>
      </div>
    </header>

    <div v-if="mensaje" class="alerta alerta--exito" role="status">
      {{ mensaje }}
    </div>
    <div v-if="error" class="alerta alerta--error" role="alert">
      {{ error }}
    </div>

    <!-- PESTAÑA: MAPA DE ASIENTOS -->
    <section v-if="pestana === 'mapa'" class="seccion-mapa">
      <div class="distribucion-aula">
        <div class="pizarra">PIZARRA / ESTRADO DOCENTE</div>

        <div class="cuadricula-asientos">
          <button
            v-for="numero in totalAsientos"
            :key="numero"
            type="button"
            class="asiento-btn"
            :class="{
              'asiento-ocupado': asignaciones[numero],
              'asiento-disponible': !asignaciones[numero],
              'asiento-seleccionado': asientoSeleccionado === numero,
            }"
            @click="seleccionarAsiento(numero)"
          >
            <span class="asiento-numero">#{{ numero }}</span>
            <span class="asiento-nombre" :title="asignaciones[numero]?.nombre">
              {{ asignaciones[numero]?.nombre || 'Libre' }}
            </span>
          </button>
        </div>
      </div>

      <!-- PANEL LATERAL DE DETALLE Y ASIGNACIÓN -->
      <aside class="panel-lateral tarjeta">
        <h2 class="subtitulo">
          {{ asientoSeleccionado ? `Asiento #${asientoSeleccionado}` : 'Selecciona un asiento' }}
        </h2>

        <div v-if="asientoSeleccionado" class="formulario-asignacion">
          <p class="estado-asiento">
            Estado:
            <strong :class="asignaciones[asientoSeleccionado] ? 'texto-ocupado' : 'texto-libre'">
              {{ asignaciones[asientoSeleccionado] ? 'Ocupado' : 'Disponible' }}
            </strong>
          </p>

          <div v-if="asignaciones[asientoSeleccionado]" class="info-ocupante">
            <p><strong>Estudiante:</strong> {{ asignaciones[asientoSeleccionado].nombre }}</p>
            <p><strong>Matrícula:</strong> {{ asignaciones[asientoSeleccionado].matricula || 'N/A' }}</p>
            <Button
              variant="destructive"
              size="sm"
              class="w-full mt-3"
              :disabled="guardando"
              @click="liberarAsientoActual"
            >
              <Trash2 class="mr-1.5 h-4 w-4" /> Liberar este asiento
            </Button>
          </div>

          <div v-else class="formulario-ocupar">
            <div class="grupo-campo">
              <label class="etiqueta" for="buscar-estudiante">Buscar estudiante</label>
              <div class="input-con-icono">
                <Search class="icono-input" />
                <input
                  id="buscar-estudiante"
                  v-model="busqueda"
                  type="text"
                  class="campo"
                  placeholder="Nombre o matrícula..."
                />
              </div>
            </div>

            <div class="grupo-campo">
              <label class="etiqueta" for="select-estudiante">Asignar a:</label>
              <select
                id="select-estudiante"
                v-model="estudianteSeleccionado"
                class="campo"
                :disabled="guardando"
              >
                <option value="">-- Selecciona estudiante --</option>
                <option
                  v-for="est in estudiantesFiltrados"
                  :key="est.id"
                  :value="est.id"
                >
                  {{ est.nombre }} ({{ est.matricula || 'Sin matrícula' }})
                </option>
              </select>
            </div>

            <Button
              class="w-full mt-2"
              :disabled="guardando || !estudianteSeleccionado"
              @click="guardarAsignacion"
            >
              <UserPlus class="mr-1.5 h-4 w-4" />
              {{ guardando ? 'Guardando...' : 'Asignar asiento' }}
            </Button>
          </div>
        </div>

        <div v-else class="texto-placeholder">
          Haz clic sobre cualquiera de los 50 asientos de la cuadrícula para ver su estado, asignarlo o liberarlo.
        </div>
      </aside>
    </section>

    <!-- PESTAÑA: CONTROL DE ASISTENCIA -->
    <section v-else class="seccion-asistencia tarjeta">
      <div class="controles-asistencia">
        <div class="grupo-campo">
          <label class="etiqueta" for="fecha-asistencia">Fecha de Control</label>
          <input
            id="fecha-asistencia"
            v-model="fechaAsistencia"
            type="date"
            class="campo"
            @change="cargarDatos"
          />
        </div>
      </div>

      <div class="tabla-contenedor">
        <table class="tabla-asistencia">
          <thead>
            <tr>
              <th>Estudiante</th>
              <th>Matrícula</th>
              <th>Estado Actual</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="est in asistencia" :key="est.estudiante_id">
              <td><strong>{{ est.nombre }}</strong></td>
              <td>{{ est.matricula || '-' }}</td>
              <td>
                <span
                  class="badge-estado"
                  :class="{
                    'badge-presente': est.estado === 'Presente',
                    'badge-ausente': est.estado === 'Ausente',
                    'badge-atrasado': est.estado === 'Atrasado',
                  }"
                >
                  {{ est.estado }}
                </span>
              </td>
              <td class="acciones-asistencia">
                <button
                  type="button"
                  class="btn-estado"
                  :class="{ activo: est.estado === 'Presente' }"
                  @click="cambiarAsistencia(est.estudiante_id, 'Presente')"
                >
                  Presente
                </button>
                <button
                  type="button"
                  class="btn-estado"
                  :class="{ activo: est.estado === 'Ausente' }"
                  @click="cambiarAsistencia(est.estudiante_id, 'Ausente')"
                >
                  Ausente
                </button>
                <button
                  type="button"
                  class="btn-estado"
                  :class="{ activo: est.estado === 'Atrasado' }"
                  @click="cambiarAsistencia(est.estudiante_id, 'Atrasado')"
                >
                  Atrasado
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<style scoped>
.contenedor-asientos {
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

.pestanas {
  display: flex;
  gap: 0.5rem;
}

.seccion-mapa {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 1.5rem;
}

@media (max-width: 960px) {
  .seccion-mapa {
    grid-template-columns: 1fr;
  }
}

.distribucion-aula {
  background: var(--color-superficie);
  border: 1px solid var(--color-borde);
  border-radius: var(--radio);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pizarra {
  width: 80%;
  text-align: center;
  padding: 0.5rem 1rem;
  background: var(--color-superficie-elevada);
  border: 2px dashed var(--color-primario);
  border-radius: 6px;
  font-weight: 700;
  font-size: 0.85rem;
  letter-spacing: 0.05em;
  color: var(--color-primario);
  margin-bottom: 2rem;
}

.cuadricula-asientos {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.75rem;
  width: 100%;
}

.asiento-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 0.5rem;
  border-radius: 8px;
  border: 1px solid var(--color-borde);
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 64px;
}

.asiento-disponible {
  background: var(--color-fondo);
  color: var(--color-texto);
}

.asiento-disponible:hover {
  border-color: var(--color-primario);
  transform: translateY(-2px);
}

.asiento-ocupado {
  background: rgba(34, 197, 94, 0.1);
  border-color: rgba(34, 197, 94, 0.4);
  color: #15803d;
}

.asiento-seleccionado {
  ring: 2px solid var(--color-primario);
  border-color: var(--color-primario);
}

.asiento-numero {
  font-weight: 700;
  font-size: 0.85rem;
}

.asiento-nombre {
  font-size: 0.75rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 90px;
}

.panel-lateral {
  height: fit-content;
}

.subtitulo {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.texto-ocupado {
  color: #16a34a;
}

.texto-libre {
  color: #64748b;
}

.texto-placeholder {
  color: var(--color-texto-secundario);
  font-size: 0.9rem;
  line-height: 1.5;
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

.tabla-asistencia {
  width: 100%;
  border-collapse: collapse;
}

.tabla-asistencia th,
.tabla-asistencia td {
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 1px solid var(--color-borde);
}

.badge-estado {
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.badge-presente {
  background: rgba(34, 197, 94, 0.15);
  color: #16a34a;
}

.badge-ausente {
  background: rgba(239, 68, 68, 0.15);
  color: #dc2626;
}

.badge-atrasado {
  background: rgba(245, 158, 11, 0.15);
  color: #d97706;
}

.acciones-asistencia {
  display: flex;
  gap: 0.25rem;
}

.btn-estado {
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  border-radius: 4px;
  border: 1px solid var(--color-borde);
  background: var(--color-fondo);
  cursor: pointer;
}

.btn-estado.activo {
  background: var(--color-primario);
  color: white;
  border-color: var(--color-primario);
}
</style>
