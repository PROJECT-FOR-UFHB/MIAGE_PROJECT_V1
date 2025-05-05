<template>
    <main class="bg-gray-100 min-h-screen pt-6">
      <div class="max-w-7xl mx-auto px-4">
  
        <!-- Titre -->
        <div class="mb-6 flex justify-between items-center">
          <div>
            <h1 class="text-2xl font-bold text-gray-800">Gestion des utilisateurs</h1>
            <p class="text-sm text-gray-500">Ajoutez, modifiez ou désactivez les comptes de l’application</p>
          </div>
          <button
            class="bg-brandGreen text-white px-4 py-2 rounded shadow hover:bg-green-700"
            @click="creerUtilisateur"
          >
            ➕ Créer un utilisateur
          </button>
        </div>
  
        <!-- Tableau utilisateurs -->
        <div class="bg-white rounded shadow p-4 overflow-x-auto">
          <table class="min-w-full text-sm">
            <thead>
              <tr class="bg-gray-100 text-left">
                <th class="px-4 py-2">Nom</th>
                <th class="px-4 py-2">Email</th>
                <th class="px-4 py-2">Rôle</th>
                <th class="px-4 py-2">Dernière connexion</th>
                <th class="px-4 py-2">Statut</th>
                <th class="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in utilisateurs" :key="user.id" class="border-b hover:bg-gray-50">
                <td class="px-4 py-2">{{ user.nom }}</td>
                <td class="px-4 py-2">{{ user.email }}</td>
                <td class="px-4 py-2">{{ user.role }}</td>
                <td class="px-4 py-2">{{ user.derniereConnexion }}</td>
                <td class="px-4 py-2">
                  <span
                    :class="user.actif ? 'text-green-600' : 'text-red-600'"
                    class="font-semibold"
                  >
                    {{ user.actif ? 'Actif' : 'Inactif' }}
                  </span>
                </td>
                <td class="px-4 py-2 text-center space-x-2">
                  <button class="text-blue-600 hover:underline" @click="modifier(user)">Modifier</button>
                  <button class="text-yellow-600 hover:underline" @click="reset(user)">Réinitialiser</button>
                  <button class="text-red-600 hover:underline" @click="desactiver(user)">Désactiver</button>
                </td>
              </tr>
            </tbody>
          </table>
  
          <!-- Aucune donnée -->
          <p v-if="utilisateurs.length === 0" class="text-center text-gray-500 italic mt-6">
            Aucun utilisateur pour l’instant
          </p>
        </div>
  
      </div>
    </main>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  // 📦 Mock des utilisateurs (à remplacer par données API)
  const utilisateurs = ref([
    {
      id: 1,
      nom: 'Kouadio Serge',
      email: 'serge.k@univ.ci',
      role: 'Enseignant',
      derniereConnexion: '04/05/2025 - 14:05',
      actif: true
    },
    {
      id: 2,
      nom: 'Traoré Aïcha',
      email: 'aicha.traore@univ.ci',
      role: 'Secrétaire',
      derniereConnexion: '03/05/2025 - 09:32',
      actif: false
    }
  ])
  
  // 🛠 Fonctions à remplacer par appels API
  function creerUtilisateur() {
    alert("🟢 Ouverture du formulaire de création d’utilisateur (formulaire à venir)")
  }
  
  function modifier(user) {
    console.log('Modifier utilisateur :', user)
    alert(`⚙️ Modifier : ${user.nom}`)
  }
  
  function reset(user) {
    alert(`🔐 Réinitialiser mot de passe pour ${user.nom}`)
  }
  
  function desactiver(user) {
    const confirmDesactiver = confirm(`❗Voulez-vous désactiver ${user.nom} ?`)
    if (confirmDesactiver) {
      user.actif = false
    }
  }
  </script>
  