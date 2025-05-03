<!-- src/components/secAdmin/ValidationFinanciereTable.vue -->
<template>
    <div>
      <!-- Message d'erreur s'il y a lieu -->
      <div v-if="error" class="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded">
        {{ error }}
      </div>
  
      <!-- Chargement -->
      <div v-if="loading" class="text-center py-10">
        <span class="text-brandBlue">Chargement des demandes...</span>
      </div>
  
      <!-- Aucun résultat -->
      <div v-else-if="demandes.length === 0" class="text-center text-gray-600">
        Aucune demande à traiter.
      </div>
  
      <!-- Tableau -->
      <div v-else>
        <table class="min-w-full text-sm text-left">
          <thead class="bg-gray-100">
            <tr>
              <th class="py-2 px-4">ID</th>
              <th class="py-2 px-4">Étudiant</th>
              <th class="py-2 px-4">Type d’acte</th>
              <th class="py-2 px-4">Montant dû</th>
              <th class="py-2 px-4">Statut</th>
              <th class="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="demande in demandes" :key="demande.id" class="border-b hover:bg-gray-50">
              <td class="py-2 px-4">{{ demande.id }}</td>
              <td class="py-2 px-4">{{ demande.etudiant.nom }} {{ demande.etudiant.prenom }}</td>
              <td class="py-2 px-4">{{ demande.type_demande.nom }}</td>
              <td class="py-2 px-4">{{ demande.montant || 'N/A' }} FCFA</td>
              <td class="py-2 px-4">
                <DemandeStatusBadge :statut="demande.statut_paiement" />
              </td>
              <td class="py-2 px-4">
                <button @click="$emit('valider', demande.id)" class="text-green-600 hover:underline">Valider</button>
                <button @click="$emit('rejeter', demande.id)" class="text-red-600 hover:underline ml-2">Rejeter</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup>
  import DemandeStatusBadge from '@/components/secAdmin/DemandeStatusBadge.vue'
  
  const props = defineProps({
    demandes: Array,
    loading: Boolean,
    error: String
  })
  </script>
  