import apiClient from './apiClient'

const adminService = {
  // Gestion des utilisateurs
  /**
   * Obtenir la liste des utilisateurs
   * @returns {Promise} - Promesse avec la liste des utilisateurs
   */
  getUsers() {
    return apiClient.get('/admin/users')
  },

  /**
   * Créer un nouvel utilisateur
   * @param {Object} userData - Les données de l'utilisateur
   * @returns {Promise} - Promesse avec les données de l'utilisateur créé
   */
  createPersonnel(userData) {
    return apiClient.post('/admin/personnels', userData)
  },

  /**
   * Mettre à jour un utilisateur
   * @param {number} id - L'identifiant de l'utilisateur
   * @param {Object} userData - Les données de l'utilisateur à mettre à jour
   * @returns {Promise} - Promesse avec les données de l'utilisateur mis à jour
   */
  updateUser(id, userData) {
    return apiClient.put(`/admin/users/${id}`, userData)
  },

  /**
   * Supprimer un utilisateur
   * @param {number} id - L'identifiant de l'utilisateur
   * @returns {Promise} - Promesse avec le statut de la suppression
   */
  deleteUser(id) {
    return apiClient.delete(`/admin/users/${id}`)
  },

  // Gestion des rôles
  /**
   * Obtenir la liste des rôles
   * @returns {Promise} - Promesse avec la liste des rôles
   */
  getRoles() {
    return apiClient.get('/admin/roles')
  },

  /**
   * Créer un nouveau rôle
   * @param {Object} roleData - Les données du rôle
   * @returns {Promise} - Promesse avec les données du rôle créé
   */
  createRole(roleData) {
    return apiClient.post('/roles', roleData)
  },

  /**
   * Mettre à jour un rôle
   * @param {number} id - L'identifiant du rôle
   * @param {Object} roleData - Les données du rôle à mettre à jour
   * @returns {Promise} - Promesse avec les données du rôle mis à jour
   */
  updateRole(id, roleData) {
    return apiClient.put(`/admin/roles/${id}`, roleData)
  },

  /**
   * Supprimer un rôle
   * @param {number} id - L'identifiant du rôle
   * @returns {Promise} - Promesse avec le statut de la suppression
   */
  deleteRole(id) {
    return apiClient.delete(`/admin/roles/${id}`)
  },

  // Gestion des types de demandes
  /**
   * Obtenir la liste des types de demandes
   * @returns {Promise} - Promesse avec la liste des types de demandes
   */
  getRequestTypes() {
    return apiClient.get('/admin/request-types')
  },

  /**
   * Créer un nouveau type de demande
   * @param {Object} typeData - Les données du type de demande
   * @returns {Promise} - Promesse avec les données du type de demande créé
   */
  createRequestType(typeData) {
    return apiClient.post('/admin/request-types', typeData)
  },

  /**
   * Mettre à jour un type de demande
   * @param {number} id - L'identifiant du type de demande
   * @param {Object} typeData - Les données du type de demande à mettre à jour
   * @returns {Promise} - Promesse avec les données du type de demande mis à jour
   */
  updateRequestType(id, typeData) {
    return apiClient.put(`/admin/request-types/${id}`, typeData)
  },

  /**
   * Supprimer un type de demande
   * @param {number} id - L'identifiant du type de demande
   * @returns {Promise} - Promesse avec le statut de la suppression
   */
  deleteRequestType(id) {
    return apiClient.delete(`/admin/request-types/${id}`)
  },

  // Paramètres système
  /**
   * Obtenir les paramètres système
   * @returns {Promise} - Promesse avec les paramètres système
   */
  getSettings() {
    return apiClient.get('/admin/settings')
  },

  /**
   * Mettre à jour les paramètres système
   * @param {Object} settingsData - Les données des paramètres à mettre à jour
   * @returns {Promise} - Promesse avec les paramètres mis à jour
   */
  updateSettings(settingsData) {
    return apiClient.put('/admin/settings', settingsData)
  },

  // Logs système
  /**
   * Obtenir les logs système
   * @returns {Promise} - Promesse avec la liste des logs
   */
  getLogs() {
    return apiClient.get('/admin/logs')
  }
}

export default adminService