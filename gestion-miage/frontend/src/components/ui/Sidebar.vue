<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// Détection du contexte selon le chemin
const links = computed(() => {
  if (route.path.includes('/etudiants')) {
    return [
      { to: '/etudiants/espace-etudiant', label: 'Espace étudiant', icon: ['fas', 'graduation-cap'] },
      { to: '/etudiants/nouvelle-demande', label: 'Nouvelle demande', icon: ['fas', 'file-alt'] },
      { to: '#', label: 'Mes demandes', icon: ['fas', 'clipboard-list'] },
      { to: '#', label: 'Profil', icon: ['fas', 'user'] }
    ]
  }

  if (route.path.includes('/secretariat')) {
    return [
      { to: '/secretariat/tableau-de-bord', label: 'Tableau de bord', icon: ['fas', 'chart-simple'] },
      { to: '/secretariat/demandes-recus', label: 'Demandes reçues', icon: ['fas', 'clipboard-list'] }
    ]
  }

  return []
})

// Fonction pour savoir si un lien est actif (exact match ou beginsWith si besoin)
const isActive = (path) => route.path === path
</script>

<template>
  <aside class="absolute top-0 left-0 h-full w-64 bg-white p-4 shadow-md">
    <div class="mb-8 flex justify-center">
      <img src="/src/assets/logo_de_miage.png" alt="Logo MIAGE" class="h-20" />
    </div>
    <nav>
      <ul class="space-y-4">
        <li v-for="(link, index) in links" :key="index">
          <router-link
            :to="link.to"
            class="block px-3 py-2 rounded transition-colors flex items-center"
            :class="[
              isActive(link.to) ? 'bg-gray-100 font-semibold text-brandBlue' : 'text-brandBlue hover:bg-gray-100'
            ]"
          >
            <font-awesome-icon :icon="link.icon" class="mr-2 text-brandBlue" />
            {{ link.label }}
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>
