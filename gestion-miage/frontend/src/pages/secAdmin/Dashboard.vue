<!-- src/pages/secAdmin/Dashboard.vue -->
<template>
    <main class="bg-gray-100 min-h-screen pt-6">
      <div class="max-w-6xl mx-auto">
        <!-- Cartes KPI -->
        <DashboardCards :stats="kpi" />
  
        <!-- Graphique -->
        <RepartitionChart />
      </div>
    </main>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import DashboardCards from '@/components/secAdmin/DashboardCards.vue'
  import RepartitionChart from '@/components/secAdmin/RepartitionChart.vue'
 // import { financeService } from '@/services' // ← Appel API
  
  // États locaux
  const kpi = ref({
    pending: 0,
    validated: 0,
    rejected: 0
  })
  
  // Appel API simulé pour charger les statistiques du dashboard
  onMounted(async () => {
    try {
      const res = await financeService.getDashboardStats() // 📍 ← API à définir côté backend
      if (res.data?.data) {
        kpi.value = res.data.data
      }
    } catch (err) {
      console.warn('Erreur chargement stats dashboard', err)
    }
  })
  </script>
  