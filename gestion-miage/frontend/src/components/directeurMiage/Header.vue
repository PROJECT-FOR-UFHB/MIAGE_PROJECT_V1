<!-- src/components/directeurMiage/Header.vue -->
<template>
  <CommonHeader :title="title" :icon="icon">
    <template #actions>
      <button class="text-white hover:text-gray-200">Déconnexion</button>
    </template>
  </CommonHeader>
</template>
  
<script setup>
import CommonHeader from '../common/CommonHeader.vue'

defineProps({
  title: { type: String, required: true },
  icon: { type: Array, required: true }
})
</script>