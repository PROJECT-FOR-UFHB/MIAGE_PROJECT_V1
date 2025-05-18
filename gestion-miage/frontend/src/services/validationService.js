import apiClient from './apiClient'

const validationService = {
  /**
   * Validation par le secrétariat
   * @param {number} requestId - L'identifiant de la demande
   * @param {Object} validationData - Les données de la validation
   * @param {string} validationData.status - Le statut de la validation (true)
   * @param {string} validationData.comment - Commentaire optionnel
   * @param {string} validationData.user_id - L'id du personnel
   * @returns {Promise} - Promesse avec le statut de la validation
   */
  secretaryValidation(requestId, validationData) {
    return apiClient.post(`/validations/secretary/${requestId}`, validationData)
  },

    /**
   * Validation par le secrétariat
   * @param {number} requestId - L'identifiant de la demande
   * @param {Object} validationData - Les données du rejet
   * @param {string} validationData.status - Le statut de la validation (false)
   * @param {string} validationData.comment - Commentaire optionnel
   * @param {string} validationData.user_id - L'id du personnel
   * @returns {Promise} - Promesse avec le statut de la validation
   */
  secretaryRejet(requestId, validationData) {
    return apiClient.post(`/validations/secretaryRejet/${requestId}`, validationData)
  },

  /**
   * Validation financière
   * @param {number} requestId - L'identifiant de la demande
   * @param {Object} validationData - Les données de la validation
   * @param {string} validationData.status - Le statut de la validation (approved, rejected)
   * @param {string} validationData.comment - Commentaire optionnel
   * @returns {Promise} - Promesse avec le statut de la validation
   */
  financialValidation(requestId, validationData) {
    return apiClient.post(`/validations/financial/${requestId}`, validationData)
  },
  /**
   * Validation par le secrétariat
   * @param {number} requestId - L'identifiant de la demande
   * @param {Object} validationData - Les données du rejet
   * @param {string} validationData.status - Le statut de la validation (false)
   * @param {string} validationData.comment - Commentaire optionnel
   * @param {string} validationData.user_id - L'id du personnel
   * @returns {Promise} - Promesse avec le statut de la validation
   */
  financialRejet(requestId, validationData) {
    return apiClient.post(`/validations/financialRejet/${requestId}`, validationData)
  },

  /**
   * Validation par le directeur MIAGE
   * @param {number} requestId - L'identifiant de la demande
   * @param {Object} validationData - Les données de la validation
   * @param {string} validationData.status - Le statut de la validation (approved, rejected)
   * @param {string} validationData.comment - Commentaire optionnel
   * @returns {Promise} - Promesse avec le statut de la validation
   */
  directorValidation(requestId, validationData) {
    return apiClient.post(`/validations/director/${requestId}`, validationData)
  },

  /**
   * Validation par le directeur UFR
   * @param {number} requestId - L'identifiant de la demande
   * @param {Object} validationData - Les données de la validation
   * @param {string} validationData.status - Le statut de la validation (approved, rejected)
   * @param {string} validationData.comment - Commentaire optionnel
   * @returns {Promise} - Promesse avec le statut de la validation
   */
  ufrDirectorValidation(requestId, validationData) {
    return apiClient.post(`/validations/ufr-director/${requestId}`, validationData)
  },

  /**
   * Obtenir l'historique des validations d'une demande
   * @param {number} requestId - L'identifiant de la demande
   * @returns {Promise} - Promesse avec l'historique des validations
   */
  getValidationHistory(requestId) {
    return apiClient.get(`/validations/${requestId}/history`)
  }
}

export default validationService 