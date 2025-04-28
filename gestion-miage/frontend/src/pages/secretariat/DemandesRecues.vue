<!-- src/pages/secretariat/DemandesRecues.vue -->
<template>
  <div class="max-w-6xl mx-auto bg-white rounded shadow p-6">
    <h2 class="text-xl font-semibold mb-4">Demandes reçues</h2>
    <table class="w-full border-collapse">
      <thead>
        <tr class="text-left bg-gray-200">
          <th class="p-3 border-b">Numéro demande</th>
          <th class="p-3 border-b">Nom étudiant</th>
          <th class="p-3 border-b">Niveau</th>
          <th class="p-3 border-b">Libellé</th>
          <th class="p-3 border-b">Date</th>
          <th class="p-3 border-b"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(demande, index) in demandes" :key="index" class="hover:bg-gray-100">
          <td class="p-3 border-b">{{ demande.numero }}</td>
          <td class="p-3 border-b">{{ demande.nomEtudiant }}</td>
          <td class="p-3 border-b">{{ demande.niveau }}</td>
          <td class="p-3 border-b">{{ demande.libelle }}</td>
          <td class="p-3 border-b">{{ demande.date }}</td>
          <td class="p-3 border-b">
            <button @click="ouvrirModal(demande)"
              class="bg-brandBlue text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
              Voir détails
            </button>

          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <DemandeModal v-if="demandeSelectionnee" :demande="demandeSelectionnee" @fermer="fermerModal"
  @valider="validerDemande" />
</template>




<script setup>
import { ref } from 'vue'
import DemandeModal from '@/components/secretariat/DemandeModal.vue'
// Liste des demandes (mock pour le moment)
const demandes = ref([
  {
    numero: 'N°AT001',
    nomEtudiant: 'KOUADIO ANGE',
    niveau: 'L1',
    libelle: 'Attestation de fréquentation',
    date: '20/03/2025'
  },

  {
    numero: 'N°AT002',
    nomEtudiant: 'WILLIAMS ANGEL',
    niveau: 'M1',
    libelle: 'Attestation de fréquentation',
    date: '20/03/2025'
  },
  // Tu peux ajouter d'autres demandes ici
])
// Variable pour stocker la demande actuellement sélectionnée
const demandeSelectionnee = ref(null)

// Fonction pour ouvrir le modal
function ouvrirModal(demande) {
  demandeSelectionnee.value = demande
}

// Fonction pour fermer le modal
function fermerModal() {
  demandeSelectionnee.value = null
}

// Fonction pour valider une demande
function validerDemande() {
  if (demandeSelectionnee.value) {
    demandes.value = demandes.value.filter(d => d.numero !== demandeSelectionnee.value.numero)
    demandeSelectionnee.value = null
  }
}
</script>
