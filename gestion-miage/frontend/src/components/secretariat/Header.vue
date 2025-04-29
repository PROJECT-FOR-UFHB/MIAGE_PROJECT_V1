<template>
  <header class="bg-brandBlue h-16 flex items-center pl-64 justify-between text-white shadow pr-6">
    <div class="flex items-center">
      <font-awesome-icon :icon="icon" class="mr-2 text-brandGreen" />
      <h1 class="text-xl font-semibold">{{ title }}</h1>
    </div>
    <div class="flex items-center space-x-4">
      <NotificationBadge />
      <LogoutButton />
    </div>
  </header>
</template>

<script setup>
import LogoutButton from '@/components/auth/LogoutButton.vue'
import NotificationBadge from '@/components/NotificationBadge.vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: Array,
    required: true
  }
})
</script>
  