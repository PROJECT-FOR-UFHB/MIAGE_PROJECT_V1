<template>
    <main class="bg-gray-100 min-h-screen pt-6 px-4">
      <div class="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h1 class="text-xl font-semibold mb-6">Mon profil</h1>
  
        <!-- Infos personnelles -->
        <div class="space-y-4 mb-6">
          <div>
            <label class="block text-sm font-medium text-gray-700">Nom</label>
            <input v-model="form.nom" type="text" class="input-style" disabled />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <input v-model="form.email" type="email" class="input-style" disabled />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Département</label>
            <input v-model="form.departement" type="text" class="input-style" disabled />
          </div>
        </div>
  
        <!-- Changement de mot de passe -->
        <div class="space-y-4">
          <h2 class="font-semibold mb-2">Changer de mot de passe</h2>
          <input type="password" v-model="form.password" placeholder="Nouveau mot de passe" class="input-style" />
          <input type="password" v-model="form.confirm" placeholder="Confirmer" class="input-style" />
          <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" @click="changerMdp">
            Mettre à jour
          </button>
        </div>
      </div>
    </main>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  // 🔄 Données simulées
  const form = ref({
    nom: 'Kouadio Julien',
    email: 'julien.k@univ-mage.net',
    departement: 'MIAGE',
    password: '',
    confirm: ''
  })
  
  // ✅ Action fictive (remplacée plus tard par appel API)
  const changerMdp = () => {
    if (!form.value.password || form.value.password !== form.value.confirm) {
      alert("Les mots de passe ne correspondent pas.")
      return
    }
  
    alert("Mot de passe mis à jour (simulation).")
  }
  </script>
  
  <style scoped>
  .input-style {
    padding: 0.5rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    width: 100%;
  }
  </style>
  