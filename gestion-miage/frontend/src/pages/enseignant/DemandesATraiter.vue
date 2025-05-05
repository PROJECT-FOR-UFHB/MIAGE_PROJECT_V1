<template>
    <main class="bg-gray-100 min-h-screen pt-6">
      <div class="max-w-7xl mx-auto px-4">
        <h1 class="text-2xl font-semibold mb-6">Demandes à traiter</h1>
  
        <!-- Tableau des demandes -->
        <div class="bg-white rounded shadow p-4 overflow-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50 text-left">
              <tr>
                <th class="px-4 py-2 text-sm font-medium text-gray-700">ID</th>
                <th class="px-4 py-2 text-sm font-medium text-gray-700">Étudiant</th>
                <th class="px-4 py-2 text-sm font-medium text-gray-700">Type</th>
                <th class="px-4 py-2 text-sm font-medium text-gray-700">Date</th>
                <th class="px-4 py-2 text-sm font-medium text-gray-700">Statut</th>
                <th class="px-4 py-2 text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="demande in demandes" :key="demande.id">
                <td class="px-4 py-2 text-sm">{{ demande.id }}</td>
                <td class="px-4 py-2 text-sm">{{ demande.etudiant }}</td>
                <td class="px-4 py-2 text-sm">{{ demande.type }}</td>
                <td class="px-4 py-2 text-sm">{{ demande.date }}</td>
                <td class="px-4 py-2 text-sm">{{ demande.statut }}</td>
                <td class="px-4 py-2 text-sm flex gap-2">
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
  import { ref, onMounted } from 'vue'
  // import { enseignantService } from '@/services' // 📌 à activer plus tard
  
  // 🔧 Mock temporaire
  const demandes = ref([
    { id: 'R4021', etudiant: 'Traoré A.', type: 'Lettre', date: '2025-05-04', statut: 'En attente' },
    { id: 'T5820', etudiant: 'Kouakou B.', type: 'Thème', date: '2025-05-01', statut: 'À valider' }
  ])
  
  // 📌 API à appeler plus tard
  // onMounted(async () => {
  //   const res = await enseignantService.getDemandesEnCours()
  //   demandes.value = res.data
  // })
  
  const rédigerLettre = (id) => {
    alert(`Redirection vers éditeur pour la demande ${id}`)
    // Exemple futur : router.push(`/enseignant/recommandation/${id}`)
  }
  
  const validerTheme = (id) => {
    alert(`Validation du thème pour la demande ${id}`)
    // Appel API : enseignantService.validateTheme(id)
  }
  
  const rejeterDemande = (id) => {
    const motif = prompt('Motif du rejet :')
    if (motif) {
      alert(`Demande ${id} rejetée avec le motif : ${motif}`)
      // Appel API : enseignantService.rejectDemande(id, motif)
    }
  }
  </script>
  