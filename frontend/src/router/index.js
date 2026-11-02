import { createRouter, createWebHistory } from 'vue-router'
import InicioView from '../views/InicioView.vue'
import InicioDocenteView from '../views/docente/InicioDocenteView.vue'
import InicioEstudianteView from '../views/estudiante/InicioEstudianteView.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'inicio', component: InicioView },
    { path: '/docente', name: 'inicio-docente', component: InicioDocenteView },
    { path: '/estudiante', name: 'inicio-estudiante', component: InicioEstudianteView },
  ],
})
