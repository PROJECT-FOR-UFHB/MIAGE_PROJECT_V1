<template>
    <!-- On applique un fond gris clair (bg-gray-100 ou 200) -->
    <div class="relative min-h-screen font-sans text-gray-800 bg-gray-100">
      <Sidebar />
      <Header />
      <NouvelleDemandeForm />
    </div>
  </template>
  
  <script setup>
  import Sidebar from '../components/Sidebar.vue'
  import Header from '../components/Header.vue'
  import NouvelleDemandeForm from '../components/NouvelleDemandeForm.vue'
  </script>
  