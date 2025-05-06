<template>
  <header
    class="bg-brandBlue h-16 flex items-center justify-center text-white shadow pr-6
           sm:pl-64 px-4 fixed top-0 left-0 right-0 z-10"
  >
    <!-- Contenu centré horizontalement -->
    <div class="flex items-center space-x-2">
      <font-awesome-icon :icon="icon" class="text-brandGreen text-lg" />
      <h1 class="text-lg font-semibold">{{ title }}</h1>
    </div>
  </header>
</template>

<script setup>
defineProps({
  title: String,
  icon: Array
})
</script>
