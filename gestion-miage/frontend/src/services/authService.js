import apiClient from './apiClient'

const authService = {
  login(email, password) {
    return apiClient.post('/auth/login', { email, password })
      .then(({ data }) => {
        if (data.token) {
          // 1. Stocker le token
          sessionStorage.setItem('auth_token', data.token)
          
          // 2. Stocker l'utilisateur complet
          sessionStorage.setItem('user', JSON.stringify(data.user))
          
          // 3. Stocker l'id_role (ETU, SEC, ADM, etc.)
          sessionStorage.setItem('user_role', data.user.id_role)
          
          // 4. (facultatif) Stocker user_type ('etudiant' ou 'personnel')
          sessionStorage.setItem('user_type', data.user_type)
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
          sessionStorage.setItem('auth_token', data.token)
          sessionStorage.setItem('user', JSON.stringify(data.user))
          // à l'inscription, on sait que c'est ETU
          sessionStorage.setItem('user_role', 'ETU')
          sessionStorage.setItem('user_type', 'etudiant')
        }
        return data
      })
  },

  logout() {
    return apiClient.post('/auth/logout')
      .finally(() => {
        sessionStorage.removeItem('auth_token')
        sessionStorage.removeItem('user')
        sessionStorage.removeItem('user_role')
        sessionStorage.removeItem('user_type')
      })
  },

  isAuthenticated() {
    return !!sessionStorage.getItem('auth_token')
  },

  getUser() {
    const u = sessionStorage.getItem('user')
    return u ? JSON.parse(u) : null
  },

  /**
   * Retourne l'id_role : 'ETU', 'SEC', 'ADM', etc.
   */
  getUserRole() {
    return sessionStorage.getItem('user_role')
  },

  /**
   * Retourne le type d'utilisateur : 'etudiant' ou 'personnel'
   */
  getUserType() {
    return sessionStorage.getItem('user_type')
  }
}

export default authService
