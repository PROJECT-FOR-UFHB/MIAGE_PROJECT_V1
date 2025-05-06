<template>
  <aside class="h-full">
    <div class="mb-8 flex justify-center mt-4">
      <img src="/src/assets/logo_de_miage.png" alt="Logo MIAGE" class="h-20" />
    </div>
    <nav>
      <ul class="space-y-4">
        <li>
          <router-link
            to="/enseignant/dashboard"
            class="flex items-center text-brandBlue px-3 py-2 rounded hover:bg-gray-100 transition"
            active-class="bg-gray-100 font-semibold"
          >
            <font-awesome-icon :icon="['fas', 'chart-pie']" class="mr-2 text-brandBlue" />
            Tableau de bord
          </router-link>
        </li>
        <li>
          <router-link
            to="/enseignant/demandes-a-traiter"
            class="flex items-center text-brandBlue px-3 py-2 rounded hover:bg-gray-100 transition"
            active-class="bg-gray-100 font-semibold"
          >
            <font-awesome-icon :icon="['fas', 'edit']" class="mr-2 text-brandBlue" />
            Demandes à traiter
          </router-link>
        </li>
        <li>
          <router-link
            to="/enseignant/historique"
            class="flex items-center text-brandBlue px-3 py-2 rounded hover:bg-gray-100 transition"
            active-class="bg-gray-100 font-semibold"
          >
            <font-awesome-icon :icon="['fas', 'folder-open']" class="mr-2 text-brandBlue" />
            Recommandations / Thèmes
          </router-link>
        </li>
        <li>
          <router-link
            to="/enseignant/notifications"
            class="flex items-center text-brandBlue px-3 py-2 rounded hover:bg-gray-100 transition"
            active-class="bg-gray-100 font-semibold"
          >
            <font-awesome-icon :icon="['fas', 'bell']" class="mr-2 text-brandBlue" />
            Notifications
          </router-link>
        </li>
        <li>
          <router-link
            to="/enseignant/profil"
            class="flex items-center text-brandBlue px-3 py-2 rounded hover:bg-gray-100 transition"
            active-class="bg-gray-100 font-semibold"
          >
            <font-awesome-icon :icon="['fas', 'user']" class="mr-2 text-brandBlue" />
            Mon profil
          </router-link>
        </li>
        <li>
          <LogoutButton class="flex items-center text-red-600 px-3 py-2 rounded hover:bg-red-50 transition" />
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
import LogoutButton from '@/components/auth/LogoutButton.vue'
</script>
