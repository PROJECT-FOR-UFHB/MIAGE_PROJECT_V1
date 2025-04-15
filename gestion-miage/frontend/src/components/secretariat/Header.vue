<template>
    <header class="bg-brandBlue h-16 flex items-center pl-64 justify-center text-white shadow">
      <div class="flex items-center">
        <font-awesome-icon :icon="icon" class="mr-2 text-brandGreen" />
        <h1 class="text-xl font-semibold">{{ title }}</h1>
      </div>
    </header>
  </template>
  
  <script setup>
  const props = defineProps({
    title: {
      type: String,
      default: 'Mon Application'
    },
    icon: {
      type: Array,
      default: () => ['fas', 'question']
    }
  })
  </script>
  