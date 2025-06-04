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
   * Obtenir les demandes validées par le directeur
   * @returns {Promise} - Promesse avec les données du profil étudiant
   */
  getDemandesSecretaireTraite() {
    return apiClient.get('/demandes/dmdtraitsec')
  },
   /**
   * Obtenir le tableau de bord de la secretaire connecté
   * @returns {Promise} - Promesse avec les données du tableau de bord
   */
   getSecDashboard() {
    return apiClient.get('/dash/dashboard/secretaire')
  },
   /**
   * Obtenir le tableau de bord de la secretaire connecté
   * @returns {Promise} - Promesse avec les données du tableau de bord
   */
   getSecFDashboard() {
    return apiClient.get('/dash/dashboard/secretaireFin')
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
/**
  * Récupérer l'état de progression de la demande
  * @param {string} dmdId
  * @returns {Promise}
  */
getRequestProgress(dmdId) {
  return apiClient.get(`/secretariat/suivis/${dmdId}`)
}
}

export default secretaireService;
