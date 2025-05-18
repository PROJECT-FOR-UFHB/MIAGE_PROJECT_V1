<template>
    <div class="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <!-- Contenu de la modale -->
      <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
  
        <!-- Titre -->
        <h2 class="text-lg font-semibold mb-4 text-red-600">Rejeter la demande</h2>
  
        <!-- Infos demande -->
        <p class="text-sm mb-2 text-gray-600">
          <strong>Demande n°:</strong> {{ demande.id }} <br />
          <strong>Étudiant :</strong> {{ demande.nom }} {{ demande.prenom }}
        </p>
  
        <!-- Champ motif de rejet -->
        <label class="block mb-2 font-medium text-gray-700">Motif du rejet :</label>
        <textarea
          v-model="motif"
          class="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-1 focus:ring-red-500"
          rows="4"
          placeholder="Expliquer le motif du rejet"
        ></textarea>
  
        <!-- Actions -->
        <div class="flex justify-end mt-4 space-x-2">
          <button
            class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-gray-700"
            @click="$emit('fermer')"
          >
            Annuler
          </button>
          <button
            class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            :disabled="!motif"
            @click="confirmer"
          >
            Confirmer le rejet
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  // Props : la demande sélectionnée
  const props = defineProps({
    demande: {
      type: Object,
      required: true
    }
  })
  
  // Motif du rejet à saisir
  const motif = ref('')
  
  // Événement pour confirmer le rejet et transmettre le motif au parent
  const confirmer = () => {
    if (motif.value.trim() !== '') {
      // 🔁 On envoie le motif au parent via un événement
      emit('confirmer', motif.value)
    }
  }
  
  // Permet au parent d'écouter "confirmer" et "fermer"
  const emit = defineEmits(['fermer', 'confirmer'])
  </script>
  