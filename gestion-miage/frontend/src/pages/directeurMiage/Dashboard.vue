<template>
  <main class="bg-gray-100 min-h-screen pt-6">
    <div class="max-w-6xl mx-auto space-y-6">
      <!-- Cartes KPI dynamiques -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-white shadow rounded p-4 text-center">
          <p class="text-gray-600">📄 En traitement</p>
          <p class="text-3xl font-bold text-brandBlue">{{ stats.processing_count }}</p>
        </div>
        <div class="bg-white shadow rounded p-4 text-center">
          <p class="text-gray-600">✅ Validées</p>
          <p class="text-3xl font-bold text-green-600">{{ stats.validated_count }}</p>
        </div>
        <div class="bg-white shadow rounded p-4 text-center">
          <p class="text-gray-600">❌ Rejetées</p>
          <p class="text-3xl font-bold text-red-500">{{ stats.rejected_count }}</p>
        </div>
        <TimeStats v-if="!loading" :stats="stats" />
      </div>

    </div>
  </main>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import directeurMiService from '@/services/directeurMiService'
import TimeStats from '@/components/analyse/TimeStats.vue'

const stats = ref({
  total_requests: 0,
  rejected_count: 0,
  processing_count: 0,
  validated_count: 0,
  average_time: 0,
  user: {}
})

const error = ref('')
const loading = ref(true)

onMounted(async () => {
  loading.value = true
  try {
    const res = await directeurMiService.getDashboard()
    if (res.data?.status) {
      const data = res.data.data
      stats.value.total_requests = data.total_requests || 0
      stats.value.processing_count = data.processing_count || 0
      stats.value.validated_count = data.validated_count || 0
      stats.value.rejected_count = data.rejected_count|| 0
      stats.value.average_time = data.average_time || 0

      console.log(stats.value);

    } else {
      error.value = 'Impossible de charger les statistiques.'
    }
  } catch (err) {
    error.value = 'Erreur lors du chargement.'
    console.error(err)
  } finally {
    loading.value = false
  }
})
</script>
