<template>
    <main class="bg-gray-100 min-h-screen pt-6">
      <div class="max-w-6xl mx-auto bg-white rounded shadow p-6">
        <h2 class="text-2xl font-semibold mb-6">Validation financière</h2>
  
        <ValidationFinanciereTable
          :demandes="demandes"
          :loading="loading"
          :error="error"
          @valider="valider"
          @rejeter="rejeter"
        />
      </div>
    </main>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import ValidationFinanciereTable from '@/components/secAdmin/ValidationFinanciereTable.vue'
  import { financeService } from '@/services' // 📌 ← les appels API sont ici
  
  const loading = ref(true)
  const error = ref('')
  const demandes = ref([])
  
  // Appel API initial 🔁
  onMounted(async () => {
    try {
      const resp = await financeService.getPendingRequests() // 📍 GET /finance/pending-requests
      demandes.value = resp.data.data
    } catch {
      error.value = 'Erreur lors du chargement des demandes'
    } finally {
      loading.value = false
    }
  })
  
  // Valider une demande ✅
  const valider = async (id) => {
    try {
      await financeService.validateRequest(id) // 📍 POST /finance/validate/{id}
      demandes.value = demandes.value.filter(d => d.id !== id)
    } catch {
      error.value = 'Échec de la validation'
    }
  }
  
  // Rejeter une demande ❌
  const rejeter = async (id) => {
    const motif = prompt('Motif du rejet ?')
    if (!motif) return
    try {
      await financeService.rejectRequest(id, motif) // 📍 POST /finance/reject/{id}
      demandes.value = demandes.value.filter(d => d.id !== id)
    } catch {
      error.value = 'Échec du rejet'
    }
  }
  </script>
  