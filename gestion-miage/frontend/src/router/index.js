import { createRouter, createWebHistory } from 'vue-router'
import BaseLayout from '@/components/BaseLayout.vue'
import NouvelleDemande from '@/pages/etudiants/NouvelleDemande.vue'
import EspaceEtudiant from '@/pages/etudiants/EspaceEtudiant.vue'
import DemandesRecues from '@/pages/secretariat/DemandesRecues.vue'
import Dashboard from '@/pages/secretariat/Dashboard.vue'
import LoginPage from '@/pages/auth/LoginPage.vue'
import RegisterPage from '@/pages/auth/RegisterPage.vue'
import RequestPasswordResetPage from '@/pages/auth/RequestPasswordResetPage.vue'
import ResetPasswordPage from '@/pages/auth/ResetPasswordPage.vue'
import ConfirmCode from '@/pages/auth/confirmCode.vue'
// Import du service d'authentification pour les gardes de navigation
import { authService } from '@/services'

const routes = [
  // Routes d'authentification (accessibles sans être connecté)
  {
    path: '/auth',
    children: [
      {
        path: 'login',
        name: 'Login',
        component: LoginPage,
        meta: { requiresGuest: true }
      },
      {
        path: 'register',
        name: 'Register',
        component: RegisterPage,
        meta: { requiresGuest: true }
      },
      {
        path: 'request-password-reset',
        name: 'RequestPasswordReset',
        component: RequestPasswordResetPage,
        meta: { requiresGuest: true }
      },
      {
        path: 'reset-password',
        name: 'ResetPassword',
        component: ResetPasswordPage,
        meta: { requiresGuest: true }
      },
      {
        path: 'confirm-code',
        name: 'ConfirmCode',
        component: ConfirmCode,
        meta: { requiresGuest: true }
      },
      {
        path: 'change-password',
        name: 'ChangePassword',
        component: ChangePassword,
        meta: { requiresGuest: true }
      }
    ]
  },
  // Routes protégées (nécessitent d'être connecté)
  {
    path: '/',
    component: BaseLayout,
    meta: { requiresAuth: true },
    children: [
      // Routes pour l'étudiant
      {
        path: 'etudiants/espace-etudiant',
        name: 'EspaceEtudiant',
        component: EspaceEtudiant,
        meta: {
          headerTitle: 'Espace étudiant',
          headerIcon: ['fas', 'graduation-cap'],
          requiresRole: 'student'
        }
      },
      {
        path: 'etudiants/nouvelle-demande',
        name: 'NouvelleDemande',
        component: NouvelleDemande,
        meta: {
          headerTitle: 'Nouvelle demande',
          headerIcon: ['fas', 'file-alt'],
          requiresRole: 'student'
        }
      },
      {
        path: 'etudiants/demandes/:id',
        name: 'DetailsDemande',
        component: () => import('@/pages/etudiants/DetailsDemande.vue'),
        meta: {
          headerTitle: 'Détails de la demande',
          headerIcon: ['fas', 'clipboard-list'],
          requiresRole: 'student'
        }
      },
      // Routes pour la secrétaire
      {
        path: 'secretariat/tableau-de-bord',
        name: 'SecretaryDashboard',
        component: Dashboard,
        meta: {
          headerTitle: 'Tableau de bord',
          headerIcon: ['fas', 'chart-simple'],
          requiresRole: 'secretary'
        }
      },
      {
        path: 'secretariat/demandes-recus',
        name: 'DemandesRecues',
        component: DemandesRecues,
        meta: {
          headerTitle: 'Demandes reçues',
          headerIcon: ['fas', 'clipboard-list'],
          requiresRole: 'secretary'
        }
      },
      {
        path: 'secretariat/demandes/:id',
        name: 'TraiterDemande',
        component: () => import('@/pages/secretariat/TraiterDemande.vue'),
        meta: {
          headerTitle: 'Traiter la demande',
          headerIcon: ['fas', 'clipboard-list'],
          requiresRole: 'secretary'
        }
      }
    ]
  },
  // Redirection par défaut
  {
    path: '/:pathMatch(.*)*',
    redirect: (to) => {
      // Si l'utilisateur est authentifié, le rediriger vers la page appropriée en fonction de son rôle
      if (authService.isAuthenticated()) {
        const role = authService.getUserRole()
        if (role === 'student') {
          return '/etudiants/espace-etudiant'
        } else if (role === 'secretary') {
          return '/secretariat/tableau-de-bord'
        }
      }
      // Sinon, rediriger vers la page de connexion
      return '/auth/login'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Navigation guards
router.beforeEach((to, from, next) => {
  const isAuthenticated = authService.isAuthenticated()
  const userRole = authService.getUserRole()
  
  // Routes nécessitant d'être invité (non connecté)
  if (to.meta.requiresGuest && isAuthenticated) {
    // Rediriger vers la page appropriée en fonction du rôle
    if (userRole === 'student') {
      return next('/etudiants/espace-etudiant')
    } else if (userRole === 'secretary') {
      return next('/secretariat/tableau-de-bord')
    }
    return next('/')
  }
  
  // Routes nécessitant d'être authentifié
  if (to.meta.requiresAuth && !isAuthenticated) {
    return next('/auth/login')
  }
  
  // Routes nécessitant un rôle spécifique
  if (to.meta.requiresRole && isAuthenticated && to.meta.requiresRole !== userRole) {
    // Rediriger vers la page appropriée en fonction du rôle
    if (userRole === 'student') {
      return next('/etudiants/espace-etudiant')
    } else if (userRole === 'secretary') {
      return next('/secretariat/tableau-de-bord')
    }
    return next('/')
  }
  
  next()
})

export default router
