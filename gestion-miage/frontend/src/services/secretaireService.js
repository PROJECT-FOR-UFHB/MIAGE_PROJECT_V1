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
   * Obtenir le tableau de bord de l'étudiant connecté
   * @returns {Promise} - Promesse avec les données du tableau de bord
   */
   getSecDashboard() {
    return apiClient.get('/dashboard/secretaire')
  },

  /**
 * Obtenir les demandes validée par la secrétaire
 * @returns {Promise} - Promesse avec les données du profil étudiant
 */
  getDemandesSecretaireFinancier() {
    return apiClient.get('/demandes/dmdsecfin')
  },
  getOneDemande(id) {
    return apiClient.get(`/demandes/${id}`)
  },
  getProfile() {
    return apiClient.get('/profile')
  },

}

export default secretaireService;
