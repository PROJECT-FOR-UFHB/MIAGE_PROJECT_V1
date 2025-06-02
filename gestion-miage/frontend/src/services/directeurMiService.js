import apiClient from './apiClient'

const directeurMiService = {
  /**
   * Obtenir les demandes validées par le sécretaire financieeeeer
   * @returns {Promise} - Promesse avec les données du profil étudiant
   */
  getDemandesDirecteurMi() {
    return apiClient.get('/demandes/dmddirmiage')
  },
  getProfile() {
    return apiClient.get('/profile')
  },

    /**
   * Obtenir le tableau de bord du directeur Miage
   * @returns {Promise} - Promesse avec les données du tableau de bord
   */
  getDashboard() {
    return apiClient.get('/dash/dashboard/directeurmi')
  }
}
export default directeurMiService
