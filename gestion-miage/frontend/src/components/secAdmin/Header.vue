<!-- src/components/secAdmin/Header.vue -->
<template>
    <header
    class="bg-brandBlue h-16 flex items-center justify-center text-white shadow pr-6
           sm:pl-64 px-4  top-0 left-0 right-0 z-10"
  >
      <div class="flex items-center space-x-2">
        <!-- Icône dynamique provenant des meta du router -->
        <font-awesome-icon :icon="icon" class="mr-2 text-brandGreen" />
        <h1 class="text-xl font-semibold">{{ title }}</h1>
      </div>
      <!-- Bouton de déconnexion (réutilisable) -->
      <LogoutButton />
    </header>
  </template>
  
  <script setup>
  
  
  const props = defineProps({
    title: String,
    icon: Array
  })
  </script>
  