<!-- src/pages/secretariat/Dashboard.vue -->
<template>
    <div class="max-w-6xl mx-auto bg-white rounded shadow p-6">
      <h2 class="text-xl font-semibold mb-4">Tableau de bord</h2>
      <!-- Grille de cartes statistiques -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Demandes reçues -->
        <div class="bg-gray-50 p-4 rounded shadow flex flex-col items-center">
          <font-awesome-icon :icon="['fas', 'inbox']" class="text-brandBlue text-3xl mb-2" />
          <p class="text-lg font-semibold">Reçues</p>
          <p class="text-2xl font-bold">120</p>
        </div>
        <!-- Demandes traitées -->
        <div class="bg-gray-50 p-4 rounded shadow flex flex-col items-center">
          <font-awesome-icon :icon="['fas', 'check-circle']" class="text-green-500 text-3xl mb-2" />
          <p class="text-lg font-semibold">Traitées</p>
          <p class="text-2xl font-bold">90</p>
        </div>
        <!-- Demandes validées -->
        <div class="bg-gray-50 p-4 rounded shadow flex flex-col items-center">
          <font-awesome-icon :icon="['fas', 'thumbs-up']" class="text-green-600 text-3xl mb-2" />
          <p class="text-lg font-semibold">Validées</p>
          <p class="text-2xl font-bold">70</p>
        </div>
        <!-- Demandes rejetées -->
        <div class="bg-gray-50 p-4 rounded shadow flex flex-col items-center">
          <font-awesome-icon :icon="['fas', 'ban']" class="text-red-600 text-3xl mb-2" />
          <p class="text-lg font-semibold">Rejetées</p>
          <p class="text-2xl font-bold">20</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // Tu pourras plus tard calculer ou charger ces données depuis ton API Laravel
  </script>
  