<template>
    <main class="bg-gray-100 min-h-screen pt-6">
      <div class="max-w-6xl mx-auto bg-white p-6 rounded shadow">
        <h2 class="text-xl font-semibold mb-6">Historique complet des demandes</h2>
  
        <!-- 🔍 Filtres -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <input v-model="filters.dateDebut" type="date" class="border px-3 py-2 rounded w-full" />
          <input v-model="filters.dateFin" type="date" class="border px-3 py-2 rounded w-full" />
          <input v-model="filters.type" type="text" placeholder="Type de demande" class="border px-3 py-2 rounded" />
          <select v-model="filters.statut" class="border px-3 py-2 rounded w-full">
            <option value="">Tous les statuts</option>
            <option value="signée">Signée</option>
            <option value="en cours">En cours</option>
            <option value="rejetée">Rejetée</option>
          </select>
        </div>
  
        <!-- 📤 Export -->
        <div class="flex justify-end mb-4">
          <button @click="exportCSV"
            class="bg-green-600 text-white px-4 py-2 rounded mr-2 hover:bg-green-700">Exporter CSV</button>
          <button @click="exportPDF"
            class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Exporter PDF</button>
        </div>
  
        <!-- 📊 Tableau -->
        <div class="overflow-x-auto">
          <table class="min-w-full text-sm text-left border">
            <thead class="bg-gray-100 text-gray-600 uppercase">
              <tr>
                <th class="px-4 py-3">ID</th>
                <th class="px-4 py-3">Étudiant</th>
                <th class="px-4 py-3">Type</th>
                <th class="px-4 py-3">Date</th>
                <th class="px-4 py-3">Statut</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in demandesFiltrees" :key="item.id" class="border-t hover:bg-gray-50">
                <td class="px-4 py-2">{{ item.id }}</td>
                <td class="px-4 py-2">{{ item.etudiant }}</td>
                <td class="px-4 py-2">{{ item.type }}</td>
                <td class="px-4 py-2">{{ item.date }}</td>
                <td class="px-4 py-2">{{ item.statut }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  // import { responsableService } from '@/services'
  
  const demandes = ref([
    { id: 'd723kx', etudiant: 'Yao Marie', type: 'Attestation', date: '2025-05-02', statut: 'signée' },
    { id: 'd811aa', etudiant: 'Zadi Paul', type: 'Relevé', date: '2025-04-21', statut: 'en cours' },
    { id: 'd822cc', etudiant: 'Kouamé Léa', type: 'Attestation', date: '2025-03-15', statut: 'rejetée' },
  ])
  
  const filters = ref({
    dateDebut: '',
    dateFin: '',
    type: '',
    statut: ''
  })
  
  const demandesFiltrees = computed(() => {
    return demandes.value.filter(item => {
      const dateOk =
        (!filters.value.dateDebut || new Date(item.date) >= new Date(filters.value.dateDebut)) &&
        (!filters.value.dateFin || new Date(item.date) <= new Date(filters.value.dateFin))
  
      const typeOk = !filters.value.type || item.type.toLowerCase().includes(filters.value.type.toLowerCase())
      const statutOk = !filters.value.statut || item.statut.toLowerCase() === filters.value.statut.toLowerCase()
  
      return dateOk && typeOk && statutOk
    })
  })
  
  onMounted(async () => {
    // 🔁 Appel API pour récupérer les données historiques
    // const res = await responsableService.getHistorique()
    // demandes.value = res.data.data
  })
  
  // 📤 Exports (fictifs)
  const exportCSV = () => {
    alert('📄 Fonction d’export CSV à implémenter')
  }
  const exportPDF = () => {
    alert('📄 Fonction d’export PDF à implémenter')
  }
  </script>
  