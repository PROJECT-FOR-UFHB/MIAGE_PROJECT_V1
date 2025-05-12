<template>
  <main class="bg-gray-100 min-h-screen pt-10 px-4 pb-10">
    <div class="max-w-4xl mx-auto bg-white rounded shadow p-6">
      <h2 class="text-xl font-semibold mb-6 text-center">Détail de la demande</h2>

      <!-- Chargement -->
      <div v-if="loading" class="text-center text-gray-500">Chargement...</div>

      <!-- Erreur -->
      <div v-else-if="!demande" class="text-center text-red-500">Demande introuvable</div>

      <!-- Contenu -->
      <div v-else>
        <!-- Bloc : Informations -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 class="font-semibold text-gray-700 mb-2">Informations de la demande</h3>
            <p><strong>Numéro :</strong> {{ demande.id_demande }}</p>
            <p><strong>Type de demande :</strong> {{ demande.type_de_demande?.lib_type_de_demande }}</p>
            <p><strong>Niveau :</strong> {{ demande.niveau?.lib_niveau }}</p>
            <p><strong>Date :</strong> {{ formatDate(demande.date_emission) }}</p>
            <p><strong>Statut :</strong> {{ demande.statut?.statut }}</p>
          </div>

          <div>
            <h3 class="font-semibold text-gray-700 mb-2">Informations de l’étudiant</h3>
            <p><strong>Nom :</strong> {{ demande.etudiant?.nom }}</p>
            <p><strong>Prénom :</strong> {{ demande.etudiant?.prenom }}</p>
            <p><strong>Email :</strong> {{ demande.etudiant?.email }}</p>
          </div>
        </div>

        <!-- Actions -->
        <div class="mt-6 flex justify-end space-x-4">
          <button
            @click="validerDemande"
            class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            ✅ Valider
          </button>
          <button
            @click="rejeterDemande"
            class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            ❌ Rejeter
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { secretaireService } from '@/services'

const route = useRoute()
const router = useRouter()
const id = route.params.id
const demande = ref(null)
const loading = ref(true)

onMounted(async () => {
  try {
    const res = await secretaireService.getOneDemande(id)
    if (res.data?.status) {
      demande.value = res.data.data
    }
  } catch (err) {
    console.error('Erreur:', err)
  } finally {
    loading.value = false
  }
})

const validerDemande = async () => {
  const confirmed = confirm('Confirmez-vous la validation de cette demande ?')
  if (!confirmed) return

  try {
    await secretaireService.approuverDemande(id)
    alert('Demande validée ✅')
    router.push('/sec-admin/validation')
  } catch (err) {
    alert('Erreur lors de la validation')
  }
}

const rejeterDemande = async () => {
  const reason = prompt('Motif du rejet :')
  if (!reason) return

  try {
    await secretaireService.rejeterDemande(id, reason)
    alert('Demande rejetée ❌')
    router.push('/sec-admin/validation')
  } catch (err) {
    alert('Erreur lors du rejet')
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(date)
}
</script>
