import { createRouter, createWebHistory } from 'vue-router'
import BaseLayout from '@/components/BaseLayout.vue'
import NouvelleDemande from '@/pages/etudiants/NouvelleDemande.vue'
import EspaceEtudiant from '@/pages/etudiants/EspaceEtudiant.vue'
import DemandesRecues from '@/pages/secretariat/DemandesRecues.vue'
import Dashboard from '@/pages/secretariat/Dashboard.vue'

const routes = [
  {
    path: '/',
    component: BaseLayout,
    children: [
      // Routes pour l'étudiant
      {
        path: 'etudiants/espace-etudiant',
        name: 'EspaceEtudiant',
        component: EspaceEtudiant,
        meta: {
          headerTitle: 'Espace étudiant',
          headerIcon: ['fas', 'graduation-cap']
        }
      },
      {
        path: 'etudiants/nouvelle-demande',
        name: 'NouvelleDemande',
        component: NouvelleDemande,
        meta: {
          headerTitle: 'Nouvelle demande',
          headerIcon: ['fas', 'file-alt']
        }
      },
      // Routes pour la secrétaire (exemples)
      {
        path: 'secretariat/tableau-de-bord',
        name: 'SecretaryDashboard',
        component: Dashboard,
        meta: {
          headerTitle: 'Tableau de bord',
          headerIcon: ['fas', 'chart-simple']
        }
      },
      {
        path: 'secretariat/demandes-recus',
        name: 'DemandesRecues',
        component: DemandesRecues,
        meta: {
          headerTitle: 'Demandes reçues',
          headerIcon: ['fas', 'clipboard-list']
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/etudiants/espace-etudiant'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
