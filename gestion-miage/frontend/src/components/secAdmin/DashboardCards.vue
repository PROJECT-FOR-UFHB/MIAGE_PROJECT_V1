<!-- src/components/secAdmin/DashboardCards.vue -->
<template>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="bg-yellow-100 p-4 rounded shadow text-center">
        <p class="text-lg font-semibold">En attente</p>
        <p class="text-3xl font-bold text-yellow-700">{{ stats.pending }}</p>
      </div>
      <div class="bg-green-100 p-4 rounded shadow text-center">
        <p class="text-lg font-semibold">Validées</p>
        <p class="text-3xl font-bold text-green-700">{{ stats.validated }}</p>
      </div>
      <div class="bg-red-100 p-4 rounded shadow text-center">
        <p class="text-lg font-semibold">Rejetées</p>
        <p class="text-3xl font-bold text-red-700">{{ stats.rejected }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    stats: {
      type: Object,
      required: true
    }
  })
  </script>
  