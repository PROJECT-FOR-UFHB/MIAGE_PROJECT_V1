import apiClient from './apiClient'

const fileService = {
  /**
   * Télécharger un fichier
   * @param {FormData} formData - Les données du formulaire contenant le fichier et les métadonnées
   * @returns {Promise} - Promesse avec les informations sur le fichier téléchargé
   */
  uploadFile(formData) {
    return apiClient.post('/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },

  /**
   * Obtenir un fichier par son ID
   * @returns {Promise} - Promesse avec le fichier demandé (blob)
   */
  getFile(id) {
    return apiClient.get(`/files/${id}`)
  },

  /**
   * Supprimer un fichier
   * @param {number} id - L'identifiant du fichier
   * @returns {Promise} - Promesse avec le statut de la suppression
   */
  deleteFile(id) {
    return apiClient.delete(`/files/${id}`)
  },

  /**
   * Obtenir les fichiers liés à une demande
   * @param {number} requestId - L'identifiant de la demande
   * @returns {Promise} - Promesse avec la liste des fichiers
   */
  getRequestFiles(requestId) {
    return apiClient.get(`/files/request/${requestId}`)
  },

  /**
   * Télécharger un document officiel pour une demande
   * @param {number} requestId - L'identifiant de la demande
   * @param {FormData} formData - Les données du formulaire contenant le document et les métadonnées
   * @returns {Promise} - Promesse avec les informations sur le document téléchargé
   */
  uploadOfficialDocument(requestId, formData) {
    return apiClient.post(`/files/document/${requestId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

export default fileService 