<template>
    <span class="px-2 py-1 text-xs font-semibold rounded"
          :class="badgeClass">
      {{ statut }}
    </span>
  </template>
  
  <script setup>
  const props = defineProps({
    statut: String
  })
  
  // On associe une couleur de fond à chaque statut
  const badgeClass = computed(() => {
    switch (props.statut?.toLowerCase()) {
      case 'à jour':
        return 'bg-green-100 text-green-800'
      case 'en retard':
        return 'bg-yellow-100 text-yellow-800'
      case 'non payé':
      case 'solde partiel':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  })
  </script>
  