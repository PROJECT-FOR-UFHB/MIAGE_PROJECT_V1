import { createRouter, createWebHistory } from 'vue-router'
import DemandesRecues from '@/pages/secretariat/DemandesRecues.vue'
import NouvelleDemande from '@/pages/etudiants/NouvelleDemande.vue'

const routes = [
  // route pour l'étudiant
  {
    path: '/etudiants/nouvelle-demande',
    name: 'NouvelleDemande',
    component: NouvelleDemande
  },
  // route pour la secrétaire
  {
    path: '/secretariat/demandes-recus',
    name: 'DemandesRecues',
    component: DemandesRecues
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
