<template>
  <div class="notifications-page">
    <h1>Mes Notifications</h1>

    <div v-if="loading" class="loading">
      Chargement des notifications...
    </div>

    <div v-else-if="notifications.length === 0">
      Aucune notification.
    </div>

    <div v-else class="notifications-list">
      <div
        v-for="notification in notifications"
        :key="notification.id_notification"
        :class="['notification-item', { unread: !notification.est_lu }]"
      >
        <div class="notification-main" @click="openNotification(notification)">
          <h3>{{ notification.titre }}</h3>
          <p>{{ notification.message }}</p>
          <small>{{ formatDate(notification.created_at) }}</small>
        </div>
        <div class="actions">
          <button v-if="!notification.est_lu" @click.stop="markAsRead(notification)">Marquer comme lue</button>
          <button @click.stop="deleteNotification(notification)">Supprimer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import notificationService from '@/services/notificationService'

export default {
  name: 'NotificationsPage',
  setup() {
    const notifications = ref([])
    const loading = ref(false)
    const router = useRouter()

    const loadNotifications = async () => {
      loading.value = true
      try {
        const response = await notificationService.getNotifications()
        if (response?.status) {
          notifications.value = response.notifications || []
        } else {
          notifications.value = []
        }
      } catch (e) {
        console.error('Erreur lors du chargement des notifications:', e)
      } finally {
        loading.value = false
      }
    }

    const formatDate = (date) => {
      return new Date(date).toLocaleString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    }

    const markAsRead = async (notification) => {
      try {
        await notificationService.markAsRead(notification.id_notification)
        notification.est_lu = true
      } catch (e) {
        console.error('Erreur marquage comme lu:', e)
      }
    }

    const deleteNotification = async (notification) => {
      try {
        await notificationService.deleteNotification(notification.id_notification)
        notifications.value = notifications.value.filter(n => n.id_notification !== notification.id_notification)
      } catch (e) {
        console.error('Erreur suppression notification:', e)
      }
    }

    const openNotification = async (notification) => {
      if (!notification.est_lu) {
        await markAsRead(notification)
      }

      const demandeId = notification.id_demande || (notification.demande && notification.demande.id_demande)

      if (demandeId) {
        router.push({ name: 'TraiterDemande', params: { id: demandeId } })
      } else if (notification.lien) {
        router.push(notification.lien)
      }
    }

    onMounted(loadNotifications)

    return {
      notifications,
      loading,
      formatDate,
      markAsRead,
      deleteNotification,
      openNotification,
    }
  }
}
</script>

<style scoped>
.notifications-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.notification-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: white;
  transition: background-color 0.3s;
}

.notification-item.unread {
  background-color: #f0f7ff;
}

.notification-main {
  cursor: pointer;
}

.actions {
  margin-top: 0.5rem;
  display: flex;
  gap: 1rem;
}

button {
  cursor: pointer;
  padding: 0.3rem 0.6rem;
  border: none;
  border-radius: 4px;
}

button:hover {
  background-color: #eee;
}

.loading {
  text-align: center;
  padding: 2rem;
}
</style>
