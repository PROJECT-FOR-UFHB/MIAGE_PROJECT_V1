import apiClient from './apiClient'

const studentService = {
  /**
   * Obtenir le profil de l'étudiant connecté
   * @returns {Promise} - Promesse avec les données du profil étudiant
   */
  getProfile() {
    return apiClient.get('/students/profile')
  },

  /**
   * Mettre à jour le profil de l'étudiant connecté
   * @param {Object} profileData - Les données du profil à mettre à jour
   * @returns {Promise} - Promesse avec les données du profil mis à jour
   */
  updateProfile(profileData) {
    return apiClient.put('/students/profile', profileData)
  },

  /**
   * Obtenir le tableau de bord de l'étudiant connecté
   * @returns {Promise} - Promesse avec les données du tableau de bord
   */
  getDashboard() {
    return apiClient.get('/students/dashboard')
  }
}

export default studentService 