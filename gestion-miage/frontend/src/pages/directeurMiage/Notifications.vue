<template>
    <main class="bg-gray-100 min-h-screen pt-6">
      <div class="max-w-4xl mx-auto bg-white p-6 rounded shadow space-y-6">
        <div class="flex justify-between items-center">
          <h1 class="text-xl font-semibold text-gray-800">Mes notifications</h1>
          <button
            @click="markAllAsRead"
            class="text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            :disabled="loading"
          >
            Tout marquer comme lu
          </button>
        </div>
  
        <div v-if="loading" class="text-center text-gray-500">Chargement des notifications...</div>
  
        <div v-else-if="notifications.length === 0" class="text-center text-gray-500">
          Aucune notification pour le moment.
        </div>
  
        <ul v-else class="divide-y divide-gray-200">
          <li
            v-for="notif in notifications"
            :key="notif.id"
            class="py-4 flex justify-between items-start"
            :class="{ 'bg-gray-50': !notif.lu }"
          >
            <div>
              <p class="text-gray-800 font-medium">{{ notif.message }}</p>
              <p class="text-sm text-gray-500">{{ formatDate(notif.created_at) }}</p>
            </div>
            <div class="flex items-center gap-2">
              <button
                v-if="!notif.lu"
                @click="markAsRead(notif.id)"
                class="text-xs text-blue-600 hover:underline"
              >
                Marquer comme lu
              </button>
              <button
                @click="deleteNotif(notif.id)"
                class="text-xs text-red-600 hover:underline"
              >
                Supprimer
              </button>
            </div>
          </li>
        </ul>
  
        <div v-if="message" class="text-green-600">{{ message }}</div>
        <div v-if="error" class="text-red-600">{{ error }}</div>
      </div>
    </main>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  // 📦 Notifications (mockées pour l'instant)
  const notifications = ref([])
  const loading = ref(false)
  const message = ref('')
  const error = ref('')
  
  // 📡 À remplacer plus tard par : await directorService.getNotifications()
  const loadNotifications = async () => {
    loading.value = true
    try {
      // MOCK
      notifications.value = [
        {
          id: 1,
          message: 'Nouvelle demande à signer (ID #123).',
          created_at: '2025-05-10T08:30:00',
          lu: false
        },
        {
          id: 2,
          message: 'Demande #120 rejetée par le secrétariat.',
          created_at: '2025-05-09T16:45:00',
          lu: true
        }
      ]
    } catch (err) {
      error.value = 'Erreur lors du chargement.'
    } finally {
      loading.value = false
    }
  }
  
  onMounted(() => {
    loadNotifications()
  })
  
  // ✅ Marquer une notif comme lue
  const markAsRead = async (id) => {
    try {
      // 📡 Appel réel : await directorService.markNotificationAsRead(id)
      const notif = notifications.value.find(n => n.id === id)
      if (notif) notif.lu = true
      message.value = 'Notification marquée comme lue.'
    } catch (err) {
      error.value = 'Erreur de lecture.'
    }
  }
  
  // ✅ Tout marquer comme lu
  const markAllAsRead = async () => {
    try {
      // 📡 Appel réel : await directorService.markAllNotificationsAsRead()
      notifications.value = notifications.value.map(n => ({ ...n, lu: true }))
      message.value = 'Toutes les notifications ont été lues.'
    } catch (err) {
      error.value = 'Erreur lors de l’action.'
    }
  }
  
  // ❌ Supprimer notification
  const deleteNotif = async (id) => {
    try {
      // 📡 Appel réel : await directorService.deleteNotification(id)
      notifications.value = notifications.value.filter(n => n.id !== id)
      message.value = 'Notification supprimée.'
    } catch (err) {
      error.value = 'Erreur lors de la suppression.'
    }
  }
  
  // 🗓️ Formater la date
  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return new Intl.DateTimeFormat('fr-FR', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(date)
  }
  </script>
  