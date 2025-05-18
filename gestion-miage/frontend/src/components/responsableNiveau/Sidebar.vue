<template>
  <aside class="absolute top-0 left-0 h-full w-64 bg-white p-4 shadow-md">
    <div class="mb-8 flex justify-center">
      <img src="/src/assets/logo_de_miage.png" alt="Logo MIAGE" class="h-20" />
    </div>
    <nav>
      <ul class="space-y-4">
        <li>
          <router-link to="/responsable/tableau-de-bord"
            class="flex items-center text-brandBlue px-3 py-2 rounded hover:bg-gray-100 transition"
            active-class="bg-gray-100 font-semibold">
            <font-awesome-icon :icon="['fas', 'chart-pie']" class="mr-2" />
            Tableau de bord
          </router-link>
        </li>
        <li>
          <router-link to="/responsable/demandes"
            class="flex items-center text-brandBlue px-3 py-2 rounded hover:bg-gray-100 transition"
            active-class="bg-gray-100 font-semibold">
            <font-awesome-icon :icon="['fas', 'file-alt']" class="mr-2" />
            Demandes de mon niveau
          </router-link>
        </li>
        <li>
          <router-link to="/responsable/historique"
            class="flex items-center text-brandBlue px-3 py-2 rounded hover:bg-gray-100 transition"
            active-class="bg-gray-100 font-semibold">
            <font-awesome-icon :icon="['fas', 'history']" class="mr-2" />
            Historique complet
          </router-link>
        </li>
        <li>
          <router-link to="/responsable/notifications"
            class="flex items-center text-brandBlue px-3 py-2 rounded hover:bg-gray-100 transition"
            active-class="bg-gray-100 font-semibold">
            <font-awesome-icon :icon="['fas', 'bell']" class="mr-2" />
            Notifications
          </router-link>
        </li>
        <li>
          <router-link to="/responsable/profil"
            class="flex items-center text-brandBlue px-3 py-2 rounded hover:bg-gray-100 transition"
            active-class="bg-gray-100 font-semibold">
            <font-awesome-icon :icon="['fas', 'user']" class="mr-2" />
            Mon profil
          </router-link>
        </li>
        <!-- Déconnexion -->
        <li>
          <LogoutButton class="flex items-center text-red-600 px-3 py-2 rounded hover:bg-red-50 transition-colors" />
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
  color: rgb(13, 50, 129);
  border-radius: 0.5rem;
  transition: background 0.2s;
}

.sidebar-link:hover {
  background-color: #f3f4f6;
}
</style>
