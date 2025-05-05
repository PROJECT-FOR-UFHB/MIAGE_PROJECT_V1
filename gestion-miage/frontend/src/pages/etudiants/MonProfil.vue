<template>
    <main class="bg-gray-100 min-h-screen pt-6">
      <div class="max-w-3xl mx-auto px-4 space-y-8">
  
        <!-- Infos personnelles -->
        <section class="bg-white p-6 rounded shadow">
          <h2 class="text-xl font-semibold mb-4">Mes informations</h2>
  
          <div class="space-y-4">
            <div>
              <label class="text-gray-600 font-medium">Nom</label>
              <p class="text-gray-800">{{ user.nom }}</p>
            </div>
            <div>
              <label class="text-gray-600 font-medium">Prénom</label>
              <p class="text-gray-800">{{ user.prenom }}</p>
            </div>
            <div>
              <label class="text-gray-600 font-medium">Email</label>
              <p class="text-gray-800">{{ user.email }}</p>
            </div>
            <div>
              <label class="text-gray-600 font-medium">Rôle</label>
              <p class="text-gray-800">{{ user.role.lib_role }}</p>
            </div>
          </div>
        </section>
  
        <!-- Sécurité : mot de passe -->
        <section class="bg-white p-6 rounded shadow">
          <h2 class="text-xl font-semibold mb-4">Sécurité</h2>
          <button
            @click="changerMotDePasse"
            class="bg-brandBlue hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded"
          >
            🔒 Modifier le mot de passe
          </button>
        </section>
  
      </div>
    </main>
  </template>
  
  <script setup>
  // import adminService from '@/services/adminService' // 🔌 À activer pour API
  import { ref } from 'vue'
  
  // Simulation des données depuis le localStorage
  const user = ref(JSON.parse(localStorage.getItem('user') || '{}'))
  
  const changerMotDePasse = () => {
    // ❗ Prochainement : ouvrir modal ou naviguer vers page mot de passe
    alert('🔐 Fonction à implémenter prochainement')
  }
  </script>
  