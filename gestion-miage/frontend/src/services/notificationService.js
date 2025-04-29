import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const notificationService = {
  async getNotifications() {
    try {
      const response = await axios.get(`${API_URL}/notifications`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      });
      return response.data.notifications || [];
    } catch (error) {
      console.error('Erreur lors de la récupération des notifications:', error);
      throw error;
    }
  },

  async markAsRead(id) {
    try {
      const response = await axios.post(`${API_URL}/notifications/${id}/read`, {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors du marquage de la notification comme lue:', error);
      throw error;
    }
  },

  async markAllAsRead() {
    try {
      const response = await axios.post(`${API_URL}/notifications/mark-all-read`, {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors du marquage de toutes les notifications comme lues:', error);
      throw error;
    }
  }
};

export default notificationService; 