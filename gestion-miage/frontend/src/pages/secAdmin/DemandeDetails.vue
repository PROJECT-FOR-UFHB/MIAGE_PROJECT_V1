<template>
    <main class="bg-gray-100 min-h-screen pt-10 px-4 pb-10">
      <div class="max-w-4xl mx-auto bg-white rounded shadow p-6">
        <h2 class="text-xl font-semibold mb-6 text-center">Détail de la demande</h2>
  
        <div v-if="loading" class="text-center text-gray-500">Chargement...</div>
        <div v-else-if="!demande" class="text-center text-red-500">Demande introuvable</div>
        <div v-else>
          <p><strong>Numéro :</strong> {{ demande.id_demande }}</p>
          <p><strong>Étudiant :</strong> {{ demande.etudiant?.nom }} {{ demande.etudiant?.prenom }}</p>
          <p><strong>Niveau :</strong> {{ demande.niveau?.lib_niveau }}</p>
          <p><strong>Type de demande :</strong> {{ demande.type_de_demande?.lib_type_de_demande }}</p>
          <p><strong>Date :</strong> {{ new Date(demande.date_emission).toLocaleDateString() }}</p>
          <p><strong>Statut :</strong> {{ demande.statut?.statut }}</p>
          <!--<pre>{{ demande }}</pre>-->

  
          <!-- Boutons d’action -->
          <div class="mt-6 flex space-x-4">
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
      router.push('/sec-admin/validation') // redirection
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
      router.push('/sec-admin/validation') // redirection
    } catch (err) {
      alert('Erreur lors du rejet')
    }
  }
  </script>
  