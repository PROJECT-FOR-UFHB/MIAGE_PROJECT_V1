<template>
  <div class="relative min-h-screen font-sans text-gray-800 bg-gray-100">
    <Sidebar />
    <Header />
    <NouvelleDemandeForm />
  </div>
</template>

<script setup>
import Sidebar from '@/components/etudiants/Sidebar.vue'
import Header from '@/components/etudiants/Header.vue'
import NouvelleDemandeForm from '@/components/etudiants/NouvelleDemandeForm.vue'
</script>
