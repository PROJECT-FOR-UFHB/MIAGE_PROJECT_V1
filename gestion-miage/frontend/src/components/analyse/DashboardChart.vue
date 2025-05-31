<!-- src/components/DashboardChart.vue -->
<template>
  <div class="bg-white shadow rounded p-6">
    <h2 class="text-xl font-semibold mb-4">Statistiques des demandes</h2>
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps({
  stats: {
    type: Object,
    required: true
  }
})

const chartData = {
  labels: ['En traitement', 'Validées', 'Rejetées'],
  datasets: [
    {
      label: 'Demandes',
      backgroundColor: ['#3b82f6', '#10b981', '#ef4444'],
      data: [
        props.stats.processing_count,
        props.stats.validated_count,
        props.stats.rejected_count
      ]
    }
  ]
}

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      callbacks: {
        label: (context) => `${context.raw} demandes`
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1
      }
    }
  }
}
</script>
