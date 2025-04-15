<template>
    <aside class="absolute top-0 left-0 h-full w-64 bg-white p-4 shadow-md">
      <div class="mb-8 flex justify-center">
        <img
          src="/src/assets/logo_de_miage.png"
          alt="Logo MIAGE"
          class="h-20"
        />
      </div>
  
      <!-- Navigation Secrétaire -->
      <nav>
        <ul class="space-y-4">
          <li>
            <a href="#" class="flex items-center text-gray-800 px-3 py-2 rounded hover:bg-gray-100 transition-colors">
              <!-- Icône 'fa-chart-simple' pour le tableau de bord -->
              <font-awesome-icon :icon="['fas', 'chart-simple']" class="mr-2 text-brandBlue" />
              Tableau de bord
            </a>
          </li>
          <li>
            <a href="#" class="flex items-center text-gray-800 px-3 py-2 rounded bg-gray-100 font-semibold transition-colors">
              <font-awesome-icon :icon="['fas', 'clipboard-list']" class="mr-2 text-brandBlue" />
              Demandes reçues
            </a>
          </li>
          <li>
            <a href="#" class="flex items-center text-gray-800 px-3 py-2 rounded hover:bg-gray-100 transition-colors">
              <font-awesome-icon :icon="['fas', 'user']" class="mr-2 text-brandBlue" />
              Profil
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  </template>
  
  <script setup>
  // Aucun script particulier pour cette sidebar statique
  </script>
  