<template>
  <div class="flex items-center space-x-4">
    <!-- Aperçu en petit -->
    <canvas ref="previewCanvas" class="cursor-pointer border" @click="showModal = true"></canvas>

    <!-- Modale plein écran -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div class="bg-white p-4 rounded shadow-xl relative max-w-[90%] max-h-[90%] overflow-auto">
        <button @click="showModal = false" class="absolute top-2 right-2 text-xl font-bold text-red-600">✕</button>
        <canvas ref="fullCanvas"></canvas>
      </div>
    </div>
    <div class="flex flex-col">
            <span class="font-medium">{{ title }}</span>
                        <!-- Lien de téléchargement -->
            <a :href="src" target="_blank" class="text-red-500 underline">Voir</a>
        </div>

  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import * as pdfjsLib from 'pdfjs-dist/build/pdf'
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  title: String,

})

const previewCanvas = ref(null)
const fullCanvas = ref(null)
const showModal = ref(false)

async function renderPdf(canvasRef, scaleOrWidth) {
const token = sessionStorage.getItem('auth_token')

  try {
    
    const loadingTask = pdfjsLib.getDocument({
      url: props.src,
      httpHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
    const pdf = await loadingTask.promise
    const page = await pdf.getPage(1)

    let scale = scaleOrWidth
    const originalViewport = page.getViewport({ scale: 1 })

    // Si l'argument est un nombre supérieur à 10, on considère que c'est une largeur en pixels
    if (scaleOrWidth > 10) {
      scale = scaleOrWidth / originalViewport.width
    }

    const viewport = page.getViewport({ scale })
    const canvas = canvasRef.value
    const context = canvas.getContext('2d')
    canvas.height = viewport.height
    canvas.width = viewport.width

    await page.render({ canvasContext: context, viewport }).promise
  } catch (error) {
    console.error('Erreur lors du rendu du PDF :', error)
  }
}

onMounted(() => {
  renderPdf(previewCanvas, 200)
})

watch(showModal, (visible) => {
  if (visible) renderPdf(fullCanvas, 1)
})
</script>

<style scoped>
canvas {
  display: block;
  margin: auto;
}
</style>
