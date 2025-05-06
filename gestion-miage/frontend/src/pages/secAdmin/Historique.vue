<template>
  <main class="bg-gray-100 min-h-screen pt-6">
    <div class="max-w-6xl mx-auto bg-white rounded shadow p-6">
      <h2 class="text-2xl font-semibold mb-4">Suivi & Historique</h2>

      <!-- 🔍 Zone de filtre -->
      <div class="mb-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <input
          v-model="search"
          type="text"
          placeholder="Recherche par nom ou type..."
          class="border rounded px-3 py-2 w-full sm:w-1/2"
        />
        <button
          @click="exportPDF"
          class="bg-brandBlue text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Exporter PDF
        </button>
      </div>

      <!-- 📄 Tableau des demandes -->
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
            <tr
              v-for="d in filteredDemandes"
              :key="d.id"
              class="border-b hover:bg-gray-50"
            >
              <td class="py-2 px-4">{{ d.id }}</td>
              <td class="py-2 px-4">{{ d.etudiant.nom }} {{ d.etudiant.prenom }}</td>
              <td class="py-2 px-4">{{ d.type_demande.nom }}</td>
              <td class="py-2 px-4">{{ formatDate(d.created_at) }}</td>
              <td class="py-2 px-4">{{ d.statut }}</td>
              <td class="py-2 px-4">
                <button @click="voir(d.id)" class="text-blue-600 hover:underline">Voir</button>
              </td>
            </tr>
            <tr v-if="filteredDemandes.length === 0">
              <td colspan="6" class="text-center text-gray-500 py-4 italic">
                Aucune demande trouvée
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
import { useRouter } from 'vue-router'
// import { financeService } from '@/services' // 🔌 ← à activer lors du branchement API

const router = useRouter()
const demandes = ref([])
const search = ref('')

// 🔧 MOCK temporaire
onMounted(() => {
  demandes.value = [
    {
      id: 'D001',
      etudiant: { nom: 'KOUADIO', prenom: 'Ange' },
      type_demande: { nom: 'Attestation' },
      created_at: '2025-05-01',
      statut: 'Validée'
    },
    {
      id: 'D002',
      etudiant: { nom: 'TRAORÉ', prenom: 'Aminata' },
      type_demande: { nom: 'Lettre' },
      created_at: '2025-04-20',
      statut: 'Rejetée'
    }
  ]

  // 📦 Appel API futur
  // const res = await financeService.getHistorique()
  // demandes.value = res.data.data
})

// 🔍 Filtrage local
const filteredDemandes = computed(() => {
  return demandes.value.filter(d =>
    d.etudiant.nom.toLowerCase().includes(search.value.toLowerCase()) ||
    d.type_demande.nom.toLowerCase().includes(search.value.toLowerCase())
  )
})

// ➤ Navigation vers détails
const voir = (id) => {
  router.push(`/sec-admin/demandes/${id}`)
}

// 📄 Export simulé
const exportPDF = () => {
  console.log('📤 Export PDF simulé')
}

// 🕓 Format de date
const formatDate = (dateStr) => {
  const d = new Date(dateStr)
  return d.toLocaleDateString('fr-FR')
}
</script>
