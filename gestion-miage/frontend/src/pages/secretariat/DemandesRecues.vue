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
          <tr v-for="(demande, index) in demandes" :key="index" class="hover:bg-gray-50">
            <td class="p-3 whitespace-nowrap">{{ demande.numero }}</td>
            <td class="p-3 whitespace-nowrap">{{ demande.nomEtudiant }}</td>
            <td class="p-3 whitespace-nowrap">{{ demande.niveau }}</td>
            <td class="p-3 whitespace-nowrap">{{ demande.libelle }}</td>
            <td class="p-3 whitespace-nowrap">{{ demande.date }}</td>
            <td class="p-3 whitespace-nowrap">
              <button
                class="bg-brandBlue text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                @click="voirDetails(demande.numero)"
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
const demandes = [
  {
    numero: 'N°AT001',
    nomEtudiant: 'KOUADIO ANGE',
    niveau: 'L1',
    libelle: 'Attestation de fréquentation',
    date: '20/03/2025'
  },
  // Ajoutez d'autres objets ici si besoin
]

// Fonction fictive pour le bouton
const voirDetails = (numero) => {
  alert(`Voir détails pour la demande ${numero}`)
  // À remplacer plus tard par un router.push si nécessaire
}
</script>
