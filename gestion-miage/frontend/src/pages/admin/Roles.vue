<template>
    <main class="bg-gray-100 min-h-screen pt-6">
      <div class="max-w-6xl mx-auto px-4">
  
        <!-- 🔖 Titre -->
        <div class="mb-6">
          <h1 class="text-2xl font-bold text-gray-800">Gestion des rôles et accès</h1>
          <p class="text-sm text-gray-500">Attribuez les autorisations par rôle</p>
        </div>
  
        <!-- 📋 Liste des rôles (mock) -->
        <div class="bg-white rounded shadow p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  
            <div v-for="role in roles" :key="role.id" class="border rounded p-4 shadow-sm">
              <h2 class="text-lg font-semibold text-brandBlue mb-2">
                <font-awesome-icon :icon="['fas', 'shield-alt']" class="mr-2 text-brandGreen" />
                {{ role.nom }}
              </h2>
  
              <ul class="text-sm text-gray-600 space-y-1">
                <li v-for="perm in role.permissions" :key="perm">✔️ {{ perm }}</li>
              </ul>
  
              <div class="mt-4 text-right">
                <button class="text-sm text-brandBlue hover:underline">
                  Modifier
                </button>
              </div>
            </div>
  
          </div>
        </div>
  
        <!-- ✅ Bouton création de rôle -->
        <div class="mt-6 text-right">
          <button class="bg-brandGreen text-white px-4 py-2 rounded hover:bg-green-600">
            Ajouter un rôle
          </button>
        </div>
      </div>
    </main>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  // 🔧 Données simulées (mock) — à remplacer par API
  const roles = ref([
    {
      id: 1,
      nom: 'Secrétaire pédagogique',
      permissions: ['Voir demandes', 'Traiter demandes']
    },
    {
      id: 2,
      nom: 'Secrétaire administratif',
      permissions: ['Valider financièrement', 'Gérer documents']
    },
    {
      id: 3,
      nom: 'Directeur MIAGE',
      permissions: ['Signer demandes', 'Rejeter avec motif']
    },
    {
      id: 4,
      nom: 'Enseignant',
      permissions: ['Rédiger lettre', 'Valider thème']
    },
    {
      id: 5,
      nom: 'Responsable de niveau',
      permissions: ['Consulter historique', 'Filtrer par niveau']
    }
  ])
  
  // 🧠 Appel API futur
  // onMounted(async () => {
  //   const res = await adminService.getRoles()
  //   roles.value = res.data
  // })
  </script>
  