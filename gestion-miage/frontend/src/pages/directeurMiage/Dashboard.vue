<template>
    <main class="bg-gray-100 min-h-screen pt-6">
      <div class="max-w-6xl mx-auto space-y-6">
  
        <!-- ✅ Cartes KPI (Mock pour l’instant) -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-white shadow rounded p-4 text-center">
            <p class="text-gray-600">📄 En attente de signature</p>
            <p class="text-3xl font-bold text-brandBlue">{{ kpi.pending }}</p>
          </div>
          <div class="bg-white shadow rounded p-4 text-center">
            <p class="text-gray-600">✅ Signées</p>
            <p class="text-3xl font-bold text-green-600">{{ kpi.signed }}</p>
          </div>
          <div class="bg-white shadow rounded p-4 text-center">
            <p class="text-gray-600">❌ Rejetées</p>
            <p class="text-3xl font-bold text-red-500">{{ kpi.rejected }}</p>
          </div>
        </div>
  
        <!-- 📊 Mini graphique (composant séparé à venir) -->
        <div class="bg-white shadow rounded p-6">
          <p class="text-lg font-semibold mb-4">Répartition des types d'actes</p>
          <RepartitionChart /> <!-- 🎯 Composant graphique à faire plus tard -->
        </div>
  
      </div>
    </main>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  // import { directeurService } from '@/services' ← À ajouter quand l’API sera dispo
  import RepartitionChart from '@/components/directeurMiage/RepartitionChart.vue' // composant graphique à faire
  
  // 🔄 Mock data
  const kpi = ref({
    pending: 6,
    signed: 14,
    rejected: 3
  })
  
  // ⏳ Plus tard : charger les vrais stats via API
  onMounted(async () => {
    // const res = await directeurService.getDashboardStats()
    // kpi.value = res.data
  })
  </script>
  