<!-- src/components/directeurMiage/Sidebar.vue -->
<template>
    <aside class="fixed left-0 top-0 h-full w-64 bg-white shadow-md p-4 z-10">
      <div class="flex justify-center mb-8">
        <img src="/src/assets/logo_de_miage.png" alt="Logo MIAGE" class="h-20" />
      </div>
      <nav>
        <ul class="space-y-4">
          <li>
            <router-link to="/directeur/dashboard" class="flex items-center text-brandBlue px-3 py-2 rounded hover:bg-gray-100 transition"
            active-class="bg-gray-100 font-semibold">
              <font-awesome-icon :icon="['fas', 'chart-pie']" class="mr-2" />
              Tableau de bord
            </router-link>
          </li>
          <li>
            <router-link to="/directeur/demandes-a-signer" class="flex items-center text-brandBlue px-3 py-2 rounded hover:bg-gray-100 transition"
            active-class="bg-gray-100 font-semibold">
              <font-awesome-icon :icon="['fas', 'edit']" class="mr-2 text-brandBlue" />
              Demandes à signer
            </router-link>
          </li>
          <li>
            <router-link to="/directeur/historique" class="flex items-center text-brandBlue px-3 py-2 rounded hover:bg-gray-100 transition"
            active-class="bg-gray-100 font-semibold">
              <font-awesome-icon :icon="['fas', 'history']" class="mr-2" />
              Historique & rapports
            </router-link>
          </li>
          <li>
            <router-link to="/directeur/notifications" class="flex items-center text-brandBlue px-3 py-2 rounded hover:bg-gray-100 transition"
            active-class="bg-gray-100 font-semibold">
              <font-awesome-icon :icon="['fas', 'bell']" class="mr-2" />
              Notifications
            </router-link>
          </li>
          <li>
            <router-link to="/directeur/profil" class="flex items-center text-brandBlue px-3 py-2 rounded hover:bg-gray-100 transition"
            active-class="bg-gray-100 font-semibold">
              <font-awesome-icon :icon="['fas', 'user']" class="mr-2" />
              Mon profil
            </router-link>
          </li>
          <!-- Déconnexion -->
        <li>
          <LogoutButton
            class="flex items-center text-red-600 px-3 py-2 rounded hover:bg-red-50 transition-colors"
          />
        </li>
        </ul>
      </nav>
    </aside>
  </template>
  
  <script setup>
  // Style de classe commun
  import LogoutButton from '@/components/auth/LogoutButton.vue'
  </script>
  
  <style scoped>
  .sidebar-link {
    display: flex;
    align-items: center;
    padding: 0.75rem 1rem;
    color:rgb(13, 50, 129);
    border-radius: 0.5rem;
    transition: background 0.2s;
  }
  .sidebar-link:hover {
    background-color: #f3f4f6;
  }
  </style>
  