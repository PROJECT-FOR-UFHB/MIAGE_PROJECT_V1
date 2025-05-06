<template>
  <main class="bg-gray-100 min-h-screen pt-6">
    <div class="max-w-4xl mx-auto bg-white rounded shadow p-6">
      <h2 class="text-2xl font-semibold mb-4">Notifications</h2>

      <!-- Liste des notifications -->
      <ul class="space-y-4">
        <li
          v-for="notif in notifications"
          :key="notif.id"
          class="border p-4 rounded flex justify-between items-start"
          :class="{ 'bg-gray-50': !notif.lu }"
        >
          <div>
            <p class="font-medium">{{ notif.titre }}</p>
            <p class="text-sm text-gray-500">{{ notif.message }}</p>
            <p class="text-xs text-gray-400 mt-1">{{ formatDate(notif.date) }}</p>
          </div>
          <button
            v-if="!notif.lu"
            @click="marquerCommeLue(notif.id)"
            class="text-blue-600 hover:underline text-sm"
          >
            Marquer comme lue
          </button>
        </li>
      </ul>

      <!-- Aucun résultat -->
      <p v-if="notifications.length === 0" class="text-center text-gray-500 italic mt-6">
        Aucune notification pour le moment
      </p>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// import { notificationService } from '@/services' // 🔌 à activer pour l'API réelle

// 🔧 Mock notifications
const notifications = ref([
  {
    id: 1,
    titre: 'Nouvelle demande reçue',
    message: 'Une nouvelle demande a été soumise par l\'étudiant KOFFI Jean.',
    date: '2025-05-06T10:23:00',
    lu: false
  },
  {
    id: 2,
    titre: 'Sauvegarde terminée',
    message: 'La dernière sauvegarde automatique a été effectuée avec succès.',
    date: '2025-05-05T14:45:00',
    lu: true
  }
])

onMounted(async () => {
  // const res = await notificationService.getAll()
  // notifications.value = res.data.data
})

const marquerCommeLue = async (id) => {
  const notif = notifications.value.find(n => n.id === id)
  if (notif) notif.lu = true
  // await notificationService.markAsRead(id)
}

const formatDate = (d) => new Date(d).toLocaleString('fr-FR')
</script>
