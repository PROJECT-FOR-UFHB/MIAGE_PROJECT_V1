<template>
  <main class="bg-gray-100 min-h-screen pt-20">
    <div class="max-w-6xl mx-auto px-4 space-y-8">

      <!-- Bouton lancer sauvegarde -->
      <div class="flex justify-end">
        <button
          @click="lancerSauvegarde"
          class="bg-brandBlue hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded"
        >
          💾 Lancer une sauvegarde
        </button>
      </div>

      <!-- Liste des sauvegardes avec overflow sur mobile -->
      <section class="bg-white p-6 rounded shadow overflow-x-auto">
        <h2 class="text-xl font-semibold mb-4">Sauvegardes disponibles</h2>

        <table class="min-w-full table-auto text-sm whitespace-nowrap">
          <thead class="bg-gray-200">
            <tr>
              <th class="p-2 text-left">Nom</th>
              <th class="p-2 text-left">Date</th>
              <th class="p-2 text-left">Taille</th>
              <th class="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(backup, index) in sauvegardes"
              :key="index"
              class="border-b hover:bg-gray-50"
            >
              <td class="p-2">{{ backup.nom }}</td>
              <td class="p-2">{{ backup.date }}</td>
              <td class="p-2">{{ backup.taille }}</td>
              <td class="p-2 flex flex-wrap gap-2">
                <button class="text-green-600 hover:underline" @click="restaurer(backup)">Restaurer</button>
                <button class="text-blue-600 hover:underline" @click="telecharger(backup)">Télécharger</button>
                <button class="text-red-600 hover:underline" @click="supprimer(backup)">Supprimer</button>
              </td>
            </tr>
            <tr v-if="sauvegardes.length === 0">
              <td colspan="4" class="p-4 text-center text-gray-500 italic">Aucune sauvegarde disponible</td>
            </tr>
          </tbody>
        </table>
      </section>

    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'

// Liste simulée
const sauvegardes = ref([
  {
    nom: 'backup_2024-05-06.sql',
    date: '06/05/2024 - 14:32',
    taille: '5.2 MB'
  },
  {
    nom: 'backup_2024-04-25.sql',
    date: '25/04/2024 - 10:12',
    taille: '4.8 MB'
  }
])

// Actions (mock)
const lancerSauvegarde = () => {
  console.log('📦 Sauvegarde lancée (mock)')
}

const restaurer = (backup) => {
  console.log('🔁 Restauration demandée pour', backup.nom)
}

const telecharger = (backup) => {
  console.log('⬇️ Téléchargement de', backup.nom)
}

const supprimer = (backup) => {
  sauvegardes.value = sauvegardes.value.filter(b => b.nom !== backup.nom)
  console.log('🗑️ Supprimée :', backup.nom)
}
</script>
