import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Importer Font Awesome et les icônes souhaitées
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
  faQuestion,
  faBell
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Ajouter les icônes à la librairie
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
  faQuestion,
  faBell
)

const app = createApp(App)

// Enregistrer le composant font-awesome-icon globalement
app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router)

app.mount('#app')
