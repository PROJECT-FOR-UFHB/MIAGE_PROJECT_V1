/**
 * Ce code crée une instance personnalisée d’Axios pour interagir avec une API, avec des intercepteurs de requêtes et de réponses
 */

import axios from 'axios'

// Création d'une instance axios avec l'URL de base
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// Avant que chaque requête parte, cet intercepteur :
// Récupère le token du sessionStorage.
// L’ajoute automatiquement aux en-têtes (Authorization: Bearer <token>).

apiClient.interceptors.request.use(
  config => {

    const token = sessionStorage.getItem('auth_token')
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    console.log(' Requête API:', config.method.toUpperCase(), config.url, config.baseURL)
    
    return config
  },
  error => {
    console.error('Erreur de requête:', error)
    return Promise.reject(error)
  }
)

// Interceptor de réponse pour gérer les erreurs d'authentification
apiClient.interceptors.response.use(
  response => {
    // Logger pour déboguer
    console.log('Réponse API:', response.status, response.config.url)
    return response
  },
  error => {
    // Logger pour déboguer
    console.error('Erreur de réponse:', error.response?.status, error.response?.data, error.config?.url)
    
    // Si erreur 401 (non authentifié), on peut rediriger vers la page de login
    if (error.response && error.response.status === 401) {
      // On peut supprimer le token et rediriger vers la page de login
      sessionStorage.removeItem('auth_token')
      sessionStorage.removeItem('user')
      
      // Si vous utilisez Vue Router, vous pouvez rediriger vers la page de login
      // router.push('/login')
    }
    
    return Promise.reject(error)
  }
)

export default apiClient 