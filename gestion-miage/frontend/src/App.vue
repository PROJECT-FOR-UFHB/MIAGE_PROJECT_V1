<template>
  <router-view />
</template>

<script>
import { onMounted, onUnmounted } from 'vue'
import { initEcho, disconnectEcho } from './services/echo'

export default {
  setup() {
    // Initialiser Echo au chargement de l'application
    const initializeEcho = () => {
      const token = sessionStorage.getItem('auth_token')
      if (token) {
        initEcho(token)
      }
    }

    onMounted(() => {
      // Initialiser Echo
      initializeEcho()

      // Écouter les événements d'authentification
      window.addEventListener('storage', handleStorageChange)
    })

    // Gérer les changements de stockage (connexion/déconnexion)
    const handleStorageChange = (event) => {
      if (event.key === 'auth_token') {
        if (event.newValue) {
          initEcho(event.newValue)
        } else {
          disconnectEcho()
        }
      }
    }

    onUnmounted(() => {
      // Déconnecter Echo
      disconnectEcho()
      // Supprimer l'écouteur d'événements
      window.removeEventListener('storage', handleStorageChange)
    })
  }
}
</script>
