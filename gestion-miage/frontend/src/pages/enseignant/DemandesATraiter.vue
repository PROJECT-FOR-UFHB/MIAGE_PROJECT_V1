<template>
  <main class="bg-gray-100 min-h-screen pt-20">
    <div class="max-w-7xl mx-auto px-4">
      <!-- Titre -->
      <h1 class="text-2xl font-semibold mb-6 text-center sm:text-left">Demandes à traiter</h1>

      <!-- Tableau responsive -->
      <div class="bg-white rounded shadow p-4 overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 text-sm">
          <thead class="bg-gray-50 text-left">
            <tr>
              <th class="px-4 py-2 font-medium text-gray-700 whitespace-nowrap">ID</th>
              <th class="px-4 py-2 font-medium text-gray-700 whitespace-nowrap">Étudiant</th>
              <th class="px-4 py-2 font-medium text-gray-700 whitespace-nowrap">Type</th>
              <th class="px-4 py-2 font-medium text-gray-700 whitespace-nowrap">Date</th>
              <th class="px-4 py-2 font-medium text-gray-700 whitespace-nowrap">Statut</th>
              <th class="px-4 py-2 font-medium text-gray-700 whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="demande in demandes" :key="demande.id" class="hover:bg-gray-50">
              <td class="px-4 py-2 whitespace-nowrap">{{ demande.id }}</td>
              <td class="px-4 py-2 whitespace-nowrap">{{ demande.etudiant }}</td>
              <td class="px-4 py-2 whitespace-nowrap">{{ demande.type }}</td>
              <td class="px-4 py-2 whitespace-nowrap">{{ demande.date }}</td>
              <td class="px-4 py-2 whitespace-nowrap">{{ demande.statut }}</td>
              <td class="px-4 py-2 whitespace-nowrap flex flex-wrap gap-2">
                <!-- Action selon le type -->
                <button
                  class="text-blue-600 hover:underline"
                  v-if="demande.type === 'Lettre'"
                  @click="rédigerLettre(demande.id)"
                >
                  ✍️ Rédiger
                </button>
                <button
                  class="text-green-600 hover:underline"
                  v-if="demande.type === 'Thème'"
                  @click="validerTheme(demande.id)"
                >
                  ✔️ Valider
                </button>
                <button
                  class="text-red-600 hover:underline"
                  @click="rejeterDemande(demande.id)"
                >
                  ❌ Rejeter
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
// import { enseignantService } from '@/services' // à activer plus tard

// Données fictives en attendant l’API
const demandes = ref([
  { id: 'R4021', etudiant: 'Traoré A.', type: 'Lettre', date: '2025-05-04', statut: 'En attente' },
  { id: 'T5820', etudiant: 'Kouakou B.', type: 'Thème', date: '2025-05-01', statut: 'À valider' }
])

// Action : rédiger une lettre
const rédigerLettre = (id) => {
  alert(`Redirection vers éditeur pour la demande ${id}`)
  // router.push(`/enseignant/recommandation/${id}`)
}

// Action : valider un thème
const validerTheme = (id) => {
  alert(`Validation du thème pour la demande ${id}`)
  // appel API ici
}

// Action : rejeter une demande
const rejeterDemande = (id) => {
  const motif = prompt('Motif du rejet :')
  if (motif) {
    alert(`Demande ${id} rejetée avec le motif : ${motif}`)
    // appel API ici
  }
}
</script>
