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
          <router-link
            to="/sec-admin/dashboard"
            class="flex items-center text-brandBlue px-3 py-2 rounded hover:bg-gray-100 transition-colors"
            active-class="bg-gray-100 font-semibold"
          >
            <font-awesome-icon :icon="['fas', 'chart-pie']" class="mr-2 text-brandBlue" />
            Tableau de bord
          </router-link>
        </li>

        <li>
          <router-link
            to="/sec-admin/validation"
            class="flex items-center text-brandBlue px-3 py-2 rounded hover:bg-gray-100 transition-colors"
            active-class="bg-gray-100 font-semibold"
          >
            <font-awesome-icon :icon="['fas', 'edit']" class="mr-2 text-brandBlue" />
            Validation financière
          </router-link>
        </li>

        <!--<li>
          <router-link
            to="/sec-admin/historique"
            class="flex items-center text-brandBlue px-3 py-2 rounded hover:bg-gray-100 transition-colors"
            active-class="bg-gray-100 font-semibold"
          >
            <font-awesome-icon :icon="['fas', 'history']" class="mr-2 text-brandBlue" />
            Suivi & Historique
          </router-link>
        </li>-->

        <!--li>
          <router-link
            to="/sec-admin/notifications"
            class="flex items-center text-brandBlue px-3 py-2 rounded hover:bg-gray-100 transition-colors"
            active-class="bg-gray-100 font-semibold"
          >
            <font-awesome-icon :icon="['fas', 'bell']" class="mr-2 text-brandBlue" />
            Notifications
          </router-link>
        </li-->

        <li>
          <router-link
            to="/sec-admin/profil"
            class="flex items-center text-brandBlue px-3 py-2 rounded hover:bg-gray-100 transition-colors"
            active-class="bg-gray-100 font-semibold"
          >
            <font-awesome-icon :icon="['fas', 'user']" class="mr-2 text-brandBlue" />
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
import LogoutButton from '@/components/auth/LogoutButton.vue'
</script>
