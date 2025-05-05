<template>
    <main class="bg-gray-100 min-h-screen pt-6">
      <div class="max-w-7xl mx-auto px-4">
        <h1 class="text-2xl font-semibold mb-6">Mes recommandations / thèmes</h1>
  
        <!-- 🔎 Filtres -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <input v-model="filters.etudiant" type="text" placeholder="Nom de l’étudiant" class="input" />
          <select v-model="filters.type" class="input">
            <option value="">Tous types</option>
            <option value="Lettre">Lettre</option>
            <option value="Thème">Thème</option>
          </select>
          <select v-model="filters.statut" class="input">
            <option value="">Tous statuts</option>
            <option value="Transmise">Transmise</option>
            <option value="En attente">En attente</option>
            <option value="Rejetée">Rejetée</option>
          </select>
          <input v-model="filters.date" type="date" class="input" />
        </div>
  
        <!-- 🧾 Tableau -->
        <div class="bg-white rounded shadow p-4 overflow-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50 text-left">
              <tr>
                <th class="px-4 py-2">ID</th>
                <th class="px-4 py-2">Étudiant</th>
                <th class="px-4 py-2">Type</th>
                <th class="px-4 py-2">Date</th>
                <th class="px-4 py-2">Statut</th>
                <th class="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr
                v-for="rec in filteredRecommandations"
                :key="rec.id"
              >
                <td class="px-4 py-2">{{ rec.id }}</td>
                <td class="px-4 py-2">{{ rec.etudiant }}</td>
                <td class="px-4 py-2">{{ rec.type }}</td>
                <td class="px-4 py-2">{{ rec.date }}</td>
                <td class="px-4 py-2">{{ rec.statut }}</td>
                <td class="px-4 py-2">
                  <button class="text-blue-600 hover:underline" @click="voir(rec.id)">Voir</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  // ⚠️ MOCK TEMPORAIRE (remplacer avec API plus tard)
  const recommandations = ref([
    { id: 'R4001', etudiant: 'Fofana I.', type: 'Lettre', date: '2025-05-02', statut: 'Transmise' },
    { id: 'T4003', etudiant: 'Ahoua K.', type: 'Thème', date: '2025-04-29', statut: 'En attente' },
    { id: 'R4004', etudiant: 'Koffi Z.', type: 'Lettre', date: '2025-04-28', statut: 'Rejetée' }
  ])
  
  // Filtres utilisateurs
  const filters = ref({
    etudiant: '',
    type: '',
    statut: '',
    date: ''
  })
  
  // Filtrage dynamique des résultats
  const filteredRecommandations = computed(() => {
    return recommandations.value.filter(rec => {
      return (
        (filters.value.etudiant === '' || rec.etudiant.toLowerCase().includes(filters.value.etudiant.toLowerCase())) &&
        (filters.value.type === '' || rec.type === filters.value.type) &&
        (filters.value.statut === '' || rec.statut === filters.value.statut) &&
        (filters.value.date === '' || rec.date === filters.value.date)
      )
    })
  })
  
  const voir = (id) => {
    alert(`Voir les détails ou le document pour la demande ${id}`)
    // Exemple : router.push(`/enseignant/recommandation/${id}`)
  }
  </script>
  
  <style scoped>
  .input {
    @apply border border-gray-300 rounded px-3 py-2 w-full;
  }
  </style>
  