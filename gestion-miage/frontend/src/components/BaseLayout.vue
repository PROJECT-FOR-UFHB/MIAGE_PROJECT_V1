<!-- BaseLayout.vue -->
<template>
    <div class="relative min-h-screen font-sans text-gray-800 bg-gray-100">
      <component :is="selectedSidebar" />
      <component :is="selectedHeader" :title="headerTitle" :icon="headerIcon" />
      <main class="pl-64 pt-6">
        <router-view />
      </main>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import StudentSidebar from '@/components/etudiants/Sidebar.vue'
  import StudentHeader from '@/components/etudiants/Header.vue'
  import SecretarySidebar from '@/components/secretariat/Sidebar.vue'
  import SecretaryHeader from '@/components/secretariat/Header.vue'
  
  const route = useRoute()
  
  // Sélection de la bonne sidebar/header
  const selectedSidebar = computed(() => {
    if (route.path.includes('/secretariat')) return SecretarySidebar
    return StudentSidebar
  })
  const selectedHeader = computed(() => {
    if (route.path.includes('/secretariat')) return SecretaryHeader
    return StudentHeader
  })
  
  // Récupération du titre et de l’icône via meta
  const headerTitle = computed(() => route.meta.headerTitle || 'Mon Application')
  const headerIcon = computed(() => route.meta.headerIcon || ['fas', 'question'])
  </script>
  