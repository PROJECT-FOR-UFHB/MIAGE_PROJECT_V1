<template>
    <main class="bg-gray-100 min-h-screen pt-20">
      <div class="max-w-5xl mx-auto px-4">
        <h1 class="text-2xl font-semibold mb-4">Notifications</h1>
  
        <!-- ✅ Liste des notifications -->
        <div v-if="notifications.length" class="space-y-3">
          <div
            v-for="notif in notifications"
            :key="notif.id"
            :class="['p-4 rounded shadow', notif.lu ? 'bg-white' : 'bg-blue-50 border-l-4 border-blue-500']"
          >
            <div class="flex justify-between items-center">
              <p class="text-sm text-gray-800">{{ notif.message }}</p>
              <span class="text-xs text-gray-500">{{ formatDate(notif.date) }}</span>
            </div>
            <div class="text-right mt-2" v-if="!notif.lu">
              <button @click="markAsRead(notif.id)" class="text-sm text-blue-600 hover:underline">
                Marquer comme lue
              </button>
            </div>
          </div>
        </div>
  
        <div v-else class="text-center text-gray-500 mt-10">
          Aucune notification pour l’instant.
        </div>
      </div>
    </main>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  // 🟦 MOCK TEMPORAIRE (à remplacer par un appel API)
  const notifications = ref([
    { id: 1, message: "Nouvelle demande à traiter (Lettre pour Tra Bi)", date: "2025-05-06", lu: false },
    { id: 2, message: "Thème accepté pour N'Guessan Clément", date: "2025-05-04", lu: true },
    { id: 3, message: "Rappel : Recommandation en attente depuis 3 jours", date: "2025-05-02", lu: false }
  ])
  
  const markAsRead = (id) => {
    const notif = notifications.value.find(n => n.id === id)
    if (notif) notif.lu = true
  
    // TODO: ⚙️ Appel API pour marquer comme lue :
    // await notificationService.markAsRead(id)
  }
  
  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })
  }
  </script>
  