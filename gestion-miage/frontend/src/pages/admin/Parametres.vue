<template>
    <main class="bg-gray-100 min-h-screen pt-6">
      <div class="max-w-5xl mx-auto px-4 space-y-8">
  
        <!-- Informations générales du système -->
        <section class="bg-white p-6 rounded shadow">
          <h2 class="text-xl font-semibold mb-4">Informations générales</h2>
          <div class="grid sm:grid-cols-2 gap-4">
            <div>
              <label class="block font-medium mb-1">Nom de l’UFR</label>
              <input v-model="config.ufr" class="input" type="text" />
            </div>
            <div>
              <label class="block font-medium mb-1">Année académique</label>
              <input v-model="config.annee" class="input" type="text" />
            </div>
          </div>
        </section>
  
        <!-- Email système -->
        <section class="bg-white p-6 rounded shadow">
          <h2 class="text-xl font-semibold mb-4">Configuration email</h2>
          <div class="grid sm:grid-cols-2 gap-4">
            <div>
              <label class="block font-medium mb-1">Email expéditeur</label>
              <input v-model="config.email" class="input" type="email" />
            </div>
            <div>
              <label class="block font-medium mb-1">Nom affiché</label>
              <input v-model="config.nomExpediteur" class="input" type="text" />
            </div>
          </div>
        </section>
  
        <!-- Modules activables -->
        <section class="bg-white p-6 rounded shadow">
          <h2 class="text-xl font-semibold mb-4">Modules activés</h2>
          <div class="space-y-3">
            <label class="flex items-center space-x-2">
              <input v-model="config.modules.theme" type="checkbox" />
              <span>Validation de thème</span>
            </label>
            <label class="flex items-center space-x-2">
              <input v-model="config.modules.soutenance" type="checkbox" />
              <span>Module soutenance</span>
            </label>
            <label class="flex items-center space-x-2">
              <input v-model="config.modules.preinscription" type="checkbox" />
              <span>Préinscription en ligne</span>
            </label>
          </div>
        </section>
  
        <!-- Bouton de sauvegarde -->
        <div class="flex justify-end">
          <button @click="enregistrer" class="bg-brandBlue hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded">
            💾 Enregistrer
          </button>
        </div>
  
      </div>
    </main>
  </template>
  
  <script setup>
  // import adminService from '@/services/adminService' // 📌 Pour intégration API plus tard
  import { ref } from 'vue'
  
  // 💡 Mock des données initiales (à remplacer par un fetch)
  const config = ref({
    ufr: 'UFR Mathématiques et Informatique',
    annee: '2024-2025',
    email: 'noreply@ufr-miage.ci',
    nomExpediteur: 'MIAGE Admin',
    modules: {
      theme: true,
      soutenance: false,
      preinscription: true
    }
  })
  
  // 📩 Simulation d’enregistrement (API PUT plus tard)
  const enregistrer = () => {
    console.log('✅ Données sauvegardées (mock) :', config.value)
    // adminService.updateSystemConfig(config.value).then(...)
  }
  </script>
  
  <style scoped>
  .input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #cbd5e1;
    border-radius: 0.375rem;
    background-color: #f9fafb;
  }
  .input:focus {
    outline: none;
    border-color: #3b82f6;
    background-color: #fff;
  }
  </style>
  