<template>
  <main class="bg-gray-100 min-h-screen pt-10 px-4 pb-10">
    <div class="max-w-6xl mx-auto bg-white rounded shadow p-6 overflow-x-auto">
      <!-- Titre de la page -->
      <h2 class="text-xl font-semibold mb-6 text-center sm:text-left">Demandes reçues</h2>

      <!-- Tableau responsive -->
      <table class="min-w-full text-sm border-collapse">
        <thead>
          <tr class="bg-gray-100 text-left">
            <th class="p-3 font-medium text-gray-700 whitespace-nowrap">Numéro demande</th>
            <th class="p-3 font-medium text-gray-700 whitespace-nowrap">Nom étudiant</th>
            <th class="p-3 font-medium text-gray-700 whitespace-nowrap">Niveau</th>
            <th class="p-3 font-medium text-gray-700 whitespace-nowrap">Libellé</th>
            <th class="p-3 font-medium text-gray-700 whitespace-nowrap">Date</th>
            <th class="p-3"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="demande in tabDemandes" :key="demande.id_demande" class="hover:bg-gray-50">
            <td class="p-3 whitespace-nowrap">{{ demande.id_demande }}</td>
            <td class="p-3 whitespace-nowrap">{{ demande.etudiant.nom }}</td>
            <td class="p-3 whitespace-nowrap">{{ demande.niveau }}</td>
            <td class="p-3 whitespace-nowrap">{{ demande.created_at }}</td>
            <td class="p-3 whitespace-nowrap">
              <button
                class="bg-brandBlue text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                @click="voirDetails(demande.id_demande)"
              >
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
const tabDemandes = ref([
  /*{
    numero: 'N°AT001',
    nomEtudiant: 'KOUADIO ANGE',
    niveau: 'L1',
    libelle: 'Attestation de fréquentation',
    date: '20/03/2025'
  },*/
  // Ajoutez d'autres objets ici si besoin
])

onMounted(async () => {
  
  try {
    await Promise.all([
      recupDemandes(),
    ])
  } catch (err) {
    console.error('Erreur lors du chargement des données:', err)
    error.value = 'Erreur lors du chargement des tabDemandes.'
  } /*finally {
    loading.value = false
  }*/
})

// Charger les tabDemandes des étudiants dans un tableau
const recupDemandes = async () => {
  try {
    const demandes = await secretaireService.getDemandesSecretaire()
    if (demandes.data && demandes.data.status) {

      tabDemandes.value = demandes.data.data

    } else {
      throw new Error('Impossible de charger les tabDemandes')
    }
  } catch (err) {
    console.error('Erreur lors du chargement des demande:', err)
    throw err
  }
}

/**
 * Voir les détails de la demande pour la traiter
 * @param idDemande
 */
const voirDetails = (idDemande) => {
  //alert(`Voir détails pour la demande ${numero}`)
  // À remplacer plus tard par un router.push si nécessaire

    router.push(`/secretariat/demandes/${idDemande}`)

}
</script>
