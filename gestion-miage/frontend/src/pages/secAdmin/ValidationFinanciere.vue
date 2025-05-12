<template>
  <main class="bg-gray-100 min-h-screen pt-10 px-4 pb-10">
    <div class="max-w-6xl mx-auto bg-white rounded shadow p-6 overflow-x-auto">
      <!-- Titre -->
      <h2 class="text-xl font-semibold mb-6 text-center sm:text-left">Validation Financière</h2>

      <!-- Message si aucune demande -->
      <div v-if="tabDemandes.length === 0" class="text-center text-gray-600 py-8">
        Aucune demande disponible.
      </div>

      <!-- Tableau -->
      <table v-else class="min-w-full text-sm border-collapse">
        <thead>
          <tr class="bg-gray-100 text-left">
            <th class="p-3 font-medium text-gray-700 whitespace-nowrap">Numéro demande</th>
            <th class="p-3 font-medium text-gray-700 whitespace-nowrap">Nom étudiant</th>
            <th class="p-3 font-medium text-gray-700 whitespace-nowrap">Niveau</th>
            <th class="p-3 font-medium text-gray-700 whitespace-nowrap">Libellé</th>
            <th class="p-3 font-medium text-gray-700 whitespace-nowrap">Date</th>
            <th class="p-3 font-medium text-gray-700 whitespace-nowrap">Statut</th>
            <th class="p-3"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="demande in tabDemandes" :key="demande.id_demande" class="hover:bg-gray-50">
            <td class="p-3 whitespace-nowrap">{{ demande.id_demande }}</td>
            <td class="p-3 whitespace-nowrap">{{ demande.etudiant.nom }}</td>
            <td class="p-3 whitespace-nowrap">{{ demande.niveau?.lib_niveau || 'N/A' }}</td>
            <td class="p-3 whitespace-nowrap">{{ demande.type_de_demande?.lib_type_de_demande || 'N/A' }}</td>
            <td class="p-3 whitespace-nowrap">{{ new Date(demande.date_emission).toLocaleDateString() }}</td>
            <td class="p-3 whitespace-nowrap">{{ demande.statut?.lib_statut || demande.id_statut }}</td>
            <td class="p-3 whitespace-nowrap">
              <button class="bg-brandBlue text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                @click="voirDetails(demande.id_demande)">
                Voir détails
              </button>
            </td>
          </tr>
        </tbody>
      </table>

    </div>
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { secretaireService } from '@/services'
import { useRouter } from 'vue-router'

const router = useRouter()
const tabDemandes = ref([])
const error = ref('')

onMounted(async () => {
  try {
    await recupDemandes()
  } catch (err) {
    console.error('Erreur lors du chargement des données:', err)
    error.value = 'Erreur lors du chargement des demandes.'
  }
})

const recupDemandes = async () => {
  try {
    const demandes = await secretaireService.getDemandesSecretaireFinancier()
    if (demandes.data?.status) {
      tabDemandes.value = demandes.data.data
    } else {
      throw new Error('Impossible de charger les demandes')
    }
  } catch (err) {
    throw err
  }
}

const voirDetails = (idDemande) => {
  router.push(`/secretariat/demandes/${idDemande}`)
}
</script>
