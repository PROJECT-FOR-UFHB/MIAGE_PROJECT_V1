import apiClient from './apiClient'

const authService = {
  /**
   * Connexion d'un utilisateur
   * @param {string} email - Email de l'utilisateur
   * @param {string} password - Mot de passe de l'utilisateur
   * @returns {Promise} - Promesse avec les données d'authentification
   */
  login(email, password) {
    console.log('Tentative de connexion avec:', { email });
    return apiClient.post('/auth/login', { email, password })
      .then(response => {
        console.log('Réponse de connexion:', response.data);
        if (response.data && response.data.token) {
          // Stocker le token d'authentification
          localStorage.setItem('auth_token', response.data.token)
          
          // Stocker les informations de l'utilisateur
          localStorage.setItem('user', JSON.stringify(response.data.user))
          
          // Stocker le rôle de l'utilisateur
          localStorage.setItem('user_role', response.data.role)
        }
        return response.data
      })
      .catch(error => {
        console.error('Erreur de connexion:', error.response?.data || error.message);
        throw error;
      });
  },

  /**
   * Inscription d'un étudiant
   * @param {Object} userData - Données de l'utilisateur
   * @returns {Promise} - Promesse avec les données d'authentification
   */
  registerStudent(userData) {
    return apiClient.post('/auth/student/register', userData)
      .then(response => {
        if (response.data && response.data.token) {
          // Stocker le token d'authentification
          localStorage.setItem('auth_token', response.data.token)
          
          // Stocker les informations de l'utilisateur
          localStorage.setItem('user', JSON.stringify(response.data.user))
          
          // Stocker le rôle de l'utilisateur (étudiant par défaut)
          localStorage.setItem('user_role', 'student')
        }
        return response.data
      })
  },

  /**
   * Déconnexion de l'utilisateur
   * @returns {Promise} - Promesse avec le statut de déconnexion
   */
  logout() {
    // Appel API pour invalider le token côté serveur
    return apiClient.post('/auth/logout')
      .finally(() => {
        // Toujours supprimer les informations locales même en cas d'erreur
        localStorage.removeItem('auth_token')
        localStorage.removeItem('user')
        localStorage.removeItem('user_role')
      })
  },

  /**
   * Demande de réinitialisation de mot de passe
   * @param {string} email - Email de l'utilisateur
   * @returns {Promise} - Promesse avec le statut de la demande
   */
  requestPasswordReset(email) {
    return apiClient.post('/auth/password/reset-request', { email:email })
  },
  verifyCode(code, email) {
    return apiClient.post('auth/verify-reset-code', { code:code, email:email })
  },
  changePassword(password, email) { // pour le changement de mot de passe 
    return apiClient.post('auth/password/reset', { password:password, email:email })
  },    
  /**
   * Réinitialisation de mot de passe
   * @param {Object} resetData - Données de réinitialisation
   * @param {string} resetData.token - Token de réinitialisation
   * @param {string} resetData.email - Email de l'utilisateur
   * @param {string} resetData.password - Nouveau mot de passe
   * @param {string} resetData.password_confirmation - Confirmation du nouveau mot de passe
   * @returns {Promise} - Promesse avec le statut de la réinitialisation
   */
  // resetPassword(resetData) {
  //   return apiClient.post('/auth/password/reset', resetData)
  // },

  /**
   * Vérifier si l'utilisateur est authentifié
   * @returns {boolean} - True si authentifié, false sinon
   */
  isAuthenticated() {
    return !!localStorage.getItem('auth_token')
  },

  /**
   * Obtenir l'utilisateur connecté
   * @returns {Object|null} - Données de l'utilisateur ou null si non connecté
   */
  getUser() {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  },

  /**
   * Obtenir le rôle de l'utilisateur
   * @returns {string|null} - Rôle de l'utilisateur ou null si non connecté
   */
  getUserRole() {
    return localStorage.getItem('user_role')
  },

  /**
   * Vérifier si l'utilisateur a un rôle spécifique
   * @param {string} role - Rôle à vérifier
   * @returns {boolean} - True si l'utilisateur a le rôle spécifié, false sinon
   */
  hasRole(role) {
    const userRole = this.getUserRole()
    return userRole === role
  }
}

export default authService 