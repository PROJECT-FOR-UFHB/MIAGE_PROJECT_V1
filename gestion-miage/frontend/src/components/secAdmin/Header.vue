<!-- src/components/secAdmin/Header.vue -->
<template>
    <header class="bg-brandBlue h-16 flex items-center pl-64 justify-between text-white shadow pr-6">
      <div class="flex items-center">
        <!-- Icône dynamique provenant des meta du router -->
        <font-awesome-icon :icon="icon" class="mr-2 text-brandGreen" />
        <h1 class="text-xl font-semibold">{{ title }}</h1>
      </div>
      <!-- Bouton de déconnexion (réutilisable) -->
      <LogoutButton />
    </header>
  </template>
  
  <script setup>
  import LogoutButton from '@/components/auth/LogoutButton.vue'
  
  const props = defineProps({
    title: String,
    icon: Array
  })
  </script>
  