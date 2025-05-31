<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div class="bg-white shadow rounded p-4 text-center">
      <p class="text-gray-600">Temps moyen</p>
      <p class="text-3xl font-bold text-indigo-600">{{ stats.average_time }} h</p>
    </div>
    <div class="bg-white shadow rounded p-4 text-center">
      <p class="text-gray-600">Temps maximum</p>
      <p class="text-3xl font-bold text-red-500">{{ stats.max_time }} h</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  stats: {
    type: Object,
    required: true
  }
})
</script>
