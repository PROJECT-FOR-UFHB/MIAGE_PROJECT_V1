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
  },

  /**
   * GET
   * Récupérer les éléments de formulaire pour créer une demande 
   * @returns {Promise} - Promesse avec les informations sur le fichier téléchargé
   */
  getElementsFormulaire() {
    return apiClient.get('students/create-demande')
  },

  /**
   * POST
   * Envoyer les éléments de formulaire pour créer une demande
   * @param {*} formData 
   * @returns {Promise} - Promesse avec les informations sur le fichier téléchargé
   */
  postElementsFormulaire(formData) {
    
    return apiClient.post('students/create-demande', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },/**
  * Récupérer l'état de progression de la demande
  * @param {string} dmdId
  * @returns {Promise}
  */
 getRequestProgress(dmdId) {
   return apiClient.get(`/students/suivis/${dmdId}`)
 }
 
  
  
}

export default studentService 