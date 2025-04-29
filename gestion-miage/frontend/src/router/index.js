import { createRouter, createWebHistory } from 'vue-router'
import BaseLayout               from '@/components/BaseLayout.vue'
import NouvelleDemande          from '@/pages/etudiants/NouvelleDemande.vue'
import EspaceEtudiant           from '@/pages/etudiants/EspaceEtudiant.vue'
import DemandesRecues           from '@/pages/secretariat/DemandesRecues.vue'
import Dashboard                from '@/pages/secretariat/Dashboard.vue'
import LoginPage                from '@/pages/auth/LoginPage.vue'
import RegisterPage             from '@/pages/auth/RegisterPage.vue'
import RequestPasswordResetPage from '@/pages/auth/RequestPasswordResetPage.vue'
import ResetPasswordPage        from '@/pages/auth/ResetPasswordPage.vue'
import authService              from '@/services/authService'

const routes = [
  {
    path: '/auth',
    children: [
      { path: 'login',                  name: 'Login',                component: LoginPage,               meta: { requiresGuest: true } },
      { path: 'register',               name: 'Register',             component: RegisterPage,            meta: { requiresGuest: true } },
      { path: 'request-password-reset', name: 'RequestPasswordReset', component: RequestPasswordResetPage, meta: { requiresGuest: true } },
      { path: 'reset-password',         name: 'ResetPassword',        component: ResetPasswordPage,       meta: { requiresGuest: true } },
    ]
  },
  {
    path: '/',
    component: BaseLayout,
    meta: { requiresAuth: true },
    children: [
      // Espace étudiant (code ETU)
      {
        path: 'etudiants/espace-etudiant',
        alias: '/student/dashboard',
        name: 'EspaceEtudiant',
        component: EspaceEtudiant,
        meta: {
          headerTitle: 'Espace étudiant',
          headerIcon: ['fas', 'graduation-cap'],
          requiresRole: 'ETU'        // ← CODE mis à jour
        }
      },
      {
        path: 'etudiants/nouvelle-demande',
        name: 'NouvelleDemande',
        component: NouvelleDemande,
        meta: {
          headerTitle: 'Nouvelle demande',
          headerIcon: ['fas', 'file-alt'],
          requiresRole: 'ETU'        // ← CODE mis à jour
        }
      },
      {
        path: 'etudiants/demandes/:id',
        name: 'DetailsDemande',
        component: () => import('@/pages/etudiants/DetailsDemande.vue'),
        meta: {
          headerTitle: 'Détails de la demande',
          headerIcon: ['fas', 'clipboard-list'],
          requiresRole: 'ETU'        // ← CODE mis à jour
        }
      },

      // Tableau de bord secrétaire (code SEC)
      {
        path: 'secretariat/tableau-de-bord',
        alias: '/personnel/dashboard',
        name: 'SecretaryDashboard',
        component: Dashboard,
        meta: {
          headerTitle: 'Tableau de bord',
          headerIcon: ['fas', 'chart-simple'],
          requiresRole: 'SEC'        // ← CODE mis à jour
        }
      },
      {
        path: 'secretariat/demandes-recus',
        name: 'DemandesRecues',
        component: DemandesRecues,
        meta: {
          headerTitle: 'Demandes reçues',
          headerIcon: ['fas', 'clipboard-list'],
          requiresRole: 'SEC'        // ← CODE mis à jour
        }
      },
      {
        path: 'secretariat/demandes/:id',
        name: 'TraiterDemande',
        component: () => import('@/pages/secretariat/TraiterDemande.vue'),
        meta: {
          headerTitle: 'Traiter la demande',
          headerIcon: ['fas', 'clipboard-list'],
          requiresRole: 'SEC'        // ← CODE mis à jour
        }
      },
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: () => {
      if (authService.isAuthenticated()) {
        const role = authService.getUserRole()
        if (role === 'ETU') return '/etudiants/espace-etudiant'
        if (role === 'SEC') return '/secretariat/tableau-de-bord'
      }
      return '/auth/login'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Guards de navigation
router.beforeEach((to, from, next) => {
  const isAuth   = authService.isAuthenticated()
  const userRole = authService.getUserRole()

  // Routes “guest”
  if (to.meta.requiresGuest && isAuth) {
    if (userRole === 'ETU') return next('/etudiants/espace-etudiant')
    if (userRole === 'SEC') return next('/secretariat/tableau-de-bord')
    return next('/')
  }

  // Routes nécessitant authentification
  if (to.meta.requiresAuth && !isAuth) {
    return next('/auth/login')
  }

  // Routes nécessitant un rôle
  if (to.meta.requiresRole && isAuth && to.meta.requiresRole !== userRole) {
    if (userRole === 'ETU') return next('/etudiants/espace-etudiant')
    if (userRole === 'SEC') return next('/secretariat/tableau-de-bord')
    return next('/')
  }

  next()
})

export default router
