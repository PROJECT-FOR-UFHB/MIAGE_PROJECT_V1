<template>
  <div class="relative min-h-screen font-sans text-gray-800 bg-gray-100">
    <!-- Bouton hamburger visible uniquement sur mobile -->
    <button
      @click="sidebarVisible = !sidebarVisible"
      class="sm:hidden fixed top-4 left-4 z-40 bg-white p-2 rounded shadow"
    >
      <font-awesome-icon :icon="['fas', 'bars']" class="text-brandBlue text-xl" />
    </button>

    <!-- Sidebar (mobile et desktop) -->
    <div
      :class="[
        'fixed top-0 left-0 h-full w-64 bg-white p-4 shadow-md z-30',
        { 'block': sidebarVisible, 'hidden': !sidebarVisible, 'sm:block': true }
      ]"
    >
      <component :is="selectedSidebar" />
    </div>

    <!-- Header -->
    <component :is="selectedHeader" :title="headerTitle" :icon="headerIcon" />

    <!-- Overlay foncé sur mobile quand la sidebar est ouverte -->
    <div
      v-if="sidebarVisible"
      @click="sidebarVisible = false"
      class="fixed inset-0 bg-black bg-opacity-40 z-20 sm:hidden"
    />

    <!-- Contenu -->
    <main class="pt-10 px-4 pb-10 transition-all sm:pl-64">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

import StudentSidebar from '@/components/etudiants/Sidebar.vue'
import StudentHeader from '@/components/etudiants/Header.vue'
import SecretarySidebar from '@/components/secretariat/Sidebar.vue'
import SecretaryHeader from '@/components/secretariat/Header.vue'
import SecAdminSidebar from '@/components/secAdmin/Sidebar.vue'
import SecAdminHeader from '@/components/secAdmin/Header.vue'
import DirecteurSidebar from '@/components/directeurMiage/Sidebar.vue'
import DirecteurHeader from '@/components/directeurMiage/Header.vue'
import RespoNiveauSidebar from '@/components/responsableNiveau/Sidebar.vue'
import RespoNiveauHeader from '@/components/responsableNiveau/Header.vue'
import EnseignantSidebar from '@/components/enseignant/Sidebar.vue'
import EnseignantHeader from '@/components/enseignant/Header.vue'
import AdminSidebar from '@/components/admin/Sidebar.vue'
import AdminHeader from '@/components/admin/Header.vue'

const route = useRoute()
const sidebarVisible = ref(false)

const selectedSidebar = computed(() => {
  if (route.path.includes('/sec-admin')) return SecAdminSidebar
  if (route.path.includes('/secretariat')) return SecretarySidebar
  if (route.path.includes('/directeur')) return DirecteurSidebar
  if (route.path.includes('/responsable')) return RespoNiveauSidebar
  if (route.path.includes('/enseignant')) return EnseignantSidebar
  if (route.path.includes('/admin')) return AdminSidebar
  return StudentSidebar
})

const selectedHeader = computed(() => {
  if (route.path.includes('/sec-admin')) return SecAdminHeader
  if (route.path.includes('/secretariat')) return SecretaryHeader
  if (route.path.includes('/directeur')) return DirecteurHeader
  if (route.path.includes('/responsable')) return RespoNiveauHeader
  if (route.path.includes('/enseignant')) return EnseignantHeader
  if (route.path.includes('/admin')) return AdminHeader
  return StudentHeader
})

const headerTitle = computed(() => route.meta.headerTitle || 'Mon Application')
const headerIcon = computed(() => route.meta.headerIcon || ['fas', 'question'])
</script>
