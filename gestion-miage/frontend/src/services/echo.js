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
    key: import.meta.env.VITE_PUSHER_APP_KEY || 'miage_key',
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER || 'eu',
    wsHost: import.meta.env.VITE_WEBSOCKET_HOST || window.location.hostname,
    wsPort: parseInt(import.meta.env.VITE_WEBSOCKET_PORT || '8080'),
    forceTLS: false,
    disableStats: true,
    enabledTransports: ['ws', 'wss'],
    encrypted: false,
    // Indiquer qu'il s'agit d'un hôte personnalisé (important)
    host: `${import.meta.env.VITE_WEBSOCKET_HOST || window.location.hostname}:${import.meta.env.VITE_WEBSOCKET_PORT || '8080'}`,
    auth: {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
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
