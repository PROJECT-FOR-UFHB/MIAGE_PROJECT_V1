<!-- src/pages/secretariat/DemandesRecues.vue -->
<template>
  <div class="max-w-6xl mx-auto bg-white rounded shadow p-6">
    <h2 class="text-xl font-semibold mb-4">Demandes reçues</h2>
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
            <button class="bg-brandBlue text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
              Voir détails
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
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
  // Autres demandes...
]
</script>
