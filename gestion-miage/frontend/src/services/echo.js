import Echo from 'laravel-echo'
import { io } from 'socket.io-client'

// Définir la variable globale io pour Laravel Echo
window.io = io

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
    broadcaster: 'socket.io',
    host: 'http://localhost:8080', // URL du serveur Reverb
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
