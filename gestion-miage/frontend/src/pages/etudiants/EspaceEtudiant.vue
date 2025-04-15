<!-- src/pages/etudiants/EspaceEtudiant.vue -->
<template>
    <div class="max-w-6xl mx-auto bg-white rounded shadow p-6">
      <h2 class="text-xl font-semibold mb-4">Espace étudiant</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Demandes en attente -->
        <div class="bg-gray-50 p-4 rounded shadow flex flex-col items-center">
          <font-awesome-icon :icon="['fas', 'hourglass-half']" class="text-brandBlue text-3xl mb-2" />
          <p class="text-lg font-semibold">En attente</p>
          <p class="text-2xl font-bold">5</p>
        </div>
        <!-- Demandes passées -->
        <div class="bg-gray-50 p-4 rounded shadow flex flex-col items-center">
          <font-awesome-icon :icon="['fas', 'history']" class="text-gray-600 text-3xl mb-2" />
          <p class="text-lg font-semibold">Passées</p>
          <p class="text-2xl font-bold">10</p>
        </div>
        <!-- Demandes validées -->
        <div class="bg-gray-50 p-4 rounded shadow flex flex-col items-center">
          <font-awesome-icon :icon="['fas', 'check-circle']" class="text-green-500 text-3xl mb-2" />
          <p class="text-lg font-semibold">Validées</p>
          <p class="text-2xl font-bold">7</p>
        </div>
        <!-- Demandes rejetées -->
        <div class="bg-gray-50 p-4 rounded shadow flex flex-col items-center">
          <font-awesome-icon :icon="['fas', 'ban']" class="text-red-500 text-3xl mb-2" />
          <p class="text-lg font-semibold">Rejetées</p>
          <p class="text-2xl font-bold">2</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // Plus tard, tu récupèreras ces stats via ton API Laravel ou un store Vuex/Pinia.
  </script>
  