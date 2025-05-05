<template>
    <main class="bg-gray-100 min-h-screen pt-6">
      <div class="max-w-6xl mx-auto px-4">
  
        <!-- Titre -->
        <div class="mb-6">
          <h1 class="text-2xl font-bold text-gray-800">Logs & sécurité</h1>
          <p class="text-sm text-gray-500">Suivez les connexions et tentatives au système</p>
        </div>
  
        <!-- Filtres -->
        <div class="bg-white rounded shadow p-4 mb-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1">Utilisateur</label>
              <input v-model="filters.utilisateur" type="text" class="input-field" placeholder="Ex : jean.kouassi@...">
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Adresse IP</label>
              <input v-model="filters.ip" type="text" class="input-field" placeholder="Ex : 192.168.1.1">
            </div>
            <div class="flex items-end">
              <button class="bg-brandBlue text-white px-4 py-2 rounded hover:bg-blue-700" @click="filtrer">
                Filtrer
              </button>
            </div>
          </div>
        </div>
  
        <!-- Tableau des logs -->
        <div class="bg-white rounded shadow p-4">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-semibold">Historique des connexions</h2>
            <button class="text-sm text-brandBlue hover:underline">
              ⬇️ Exporter CSV
            </button>
          </div>
  
          <div class="overflow-x-auto">
            <table class="min-w-full text-sm">
              <thead>
                <tr class="text-left bg-gray-100">
                  <th class="px-4 py-2">Utilisateur</th>
                  <th class="px-4 py-2">IP</th>
                  <th class="px-4 py-2">Date</th>
                  <th class="px-4 py-2">Heure</th>
                  <th class="px-4 py-2">Résultat</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="log in logs" :key="log.id" class="border-b hover:bg-gray-50">
                  <td class="px-4 py-2">{{ log.utilisateur }}</td>
                  <td class="px-4 py-2">{{ log.ip }}</td>
                  <td class="px-4 py-2">{{ log.date }}</td>
                  <td class="px-4 py-2">{{ log.heure }}</td>
                  <td class="px-4 py-2">
                    <span :class="log.reussi ? 'text-green-600' : 'text-red-600'">
                      {{ log.reussi ? 'Succès' : 'Échec' }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
  
          <!-- Aucune donnée -->
          <p v-if="logs.length === 0" class="text-center text-gray-500 italic mt-6">Aucune donnée disponible</p>
        </div>
      </div>
    </main>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  // Mock data — à remplacer par un appel API
  const logs = ref([
    { id: 1, utilisateur: 'jean.kouassi@univ.ci', ip: '192.168.1.5', date: '05/05/2025', heure: '10:22', reussi: true },
    { id: 2, utilisateur: 'fatou.traore@univ.ci', ip: '192.168.1.10', date: '05/05/2025', heure: '09:48', reussi: false },
    { id: 3, utilisateur: 'admin@miage.ci', ip: '10.0.0.1', date: '04/05/2025', heure: '22:01', reussi: true }
  ])
  
  const filters = ref({
    utilisateur: '',
    ip: ''
  })
  
  function filtrer() {
    // 🛠 Remplacer ce filtre par un appel API avec les filtres utilisateur/IP
    console.log('Filtrer avec :', filters.value)
    // Ex: await adminService.getLogs(filters.value)
  }
  </script>
  
  <style scoped>
  .input-field {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    outline: none;
  }
  .input-field:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 1px #2563eb;
  }
  </style>
  