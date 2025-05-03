<template>
    <main class="bg-gray-100 min-h-screen pt-6">
      <div class="max-w-4xl mx-auto bg-white rounded shadow p-6">
        <h2 class="text-2xl font-semibold mb-4">Notifications</h2>
  
        <NotificationList
          :notifications="notifications"
          @lue="marquerCommeLue"
        />
      </div>
    </main>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import NotificationList from '@/components/secAdmin/NotificationList.vue'
  import { notificationService } from '@/services'
  
  const notifications = ref([])
  
  onMounted(async () => {
    const res = await notificationService.getAll()
    notifications.value = res.data.data
  })
  
  const marquerCommeLue = async (id) => {
    await notificationService.markAsRead(id)
    const notif = notifications.value.find(n => n.id === id)
    if (notif) notif.lu = true
  }
  </script>
  