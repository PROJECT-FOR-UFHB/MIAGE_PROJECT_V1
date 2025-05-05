<template>
    <header class="bg-brandBlue h-16 flex items-center pl-64 justify-between text-white shadow pr-6 fixed top-0 left-0 right-0 z-10">
      <div class="flex items-center">
        <font-awesome-icon :icon="icon" class="mr-2 text-brandGreen" />
        <h1 class="text-xl font-semibold">{{ title }}</h1>
      </div>
      <div class="flex items-center">
        <LogoutButton />
      </div>
    </header>
  </template>
  
  <script setup>
  import LogoutButton from '@/components/auth/LogoutButton.vue'
  
  defineProps({
    title: String,
    icon: Array
  })
  </script>
  