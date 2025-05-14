<!-- src/pages/etudiants/EspaceEtudiant.vue -->
<template>
  <main class="bg-gray-100 min-h-screen pt-10 px-4 pb-10">

    <div>
      <!-- Section des statistiques -->
      <div class="max-w-6xl mx-auto bg-white rounded shadow p-6 mb-6">
        <h2 class="text-xl font-semibold mb-4">Tableau de bord</h2>

        <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="n in 4" :key="n" class="bg-gray-100 p-4 rounded shadow animate-pulse flex flex-col items-center">
            <div class="h-8 w-8 bg-gray-300 rounded-full mb-2"></div>
            <div class="h-4 bg-gray-300 rounded w-1/2 mb-1"></div>
            <div class="h-6 bg-gray-300 rounded w-1/3"></div>
          </div>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Demandes en attente -->
          <div class="bg-gray-50 p-4 rounded shadow flex flex-col items-center">
            <font-awesome-icon :icon="['fas', 'hourglass-half']" class="text-brandBlue text-3xl mb-2" />
            <p class="text-lg font-semibold">En attente</p>
            <p class="text-2xl font-bold">{{ stats.pending || 0 }}</p>
          </div>
          <!-- Demandes passées -->
          <div class="bg-gray-50 p-4 rounded shadow flex flex-col items-center">
            <font-awesome-icon :icon="['fas', 'history']" class="text-gray-600 text-3xl mb-2" />
            <p class="text-lg font-semibold">Passées</p>
            <p class="text-2xl font-bold">{{ stats.total || 0 }}</p>
          </div>
          <!-- Demandes validées -->
          <div class="bg-gray-50 p-4 rounded shadow flex flex-col items-center">
            <font-awesome-icon :icon="['fas', 'check-circle']" class="text-green-500 text-3xl mb-2" />
            <p class="text-lg font-semibold">Validées</p>
            <p class="text-2xl font-bold">{{ stats.approved || 0 }}</p>
          </div>
          <!-- Demandes rejetées -->
          <div class="bg-gray-50 p-4 rounded shadow flex flex-col items-center">
            <font-awesome-icon :icon="['fas', 'ban']" class="text-red-500 text-3xl mb-2" />
            <p class="text-lg font-semibold">Rejetées</p>
            <p class="text-2xl font-bold">{{ stats.rejected || 0 }}</p>
          </div>
        </div>
      </div>

      <!-- Section des demandes récentes -->
      <div class="max-w-6xl mx-auto bg-white rounded shadow p-6">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-semibold">Vos demandes récentes</h2>
          <router-link to="/etudiants/nouvelle-demande"
            class="bg-brandBlue text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors inline-flex items-center">
            <font-awesome-icon :icon="['fas', 'file-alt']" class="mr-2" />
            Nouvelle demande
          </router-link>
        </div>

        <div v-if="loading" class="overflow-x-auto animate-pulse">
          <table class="min-w-full bg-white">
            <thead>
              <tr class="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th class="py-3 px-4 text-left">ID Demande</th>
                <th class="py-3 px-4 text-left">Type de demande</th>
                <th class="py-3 px-4 text-left">Pour l'année</th>
                <th class="py-3 px-4 text-left">Statut</th>
                <th class="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="n in 5" :key="n" class="border-b border-gray-200">
                <td class="py-3 px-4">
                  <div class="h-4 bg-gray-300 rounded w-20"></div>
                </td>
                <td class="py-3 px-4">
                  <div class="h-4 bg-gray-300 rounded w-32"></div>
                </td>
                <td class="py-3 px-4">
                  <div class="h-4 bg-gray-300 rounded w-24"></div>
                </td>
                <td class="py-3 px-4">
                  <div class="h-4 bg-gray-300 rounded w-16"></div>
                </td>
                <td class="py-3 px-4">
                  <div class="h-4 bg-gray-300 rounded w-12"></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-else-if="requests.length === 0" class="text-center py-8 bg-gray-50 rounded">
          <p class="text-gray-600">Aucune demande trouvée</p>
          <router-link to="/etudiants/nouvelle-demande"
            class="mt-4 bg-brandBlue text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors inline-flex items-center">
            Créer votre première demande
          </router-link>
        </div>

        <div v-else>
          <div class="overflow-x-auto">
            <table class="min-w-full bg-white">
              <thead>
                <tr class="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                  <th class="py-3 px-4 text-left">ID Demande</th>
                  <th class="py-3 px-4 text-left">Type de demande</th>
                  <th class="py-3 px-4 text-left">Pour l'année</th>
                  <th class="py-3 px-4 text-left">Statut</th>
                  <th class="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody class="text-gray-600 text-sm">
                <tr v-for="request in requests" :key="request.id" class="border-b border-gray-200 hover:bg-gray-50">
                  <td class="py-3 px-4">{{ request.id_demande }}</td>
                  <td class="py-3 px-4">{{ request.type_de_demande?.lib_type_de_demande || 'N/A' }}</td>
                  <td class="py-3 px-4">{{ formatDate(request.created_at) }}</td>
                  <td class="py-3 px-4">
                    <span class="px-2 py-1 rounded text-xs font-semibold" :class="getStatusClass(request.statut)">
                      {{ request.statut.statut }}
                    </span>
                  </td>
                  <td class="py-3 px-4">
                    <button @click="viewRequest(request.id_demande)" class="text-blue-500 hover:text-blue-700 mr-2">
                      Voir
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="mt-4 flex justify-center">
            <button @click="loadMoreRequests"
              class="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
              v-if="hasMoreRequests" :disabled="loading">
              Charger plus
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { requestService, studentService } from '@/services'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(true)
const requests = ref([])
const stats = reactive({
  total: 0,
  pending: 0,
  approved: 0,
  rejected: 0
})
const currentPage = ref(1)
const hasMoreRequests = ref(false)

