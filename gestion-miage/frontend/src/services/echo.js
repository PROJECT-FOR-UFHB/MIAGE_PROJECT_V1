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
    console.log('Instance Echo existante détectée')
    return echoInstance
  }

  const wsHost = import.meta.env.VITE_WEBSOCKET_HOST || '127.0.0.1'
  const wsPort = parseInt(import.meta.env.VITE_WEBSOCKET_PORT || '8080')

  const config = {
    broadcaster: 'pusher',
    key: 'miage_key',
    wsHost: wsHost,
    wsPort: wsPort,
    cluster: 'mt1',
    forceTLS: false,
    encrypted: false,
    enabledTransports: ['ws'],
    disableStats: true,
    authEndpoint: 'http://localhost:8000/api/broadcasting/auth',
    auth: {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    }
  }

  console.log('Configuration Echo:', config)

  try {
    // Créer une nouvelle instance d'Echo
    echoInstance = new Echo(config)

    // Ajouter des gestionnaires d'événements pour Pusher
    echoInstance.connector.pusher.connection.bind('connected', () => {
      console.log('WebSocket connecté avec succès')
    })

    echoInstance.connector.pusher.connection.bind('error', (err) => {
      console.error('Erreur de connexion WebSocket:', err)
      // Réinitialiser l'instance en cas d'erreur
      echoInstance = null
    })

    echoInstance.connector.pusher.connection.bind('disconnected', () => {
      console.log('WebSocket déconnecté')
      // Réinitialiser l'instance en cas de déconnexion
      echoInstance = null
    })

    console.log('Laravel Echo initialisé avec succès')
    return echoInstance
  } catch (error) {
    console.error('Erreur lors de l\'initialisation d\'Echo:', error)
    echoInstance = null
    return null
  }
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
