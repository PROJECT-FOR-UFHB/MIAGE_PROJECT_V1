<!-- src/components/directeurMiage/Header.vue -->
<template>
    <header class="bg-brandBlue h-16 flex items-center pl-64 pr-6 justify-between text-white shadow">
      <div class="flex items-center">
        <font-awesome-icon :icon="icon" class="mr-2 text-brandGreen" />
        <h1 class="text-xl font-semibold">{{ title }}</h1>
      </div>
      <LogoutButton />
    </header>
  </template>
  
  <script setup>
  import LogoutButton from '@/components/auth/LogoutButton.vue'
  
  defineProps({
    title: { type: String, required: true },
    icon: { type: Array, required: true }
  })
  </script>
  