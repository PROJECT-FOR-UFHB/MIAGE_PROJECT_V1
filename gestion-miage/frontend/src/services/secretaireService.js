import apiClient from './apiClient'

const secretaireService = {
  /**
   * Obtenir les demandes faites par les étudiants
   * @returns {Promise} - Promesse avec les données du profil étudiant
   */
  getDemandesSecretaire() {
    return apiClient.get('/demandes/dmdsec')
  },
    /**
   * Obtenir les demandes validée par la secrétaire
   * @returns {Promise} - Promesse avec les données du profil étudiant
   */
  getDemandesSecretaireFinancier(){
    return apiClient.get('/demandes/dmdsecfin')
  },
  getOneDemande(id) {
    return apiClient.get(`/demandes/${id}`)
  },
  /*approuverDemande(id) {
    return apiClient.post(`/validations/${id}/approve`)
  },
  rejeterDemande(id, reason) {
    return apiClient.post(`/validations/${id}/reject`, {
      reason: reason
    })
  },*/

}

export default secretaireService;