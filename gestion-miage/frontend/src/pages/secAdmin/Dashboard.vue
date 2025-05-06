<template>
  <main class="bg-gray-100 min-h-screen pt-6">
    <div class="max-w-6xl mx-auto px-4 space-y-6">

      <!-- ✅ Cartes KPI -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-yellow-100 p-4 rounded shadow text-center">
          <p class="text-lg font-semibold">En attente</p>
          <p class="text-3xl font-bold text-yellow-700">{{ kpi.pending }}</p>
        </div>
        <div class="bg-green-100 p-4 rounded shadow text-center">
          <p class="text-lg font-semibold">Validées</p>
          <p class="text-3xl font-bold text-green-700">{{ kpi.validated }}</p>
        </div>
        <div class="bg-red-100 p-4 rounded shadow text-center">
          <p class="text-lg font-semibold">Rejetées</p>
          <p class="text-3xl font-bold text-red-700">{{ kpi.rejected }}</p>
        </div>
      </div>

      <!-- ✅ Zone graphique -->
      <div class="bg-white p-4 rounded shadow">
        <h3 class="text-lg font-semibold mb-2">Répartition des demandes</h3>
        <p class="text-center text-gray-500 italic">
          [📊 Graphique camembert ici - en attente de données/API/statistiques]
        </p>
      </div>

    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// import { financeService } from '@/services' // 🔌 Décommente lors de l'intégration API

// Données mockées
const kpi = ref({
  pending: 5,
  validated: 8,
  rejected: 2
})

// Appel API futur (décommenter à l’intégration)
onMounted(async () => {
  // try {
  //   const res = await financeService.getDashboardStats()
  //   kpi.value = res.data.data
  // } catch (err) {
  //   console.warn('Erreur chargement stats dashboard', err)
  // }
})
</script>
