<template>
  <div class="relative min-h-screen font-sans text-gray-800 bg-gray-100">
    
    <!-- ✅ Insertion de la bonne sidebar selon le rôle ou l'URL -->
    <component :is="selectedSidebar" />

    <!-- ✅ Insertion du bon header dynamique avec icône et titre -->
    <component :is="selectedHeader" :title="headerTitle" :icon="headerIcon" />

    <!-- ✅ Zone principale de contenu des pages -->
    <main class="pl-64 pt-6">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

// 🧩 Imports des sidebars selon les rôles
import StudentSidebar    from '@/components/etudiants/Sidebar.vue'
import StudentHeader     from '@/components/etudiants/Header.vue'
import SecretarySidebar  from '@/components/secretariat/Sidebar.vue'
import SecretaryHeader   from '@/components/secretariat/Header.vue'
import SecAdminSidebar   from '@/components/secAdmin/Sidebar.vue'
import SecAdminHeader    from '@/components/secAdmin/Header.vue'

// Récupération de l'URL courante
const route = useRoute()

// 📦 Choix dynamique de la sidebar selon le chemin
const selectedSidebar = computed(() => {
  if (route.path.includes('/sec-admin'))    return SecAdminSidebar
  if (route.path.includes('/secretariat'))  return SecretarySidebar
  return StudentSidebar
})

// 📦 Choix dynamique du header
const selectedHeader = computed(() => {
  if (route.path.includes('/sec-admin'))    return SecAdminHeader
  if (route.path.includes('/secretariat'))  return SecretaryHeader
  return StudentHeader
})

// 🎯 Titre & icône dynamiques via meta dans le routeur
const headerTitle = computed(() => route.meta.headerTitle || 'Mon Application')
const headerIcon  = computed(() => route.meta.headerIcon  || ['fas', 'question'])
</script>
