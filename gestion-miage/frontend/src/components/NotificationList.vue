<template>
  <div class="notifications-container">
    <div class="notifications-header">
      <h2>Notifications</h2>
      <button 
        v-if="notifications.length > 0" 
        class="mark-all-read-btn"
        @click="markAllAsRead"
      >
        Tout marquer comme lu
      </button>
    </div>

    <div v-if="loading" class="loading">
      <i class="fas fa-spinner fa-spin"></i>
      <span>Chargement des notifications...</span>
    </div>

    <div v-else-if="notifications.length === 0" class="no-notifications">
      <i class="fas fa-bell-slash"></i>
      <p>Aucune notification</p>
    </div>

    <div v-else class="notifications-list">
      <NotificationItem
        v-for="notification in notifications"
        :key="notification.id_notification"
        :notification="notification"
      />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import NotificationItem from './Notification.vue';
import notificationService from '@/services/notificationService';

export default {
  name: 'NotificationList',
  components: {
    NotificationItem
  },
  setup() {
    const notifications = ref([]);
    const loading = ref(true);

    const fetchNotifications = async () => {
      try {
        loading.value = true;
        const data = await notificationService.getNotifications();
        notifications.value = data;
      } catch (error) {
        console.error('Erreur lors de la récupération des notifications:', error);
      } finally {
        loading.value = false;
      }
    };

    const markAllAsRead = async () => {
      try {
        await notificationService.markAllAsRead();
        notifications.value = notifications.value.map(notification => ({
          ...notification,
          est_lu: true
        }));
      } catch (error) {
        console.error('Erreur lors du marquage de toutes les notifications comme lues:', error);
      }
    };

    onMounted(fetchNotifications);

    return {
      notifications,
      loading,
      markAllAsRead
    };
  }
};
</script>

<style scoped>
.notifications-container {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
}

.notifications-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
}

.notifications-header h2 {
  margin: 0;
  font-size: 1.25rem;
  color: #1e293b;
}

.mark-all-read-btn {
  background-color: transparent;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s;
}

.mark-all-read-btn:hover {
  background-color: #f8fafc;
  color: #1e293b;
}

.loading, .no-notifications {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: #64748b;
}

.loading i, .no-notifications i {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.notifications-list {
  max-height: 400px;
  overflow-y: auto;
}
</style> 