import apiClient from './apiClient'

const requestService = {
  /**
   * Créer une nouvelle demande
   * @param {Object} requestData - Les données de la demande
   * @returns {Promise} - Promesse avec les données de la demande créée
   */
  createRequest(requestData) {
    return apiClient.post('/requests', requestData)
  },

  /**
   * Obtenir toutes les demandes
   * @returns {Promise} - Promesse avec la liste des demandes
   */
  getAllRequests() {
    return apiClient.get('/requests')
  },

  /**
   * Obtenir une demande spécifique
   * @param {number} id - L'identifiant de la demande
   * @returns {Promise} - Promesse avec les données de la demande
   */
  getRequest(id) {
    return apiClient.get(`/requests/${id}`)
  },

  /**
   * Mettre à jour une demande
   * @param {number} id - L'identifiant de la demande
   * @param {Object} requestData - Les données mises à jour de la demande
   * @returns {Promise} - Promesse avec les données de la demande mise à jour
   */
  updateRequest(id, requestData) {
    return apiClient.put(`/requests/${id}`, requestData)
  },

  /**
   * Supprimer une demande
   * @param {number} id - L'identifiant de la demande
   * @returns {Promise} - Promesse avec le statut de la suppression
   */
  deleteRequest(id) {
    return apiClient.delete(`/requests/${id}`)
  },

  /**
   * Obtenir l'historique des demandes
   * @returns {Promise} - Promesse avec l'historique des demandes
   */
  getRequestHistory() {
    return apiClient.get('/requests/history')
  },

  /**
   * Obtenir les demandes en attente (pour le staff)
   * @returns {Promise} - Promesse avec la liste des demandes en attente
   */
  getPendingRequests() {
    return apiClient.get('/requests/management/pending')
  },

  /**
   * Obtenir les demandes traitées (pour le staff)
   * @returns {Promise} - Promesse avec la liste des demandes traitées
   */
  getProcessedRequests() {
    return apiClient.get('/requests/management/processed')
  },

  /**
   * Obtenir les statistiques des demandes (pour le staff)
   * @returns {Promise} - Promesse avec les statistiques des demandes
   */
  getRequestStatistics() {
    return apiClient.get('/requests/management/statistics')
  },

  /**
   * Vérifier le statut d'une demande (public)
   * @param {number} id - L'identifiant de la demande
   * @returns {Promise} - Promesse avec le statut de la demande
   */
  checkRequestStatus(id) {
    return apiClient.get(`/request/${id}/status`)
  },

  /**
   * Obtenir tous les types de demandes
   * @returns {Promise} - Promesse avec la liste des types de demandes
   */
  getRequestTypes() {
    return apiClient.get('/request-types')
  },

  /**
   * Obtenir les types de fichiers requis pour un type de demande
   * @param {number} typeId - L'identifiant du type de demande
   * @returns {Promise} - Promesse avec la liste des types de fichiers requis
   */
  getRequiredFileTypes(typeId) {
    return apiClient.get(`/request-types/${typeId}/required-files`)
  },

  /**
   * Obtenir l'historique des validations d'une demande
   * @param {number} requestId - L'identifiant de la demande
   * @returns {Promise} - Promesse avec l'historique des validations
   */
  getValidationHistory(requestId) {
    return apiClient.get(`/validations/${requestId}/history`)
  },

  /**
   * Valider ou rejeter une demande
   * @param {Object} validationData - Les données de validation
   * @param {number} validationData.request_id - L'identifiant de la demande
   * @param {string} validationData.type - Le type de validation (secretary, financial, director, ufr_director)
   * @param {string} validationData.status - Le statut (approved, rejected)
   * @param {string} validationData.comment - Un commentaire optionnel
   * @returns {Promise} - Promesse avec le résultat de la validation
   */
  validateRequest(validationData) {
    return apiClient.post('/validations', validationData)
  },

  /**
   * Obtenir le tableau de bord étudiant
   * @returns {Promise} - Promesse avec les données du tableau de bord
   */
  getStudentDashboard() {
    return apiClient.get('/students/dashboard');
  },

  /**
   * Obtenir le profil étudiant
   * @returns {Promise} - Promesse avec les données du profil
   */
  getStudentProfile() {
    return apiClient.get('/students/profile');
  },

  /**
 * Obtenir la liste des niveaux
 * @returns {Promise}
 */
  getLevels() {
    return apiClient.get('/niveaux')
  },

  /**
   * Mettre à jour le profil étudiant
   * @param {Object} profileData - Les données du profil
   * @returns {Promise} - Promesse avec les données du profil mises à jour
   */
  updateStudentProfile(profileData) {
    return apiClient.put('/students/profile', profileData);
  }

}

export default requestService 