<template>
    <main class="bg-gray-100 min-h-screen pt-6 px-4">
      <div class="max-w-6xl mx-auto">
        <h1 class="text-xl font-semibold mb-4">Historique des recommandations & thèmes</h1>
  
        <!-- Filtres -->
        <div class="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          <input v-model="filters.etudiant" type="text" class="input-style" placeholder="Étudiant">
          <select v-model="filters.type" class="input-style">
            <option value="">Tous types</option>
            <option value="lettre">Lettre</option>
            <option value="theme">Thème</option>
          </select>
          <select v-model="filters.statut" class="input-style">
            <option value="">Tous statuts</option>
            <option value="attente">En attente</option>
            <option value="transmise">Transmise</option>
            <option value="rejetee">Rejetée</option>
          </select>
          <button @click="filtrer" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Appliquer
          </button>
        </div>
  
        <!-- Tableau -->
        <div class="bg-white rounded shadow overflow-x-auto">
          <table class="min-w-full text-sm">
            <thead class="bg-gray-200">
              <tr>
                <th class="px-4 py-2 text-left">Étudiant</th>
                <th class="px-4 py-2 text-left">Type</th>
                <th class="px-4 py-2 text-left">Date</th>
                <th class="px-4 py-2 text-left">Statut</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in historiqueFiltre" :key="item.id" class="border-b hover:bg-gray-50">
                <td class="px-4 py-2">{{ item.etudiant }}</td>
                <td class="px-4 py-2 capitalize">{{ item.type }}</td>
                <td class="px-4 py-2">{{ item.date }}</td>
                <td class="px-4 py-2">
                  <span :class="badgeClass(item.statut)">
                    {{ item.statut }}
                  </span>
                </td>
              </tr>
              <tr v-if="!historiqueFiltre.length">
                <td colspan="4" class="text-center py-6 text-gray-400">Aucune donnée</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  // États filtres
  const filters = ref({ etudiant: '', type: '', statut: '' })
  
  // 🔄 Données simulées en attendant l'API
  const historique = ref([
    { id: 1, etudiant: 'Koffi Nadia', type: 'lettre', date: '2025-05-01', statut: 'transmise' },
    { id: 2, etudiant: 'Traoré Amadou', type: 'theme', date: '2025-04-25', statut: 'attente' },
    { id: 3, etudiant: 'Yao Kevin', type: 'lettre', date: '2025-03-14', statut: 'rejetee' }
  ])
  
  // 🎯 Application des filtres
  const historiqueFiltre = computed(() => {
    return historique.value.filter(item =>
      (filters.value.etudiant === '' || item.etudiant.toLowerCase().includes(filters.value.etudiant.toLowerCase())) &&
      (filters.value.type === '' || item.type === filters.value.type) &&
      (filters.value.statut === '' || item.statut === filters.value.statut)
    )
  })
  
  const filtrer = () => {
    // Cette méthode est juste là pour trigger la computed
  }
  
  const badgeClass = statut => {
    if (statut === 'transmise') return 'bg-green-100 text-green-700 px-2 py-1 rounded text-xs'
    if (statut === 'rejetee') return 'bg-red-100 text-red-700 px-2 py-1 rounded text-xs'
    return 'bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs'
  }
  </script>
  
  <style scoped>
  .input-style {
    padding: 0.5rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    width: 100%;
  }
  </style>
  