// Charger les données lors du montage du composant
onMounted(async () => {
  try {
    await Promise.all([
      loadDashboard(),
      loadRequests()
    ])
  } catch (error) {
    console.error('Erreur lors du chargement des données:', error)
  } finally {
    loading.value = false
  }
})

// Charger les données du tableau de bord
const loadDashboard = async () => {
  try {
    const response = await studentService.getDashboard()
    if (response.data && response.data.status && response.data.data) {
      const data = response.data.data
      stats.total = data.total_requests || 0
      stats.pending = data.pending_requests || 0
      stats.approved = data.approved_requests || 0
      stats.rejected = data.rejected_requests || 0
    }
  } catch (error) {
    console.error('Erreur lors du chargement du tableau de bord:', error)
  }
}

// Charger les demandes
const loadRequests = async () => {
  try {
    const response = await requestService.getAllRequests()
    if (response.data && response.data.status && response.data.data) {
      requests.value = response.data.data

      // Vérifier s'il y a plus de demandes à charger
      hasMoreRequests.value = requests.value.length >= 10
    }
  } catch (error) {
    console.error('Erreur lors du chargement des demandes:', error)
  }
}

// Charger plus de demandes
const loadMoreRequests = async () => {
  if (loading.value) return

  loading.value = true
  currentPage.value++

  try {
    // Cette API devrait prendre en compte la pagination
    const response = await requestService.getAllRequests(currentPage.value)
    if (response.data && response.data.status && response.data.data) {
      const newRequests = response.data.data
      requests.value.push(...newRequests)

      // Vérifier s'il y a plus de demandes à charger
      hasMoreRequests.value = newRequests.length >= 10
    }
  } catch (error) {
    console.error('Erreur lors du chargement des demandes supplémentaires:', error)
  } finally {
    loading.value = false
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

  switch (status) {
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

// Voir une demande spécifique
const viewRequest = (requestId) => {
  router.push(`/etudiants/demandes/${requestId}`)
}
</script>