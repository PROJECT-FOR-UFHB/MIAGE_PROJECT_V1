<!-- src/pages/secretariat/Dashboard.vue -->
<template>
  <main class="bg-gray-100 min-h-screen pt-10">

    <div class="max-w-6xl mx-auto bg-white rounded shadow p-6">
      <h2 class="text-xl font-semibold mb-4">Tableau de bord</h2>

        <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="n in 4" :key="n" class="bg-gray-100 p-4 rounded shadow animate-pulse flex flex-col items-center">
            <div class="h-8 w-8 bg-gray-300 rounded-full mb-2"></div>
            <div class="h-4 bg-gray-300 rounded w-1/2 mb-1"></div>
            <div class="h-6 bg-gray-300 rounded w-1/3"></div>
          </div>
        </div>
      <div v-else>
        <!-- Grille de cartes statistiques -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Demandes reçues -->
          <div class="bg-gray-50 p-4 rounded shadow flex flex-col items-center">
            <font-awesome-icon :icon="['fas', 'inbox']" class="text-brandBlue text-3xl mb-2" />
            <p class="text-lg font-semibold">Reçues</p>
            <p class="text-2xl font-bold">{{ stats.total || 0 }}</p>
          </div>
          <!-- Demandes traitées -->
          <div class="bg-gray-50 p-4 rounded shadow flex flex-col items-center">
            <font-awesome-icon :icon="['fas', 'check-circle']" class="text-green-500 text-3xl mb-2" />
            <p class="text-lg font-semibold">Traitées</p>
            <p class="text-2xl font-bold">{{ stats.processed || 0 }}</p>
          </div>
          <!-- Demandes validées -->
          <div class="bg-gray-50 p-4 rounded shadow flex flex-col items-center">
            <font-awesome-icon :icon="['fas', 'thumbs-up']" class="text-green-600 text-3xl mb-2" />
            <p class="text-lg font-semibold">Validées</p>
            <p class="text-2xl font-bold">{{ stats.approved || 0 }}</p>
          </div>
          <!-- Demandes rejetées -->
          <div class="bg-gray-50 p-4 rounded shadow flex flex-col items-center">
            <font-awesome-icon :icon="['fas', 'ban']" class="text-red-600 text-3xl mb-2" />
            <p class="text-lg font-semibold">Rejetées</p>
            <p class="text-2xl font-bold">{{ stats.rejected || 0 }}</p>
          </div>
        </div>

        <!-- Graphiques (optionnels, à implémenter plus tard) -->
        <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-white p-4 rounded shadow">
            <h3 class="text-lg font-semibold mb-4">Demandes par type</h3>
            <div class="h-64 flex items-center justify-center bg-gray-100">
              <p class="text-gray-500">Graphique à venir</p>
            </div>
          </div>

          <div class="bg-white p-4 rounded shadow">
            <h3 class="text-lg font-semibold mb-4">Demandes mensuelles</h3>
            <div class="h-64 flex items-center justify-center bg-gray-100">
              <p class="text-gray-500">Graphique à venir</p>
            </div>
          </div>
        </div>

        <!-- Demandes récentes -->
        <div class="mt-8">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold">Demandes récentes</h3>
            <router-link to="/secretariat/demandes-recus" class="text-blue-500 hover:text-blue-700">
              Voir toutes les demandes
            </router-link>
          </div>

          <div v-if="recentRequests.length === 0" class="bg-gray-50 p-4 rounded text-center text-gray-600">
            Aucune demande récente
          </div>

          <div v-else class="overflow-x-auto">
            <table class="min-w-full bg-white">
              <thead>
                <tr class="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                  <th class="py-3 px-4 text-left">ID</th>
                  <th class="py-3 px-4 text-left">Étudiant</th>
                  <th class="py-3 px-4 text-left">Type</th>
                  <th class="py-3 px-4 text-left">Date</th>
                  <th class="py-3 px-4 text-left">Statut</th>
                  <th class="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody class="text-gray-600 text-sm">
                <tr v-for="request in recentRequests" :key="request.id"
                  class="border-b border-gray-200 hover:bg-gray-50">
                  <td class="py-3 px-4">#{{ request.id }}</td>
                  <td class="py-3 px-4">{{ request.etudiant?.nom }} {{ request.etudiant?.prenom || 'N/A' }}</td>
                  <td class="py-3 px-4">{{ request.type_demande?.nom || 'N/A' }}</td>
                  <td class="py-3 px-4">{{ formatDate(request.created_at) }}</td>
                  <td class="py-3 px-4">
                    <span class="px-2 py-1 rounded text-xs font-semibold" :class="getStatusClass(request.statut)">
                      {{ request.statut }}
                    </span>
                  </td>
                  <td class="py-3 px-4">
                    <button @click="viewRequest(request.id)" class="text-blue-500 hover:text-blue-700 mr-2">
                      Traiter
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { requestService, secretaireService} from '@/services'

const router = useRouter()
const loading = ref(true)
const error = ref('')
const stats = reactive({
  total: 0,
  processed: 0,
  approved: 0,
  rejected: 0
})
const recentRequests = ref([])

// Charger les données lors du montage du composant
onMounted(async () => {
  try {
    await Promise.all([
      loadStatistics(),
      loadRecentRequests()
    ])
  } catch (err) {
    console.error('Erreur lors du chargement des données:', err)
    error.value = 'Erreur lors du chargement des données.'
  } finally {
    loading.value = false
  }
})

// Charger les statistiques
const loadStatistics = async () => {
  try {
    const response = await secretaireService.getSecDashboard()
    if (response.data && response.data.status && response.data.data) {
      const data = response.data.data
      stats.total = data.total_requests || 0
      stats.pending = data.processing_count || 0
      stats.approved = data.validated_count || 0
      stats.rejected = data.rejected_count|| 0
    }
  } catch (err) {
    console.error('Erreur lors du chargement des statistiques:', err)
    throw err
  }
}

// Charger les demandes récentes
const loadRecentRequests = async () => {
  try {
    // On charge les demandes en attente pour les afficher dans le tableau
    const response = await requestService.getPendingRequests()
    if (response.data && response.data.status && response.data.data) {
      // On prend seulement les 5 plus récentes
      recentRequests.value = response.data.data.slice(0, 5)
    }
  } catch (err) {
    console.error('Erreur lors du chargement des demandes récentes:', err)
    throw err
  }
}

// Formater la date
const formatDate = (dateString) => {
  if (!dateString) return 'N/A'

  const date = new Date(dateString)
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date)
}

// Obtenir la classe CSS en fonction du statut
const getStatusClass = (status) => {
  if (!status) return 'bg-gray-200 text-gray-800'

  switch (status.toLowerCase()) {
    case 'en attente':
      return 'bg-yellow-100 text-yellow-800'
    case 'validée':
    case 'approuvée':
      return 'bg-green-100 text-green-800'
    case 'rejetée':
      return 'bg-red-100 text-red-800'
    case 'en cours':
      return 'bg-blue-100 text-blue-800'
    default:
      return 'bg-gray-200 text-gray-800'
  }
}

// Voir et traiter une demande
const viewRequest = (requestId) => {
  router.push(`/secretariat/demandes/${requestId}`)
}
</script>