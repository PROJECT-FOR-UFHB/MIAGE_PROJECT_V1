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

          // 5. (facultatif) Stocker l'ID de l'utilisateur
          sessionStorage.setItem('user_id', data.user.id_personnel)
        }
        return data
      })
      .catch(error => {
        throw error
      })
  },

  registerStudent(userData) {
    return apiClient.post('/auth/student/register', userData);
      /**/
  },

  verifOtp (userData) {
    return apiClient.post('/auth/student/register-verification',userData)
  },

  createNewPassword(userData){
    return apiClient.post('/auth/student/register-create-password',userData)
  },

  logout() {
    return apiClient.post('/auth/logout')
      .finally(() => {
        sessionStorage.removeItem('auth_token')
        sessionStorage.removeItem('user')
        sessionStorage.removeItem('user_role')
        sessionStorage.removeItem('user_type')
        sessionStorage.removeItem('user_id')
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
  },

  requestPasswordReset (email){
    return apiClient.post('/auth/password/reset-request',{email:email});
  }
}

export default authService
