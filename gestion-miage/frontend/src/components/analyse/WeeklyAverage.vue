<template>
  <div class="bg-white shadow rounded p-4 mt-6" style="height: 300px;">
    <h2 class="text-lg font-bold text-gray-700 mb-4">Temps moyen de traitement par semaine</h2>
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps({
  weeklyData: {
    type: Array,
    required: true
  }
})

const chartData = computed(() => {
  return {
    labels: props.weeklyData.map(w => `Semaine ${w.week}`),
    datasets: [
      {
        label: 'Temps moyen (heures)',
        backgroundColor: '#4F46E5',
        borderRadius: 4,
        data: props.weeklyData.map(w => w.avg_duration)
      }
    ]
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: true,
      text: 'Temps moyen par semaine'
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Heures'
      }
    },
    x: {
      title: {
        display: true,
        text: 'Semaines'
      }
    }
  }
}
</script>
