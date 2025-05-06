<template>
  <main class="bg-gray-100 min-h-screen pt-6">
    <div class="max-w-6xl mx-auto bg-white rounded shadow p-6">
      <h2 class="text-2xl font-semibold mb-6">Validation financière</h2>

      <!-- Message d'erreur -->
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
            <tr
              v-for="demande in demandes"
              :key="demande.id"
              class="border-b hover:bg-gray-50"
            >
              <td class="py-2 px-4">{{ demande.id }}</td>
              <td class="py-2 px-4">{{ demande.etudiant }}</td>
              <td class="py-2 px-4">{{ demande.libelle }}</td>
              <td class="py-2 px-4">{{ demande.montant || 'N/A' }} FCFA</td>
              <td class="py-2 px-4">
                <span
                  :class="{
                    'text-yellow-600 font-semibold': demande.statut === 'En attente',
                    'text-green-600 font-semibold': demande.statut === 'Validée',
                    'text-red-600 font-semibold': demande.statut === 'Rejetée'
                  }"
                >
                  {{ demande.statut }}
                </span>
              </td>
              <td class="py-2 px-4">
                <button
                  @click="valider(demande.id)"
                  class="text-green-600 hover:underline"
                >
                  Valider
                </button>
                <button
                  @click="rejeter(demande.id)"
                  class="text-red-600 hover:underline ml-2"
                >
                  Rejeter
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'

const loading = ref(false)
const error = ref('')

// 🔧 Données simulées (mock)
const demandes = ref([
  {
    id: 1,
    etudiant: 'Kouadio Ange',
    libelle: 'Attestation',
    montant: 3500,
    statut: 'En attente'
  },
  {
    id: 2,
    etudiant: 'Traoré A.',
    libelle: 'Lettre recommandation',
    montant: 0,
    statut: 'En attente'
  }
])

// ✅ Validation
const valider = (id) => {
  const d = demandes.value.find(d => d.id === id)
  if (d) d.statut = 'Validée'
  alert(`✅ Demande ${id} validée`)
}

// ❌ Rejet
const rejeter = (id) => {
  const motif = prompt('Motif du rejet ?')
  if (!motif) return
  const d = demandes.value.find(d => d.id === id)
  if (d) d.statut = 'Rejetée'
  alert(`❌ Demande ${id} rejetée (motif : ${motif})`)
}
</script>
