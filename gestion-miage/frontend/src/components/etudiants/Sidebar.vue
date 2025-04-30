<template>
  <aside class="fixed top-0 left-0 h-screen w-64 bg-white/80 border-r border-gray-200 shadow-lg p-6 flex flex-col justify-between">
    <!-- Logo -->
    <div class="flex justify-center mb-8">
      <img
        src="/src/assets/logo_de_miage.png"
        alt="Logo MIAGE"
        class="h-16 w-auto transition-transform duration-300 hover:scale-110"
      />
    </div>

    <!-- Navigation -->
    <nav class="flex-1">
      <ul class="space-y-4">
        <li v-for="link in links" :key="link.to">
          <router-link
            :to="link.to"
            class="group flex items-center px-4 py-3 rounded-lg text-gray-700 text-lg font-medium transition-all duration-300 hover:bg-brandBlue/10 hover:text-brandBlue"
            active-class="bg-brandBlue/20 text-brandBlue"
          >
            <font-awesome-icon
              :icon="link.icon"
              class="mr-3 text-xl transition-transform duration-300 group-hover:rotate-12"
            />
            <span class="uppercase tracking-wide group-hover:underline">{{ link.label }}</span>
          </router-link>
        </li>
      </ul>
    </nav>

    <!-- Footer or Version -->
    <div class="text-center text-gray-600 text-sm font-semibold mt-8">
      © MIAGE 2025
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'

const links = ref([
  { to: '/etudiants/espace-etudiant', label: 'Espace étudiant', icon: ['fas', 'graduation-cap'] },
  { to: '/etudiants/nouvelle-demande', label: 'Nouvelle demande', icon: ['fas', 'file-alt'] },
  { to: '/etudiants/mes-demandes', label: 'Mes demandes', icon: ['fas', 'clipboard-list'] },
  { to: '/etudiants/profil', label: 'Profil', icon: ['fas', 'user'] }
])
</script>

<style scoped>
/* Navbar animations and styling handled by Tailwind utilities */
</style>
