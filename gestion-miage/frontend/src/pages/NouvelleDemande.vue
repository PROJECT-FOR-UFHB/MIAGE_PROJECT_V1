<template>
    <div class="flex flex-col min-h-screen font-sans">
      <!-- Barre horizontale bleue -->
      <Header />
  
      <!-- Contenu principal en flex -->
      <div class="flex flex-1 bg-gray-100">
        <!-- Sidebar blanche -->
        <Sidebar />
  
        <!-- Zone form grise -->
        <main class="flex-1 p-8">
          <h1 class="text-2xl font-bold mb-6 text-brandBlue">
            Nouvelle demande
          </h1>
          <NouvelleDemandeForm />
        </main>
      </div>
    </div>
  </template>
  
  <script setup>
  import Header from '@/components/Header.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import NouvelleDemandeForm from '@/components/NouvelleDemandeForm.vue'
  </script>
  