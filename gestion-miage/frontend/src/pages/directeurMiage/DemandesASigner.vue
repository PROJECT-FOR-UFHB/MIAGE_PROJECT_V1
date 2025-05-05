<template>
    <main class="bg-gray-100 min-h-screen pt-6">
      <div class="max-w-7xl mx-auto bg-white p-6 rounded shadow">
  
        <h1 class="text-xl font-semibold mb-6">Demandes à signer</h1>
  
        <!-- 🔄 Affichage si les données chargent -->
        <div v-if="loading" class="text-center py-12">
          <span class="text-brandBlue">Chargement des demandes...</span>
        </div>
  
        <!-- 🛑 Aucun résultat -->
        <div v-else-if="demandes.length === 0" class="text-center py-12 text-gray-500">
          Aucune demande à signer pour le moment.
        </div>
  
        <!-- ✅ Tableau des demandes -->
        <div v-else class="overflow-x-auto">
          <table class="min-w-full text-sm text-gray-700">
            <thead class="bg-gray-100">
              <tr>
                <th class="px-4 py-2 text-left">ID</th>
                <th class="px-4 py-2 text-left">Nom</th>
                <th class="px-4 py-2 text-left">Prénom</th>
                <th class="px-4 py-2 text-left">Type</th>
                <th class="px-4 py-2 text-left">Date</th>
                <th class="px-4 py-2 text-left">Statut financier</th>
                <th class="px-4 py-2 text-left">Dernier traitement</th>
                <th class="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="demande in demandes" :key="demande.id" class="border-t hover:bg-gray-50">
                <td class="px-4 py-2">{{ demande.id }}</td>
                <td class="px-4 py-2">{{ demande.nom }}</td>
                <td class="px-4 py-2">{{ demande.prenom }}</td>
                <td class="px-4 py-2">{{ demande.type }}</td>
                <td class="px-4 py-2">{{ formatDate(demande.date) }}</td>
                <td class="px-4 py-2">
                  <span :class="badgeClasse(demande.statut_financier)">
                    {{ demande.statut_financier }}
                  </span>
                </td>
                <td class="px-4 py-2">{{ demande.dernier_traitement || 'N/A' }}</td>
                <td class="px-4 py-2 space-x-2">
                  <button @click="voirPDF(demande)" class="text-blue-500 hover:underline">Aperçu</button>
                  <button @click="signer(demande)" class="text-green-600 hover:underline">Signer</button>
                  <button @click="rejeter(demande)" class="text-red-500 hover:underline">Rejeter</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  
      <!-- 🚫 Modal de rejet -->
      <RejetModal v-if="demandeARejeter" :demande="demandeARejeter" @fermer="demandeARejeter = null" @confirmer="confirmerRejet" />
    </main>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  // import { directeurService } from '@/services' ← Pour les appels API plus tard
  import RejetModal from '@/components/directeurMiage/RejetModal.vue' // à créer
  
  // 🧾 Données fictives pour tests (mock)
  const demandes = ref([])
  const loading = ref(true)
  const demandeARejeter = ref(null)
  
  // 📦 Charger les demandes simulées
  onMounted(async () => {
    loading.value = true
    try {
      // const res = await directeurService.getDemandesASigner()
      // demandes.value = res.data
      demandes.value = [
        {
          id: 101,
          nom: 'Kouassi',
          prenom: 'Jean',
          type: 'Attestation de réussite',
          date: '2024-10-12',
          statut_financier: 'À jour',
          dernier_traitement: 'Validation financière'
        },
        {
          id: 102,
          nom: 'Traoré',
          prenom: 'Awa',
          type: 'Demande de bourse',
          date: '2024-10-11',
          statut_financier: 'En retard',
          dernier_traitement: 'Validation financière'
        }
      ]
    } catch (err) {
      console.error('Erreur chargement demandes à signer', err)
    } finally {
      loading.value = false
    }
  })
  
  // ✅ Actions utilisateurs
  const voirPDF = (demande) => {
    console.log('Voir PDF pour :', demande.id)
    // TODO: Ouvrir un PDF dans un nouvel onglet ou un modal
  }
  
  const signer = async (demande) => {
    console.log('Signer demande :', demande.id)
    // TODO: Appel API pour signer la demande
  }
  
  const rejeter = (demande) => {
    demandeARejeter.value = demande
  }
  
  const confirmerRejet = async (motif) => {
    console.log('Rejet confirmé avec motif :', motif)
    // TODO: Appel API pour rejeter la demande
    demandeARejeter.value = null
  }
  
  // 🧷 Badge de statut financier
  const badgeClasse = (statut) => {
    switch (statut) {
      case 'À jour': return 'bg-green-100 text-green-800 px-2 py-1 rounded text-xs'
      case 'En retard': return 'bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs'
      case 'Non payé': return 'bg-red-100 text-red-800 px-2 py-1 rounded text-xs'
      default: return 'bg-gray-200 text-gray-800 px-2 py-1 rounded text-xs'
    }
  }
  
  const formatDate = (dateStr) => {
    const d = new Date(dateStr)
    return d.toLocaleDateString('fr-FR')
  }
  </script>
  