import { createRouter, createWebHistory } from 'vue-router'

// Layout principal qui gère sidebar/header dynamiques
import BaseLayout from '@/components/BaseLayout.vue'

// Étudiant
import NouvelleDemande    from '@/pages/etudiants/NouvelleDemande.vue'
import EspaceEtudiant     from '@/pages/etudiants/EspaceEtudiant.vue'

// Secrétaire pédagogique
import DemandesRecues     from '@/pages/secretariat/DemandesRecues.vue'
import Dashboard          from '@/pages/secretariat/Dashboard.vue'

// Authentification
import LoginPage                from '@/pages/auth/LoginPage.vue'
import RegisterPage             from '@/pages/auth/RegisterPage.vue'
import RequestPasswordResetPage from '@/pages/auth/RequestPasswordResetPage.vue'
import ResetPasswordPage        from '@/pages/auth/ResetPasswordPage.vue'

// Services
import authService from '@/services/authService'

const routes = [
  // Routes d'authentification
  {
    path: '/auth',
    children: [
      { path: 'login',                  name: 'Login',                component: LoginPage,               meta: { requiresGuest: true } },
      { path: 'register',               name: 'Register',             component: RegisterPage,            meta: { requiresGuest: true } },
      { path: 'request-password-reset', name: 'RequestPasswordReset', component: RequestPasswordResetPage, meta: { requiresGuest: true } },
      { path: 'reset-password',         name: 'ResetPassword',        component: ResetPasswordPage,       meta: { requiresGuest: true } },
    ]
  },

  // Layout général avec header/sidebar dynamiques selon rôle
  {
    path: '/',
    component: BaseLayout,
    meta: { requiresAuth: true }, // Tous les enfants doivent être connectés
    children: [
      // ---------------------
      // Espace ÉTUDIANT (ETU)
      // ---------------------
      {
        path: 'etudiants/espace-etudiant',
        alias: '/student/dashboard',
        name: 'EspaceEtudiant',
        component: EspaceEtudiant,
        meta: {
          headerTitle: 'Espace étudiant',
          headerIcon: ['fas', 'graduation-cap'],
          requiresRole: 'ETU'
        }
      },
      {
        path: 'etudiants/nouvelle-demande',
        name: 'NouvelleDemande',
        component: NouvelleDemande,
        meta: {
          headerTitle: 'Nouvelle demande',
          headerIcon: ['fas', 'file-alt'],
          requiresRole: 'ETU'
        }
      },
      {
        path: 'etudiants/demandes/:id',
        name: 'DetailsDemande',
        component: () => import('@/pages/etudiants/DetailsDemande.vue'),
        meta: {
          headerTitle: 'Détails de la demande',
          headerIcon: ['fas', 'clipboard-list'],
          requiresRole: 'ETU'
        }
      },

      // ---------------------
      // Espace SECRÉTAIRE (SEC)
      // ---------------------
      {
        path: 'secretariat/tableau-de-bord',
        name: 'SecretaryDashboard',
        component: Dashboard,
        meta: {
          headerTitle: 'Tableau de bord',
          headerIcon: ['fas', 'chart-simple'],
          requiresRole: 'SEC'
        }
      },
      {
        path: 'secretariat/demandes-recus',
        name: 'DemandesRecues',
        component: DemandesRecues,
        meta: {
          headerTitle: 'Demandes reçues',
          headerIcon: ['fas', 'clipboard-list'],
          requiresRole: 'SEC'
        }
      },
      {
        path: 'secretariat/demandes/:id',
        name: 'TraiterDemande',
        component: () => import('@/pages/secretariat/TraiterDemande.vue'),
        meta: {
          headerTitle: 'Traiter la demande',
          headerIcon: ['fas', 'clipboard-list'],
          requiresRole: 'SEC'
        }
      },

      // -------------------------------
      // Espace SECRÉTAIRE ADMIN (SEC_ADM)
      // -------------------------------
      {
        path: 'sec-admin/validation',
        name: 'ValidationFinanciere',
        component: () => import('@/pages/secAdmin/ValidationFinanciere.vue'),
        meta: {
          headerTitle: 'Validation financière',
          headerIcon: ['fas', 'file-invoice-dollar'],
          requiresRole: 'SAF'
        }
      },
      {
        path: 'sec-admin/dashboard',
        name: 'SecAdminDashboard',
        component: () => import('@/pages/secAdmin/Dashboard.vue'),
        meta: {
          headerTitle: 'Tableau de bord',
          headerIcon: ['fas', 'chart-pie'],
          requiresRole: 'SAF'
        }
      },
      {
        path: 'sec-admin/historique',
        name: 'Historique',
        component: () => import('@/pages/secAdmin/Historique.vue'),
        meta: {
          headerTitle: 'Historique',
          headerIcon: ['fas', 'history'],
          requiresRole: 'SEC_ADM'
        }
      },
      {
        path: 'sec-admin/notifications',
        name: 'Notifications',
        component: () => import('@/pages/secAdmin/Notifications.vue'),
        meta: {
          headerTitle: 'Notifications',
          headerIcon: ['fas', 'bell'],
          requiresRole: 'SEC_ADM'
        }
      },
      {
        path: 'sec-admin/profil',
        name: 'MonProfil',
        component: () => import('@/pages/secAdmin/MonProfil.vue'),
        meta: {
          headerTitle: 'Mon profil',
          headerIcon: ['fas', 'user'],
          requiresRole: 'SEC_ADM'
        }
      }
    ]
  },

  // Route fallback (si l'utilisateur tape une URL inconnue)
  {
    path: '/:pathMatch(.*)*',
    redirect: () => {
      if (authService.isAuthenticated()) {
        const role = authService.getUserRole()
        if (role === 'ETU') return '/etudiants/espace-etudiant'
        if (role === 'SEC') return '/secretariat/tableau-de-bord'
        if (role === 'SEC_ADM') return '/sec-admin/dashboard' // 👈 Ajouté
      }
      return '/auth/login'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 🔐 Guard de navigation (exécuté avant chaque changement de page)
router.beforeEach((to, from, next) => {
  const isAuth   = authService.isAuthenticated()
  const userRole = authService.getUserRole()

  // Si route pour invités uniquement (login/register) et utilisateur déjà connecté
  if (to.meta.requiresGuest && isAuth) {
    if (userRole === 'ETU') return next('/etudiants/espace-etudiant')
    if (userRole === 'SEC') return next('/secretariat/tableau-de-bord')
    if (userRole === 'SEC_ADM') return next('/sec-admin/dashboard')
    return next('/')
  }

  // Si route nécessite authentification mais l'utilisateur n'est pas connecté
  if (to.meta.requiresAuth && !isAuth) {
    return next('/auth/login')
  }

  // Si la route est réservée à un rôle spécifique
  if (to.meta.requiresRole && isAuth && to.meta.requiresRole !== userRole) {
    if (userRole === 'ETU') return next('/etudiants/espace-etudiant')
    if (userRole === 'SEC') return next('/secretariat/tableau-de-bord')
    if (userRole === 'SEC_ADM') return next('/sec-admin/dashboard')
    return next('/')
  }

  // OK, on peut accéder
  next()
})

export default router
