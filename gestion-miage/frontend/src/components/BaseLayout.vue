<!-- src/components/BaseLayout.vue -->
<template>
  <div class="relative min-h-screen font-sans text-gray-800 bg-gray-100">
    <!-- Sidebar générique -->
    <Sidebar />

    <!-- Header générique avec titre et icône dynamiques -->
    <Header :title="headerTitle" :icon="headerIcon" />

    <!-- Contenu de page -->
    <main class="pl-64 pt-6">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

// Composants centralisés
import Sidebar from '@/components/ui/Sidebar.vue'
import Header from '@/components/ui/Header.vue'

// Accès à la route courante
const route = useRoute()

// Titre et icône du header via meta dans le routeur
const headerTitle = computed(() => route.meta.headerTitle || 'Mon Application')
const headerIcon = computed(() => route.meta.headerIcon || ['fas', 'question'])
</script>
