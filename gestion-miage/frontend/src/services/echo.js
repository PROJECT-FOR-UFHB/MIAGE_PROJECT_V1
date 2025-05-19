import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

// Configuration globale pour Pusher
window.Pusher = Pusher

// Instance d'Echo
let echoInstance = null

/**
 * Initialise Laravel Echo pour la connexion WebSocket
 * @param {string} token - Le token d'authentification
 * @returns {Echo} L'instance d'Echo initialisée
 */
export function initEcho(token) {
  if (echoInstance) {
    echoInstance.disconnect()
  }

  // Créer une nouvelle instance d'Echo
  echoInstance = new Echo({
    broadcaster: 'pusher',
    key: 'miage_key',
    wsHost: window.location.hostname,
    wsPort: 8080,
    forceTLS: false,
    disableStats: true,
    enabledTransports: ['ws', 'wss'],
    auth: {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  })

  console.log('Laravel Echo initialisé avec succès')
  return echoInstance
}

/**
 * Récupère l'instance d'Echo
 * @returns {Echo|null} L'instance d'Echo ou null si non initialisée
 */
export function getEcho() {
  return echoInstance
}

/**
 * Déconnecte Echo
 */
export function disconnectEcho() {
  if (echoInstance) {
    echoInstance.disconnect()
    echoInstance = null
    console.log('Laravel Echo déconnecté')
  }
}

export default {
  initEcho,
  getEcho,
  disconnectEcho
}
