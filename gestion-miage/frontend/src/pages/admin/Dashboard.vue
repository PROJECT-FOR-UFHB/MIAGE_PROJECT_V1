<template>
    <main class="bg-gray-100 min-h-screen pt-6">
      <div class="max-w-7xl mx-auto px-4">
  
        <!-- 📊 Cartes de statistiques système -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div class="bg-white p-6 rounded shadow text-center">
            <font-awesome-icon :icon="['fas', 'users']" class="text-brandBlue text-3xl mb-2" />
            <h3 class="text-lg font-semibold text-gray-700">Utilisateurs actifs</h3>
            <p class="text-2xl font-bold text-brandBlue">{{ stats.utilisateurs }}</p>
          </div>
          <div class="bg-white p-6 rounded shadow text-center">
            <font-awesome-icon :icon="['fas', 'user-tag']" class="text-brandGreen text-3xl mb-2" />
            <h3 class="text-lg font-semibold text-gray-700">Rôles définis</h3>
            <p class="text-2xl font-bold text-brandGreen">{{ stats.roles }}</p>
          </div>
          <div class="bg-white p-6 rounded shadow text-center">
            <font-awesome-icon :icon="['fas', 'database']" class="text-yellow-600 text-3xl mb-2" />
            <h3 class="text-lg font-semibold text-gray-700">Dernière sauvegarde</h3>
            <p class="text-md font-medium text-gray-800">{{ stats.derniere_backup }}</p>
          </div>
          <div class="bg-white p-6 rounded shadow text-center">
            <font-awesome-icon :icon="['fas', 'wifi']" class="text-red-600 text-3xl mb-2" />
            <h3 class="text-lg font-semibold text-gray-700">Connexions récentes</h3>
            <p class="text-2xl font-bold text-red-600">{{ stats.connexions }}</p>
          </div>
        </div>
  
        <!-- 🛠️ Zone d’alertes système -->
        <div class="bg-white p-6 rounded shadow">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Alertes système</h2>
          <ul class="text-sm text-red-600 space-y-2 list-disc pl-6">
            <li>⚠️ 3 erreurs 500 détectées le 04/05 à 13h12</li>
            <li>⚠️ Le module "Préinscription" n’a pas été configuré</li>
            <li>⚠️ Aucune sauvegarde automatique depuis 7 jours</li>
          </ul>
  
          <!-- ✅ Ajouter plus tard un bouton pour relancer les diagnostics -->
          <div class="mt-4">
            <button class="bg-brandBlue text-white px-4 py-2 rounded hover:bg-blue-700">
              Lancer un diagnostic
            </button>
          </div>
        </div>
  
      </div>
    </main>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  // 💾 Mock des statistiques système
  const stats = ref({
    utilisateurs: 57,
    roles: 6,
    derniere_backup: '03/05/2025 à 22:41',
    connexions: 124
  })
  
  // 🧠 Appel API futur
  // onMounted(async () => {
  //   const res = await adminService.getDashboardStats()
  //   stats.value = res.data
  // })
  </script>
  