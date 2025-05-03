<!-- src/components/secAdmin/Sidebar.vue -->
<template>
    <aside class="absolute top-0 left-0 h-full w-64 bg-white p-4 shadow-md">
      <!-- Logo -->
      <div class="mb-8 flex justify-center">
        <img src="/src/assets/logo_de_miage.png" alt="Logo MIAGE" class="h-20" />
      </div>
  
      <!-- Navigation -->
      <nav>
        <ul class="space-y-4">
          <li>
            <router-link to="/sec-admin/dashboard" class="link-item" active-class="active">
              <font-awesome-icon :icon="['fas', 'chart-pie']" class="mr-2" />
              Tableau de bord
            </router-link>
          </li>
          <li>
            <router-link to="/sec-admin/validation" class="link-item" active-class="active">
              <font-awesome-icon :icon="['fas', 'file-invoice-dollar']" class="mr-2" />
              Validation financière
            </router-link>
          </li>
          <li>
            <router-link to="/sec-admin/historique" class="link-item" active-class="active">
              <font-awesome-icon :icon="['fas', 'history']" class="mr-2" />
              Suivi & Historique
            </router-link>
          </li>
          <li>
            <router-link to="/sec-admin/notifications" class="link-item" active-class="active">
              <font-awesome-icon :icon="['fas', 'bell']" class="mr-2" />
              Notifications
            </router-link>
          </li>
          <li>
            <router-link to="/sec-admin/profil" class="link-item" active-class="active">
              <font-awesome-icon :icon="['fas', 'user']" class="mr-2" />
              Mon profil
            </router-link>
          </li>
        </ul>
      </nav>
    </aside>
  </template>
  
  <script setup>
  // Aucun JS ici, la navigation est statique
  </script>
  
  <style scoped>
  .link-item {
    @apply block text-brandBlue px-3 py-2 rounded hover:bg-gray-100 transition-colors flex items-center;
  }
  .active {
    @apply bg-gray-100 font-semibold;
  }
  </style>
  