<template>
  <header
    class="bg-brandBlue h-16 flex items-center justify-between text-white shadow pr-6
           sm:pl-64 px-4 fixed top-0 left-0 right-0 z-10"
  >
    <!-- Titre et icône -->
    <div class="flex items-center space-x-2">
      <font-awesome-icon :icon="icon" class="text-brandGreen text-lg" />
      <h1 class="text-lg font-semibold">{{ title }}</h1>
    </div>
    
    <!-- Notifications et actions utilisateur -->
    <div class="flex items-center space-x-4">
      <NotificationCenter />
      <slot name="actions"></slot>
    </div>
  </header>
</template>

<script setup>
import NotificationCenter from '../NotificationCenter.vue'

const props = defineProps({
  title: String,
  icon: Array
})
</script>
