<template>
  <aside class="absolute top-0 left-0 h-full w-64 bg-white p-4 shadow-md">
    <!-- Logo MIAGE -->
    <div class="mb-8 flex justify-center">
      <img src="/src/assets/logo_de_miage.png" alt="Logo MIAGE" class="h-20" />
    </div>

    <!-- Menu navigation -->
    <nav>
      <ul class="space-y-4">
        <!-- Lien Tableau de bord -->
        <li>
          <router-link
            to="/admin/dashboard"
            class="flex items-center text-brandBlue px-3 py-2 rounded hover:bg-gray-100 transition-colors"
            active-class="bg-gray-100 font-semibold"
          >
            <font-awesome-icon :icon="['fas', 'gauge']" class="mr-2 text-brandBlue" />
            Tableau de bord
          </router-link>
        </li>

        <!-- Lien CRUD -->
        <li>
          <a
            :href="crudUrl"
            target="_blank"
            class="flex items-center text-brandBlue px-3 py-2 rounded hover:bg-gray-100 transition-colors"
          >
            <font-awesome-icon :icon="['fas', '']" class="mr-2 text-brandBlue" />
            Interface CRUD
          </a>
        </li>

        <!-- Lien Rôles & accès -->
        <li>
          <router-link
            to="/admin/roles"
            class="flex items-center text-brandBlue px-3 py-2 rounded hover:bg-gray-100 transition-colors"
            active-class="bg-gray-100 font-semibold"
          >
            <font-awesome-icon :icon="['fas', 'user-shield']" class="mr-2 text-brandBlue" />
            Rôles & accès
          </router-link>
        </li>

        <!-- Lien Logs & sécurité -->
        <li>
          <router-link
            to="/admin/logs"
            class="flex items-center text-brandBlue px-3 py-2 rounded hover:bg-gray-100 transition-colors"
            active-class="bg-gray-100 font-semibold"
          >
            <font-awesome-icon :icon="['fas', 'scroll']" class="mr-2 text-brandBlue" />
            Logs & sécurité
          </router-link>
        </li>

        <!-- Lien Paramètres système -->
        <li>
          <router-link
            to="/admin/parametres"
            class="flex items-center text-brandBlue px-3 py-2 rounded hover:bg-gray-100 transition-colors"
            active-class="bg-gray-100 font-semibold"
          >
            <font-awesome-icon :icon="['fas', 'sliders-h']" class="mr-2 text-brandBlue" />
            Paramètres système
          </router-link>
        </li>

        <!-- Lien Sauvegardes -->
        <li>
          <router-link
            to="/admin/sauvegardes"
            class="flex items-center text-brandBlue px-3 py-2 rounded hover:bg-gray-100 transition-colors"
            active-class="bg-gray-100 font-semibold"
          >
            <font-awesome-icon :icon="['fas', 'database']" class="mr-2 text-brandBlue" />
            Sauvegardes
          </router-link>
        </li>

        <!-- Lien Mon profil -->
        <li>
          <router-link
            to="/admin/profil"
            class="flex items-center text-brandBlue px-3 py-2 rounded hover:bg-gray-100 transition-colors"
            active-class="bg-gray-100 font-semibold"
          >
            <font-awesome-icon :icon="['fas', 'user']" class="mr-2 text-brandBlue" />
            Mon profil
          </router-link>
        </li>

        <!-- Bouton de déconnexion -->
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

const crudUrl = import.meta.env.VITE_CRUD_URL
</script>
