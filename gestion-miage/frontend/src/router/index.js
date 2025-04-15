import { createRouter, createWebHistory } from 'vue-router'
import NouvelleDemande from '@/pages/NouvelleDemande.vue'

const routes = [
  {
    path: '/',
    name: 'NouvelleDemande',
    component: NouvelleDemande
  },
  // plus tard, tu pourras ajouter d'autres routes
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
