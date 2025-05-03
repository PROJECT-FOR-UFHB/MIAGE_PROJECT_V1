<template>
    <main class="bg-gray-100 min-h-screen pt-6">
      <div class="max-w-6xl mx-auto bg-white rounded shadow p-6">
        <h2 class="text-2xl font-semibold mb-4">Suivi & Historique</h2>
  
        <!-- Zone de filtre -->
        <div class="mb-4 flex gap-4">
          <input v-model="search" type="text" placeholder="Recherche par nom ou type..."
                 class="border rounded px-3 py-2 w-1/2" />
          <button @click="exportPDF" class="bg-brandBlue text-white px-4 py-2 rounded hover:bg-blue-700">
            Exporter PDF
          </button>
        </div>
  
        <!-- Tableau des demandes -->
        <div class="overflow-x-auto">
          <table class="min-w-full text-sm text-left">
            <thead class="bg-gray-100">
              <tr>
                <th class="py-2 px-4">ID</th>
                <th class="py-2 px-4">Étudiant</th>
                <th class="py-2 px-4">Type</th>
                <th class="py-2 px-4">Date</th>
                <th class="py-2 px-4">Statut</th>
                <th class="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="d in filteredDemandes" :key="d.id" class="border-b hover:bg-gray-50">
                <td class="py-2 px-4">{{ d.id }}</td>
                <td class="py-2 px-4">{{ d.etudiant.nom }} {{ d.etudiant.prenom }}</td>
                <td class="py-2 px-4">{{ d.type_demande.nom }}</td>
                <td class="py-2 px-4">{{ formatDate(d.created_at) }}</td>
                <td class="py-2 px-4">{{ d.statut }}</td>
                <td class="py-2 px-4">
                  <button @click="voir(d.id)" class="text-blue-600 hover:underline">Voir</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import { financeService } from '@/services'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  const demandes = ref([])
  const search = ref('')
  
  // Appel API
  onMounted(async () => {
    try {
      const res = await financeService.getHistorique() // 📍 API /finance/historique
      demandes.value = res.data.data
    } catch {
      console.error('Erreur chargement historique')
    }
  })
  
  // Filtrage simple
  const filteredDemandes = computed(() => {
    return demandes.value.filter(d =>
      d.etudiant.nom.toLowerCase().includes(search.value.toLowerCase()) ||
      d.type_demande.nom.toLowerCase().includes(search.value.toLowerCase())
    )
  })
  
  // Voir détail
  const voir = (id) => {
    router.push(`/sec-admin/demandes/${id}`)
  }
  
  // Export
  const exportPDF = () => {
    console.log('Export PDF en cours...')
  }
  </script>
  