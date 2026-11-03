import { createRouter, createWebHistory } from 'vue-router'
import InicioView from '../views/InicioView.vue'
import InicioDocenteView from '../views/docente/InicioDocenteView.vue'
import InicioEstudianteView from '../views/estudiante/InicioEstudianteView.vue'
import CalendarioView from '../views/estudiante/CalendarioView.vue'
import EventosView from '../views/docente/EventosView.vue'
import GruposView from '../views/docente/GruposView.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'inicio', component: InicioView },
    { path: '/docente', name: 'inicio-docente', component: InicioDocenteView },
    { path: '/docente/eventos', name: 'eventos-docente', component: EventosView },
    { path: '/docente/grupos', name: 'grupos-docente', component: GruposView },
    { path: '/estudiante', name: 'inicio-estudiante', component: InicioEstudianteView },
    { path: '/estudiante/calendario', name: 'calendario-estudiante', component: CalendarioView },
  ],
})
