<template>
    <div class="bg-white shadow rounded p-4 text-center">
      <p class="text-gray-600">Temps moyen pour traités une demande</p>
      <p class="text-3xl font-bold text-indigo-600">{{ stats.average_time }} h</p>
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
