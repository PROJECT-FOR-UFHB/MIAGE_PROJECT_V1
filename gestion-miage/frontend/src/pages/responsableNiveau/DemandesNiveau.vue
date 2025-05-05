<template>
    <main class="bg-gray-100 min-h-screen pt-6">
      <div class="max-w-6xl mx-auto bg-white p-6 rounded shadow">
        <h2 class="text-xl font-semibold mb-6">Demandes de mon niveau</h2>
  
        <!-- 🔍 Filtres de recherche -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <input v-model="filters.nom" type="text" placeholder="Nom étudiant"
            class="border px-3 py-2 rounded w-full" />
          <input v-model="filters.type" type="text" placeholder="Type d’acte"
            class="border px-3 py-2 rounded w-full" />
          <select v-model="filters.statut" class="border px-3 py-2 rounded w-full">
            <option value="">Tous les statuts</option>
            <option value="en cours">En cours</option>
            <option value="signée">Signée</option>
            <option value="rejetée">Rejetée</option>
          </select>
          <button @click="filterResults"
            class="bg-brandBlue text-white rounded px-4 py-2 hover:bg-blue-700 transition-colors">
            Appliquer
          </button>
        </div>
  
        <!-- 🧾 Tableau des demandes -->
        <div class="overflow-x-auto">
          <table class="min-w-full border text-sm text-left">
            <thead class="bg-gray-100 text-gray-600 uppercase">
              <tr>
                <th class="px-4 py-3">ID</th>
                <th class="px-4 py-3">Étudiant</th>
                <th class="px-4 py-3">Type d’acte</th>
                <th class="px-4 py-3">Date</th>
                <th class="px-4 py-3">Statut</th>
                <th class="px-4 py-3">Étape atteinte</th>
                <th class="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="demande in demandesFiltrees" :key="demande.id" class="border-t hover:bg-gray-50">
                <td class="px-4 py-2">{{ demande.id }}</td>
                <td class="px-4 py-2">{{ demande.etudiant }}</td>
                <td class="px-4 py-2">{{ demande.type }}</td>
                <td class="px-4 py-2">{{ demande.date }}</td>
                <td class="px-4 py-2">{{ demande.statut }}</td>
                <td class="px-4 py-2">{{ demande.etape }}</td>
                <td class="px-4 py-2 text-brandBlue font-medium cursor-pointer">Voir</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  // import { responsableService } from '@/services' ← à utiliser plus tard pour appel API
  
  // Mock data en attendant les appels backend
  const demandes = ref([
    { id: 'd723kx', etudiant: 'Yao Marie', type: 'Attestation', date: '2025-05-02', statut: 'En cours', etape: 'Validée financièrement' },
    { id: 'd823aa', etudiant: 'Konan Jules', type: 'Relevé', date: '2025-04-28', statut: 'Signée', etape: 'Signée' },
    { id: 'd124br', etudiant: 'Tra Bi', type: 'Attestation', date: '2025-04-22', statut: 'Rejetée', etape: 'Rejetée' }
  ])
  
  const filters = ref({
    nom: '',
    type: '',
    statut: ''
  })
  
  // ✅ Filtrage local (simulé ici)
  const demandesFiltrees = computed(() => {
    return demandes.value.filter(d =>
      (filters.value.nom === '' || d.etudiant.toLowerCase().includes(filters.value.nom.toLowerCase())) &&
      (filters.value.type === '' || d.type.toLowerCase().includes(filters.value.type.toLowerCase())) &&
      (filters.value.statut === '' || d.statut.toLowerCase() === filters.value.statut.toLowerCase())
    )
  })
  
  // 🔁 Appel API à prévoir au montage
  onMounted(async () => {
    // try {
    //   const res = await responsableService.getDemandesParNiveau()
    //   demandes.value = res.data.data
    // } catch (err) {
    //   console.error('Erreur chargement demandes', err)
    // }
  })
  
  // Optionnel si tu veux rafraîchir côté serveur plus tard
  const filterResults = () => {
    // console.log('Appliquer les filtres côté serveur si nécessaire')
  }
  </script>
  