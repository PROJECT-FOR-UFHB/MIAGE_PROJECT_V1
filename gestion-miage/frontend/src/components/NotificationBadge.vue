<template>
  <div class="notification-badge" @click="toggleDropdown">
    <i class="fas fa-bell"></i>
    <span v-if="unreadCount > 0" class="badge">{{ unreadCount }}</span>
    
    <div v-if="isOpen" class="dropdown-menu">
      <div class="dropdown-header">
        <h3>Notifications</h3>
        <button 
          v-if="unreadCount > 0" 
          class="mark-all-read-btn"
          @click.stop="markAllAsRead"
        >
          Tout marquer comme lu
        </button>
      </div>
      
      <div v-if="loading" class="loading">
        <i class="fas fa-spinner fa-spin"></i>
      </div>
      
      <div v-else-if="notifications.length === 0" class="no-notifications">
        <p>Aucune notification</p>
      </div>
      
      <div v-else class="notifications-list">
        <NotificationItem
          v-for="notification in notifications"
          :key="notification.id_notification"
          :notification="notification"
          @click="handleNotificationClick"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import NotificationItem from './Notification.vue';
import notificationService from '@/services/notificationService';

export default {
  name: 'NotificationBadge',
  components: {
    NotificationItem
  },
  setup() {
    const isOpen = ref(false);
    const loading = ref(false);
    const notifications = ref([]);
    const unreadCount = ref(0);

    const fetchNotifications = async () => {
      try {
        loading.value = true;
        const data = await notificationService.getNotifications();
        notifications.value = data;
        unreadCount.value = data.filter(n => !n.est_lu).length;
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
        unreadCount.value = 0;
      } catch (error) {
        console.error('Erreur lors du marquage de toutes les notifications comme lues:', error);
      }
    };

    const toggleDropdown = () => {
      isOpen.value = !isOpen.value;
      if (isOpen.value) {
        fetchNotifications();
      }
    };

    const handleNotificationClick = (notification) => {
      if (!notification.est_lu) {
        unreadCount.value--;
      }
    };

    const handleClickOutside = (event) => {
      if (isOpen.value && !event.target.closest('.notification-badge')) {
        isOpen.value = false;
      }
    };

    onMounted(() => {
      document.addEventListener('click', handleClickOutside);
      fetchNotifications();
    });

    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside);
    });

    return {
      isOpen,
      loading,
      notifications,
      unreadCount,
      toggleDropdown,
      markAllAsRead,
      handleNotificationClick
    };
  }
};
</script>

<style scoped>
.notification-badge {
  position: relative;
  cursor: pointer;
  padding: 0.5rem;
}

.notification-badge i {
  font-size: 1.25rem;
  color: #64748b;
}

.badge {
  position: absolute;
  top: 0;
  right: 0;
  background-color: #ef4444;
  color: white;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  min-width: 1.5rem;
  text-align: center;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  width: 320px;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 50;
}

.dropdown-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
}

.dropdown-header h3 {
  margin: 0;
  font-size: 1rem;
  color: #1e293b;
}

.mark-all-read-btn {
  background-color: transparent;
  border: none;
  color: #3b82f6;
  font-size: 0.875rem;
  cursor: pointer;
}

.mark-all-read-btn:hover {
  text-decoration: underline;
}

.loading, .no-notifications {
  padding: 1rem;
  text-align: center;
  color: #64748b;
}

.notifications-list {
  max-height: 400px;
  overflow-y: auto;
}
</style> 