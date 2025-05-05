<template>
  <div class="relative min-h-screen font-sans text-gray-800 bg-gray-100">

    <!-- Insertion de la bonne sidebar selon le rôle ou l'URL -->
    <component :is="selectedSidebar" />

    <!-- Insertion du bon header dynamique avec icône et titre -->
    <component :is="selectedHeader" :title="headerTitle" :icon="headerIcon" />

    <!-- Zone principale de contenu des pages -->
    <main class="pl-64 pt-6">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

// Imports des sidebars selon les rôles
import StudentSidebar     from '@/components/etudiants/Sidebar.vue'
import StudentHeader      from '@/components/etudiants/Header.vue'

import SecretarySidebar   from '@/components/secretariat/Sidebar.vue'
import SecretaryHeader    from '@/components/secretariat/Header.vue'

import SecAdminSidebar    from '@/components/secAdmin/Sidebar.vue'
import SecAdminHeader     from '@/components/secAdmin/Header.vue'

import DirecteurSidebar   from '@/components/directeurMiage/Sidebar.vue'     // 👈 Ajouté
import DirecteurHeader    from '@/components/directeurMiage/Header.vue'      // 👈 Ajouté

import RespoNiveauSidebar from '@/components/responsableNiveau/Sidebar.vue'
import RespoNiveauHeader from '@/components/responsableNiveau/Header.vue'

// URL actuelle
const route = useRoute()

// Choix dynamique de la sidebar
const selectedSidebar = computed(() => {
  if (route.path.includes('/sec-admin'))     return SecAdminSidebar
  if (route.path.includes('/secretariat'))   return SecretarySidebar
  if (route.path.includes('/directeur'))     return DirecteurSidebar
  if (route.path.includes('/responsable'))   return RespoNiveauSidebar // ✅ Corrigé

  return StudentSidebar
})

// Choix dynamique du header
const selectedHeader = computed(() => {
  if (route.path.includes('/sec-admin'))     return SecAdminHeader
  if (route.path.includes('/secretariat'))   return SecretaryHeader
  if (route.path.includes('/directeur'))     return DirecteurHeader
  if (route.path.includes('/responsable'))   return RespoNiveauHeader // ✅ Corrigé

  return StudentHeader
})

// Métadonnées dynamiques (titre & icône)
const headerTitle = computed(() => route.meta.headerTitle || 'Mon Application')
const headerIcon  = computed(() => route.meta.headerIcon  || ['fas', 'question'])
</script>
