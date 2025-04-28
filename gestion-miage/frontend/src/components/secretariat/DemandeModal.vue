<!-- src/components/secretariat/DemandeModal.vue -->
<template>
    <!-- Fond noir transparent derrière le modal -->
    <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <!-- Boîte du modal -->
      <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 class="text-xl font-semibold mb-4">Détails de la demande</h2>
  
        <!-- Contenu des informations -->
        <div v-if="demande">
          <p><strong>Nom étudiant :</strong> {{ demande.nomEtudiant }}</p>
          <p><strong>Niveau :</strong> {{ demande.niveau }}</p>
          <p><strong>Libellé :</strong> {{ demande.libelle }}</p>
          <p><strong>Date :</strong> {{ demande.date }}</p>
        </div>
  
        <!-- Boutons en bas du modal -->
        <div class="mt-6 flex justify-end space-x-4">
          <button @click="fermerModal"
                  class="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition">
            Fermer
          </button>
          <button @click="validerDemande"
                  class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
            Valider
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    demande: {
      type: Object,
      required: true
    }
  })
  
  const emit = defineEmits(['fermer', 'valider'])
  
  function fermerModal() {
    emit('fermer')
  }
  
  function validerDemande() {
    emit('valider')
  }
  </script>
  