<template>
  <main class="bg-gray-100 min-h-screen pt-10 px-4 pb-10">
    <div class="max-w-6xl mx-auto bg-white rounded shadow p-6">
      <h2 class="text-xl font-semibold mb-6 text-center sm:text-left">Validation Financière</h2>

      <div v-if="loading" class="text-center text-gray-500">Chargement...</div>
      <div v-else-if="!demande" class="text-center text-red-500">Demande introuvable</div>

      <div v-else>
        <!-- Informations de la demande -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 class="font-semibold text-gray-700 mb-2">Détails de la demande</h3>
            <p><strong>Numéro :</strong> {{ demande.id_demande }}</p>
            <p><strong>Type :</strong> {{ demande.type_de_demande?.lib_type_de_demande }}</p>
            <p><strong>Niveau :</strong> {{ demande.niveau?.lib_niveau }}</p>
            <p><strong>Date :</strong> {{ formatDate(demande.date_emission) }}</p>
            <p><strong>Statut :</strong> {{ demande.statut?.statut }}</p>
          </div>

          <div>
            <h3 class="font-semibold text-gray-700 mb-2">Étudiant</h3>
            <p><strong>Nom :</strong> {{ demande.etudiant?.nom }}</p>
            <p><strong>Prénom :</strong> {{ demande.etudiant?.prenom }}</p>
            <p><strong>Email :</strong> {{ demande.etudiant?.email }}</p>
          </div>
        </div>

        <!-- Zone de traitement -->
        <div class="mb-4">
          <label class="block font-medium mb-1">Commentaire (facultatif)</label>
          <textarea
            v-model="comment"
            rows="3"
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Saisissez un commentaire (ex: paiement confirmé)"
          ></textarea>
        </div>

        <div class="flex justify-end space-x-4">
          <button
            @click="valider"
            class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            ✅ Valider
          </button>
          <button
            @click="rejeter"
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
import { apiClient, validationService } from '@/services'

const route = useRoute()
const router = useRouter()

const id = route.params.id
const demande = ref(null)
const loading = ref(true)
const comment = ref('')

onMounted(async () => {
  try {
    const res = await apiClient.get(`/demandes/${id}`)
    if (res.data?.status) {
      demande.value = res.data.data
    }
  }catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
})

const valider = async () => {
  try {

    const validationData = {
      id_demande: id,
      statut: true,
      commentaire: comment.value,
      id_personnel: sessionStorage.getItem('user_id')
    }


    await validationService.financialValidation(id, validationData)
    alert('✅ Demande validée.')
    router.push('/sec-admin/validation')
  } catch (err) {
    console.error(err)
    alert("❌ Erreur lors de la validation.")
  }
}

const rejeter = async () => {
  const motif = prompt('Motif du rejet :')
  if (!motif) return
  try {
    const validationData = {
      id_demande: id,
      statut: false,
      commentaire: comment.value,
      id_personnel: sessionStorage.getItem('user_id')
    }

    await validationService.financialRejet(id, validationData)
    alert('❌ Demande rejetée.')
    router.push('/sec-admin/validation')
  } catch (err) {
    console.error(err)
    alert("❌ Erreur lors du rejet.")
  }
}

const formatDate = (dateStr) => {
  if (!dateStr) return 'Inconnue'
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
  })
}

</script>
