<template>
  <div 
    class="notification-item" 
    :class="{ 'unread': !notification.est_lu }"
    @click="handleClick"
  >
    <div class="notification-icon" :class="notification.type">
      <i :class="getIconClass"></i>
    </div>
    <div class="notification-content">
      <h4 class="notification-title">{{ notification.titre }}</h4>
      <p class="notification-message">{{ notification.message }}</p>
      <span class="notification-date">{{ formatDate(notification.date_creation) }}</span>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import notificationService from '@/services/notificationService';

export default {
  name: 'NotificationItem',
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const router = useRouter();

    const getIconClass = computed(() => {
      const icons = {
        info: 'fas fa-info-circle',
        success: 'fas fa-check-circle',
        warning: 'fas fa-exclamation-circle',
        error: 'fas fa-times-circle'
      };
      return icons[props.notification.type] || icons.info;
    });

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    };

    const handleClick = async () => {
      if (!props.notification.est_lu) {
        await notificationService.markAsRead(props.notification.id_notification);
      }
      if (props.notification.lien) {
        router.push(props.notification.lien);
      }
    };

    return {
      getIconClass,
      formatDate,
      handleClick
    };
  }
};
</script>

<style scoped>
.notification-item {
  display: flex;
  align-items: flex-start;
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
  cursor: pointer;
  transition: background-color 0.2s;
}

.notification-item:hover {
  background-color: #f8fafc;
}

.notification-item.unread {
  background-color: #f0f9ff;
}

.notification-icon {
  margin-right: 1rem;
  font-size: 1.5rem;
}

.notification-icon.info {
  color: #3b82f6;
}

.notification-icon.success {
  color: #10b981;
}

.notification-icon.warning {
  color: #f59e0b;
}

.notification-icon.error {
  color: #ef4444;
}

.notification-content {
  flex: 1;
}

.notification-title {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
}

.notification-message {
  margin: 0.5rem 0;
  font-size: 0.875rem;
  color: #64748b;
}

.notification-date {
  font-size: 0.75rem;
  color: #94a3b8;
}
</style> 