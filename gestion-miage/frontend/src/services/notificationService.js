import apiClient from './apiClient'

/**
 * Service pour gérer les notifications administrateur
 */
class NotificationService {
  /**
   * Récupère toutes les notifications de l'administrateur
   * @returns {Promise} Promesse contenant les notifications
   */
  async getNotifications() {
    try {
      const response = await apiClient.get('/admin/notifications')
      console.log('Réponse des notifications:', response.data)
      return response.data
    } catch (error) {
      console.error('Erreur lors de la récupération des notifications:', error)
      throw error
    }
  }

  /**
   * Récupère les notifications non lues de l'administrateur
   * @returns {Promise} Promesse contenant les notifications non lues
   */
  async getUnreadNotifications() {
    try {
      const response = await apiClient.get('/admin/notifications/unread')
      return response.data
    } catch (error) {
      console.error('Erreur lors de la récupération des notifications non lues:', error)
      throw error
    }
  }

  /**
   * Récupère le nombre de notifications non lues
   * @returns {Promise} Promesse contenant le nombre de notifications non lues
   */
  async getUnreadCount() {
    try {
      const response = await apiClient.get('/admin/notifications/unread-count')
      return response.data
    } catch (error) {
      console.error('Erreur lors de la récupération du nombre de notifications non lues:', error)
      throw error
    }
  }

  /**
   * Marque une notification comme lue
   * @param {string} id Identifiant de la notification
   * @returns {Promise} Promesse contenant le résultat de l'opération
   */
  async markAsRead(id) {
    try {
      const response = await apiClient.put(`/admin/notifications/${id}/read`)
      return response.data
    } catch (error) {
      console.error('Erreur lors du marquage de la notification comme lue:', error)
      throw error
    }
  }

  /**
   * Marque toutes les notifications comme lues
   * @returns {Promise} Promesse contenant le résultat de l'opération
   */
  async markAllAsRead() {
    try {
      const response = await apiClient.put('/admin/notifications/read-all')
      return response.data
    } catch (error) {
      console.error('Erreur lors du marquage de toutes les notifications comme lues:', error)
      throw error
    }
  }

  /**
   * Supprime une notification
   * @param {string} id Identifiant de la notification
   * @returns {Promise} Promesse contenant le résultat de l'opération
   */
  async deleteNotification(id) {
    try {
      const response = await apiClient.delete(`/admin/notifications/${id}`)
      return response.data
    } catch (error) {
      console.error('Erreur lors de la suppression de la notification:', error)
      throw error
    }
  }
}

export default new NotificationService()
