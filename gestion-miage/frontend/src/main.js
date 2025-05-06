import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

// Importation Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faGraduationCap,
  faFileAlt,
  faClipboardList,
  faUser,
  faCalendar,
  faInfoCircle,
  faPaperclip,
  faChartSimple,
  faSignOutAlt,
  faHourglassHalf,
  faHistory,
  faCheckCircle,
  faBan,
  faCheck,
  faTimes,
  faInbox,
  faThumbsUp,
  faChartPie,       // Pour le tableau de bord (enseignant)
  faEdit,           // Pour demandes à traiter
  faFolderOpen,     // Pour historique
  faBell,           // Pour notifications
  faBars,           // Pour le menu hamburger mobile

  // ✅ Icônes administrateur
  faGauge,          // Tableau de bord admin
  faUsers,          // Gestion utilisateurs
  faUserShield,     // Rôles & accès
  faScroll,         // Logs & sécurité
  faSlidersH,       // Paramètres système
  faDatabase        // Sauvegardes
} from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Ajout de toutes les icônes à la librairie globale
library.add(
  faGraduationCap,
  faFileAlt,
  faClipboardList,
  faUser,
  faCalendar,
  faInfoCircle,
  faPaperclip,
  faChartSimple,
  faSignOutAlt,
  faHourglassHalf,
  faHistory,
  faCheckCircle,
  faBan,
  faCheck,
  faTimes,
  faInbox,
  faThumbsUp,
  faChartPie,
  faEdit,
  faFolderOpen,
  faBell,
  faBars,

  // Ajouts admin
  faGauge,
  faUsers,
  faUserShield,
  faScroll,
  faSlidersH,
  faDatabase
)

const app = createApp(App)

// Composant FontAwesome global
app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router)
app.use(Toast)

app.mount('#app')
