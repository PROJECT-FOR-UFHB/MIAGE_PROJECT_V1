<template>
  <header
    class="bg-brandBlue h-16 flex items-center justify-center text-white shadow px-4 fixed top-0 left-0 right-0 z-10 sm:pl-64"
  >
    <!-- Conteneur global en position relative -->
    <div class="w-full max-w-6xl flex items-center justify-center relative">
      <!-- Centre : Titre + icône -->
      <div class="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-2">
        <font-awesome-icon :icon="icon" class="text-brandGreen text-lg" />
        <h1 class="text-lg font-semibold">{{ title }}</h1>
      </div>

      <!-- Droite : Notifications -->
      <div class="ml-auto flex items-center space-x-4">
        <NotificationCenter alias="TraiterDemande" />
        <slot name="actions"></slot>
      </div>
    </div>
  </header>
</template>

<script setup>
import NotificationCenter from '../NotificationCenter.vue'

defineProps({
  title: String,
  icon: Array
})
</script>
