import apiClient from './apiClient'

const authService = {
  login(email, password) {
    return apiClient.post('/auth/login', { email, password })
      .then(({ data }) => {
        if (data.token) {
          // 1. Stocker le token
          localStorage.setItem('auth_token', data.token)
          
          // 2. Stocker l'utilisateur complet
          localStorage.setItem('user', JSON.stringify(data.user))
          
          // 3. Stocker l'id_role (ETU, SEC, ADM, etc.)
          localStorage.setItem('user_role', data.user.id_role)
          
          // 4. (facultatif) Stocker user_type ('etudiant' ou 'personnel')
          localStorage.setItem('user_type', data.user_type)
        }
        return data
      })
      .catch(error => {
        throw error
      })
  },

  registerStudent(userData) {
    return apiClient.post('/auth/student/register', userData)
      .then(({ data }) => {
        if (data.token) {
          localStorage.setItem('auth_token', data.token)
          localStorage.setItem('user', JSON.stringify(data.user))
          // à l'inscription, on sait que c'est ETU
          localStorage.setItem('user_role', 'ETU')
          localStorage.setItem('user_type', 'etudiant')
        }
        return data
      })
  },

  logout() {
    return apiClient.post('/auth/logout')
      .finally(() => {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('user')
        localStorage.removeItem('user_role')
        localStorage.removeItem('user_type')
      })
  },

  isAuthenticated() {
    return !!localStorage.getItem('auth_token')
  },

  getUser() {
    const u = localStorage.getItem('user')
    return u ? JSON.parse(u) : null
  },

  /**
   * Retourne l'id_role : 'ETU', 'SEC', 'ADM', etc.
   */
  getUserRole() {
    return localStorage.getItem('user_role')
  },

  /**
   * Retourne le type d'utilisateur : 'etudiant' ou 'personnel'
   */
  getUserType() {
    return localStorage.getItem('user_type')
  }
}

export default authService
