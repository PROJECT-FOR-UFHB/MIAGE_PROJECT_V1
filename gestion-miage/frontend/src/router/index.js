import { createRouter, createWebHistory } from 'vue-router'

// Layout principal avec Sidebar/Header dynamiques
import BaseLayout from '@/components/BaseLayout.vue'

// Étudiant
import NouvelleDemande from '@/pages/etudiants/NouvelleDemande.vue'
import EspaceEtudiant from '@/pages/etudiants/EspaceEtudiant.vue'
//import MonProfil from '@/pages/etudiants/MonProfil.vue'

// Secrétaire pédagogique
import DemandesRecues from '@/pages/secretariat/DemandesRecues.vue'
import Dashboard from '@/pages/secretariat/Dashboard.vue'

// Auth
import LoginPage from '@/pages/auth/LoginPage.vue'
import RegisterPage from '@/pages/auth/RegisterPage.vue'
import RequestPasswordResetPage from '@/pages/auth/RequestPasswordResetPage.vue'
import ResetPasswordPage from '@/pages/auth/ResetPasswordPage.vue'

// Service auth
import authService from '@/services/authService'

const routes = [
  {
    path: '/auth',
    children: [
      { path: 'login', name: 'Login', component: LoginPage, meta: { requiresGuest: true } },
      { path: 'register', name: 'Register', component: RegisterPage, meta: { requiresGuest: true } },
      { path: 'request-password-reset', name: 'RequestPasswordReset', component: RequestPasswordResetPage, meta: { requiresGuest: true } },
      { path: 'reset-password', name: 'ResetPassword', component: ResetPasswordPage, meta: { requiresGuest: true } },
    ]
  },

  {
    path: '/',
    component: BaseLayout,
    meta: { requiresAuth: true },
    children: [
      // Étudiant
      {
        path: 'etudiants/espace-etudiant',
        name: 'EspaceEtudiant',
        component: EspaceEtudiant,
        meta: { headerTitle: 'Espace étudiant', headerIcon: ['fas', 'graduation-cap'], requiresRole: 'ETU' }
      },
      {
        path: 'etudiants/nouvelle-demande',
        name: 'NouvelleDemande',
        component: NouvelleDemande,
        meta: { headerTitle: 'Nouvelle demande', headerIcon: ['fas', 'file-alt'], requiresRole: 'ETU' }
      },
      {
        path: 'etudiants/demandes/:id',
        name: 'DetailsDemande',
        component: () => import('@/pages/etudiants/DetailsDemande.vue'),
        meta: { headerTitle: 'Détails de la demande', headerIcon: ['fas', 'clipboard-list'], requiresRole: 'ETU' }
      },
      {
        path: 'etudiants/profil',
        name: 'ProfilEtudiants',
        component: () => import('@/pages/etudiants/MonProfil.vue'),
        meta: { headerTitle: 'Mon profil', headerIcon: ['fas', 'user'], requiresRole: 'ETU' }
      },
      // -------------------------------
      // Espace SECRÉTAIRE PEDAGOGIQUE (SEC)
      // -------------------------------
      {
        path: 'secretariat/tableau-de-bord',
        name: 'SecretaryDashboard',
        component: Dashboard,
        meta: { headerTitle: 'Tableau de bord', headerIcon: ['fas', 'chart-simple'], requiresRole: 'SEC' }
      },
      {
        path: 'secretariat/demandes-recus',
        name: 'DemandesRecues',
        component: DemandesRecues,
        meta: { headerTitle: 'Demandes reçues', headerIcon: ['fas', 'clipboard-list'], requiresRole: 'SEC' }
      },
      {
        path: 'secretariat/demandes/:id',
        name: 'TraiterDemande',
        component: () => import('@/pages/secretariat/TraiterDemande.vue'),
        meta: { headerTitle: 'Traiter la demande', headerIcon: ['fas', 'clipboard-list'], requiresRole: 'SEC' }
      },
      {
        path: 'secretariat/profil',
        name: 'ProfilSecretaire',
        component: () => import('@/pages/secretariat/MonProfil.vue'),
        meta: { headerTitle: 'Mon profil', headerIcon: ['fas', 'user'], requiresRole: 'SEC' }
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
          headerIcon: ['fas', 'edit'],
          requiresRole: 'SAF'
        }
      },
      {
        path: 'sec-admin/demandes/:id',
        name: 'SecFinancierDemandeDetails',
        component: () => import('@/components/secAdmin/SecFinancierDemandeDetails.vue'),
        meta: {
          headerTitle: 'Validation financière',
          headerIcon: ['fas', 'edit'],
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
        meta: { headerTitle: 'Historique', headerIcon: ['fas', 'history'], requiresRole: 'SAF' }
      },
      {
        path: 'sec-admin/notifications',
        name: 'Notifications',
        component: () => import('@/pages/secAdmin/Notifications.vue'),
        meta: { headerTitle: 'Notifications', headerIcon: ['fas', 'bell'], requiresRole: 'SAF' }
      },
      {
        path: 'sec-admin/profil',
        name: 'MonProfil',
        component: () => import('@/pages/secAdmin/MonProfil.vue'),
        meta: { headerTitle: 'Mon profil', headerIcon: ['fas', 'user'], requiresRole: 'SAF' }
      },

      // Directeur MIAGE
      {
        path: 'directeur/tableau-de-bord',
        name: 'DirecteurDashboard',
        component: () => import('@/pages/directeurMiage/Dashboard.vue'),
        meta: { headerTitle: 'Tableau de bord', headerIcon: ['fas', 'chart-pie'], requiresRole: 'DIM' }
      },
      {
        path: 'directeur/demandes-a-signer',
        name: 'DemandesASigner',
        component: () => import('@/pages/directeurMiage/DemandesASigner.vue'),
        meta: { headerTitle: 'Demandes à signer', headerIcon: ['fas', 'edit'], requiresRole: 'DIM' }
      },
      {
        path: 'directeur/demande-details/:id',
        name: 'DemandeDetails',
        component: () => import('@/components/directeurMiage/DemandeDetails.vue'),
        meta: { headerTitle: 'Demandes à signer', headerIcon: ['fas', 'edit'], requiresRole: 'DIM' }

      },
      {
        path: 'directeur/historique',
        name: 'HistoriqueDirecteur',
        component: () => import('@/pages/directeurMiage/Historique.vue'),
        meta: { headerTitle: 'Historique', headerIcon: ['fas', 'history'], requiresRole: 'DIM' }
      },
      {
        path: 'directeur/notifications',
        name: 'NotificationsDirecteur',
        component: () => import('@/pages/directeurMiage/Notifications.vue'),
        meta: { headerTitle: 'Notifications', headerIcon: ['fas', 'bell'], requiresRole: 'DIM' }
      },
      {
        path: 'directeur/profil',
        name: 'ProfilDirecteur',
        component: () => import('@/pages/directeurMiage/MonProfil.vue'),
        meta: { headerTitle: 'Mon profil', headerIcon: ['fas', 'user'], requiresRole: 'DIM' }
      },

      // Responsable de Niveau
      {
        path: 'responsable/tableau-de-bord',
        name: 'ResponsableDashboard',
        component: () => import('@/pages/responsableNiveau/Dashboard.vue'),
        meta: { headerTitle: 'Tableau de bord', headerIcon: ['fas', 'chart-pie'], requiresRole: 'RDN' }
      },
      {
        path: 'responsable/demandes',
        name: 'DemandesNiveau',
        component: () => import('@/pages/responsableNiveau/DemandesNiveau.vue'),
        meta: { headerTitle: 'Demandes de mon niveau', headerIcon: ['fas', 'file-alt'], requiresRole: 'RDN' }
      },
      {
        path: 'responsable/historique',
        name: 'HistoriqueNiveau',
        component: () => import('@/pages/responsableNiveau/Historique.vue'),
        meta: { headerTitle: 'Historique complet', headerIcon: ['fas', 'history'], requiresRole: 'RDN' }
      },
      {
        path: 'responsable/notifications',
        name: 'NotificationsNiveau',
        component: () => import('@/pages/responsableNiveau/Notifications.vue'),
        meta: { headerTitle: 'Notifications', headerIcon: ['fas', 'bell'], requiresRole: 'RDN' }
      },
      {
        path: 'responsable/profil',
        name: 'ProfilResponsable',
        component: () => import('@/pages/responsableNiveau/MonProfil.vue'),
        meta: { headerTitle: 'Mon profil', headerIcon: ['fas', 'user'], requiresRole: 'RDN' }
      },

      // Enseignant
      {
        path: 'enseignant/dashboard',
        name: 'EnseignantDashboard',
        component: () => import('@/pages/enseignant/Dashboard.vue'),
        meta: { headerTitle: 'Tableau de bord', headerIcon: ['fas', 'chart-pie'], requiresRole: 'ENS' }
      },
      {
        path: 'enseignant/demandes-a-traiter',
        name: 'DemandesATraiter',
        component: () => import('@/pages/enseignant/DemandesATraiter.vue'),
        meta: { headerTitle: 'Demandes à traiter', headerIcon: ['fas', 'edit'], requiresRole: 'ENS' }
      },
      {
        path: 'enseignant/historique',
        name: 'HistoriqueEnseignant',
        component: () => import('@/pages/enseignant/Historique.vue'),
        meta: { headerTitle: 'Lettres de recommandation', headerIcon: ['fas', 'folder-open'], requiresRole: 'ENS' }
      },
      {
        path: 'enseignant/notifications',
        name: 'NotificationsEnseignant',
        component: () => import('@/pages/enseignant/Notifications.vue'),
        meta: { headerTitle: 'Notifications', headerIcon: ['fas', 'bell'], requiresRole: 'ENS' }
      },
      {
        path: 'enseignant/profil',
        name: 'ProfilEnseignant',
        component: () => import('@/pages/enseignant/MonProfil.vue'),
        meta: { headerTitle: 'Mon profil', headerIcon: ['fas', 'user'], requiresRole: 'ENS' }
      },

      // Admin
      {
        path: 'admin/dashboard',
        name: 'AdminDashboard',
        component: () => import('@/pages/admin/Dashboard.vue'),
        meta: { headerTitle: 'Tableau de bord', headerIcon: ['fas', 'gauge'], requiresRole: 'ADM' }
      },
      {
        path: 'admin/utilisateurs',
        name: 'GestionUtilisateurs',
        component: () => import('@/pages/admin/GestionUtilisateurs.vue'),
        meta: { headerTitle: 'Utilisateurs', headerIcon: ['fas', 'users'], requiresRole: 'ADM' }
      },
      {
        path: 'admin/roles',
        name: 'GestionRoles',
        component: () => import('@/pages/admin/Roles.vue'),
        meta: { headerTitle: 'Rôles & accès', headerIcon: ['fas', 'user-shield'], requiresRole: 'ADM' }
      },
      {
        path: 'admin/logs',
        name: 'LogsSecurite',
        component: () => import('@/pages/admin/LogsSecurite.vue'),
        meta: { headerTitle: 'Logs & sécurité', headerIcon: ['fas', 'scroll'], requiresRole: 'ADM' }
      },
      {
        path: 'admin/parametres',
        name: 'ParametresSysteme',
        component: () => import('@/pages/admin/Parametres.vue'),
        meta: { headerTitle: 'Paramètres système', headerIcon: ['fas', 'sliders-h'], requiresRole: 'ADM' }
      },
      {
        path: 'admin/sauvegardes',
        name: 'SauvegardesSysteme',
        component: () => import('@/pages/admin/Sauvegardes.vue'),
        meta: { headerTitle: 'Sauvegardes', headerIcon: ['fas', 'database'], requiresRole: 'ADM' }
      },
      {
        path: 'admin/profil',
        name: 'ProfilAdmin',
        component: () => import('@/pages/admin/MonProfil.vue'),
        meta: { headerTitle: 'Mon profil', headerIcon: ['fas', 'user-cog'], requiresRole: 'ADM' }
      }
    ]
  },

  // Redirection automatique
  {
    path: '/:pathMatch(.*)*',
    redirect: () => {
      if (authService.isAuthenticated()) {
        const role = authService.getUserRole()
        if (role === 'ETU') return '/etudiants/espace-etudiant'
        if (role === 'SEC') return '/secretariat/tableau-de-bord'
        if (role === 'SAF') return '/sec-admin/dashboard'
        if (role === 'DIM') return '/directeur/tableau-de-bord'
        if (role === 'RESP_NIV') return '/responsable/tableau-de-bord'
        if (role === 'ENSEIGNANT') return '/enseignant/dashboard'
        if (role === 'ADMIN') return '/admin/dashboard'
      }
      return '/auth/login'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Guard
router.beforeEach((to, from, next) => {
  const isAuth = authService.isAuthenticated()
  const userRole = authService.getUserRole()

  if (to.meta.requiresGuest && isAuth) {
    if (userRole === 'ETU') return next('/etudiants/espace-etudiant')
    if (userRole === 'SEC') return next('/secretariat/tableau-de-bord')
    if (userRole === 'SAF') return next('/sec-admin/dashboard')
    if (userRole === 'DIM') return next('/directeur/tableau-de-bord')
    if (userRole === 'RESP_NIV') return next('/responsable/tableau-de-bord')
    if (userRole === 'ENSEIGNANT') return next('/enseignant/dashboard')
    if (userRole === 'ADMIN') return next('/admin/dashboard')
    return next('/')
  }

  if (to.meta.requiresAuth && !isAuth) {
    return next('/auth/login')
  }

  if (to.meta.requiresRole && isAuth && to.meta.requiresRole !== userRole) {
    if (userRole === 'ETU') return next('/etudiants/espace-etudiant')
    if (userRole === 'SEC') return next('/secretariat/tableau-de-bord')
    if (userRole === 'SAF') return next('/sec-admin/dashboard')
    if (userRole === 'DIM') return next('/directeur/tableau-de-bord')
    if (userRole === 'RESP_NIV') return next('/responsable/tableau-de-bord')
    if (userRole === 'ENSEIGNANT') return next('/enseignant/dashboard')
    if (userRole === 'ADMIN') return next('/admin/dashboard')
    return next('/')
  }

  next()
})

export default router
