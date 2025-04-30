<template>
  <header class="fixed top-0 left-0 w-full h-16 bg-white/80 border-b border-gray-200 shadow-lg flex items-center justify-between pl-64 pr-6 animate-slide-down">
    <div class="flex items-center space-x-3">
      <font-awesome-icon
        :icon="icon"
        class="text-brandBlue text-2xl transition-transform duration-300 hover:scale-110 hover:text-brandBlue-dark"
      />
      <h1 class="text-xl font-bold text-gray-800 transition-all duration-300 hover:tracking-wide hover:text-gray-900">
        {{ title }}
      </h1>
    </div>
    <div>
      <LogoutButton
        class="transition-opacity duration-300 hover:opacity-80 animate-pulse-once"
      />
    </div>
  </header>
</template>

<script setup>
import LogoutButton from '@/components/auth/LogoutButton.vue'

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

<style scoped>
@keyframes slide-down {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(0); }
}
.animate-slide-down {
  animation: slide-down 0.5s ease-out;
}

@keyframes pulse-once {
  0% { opacity: 1; }
  50% { opacity: 0.6; }
  100% { opacity: 1; }
}
.animate-pulse-once {
  animation: pulse-once 2s ease-in-out;
}
</style>
