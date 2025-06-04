<template>
    <main class="bg-gray-100 min-h-screen pt-6">
      <div class="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold">Notifications</h2>
          <button
            @click="marquerToutesLues"
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Tout marquer comme lu
          </button>
        </div>
  
        <ul class="divide-y divide-gray-200">
          <li
            v-for="(notif, index) in notifications"
            :key="index"
            class="py-4 flex justify-between items-start"
          >
            <div>
              <p class="font-medium text-gray-800">{{ notif.titre }}</p>
              <p class="text-sm text-gray-600">{{ notif.message }}</p>
              <p class="text-xs text-gray-400">{{ notif.date }}</p>
            </div>
  
            <div class="flex items-center gap-2">
              <span
                class="inline-block w-2 h-2 rounded-full"
                :class="notif.lu ? 'bg-gray-400' : 'bg-red-500'"
              ></span>
              <button
                v-if="!notif.lu"
                @click="marquerCommeLu(index)"
                class="text-sm text-blue-600 hover:underline"
              >
                Marquer comme lu
              </button>
            </div>
          </li>
        </ul>
      </div>
    </main>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  // import { notificationService } from '@/services'
  
  const notifications = ref([
    {
      titre: 'Nouvelle demande reçue',
      message: 'Une demande a été déposée par Koffi Jean (Licence 3)',
      date: '2025-05-05 10:22',
      lu: false
    },
    {
      titre: 'Demande signée',
      message: 'La demande de Léa Konan a été signée',
      date: '2025-05-04 17:48',
      lu: true
    },
    {
      titre: 'Demande rejetée',
      message: 'Une demande a été rejetée avec le motif : "pièce manquante"',
      date: '2025-05-03 13:11',
      lu: false
    }
  ])
  
  // 📥 Appel API simulé pour charger les notifications
  onMounted(async () => {
    // const res = await notificationService.getAll()
    // notifications.value = res.data.data
  })
  
  // 📤 Marquer une notification comme lue
  const marquerCommeLu = (index) => {
    notifications.value[index].lu = true
    // await notificationService.markAsRead(notifications.value[index].id)
  }
  
  // 📤 Marquer toutes les notifications comme lues
  const marquerToutesLues = () => {
    notifications.value.forEach(n => n.lu = true)
    // await notificationService.markAllAsRead()
  }
  </script>
  