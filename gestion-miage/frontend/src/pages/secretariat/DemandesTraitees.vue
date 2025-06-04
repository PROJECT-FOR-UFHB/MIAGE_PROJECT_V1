<template>
  <main class="bg-gray-100 min-h-screen pt-10 px-4 pb-10">
    <div class="max-w-6xl mx-auto bg-white rounded shadow p-6 overflow-x-auto">
    <h2 class="text-xl font-semibold mb-4">Demandes completements traitées</h2>
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
            <button @click="voirDetails(demande.numero)"
              class="bg-brandBlue text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
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
import { ref, onMounted } from 'vue'
import { secretaireService } from '@/services'
import { useRouter } from 'vue-router'

const router = useRouter()
const demandes = ref([])

// Fonction pour voir les détails d'une demande
function voirDetails(idDemande) {
  router.push(`/secretariat/demandes/${idDemande}`)
}

// Charger les données au montage du composant
onMounted(async () => {
  try {
    await recupDemandes()
  } catch (err) {
    console.error('Erreur lors du chargement des données:', err)
  }
})

// Charger les demandes des étudiants depuis l'API
const recupDemandes = async () => {
  try {
    console.log('Début de la récupération des demandes...')
    const response = await secretaireService.getDemandesSecretaireTraite()
    console.log('Réponse brute de l’API:', response)
    if (response.data && response.data.status) {
      console.log('Statut OK, données reçues:', response.data.data)
      // Mettre à jour les demandes avec les données de l'API
      demandes.value = response.data.data.map(item => ({
        numero: item.id_demande,
        nomEtudiant: item.etudiant ? `${item.etudiant.nom} ${item.etudiant.prenom}` : 'Non spécifié',
        niveau: item.niveau || 'Non spécifié',
        libelle: item.type_demande ? item.type_demande.libelle : 'Non spécifié',
        date: formatDate(item.created_at),
        // Conserver les données originales pour le traitement
        original: item
      }))
      console.log('Demandes formatées:', demandes.value)
    } else {
      console.error('Réponse inattendue:', response.data)
      throw new Error('Impossible de charger les demandes')
    }
  } catch (err) {
    console.error('Erreur lors du chargement des demandes:', err)
    throw err
  }
}

// Formater la date pour l'affichage
const formatDate = (dateString) => {
  if (!dateString) return 'N/A'

  const date = new Date(dateString)
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date)
}
</script>
