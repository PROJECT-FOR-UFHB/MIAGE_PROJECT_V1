<template>
  <!-- On utilise 'flex items-center justify-end' -->
  <header class="bg-brandBlue h-16 flex items-center pl-64 justify-center text-white shadow">
    <!-- On remplace ml-4 par mr-4 pour espacer du bord droit -->
    <div class="ml-4 flex items-center">
      <font-awesome-icon
        :icon="['fas', 'file-alt']"
        class="mr-2 text-brandGreen"
      />
      <h1 class="text-xl font-semibold">Nouvelle demande</h1>
    </div>
  </header>
</template>

<script setup>
</script>
