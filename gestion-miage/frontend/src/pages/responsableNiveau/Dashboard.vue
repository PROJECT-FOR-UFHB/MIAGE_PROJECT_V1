<template>
    <main class="bg-gray-100 min-h-screen pt-6">
      <div class="max-w-6xl mx-auto">
        
        <!-- Cartes de statistiques -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div class="bg-slate-50 p-4 rounded shadow text-center">
            <font-awesome-icon :icon="['fas', 'spinner']" class="text-yellow-600 text-3xl mb-2" />
            <h2 class="text-lg font-semibold">En cours</h2>
            <p class="text-2xl font-bold">{{ stats.pending }}</p>
          </div>
  
          <div class="bg-slate-50 p-4 rounded shadow text-center">
            <font-awesome-icon :icon="['fas', 'check-circle']" class="text-green-600 text-3xl mb-2" />
            <h2 class="text-lg font-semibold">Terminées</h2>
            <p class="text-2xl font-bold">{{ stats.completed }}</p>
          </div>
  
          <div class="bg-slate-50 p-4 rounded shadow text-center">
            <font-awesome-icon :icon="['fas', 'ban']" class="text-red-600 text-3xl mb-2" />
            <h2 class="text-lg font-semibold">Rejetées</h2>
            <p class="text-2xl font-bold">{{ stats.rejected }}</p>
          </div>
        </div>
      </div>
    </main>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  // import { responsableService } from '@/services' ← à activer quand l'API sera prête
  
  // 📊 Données mockées à remplacer plus tard par un appel API
  const stats = ref({
    pending: 6,
    completed: 12,
    rejected: 3
  })
  
  // Appel API (commenté pour l’instant)
  onMounted(async () => {
    // try {
    //   const res = await responsableService.getDashboardStats()
    //   stats.value = res.data.data
    // } catch (error) {
    //   console.warn('Erreur chargement des stats', error)
    // }
  })
  </script>
  