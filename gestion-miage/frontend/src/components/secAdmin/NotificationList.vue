<!-- src/components/secAdmin/NotificationList.vue -->
<template>
    <ul class="space-y-4">
      <li v-for="notif in notifications" :key="notif.id"
          class="border p-4 rounded flex justify-between items-start"
          :class="{ 'bg-gray-50': !notif.lu }">
        <div>
          <p class="font-medium">{{ notif.titre }}</p>
          <p class="text-sm text-gray-500">{{ notif.message }}</p>
          <p class="text-xs text-gray-400 mt-1">{{ formatDate(notif.date) }}</p>
        </div>
        <button v-if="!notif.lu" @click="$emit('lue', notif.id)"
                class="text-blue-600 hover:underline text-sm">
          Marquer comme lue
        </button>
      </li>
    </ul>
  </template>
  
  <script setup>
  const props = defineProps({
    notifications: Array
  })
  const formatDate = (d) => new Date(d).toLocaleString('fr-FR')
  </script>
  