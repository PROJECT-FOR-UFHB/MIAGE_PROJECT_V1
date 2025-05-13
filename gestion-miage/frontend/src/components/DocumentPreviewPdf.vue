<template>
  <div class="flex items-center space-x-4">
    <!-- Aperçu miniature du PDF -->
    <canvas ref="canvasMiniature" class="cursor-pointer border" @click="afficherModale = true"></canvas>

    <!-- Modale affichant le PDF en plein écran -->
    <div v-if="afficherModale" class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div class="bg-white p-4 rounded shadow-xl relative max-w-[90%] max-h-[90%] overflow-auto">
        <button @click="afficherModale = false" class="absolute top-2 right-2 text-xl font-bold text-red-600">✕</button>
        <canvas ref="canvasPleinEcran"></canvas>
      </div>
    </div>

    <!-- Informations et lien -->
    <div class="flex flex-col">
      <span class="font-medium">{{ title }}</span>
      <a :href="helpers.getFileUrl(props.fichier_path)" target="_blank" class="text-red-500 underline">Voir</a>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import * as pdfjsLib from 'pdfjs-dist/build/pdf'
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import { helpers } from '@/services'

// Configuration du worker PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl

// Définition des props attendues (URL du fichier et titre)
const props = defineProps({
  id_piece: {
    type: String,
    required: true,
  },
  title: String,
  fichier_path: String
})

// Références aux balises <canvas>
const canvasMiniature = ref(null)       // Aperçu miniature
const canvasPleinEcran = ref(null)      // Affichage en plein écran
const afficherModale = ref(false)       // Contrôle d'affichage de la modale

/**
 * Fonction pour rendre la première page d'un PDF sur un canvas donné
 * @param {Ref} refCanvas - Référence du canvas à dessiner
 * @param {Number} echelleOuLargeur - Soit un facteur d’échelle (ex: 1), soit une largeur cible (ex: 200px)
 */
async function afficherPdf(refCanvas, echelleOuLargeur) {
  const token = sessionStorage.getItem('auth_token') // Jeton d’authentification (Bearer)

  try {
    // Chargement du document PDF avec en-tête Authorization
    const chargement = pdfjsLib.getDocument({
      url: helpers.getCorsUrl(props.id_piece),
      httpHeaders: {
        Authorization: `Bearer ${token}`
      }
    })

    const pdf = await chargement.promise
    const premierePage = await pdf.getPage(1)

    // Calcule l’échelle si c’est une largeur donnée
    let echelle = echelleOuLargeur
    const vueInitiale = premierePage.getViewport({ scale: 1 })

    if (echelleOuLargeur > 10) {
      echelle = echelleOuLargeur / vueInitiale.width
    }

    const vue = premierePage.getViewport({ scale: echelle })
    const canvas = refCanvas.value
    const contexte = canvas.getContext('2d')
    canvas.height = vue.height
    canvas.width = vue.width

    // Rendu de la page sur le canvas
    await premierePage.render({ canvasContext: contexte, viewport: vue }).promise
  } catch (erreur) {
    console.error('Erreur lors du rendu du PDF :', erreur)
  }
}

// Affiche la miniature au chargement
onMounted(() => {
  afficherPdf(canvasMiniature, 200) // 200px de largeur
})

// Affiche le PDF en grand quand la modale s’ouvre
watch(afficherModale, (visible) => {
  if (visible) afficherPdf(canvasPleinEcran, 1) // Échelle 1
})
</script>

<style scoped>
canvas {
  display: block;
  margin: auto;
}
</style>
