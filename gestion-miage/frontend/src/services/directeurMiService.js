import apiClient from './apiClient'

const directeurMiService = {
  /**
   * Obtenir les demandes validées par le sécretaire financieeeeer
   * @returns {Promise} - Promesse avec les données du profil étudiant
   */
  getDemandesDirecteurMi() {
    return apiClient.get('/demandes/dmddirmiage')
  },
}
export default directeurMiService
