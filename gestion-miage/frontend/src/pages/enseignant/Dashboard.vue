<template>
  <main class="bg-gray-100 min-h-screen pt-20">
    <div class="max-w-6xl mx-auto px-4">

      <!-- Cartes KPI -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div class="bg-white p-6 rounded shadow text-center">
          <font-awesome-icon :icon="['fas', 'pen-nib']" class="text-blue-500 text-3xl mb-2" />
          <h3 class="text-lg font-semibold">Recommandations à rédiger</h3>
          <p class="text-2xl font-bold text-blue-700">{{ stats.recos }}</p>
        </div>
        <div class="bg-white p-6 rounded shadow text-center">
          <font-awesome-icon :icon="['fas', 'book-open']" class="text-green-500 text-3xl mb-2" />
          <h3 class="text-lg font-semibold">Thèmes à valider</h3>
          <p class="text-2xl font-bold text-green-700">{{ stats.themes }}</p>
        </div>
        <div class="bg-white p-6 rounded shadow text-center">
          <font-awesome-icon :icon="['fas', 'check-circle']" class="text-gray-600 text-3xl mb-2" />
          <h3 class="text-lg font-semibold">Demandes traitées</h3>
          <p class="text-2xl font-bold text-gray-800">{{ stats.traitées }}</p>
        </div>
      </div>


    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// import { enseignantService } from '@/services' // 🔌 À activer quand l’API sera dispo

// 🧪 Données simulées
const stats = ref({
  recos: 4,
  themes: 2,
  traitées: 9
})

// onMounted(async () => {
//   const res = await enseignantService.getDashboardStats()
//   stats.value = res.data
// })
</script>