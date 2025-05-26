<template>
  <div class="notification-center">
    <div class="notification-icon" @click="toggleNotificationPanel">
      <font-awesome-icon icon="bell" class="text-xl hover:text-brandGreen transition-colors" />
      <span v-if="unreadCount > 0" class="badge">{{ unreadCount }}</span>
    </div>

    <div v-if="showPanel" class="notification-panel">
      <div class="notification-header">
        <h3>Notifications</h3>
        <button v-if="notifications.length > 0" @click="markAllAsRead" class="mark-all-read">
          Tout marquer comme lu
        </button>
      </div>

      <div v-if="loading" class="notification-loading">
        <font-awesome-icon icon="spinner" spin class="mr-2" /> Chargement...
      </div>

      <div v-else-if="notifications.length === 0" class="no-notifications">
        <font-awesome-icon icon="bell-slash" class="mr-2" /> Aucune notification
      </div>

      <div v-else class="notification-list">
        <div
          v-for="notification in notifications"
          :key="notification.id_notification"
          :class="['notification-item', { 'unread': !notification.est_lu }]"
          @click="openNotification(notification)"
        >
          <div class="notification-content">
            <div class="notification-title text-black">{{ notification.titre }}</div>
            <div class="notification-message">{{ notification.message }}</div>
            <div class="notification-time">{{ formatDate(notification.created_at) }}</div>
          </div>
          <div class="notification-actions">
            <button @click.stop="markAsRead(notification)" v-if="!notification.est_lu" class="mark-read">
              <font-awesome-icon icon="check" />
            </button>
            <button @click.stop="deleteNotification(notification)" class="delete">
              <font-awesome-icon icon="trash" /> <span>X</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import notificationService from '../services/notificationService'
import { getEcho, initEcho } from '../services/echo'

export default {
  name: 'NotificationCenter',
  setup() {
    const router = useRouter()
    const notifications = ref([])
    const unreadCount = ref(0)
    const showPanel = ref(false)
    const loading = ref(false)

    // Charger les notifications
    const loadNotifications = async () => {
      try {
        loading.value = true
        const response = await notificationService.getNotifications()
        console.log('Réponse complète:', response)
        if (response && response.status === true) {
          notifications.value = response.notifications || []
          console.log('Notifications chargées:', notifications.value)
        } else {
          console.error('Format de réponse invalide:', response)
          notifications.value = []
        }

        // Mettre à jour le compteur de notifications non lues
        updateUnreadCount()
      } finally {
        loading.value = false
      }
    }

    // Mettre à jour le compteur de notifications non lues
    const updateUnreadCount = () => {
      unreadCount.value = notifications.value.filter(n => !n.est_lu).length
    }

    // Formater la date
    const formatDate = (dateString) => {
      const date = new Date(dateString)
      return date.toLocaleString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }

    // Afficher/masquer le panneau de notifications
    const toggleNotificationPanel = () => {
      showPanel.value = !showPanel.value
      if (showPanel.value) {
        loadNotifications()
      }
    }

    // Marquer une notification comme lue
    const markAsRead = async (notification) => {
      try {
        // Appeler l'API pour marquer comme lu si disponible
        if (notificationService.markAsRead) {
          await notificationService.markAsRead(notification.id_notification)
        }
        notification.est_lu = true
        updateUnreadCount()
      } catch (error) {
        console.error('Erreur lors du marquage de la notification comme lue:', error)
      }
    }

    // Marquer toutes les notifications comme lues
    const markAllAsRead = async () => {
      try {
        // Appeler l'API pour marquer toutes comme lues si disponible
        if (notificationService.markAllAsRead) {
          await notificationService.markAllAsRead()
        }
        notifications.value.forEach(notification => {
          notification.est_lu = true
        })
        unreadCount.value = 0
      } catch (error) {
        console.error('Erreur lors du marquage de toutes les notifications comme lues:', error)
      }
    }

    // Supprimer une notification
    const deleteNotification = async (notification) => {
      try {
        // Appeler l'API pour supprimer si disponible
        if (notificationService.deleteNotification) {
          await notificationService.deleteNotification(notification.id_notification)
        }
        notifications.value = notifications.value.filter(n => n.id_notification !== notification.id_notification)
        updateUnreadCount()
      } catch (error) {
        console.error('Erreur lors de la suppression de la notification:', error)
      }
    }

    // Ouvrir une notification
    const openNotification = async (notification) => {
      if (!notification.est_lu) {
        await markAsRead(notification)
      }

      const demandeId = notification.id_demande || (notification.demande && notification.demande.id_demande)
      console.log('Redirection vers :', demandeId)

      if (demandeId) {
        router.push({ name: 'TraiterDemande', params: { id: demandeId } })
      } else if (notification.lien) {
        router.push(notification.lien)
      }

      showPanel.value = false
    }

    // Écouter les événements de notification en temps réel
    const listenForNotifications = () => {
      const echo = getEcho()
      if (!echo) {
        console.warn('Echo n\'est pas initialisé, impossible d\'écouter les notifications en temps réel')
        // Réessayer dans 5 secondes
        setTimeout(() => {
          console.log('Tentative de reconnexion à Echo...')
          initializeEcho()
        }, 5000)
        return
      }

      // Écouter le canal public des demandes
      echo.channel('demandes')
        .listen('.App\\Events\\DemandeStatusChanged', (e) => {
          console.log('Événement de changement de statut reçu:', e)
          // Recharger les notifications
          loadNotifications()
          // Afficher une notification système
          showSystemNotification('Notification', e.message || 'Une demande a changé de statut')
        })
        .listen('.App\\Events\\NewNotification', (e) => {
          console.log('Nouvelle notification reçue:', e)
          // Recharger les notifications
          loadNotifications()
          // Afficher une notification système
          showSystemNotification('Nouvelle notification', e.message || 'Vous avez une nouvelle notification')
        })
        .error((error) => {
          console.error('Erreur de connexion WebSocket:', error)
        })

      console.log('Écoute des notifications en temps réel activée')
    }

    // Afficher une notification système
    const showSystemNotification = (title, body) => {
      if ('Notification' in window) {
        if (Notification.permission === 'granted') {
          new Notification(title, { body })
        } else if (Notification.permission !== 'denied') {
          Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
              new Notification(title, { body })
            }
          })
        }
      }
    }

    // Initialiser Echo si un token est disponible
    const initializeEcho = () => {
      const token = sessionStorage.getItem('auth_token')
      if (token) {
        const echo = initEcho(token)
        if (echo) {
          console.log('Echo initialisé avec succès')
          listenForNotifications()
        } else {
          console.warn('Échec de l\'initialisation d\'Echo')
          // Réessayer dans 5 secondes
          setTimeout(initializeEcho, 5000)
        }
      } else {
        console.warn('Pas de token d\'authentification disponible')
      }
    }

    // Initialiser les écouteurs d'événements et charger les notifications
    onMounted(() => {
      initializeEcho()
      loadNotifications()
      if ('Notification' in window && Notification.permission !== 'denied') {
        Notification.requestPermission()
      }

      // Fermer le panneau quand on clique en dehors
      document.addEventListener('click', handleOutsideClick)
    })

    // Gérer les clics en dehors du panneau de notifications
    const handleOutsideClick = (e) => {
      const notificationCenter = document.querySelector('.notification-center')
      if (notificationCenter && !notificationCenter.contains(e.target)) {
        showPanel.value = false
      }
    }

    // Au démontage du composant
    onUnmounted(() => {
      document.removeEventListener('click', handleOutsideClick)
    })

    return {
      notifications,
      unreadCount,
      showPanel,
      loading,
      toggleNotificationPanel,
      markAsRead,
      markAllAsRead,
      deleteNotification,
      openNotification,
      formatDate
    }
  }
}
</script>

