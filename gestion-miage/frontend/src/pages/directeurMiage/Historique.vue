<template>
    <main class="bg-gray-100 min-h-screen pt-6">
      <div class="max-w-6xl mx-auto bg-white p-6 rounded shadow">
  
        <!-- Titre -->
        <div class="flex justify-between items-center mb-4">
          <h1 class="text-xl font-semibold text-gray-800">Historique & Rapports</h1>
          <div class="flex gap-2">
            <button @click="exporter('csv')" class="bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200">
              Export CSV
            </button>
            <button @click="exporter('pdf')" class="bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200">
              Export PDF
            </button>
          </div>
        </div>
  
        <!-- Filtres -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <input v-model="filtres.nom" type="text" placeholder="Nom étudiant" class="input-filtre" />
          <select v-model="filtres.type_acte" class="input-filtre">
            <option value="">Type d’acte</option>
            <option v-for="type in typesActes" :key="type.id" :value="type.nom">{{ type.nom }}</option>
          </select>
          <select v-model="filtres.statut" class="input-filtre">
            <option value="">Statut</option>
            <option value="signé">Signée</option>
            <option value="rejeté">Rejetée</option>
          </select>
          <input v-model="filtres.periode" type="month" class="input-filtre" />
        </div>
  
        <!-- Tableau -->
        <div class="overflow-x-auto">
          <table class="min-w-full text-sm text-gray-700">
            <thead class="bg-gray-100 text-left uppercase text-xs">
              <tr>
                <th class="px-4 py-2">ID</th>
                <th class="px-4 py-2">Nom</th>
                <th class="px-4 py-2">Prénom</th>
                <th class="px-4 py-2">Type d’acte</th>
                <th class="px-4 py-2">Date</th>
                <th class="px-4 py-2">Statut</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in historiqueFiltré" :key="item.id" class="hover:bg-gray-50 border-b">
                <td class="px-4 py-2">{{ item.id }}</td>
                <td class="px-4 py-2">{{ item.nom }}</td>
                <td class="px-4 py-2">{{ item.prenom }}</td>
                <td class="px-4 py-2">{{ item.type }}</td>
                <td class="px-4 py-2">{{ formatDate(item.date) }}</td>
                <td class="px-4 py-2">
                  <span :class="getStatutClass(item.statut)" class="px-2 py-1 rounded text-xs font-semibold">
                    {{ item.statut }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <!-- Message si vide -->
        <div v-if="historiqueFiltré.length === 0" class="text-center text-gray-500 mt-8">
          Aucune donnée correspondant aux filtres.
        </div>
      </div>
    </main>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  
  // 📦 Filtres réactifs
  const filtres = ref({
    nom: '',
    type_acte: '',
    statut: '',
    periode: ''
  })
  
  // 📦 Données des demandes historiques (mock temporaire)
  const historique = ref([])
  
  // 📦 Liste des types d’actes disponibles (mock pour filtres)
  const typesActes = ref([
    { id: 1, nom: 'Attestation' },
    { id: 2, nom: 'Stage' },
    { id: 3, nom: 'Bourse' },
    { id: 4, nom: 'Relevé de notes' }
  ])
  
  // 🧠 Données filtrées à afficher dans le tableau
  const historiqueFiltré = computed(() => {
    return historique.value.filter(item => {
      return (!filtres.value.nom || item.nom.toLowerCase().includes(filtres.value.nom.toLowerCase())) &&
             (!filtres.value.type_acte || item.type === filtres.value.type_acte) &&
             (!filtres.value.statut || item.statut === filtres.value.statut) &&
             (!filtres.value.periode || item.date.startsWith(filtres.value.periode))
    })
  })
  
  // 📅 Formater les dates
  const formatDate = date => {
    return new Intl.DateTimeFormat('fr-FR').format(new Date(date))
  }
  
  // 🎨 Couleur selon statut
  const getStatutClass = statut => {
    switch (statut) {
      case 'signé': return 'bg-green-100 text-green-800'
      case 'rejeté': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-200 text-gray-700'
    }
  }
  
  // 🔁 Fonction d’export (API à créer + backend à brancher plus tard)
  const exporter = (format) => {
    alert(`📤 Export ${format.toUpperCase()} simulé. À remplacer par un appel API réel.`)
  }
  
  // 📡 Chargement initial (remplacer par appel API réel plus tard)
  onMounted(() => {
    // 🔽 Remplacer par : await directorService.getHistorique()
    historique.value = [
      { id: 1001, nom: 'Kouassi', prenom: 'Armand', type: 'Attestation', date: '2024-11-03', statut: 'signé' },
      { id: 1002, nom: 'Traoré', prenom: 'Aïcha', type: 'Bourse', date: '2024-11-02', statut: 'rejeté' },
      { id: 1003, nom: 'N\'Guessan', prenom: 'Michel', type: 'Stage', date: '2024-10-29', statut: 'signé' }
    ]
  })
  </script>
  
  <style scoped>
  .input-filtre {
    @apply border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-400;
  }
  </style>
  