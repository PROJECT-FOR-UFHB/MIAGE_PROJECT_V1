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
                <button class="text-blue-600 hover:underline" @click="telecharger(backup.nom)">Télécharger</button>
                <button class="text-red-600 hover:underline" @click="supprimer(backup.nom)">Supprimer</button>
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
import { ref, onMounted } from 'vue'
import dbService from '../../services/dbService';

const sauvegardes = ref([])

// Charger les sauvegardes au montage du composant
onMounted(async () => {
  try {
    const response = await dbService.getBackups();
    sauvegardes.value = response.data.data
    console.log(sauvegardes.value);

  } catch (error) {
    console.error('Erreur lors du chargement des sauvegardes:', error)
  }
})

// Actions
const lancerSauvegarde = async () => {
  try {
    await dbService.createBackup();
    // Recharger la liste des sauvegardes
    const response = await dbService.getBackups();
    sauvegardes.value = response.data.data
  } catch (error) {
    console.error('Erreur lors de la création de la sauvegarde:', error)
  }
}

const telecharger = async (backup) => {
  try {
    const response = await dbService.downloadBackup(backup);

    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', backup)
    document.body.appendChild(link)
    link.click()
    link.remove()
  } catch (error) {
    console.error('Erreur lors du téléchargement:', error)
  }
}

const supprimer = async (backup) => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer cette sauvegarde ?')) return

  try {
    await dbService.deleteBackup(backup)
    sauvegardes.value = sauvegardes.value.filter(b => b.nom !== backup)
  } catch (error) {
    console.error('Erreur lors de la suppression:', error)
  }
}
</script>
