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

        <!-- Barre de progression -->
        <h3 class="text-lg font-semibold mb-4">Progression de la validation</h3>
        <div class="bg-gray-50 p-4 rounded mb-6">
          <div v-for="(step, index) in steps" :key="index" class="mb-4 flex items-start">
            <div class="mr-2 mt-1">
              <div
                class="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs"
                :class="getStepStatusClass(step.status)"
              >
                <font-awesome-icon v-if="step.status === 'completed'" icon="check" />
                <font-awesome-icon v-else-if="step.status === 'rejected'" icon="times" />
                <span v-else>{{ index + 1 }}</span>
              </div>
              <div v-if="index < steps.length - 1" class="w-0.5 h-8 bg-gray-300 mx-auto"></div>
            </div>
            <div>
              <p class="font-medium">{{ step.name }}</p>
              <p class="text-sm text-gray-500">{{ step.date || 'En attente' }}</p>
              <p v-if="step.comment" class="text-sm italic mt-1">"{{ step.comment }}"</p>
            </div>
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
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import apiClient from '@/services/apiClient'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const route = useRoute()
const router = useRouter()

const id = route.params.id
const demande = ref(null)
const loading = ref(true)
const comment = ref('')

const steps = reactive([
  { name: 'Secrétariat', status: 'pending', date: null, comment: null },
  { name: 'Service financier', status: 'pending', date: null, comment: null },
  { name: 'Directeur MIAGE', status: 'pending', date: null, comment: null },
  { name: 'Directeur UFR', status: 'pending', date: null, comment: null }
])

onMounted(async () => {
  try {
    const res = await apiClient.get(`/demandes/${id}`)
    if (res.data?.status) {
      demande.value = res.data.data
    }

    const historyRes = await apiClient.get(`/validations/${id}/history`)
    const validations = historyRes.data?.data?.validations || []

    validations.forEach(validation => {
      let index = -1
      const lib = validation.statut?.statut?.toLowerCase()

      if (lib.includes('secrétaire')) index = 0
      else if (lib.includes('financier')) index = 1
      else if (lib.includes('miage')) index = 2
      else if (lib.includes('ufr')) index = 3

      if (index >= 0) {
        steps[index].status = lib.includes('rejete') ? 'rejected' : 'completed'
        steps[index].date = formatDate(validation.date_validation)
        steps[index].comment = validation.commentaires
      }
    })

    // Activer la prochaine étape en attente
    let found = false
    for (const step of steps) {
      if (step.status === 'pending' && !found) {
        step.status = 'active'
        found = true
      }
    }
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
})

const valider = async () => {
  if (!confirm('Confirmez-vous la validation ?')) return
  try {
    await apiClient.post(`/validations/financial/${id}`, { commentaires: comment.value })
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
    await apiClient.post(`/validations/financialRejet/${id}`, { commentaires: motif })
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

const getStepStatusClass = (status) => {
  switch (status) {
    case 'completed': return 'bg-green-500'
    case 'active': return 'bg-blue-500'
    case 'rejected': return 'bg-red-500'
    default: return 'bg-gray-300 text-gray-600'
  }
}
</script>
