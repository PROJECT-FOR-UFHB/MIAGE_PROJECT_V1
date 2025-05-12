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

}

export default secretaireService;