<style scoped>
.notification-center {
  position: relative;
  display: inline-block;
}

.notification-icon {
  position: relative;
  cursor: pointer;
  padding: 0.5rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.notification-icon:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.badge {
  position: absolute;
  top: 0;
  right: 0;
  background-color: #ff4757;
  color: white;
  border-radius: 50%;
  padding: 0.1rem 0.4rem;
  font-size: 0.7rem;
  min-width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.notification-panel {
  position: absolute;
  top: 100%;
  right: 0;
  width: 350px;
  max-height: 400px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.notification-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 1rem;
  border-bottom: 1px solid #eee;
}

.notification-header h3 {
  margin: 0;
  font-size: 1.1rem;
}

.mark-all-read {
  background: none;
  border: none;
  color: #3498db;
  cursor: pointer;
  font-size: 0.8rem;
}

.notification-list {
  overflow-y: auto;
  max-height: 350px;
}

.notification-item {
  display: flex;
  padding: 0.8rem 1rem;
  border-bottom: 1px solid #f1f1f1;
  cursor: pointer;
  transition: background-color 0.2s;
}

.notification-item:hover {
  background-color: #f9f9f9;
}

.notification-item.unread {
  background-color: #f0f7ff;
}

.notification-content {
  flex: 1;
}

.notification-title {
  font-weight: bold;
  margin-bottom: 0.3rem;
}

.notification-message {
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 0.5rem;
}

.notification-time {
  font-size: 0.75rem;
  color: #999;
}

.notification-actions {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.notification-actions button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.3rem;
  margin: 0.1rem;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.notification-actions button:hover {
  background-color: #eee;
}

.mark-read {
  color: #2ecc71;
}

.delete {
  color: #e74c3c;
}

.notification-loading,
.no-notifications {
  padding: 2rem;
  text-align: center;
  color: #777;
}
</style>
