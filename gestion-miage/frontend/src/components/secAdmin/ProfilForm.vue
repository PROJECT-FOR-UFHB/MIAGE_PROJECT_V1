<!-- src/components/secAdmin/ProfilForm.vue -->
<template>
    <form @submit.prevent="submit" class="space-y-4">
      <div>
        <label class="block font-medium">Nom</label>
        <input v-model="form.nom" class="input" />
      </div>
      <div>
        <label class="block font-medium">Prénom</label>
        <input v-model="form.prenom" class="input" />
      </div>
      <div>
        <label class="block font-medium">Email</label>
        <input v-model="form.email" class="input" />
      </div>
  
      <div>
        <label class="block font-medium">Nouveau mot de passe</label>
        <input v-model="form.password" type="password" class="input" />
      </div>
  
      <div class="text-right">
        <button type="submit" class="bg-brandBlue text-white px-4 py-2 rounded hover:bg-blue-700">
          Mettre à jour
        </button>
      </div>
    </form>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { profileService } from '@/services'
  
  const form = ref({
    nom: '',
    prenom: '',
    email: '',
    password: ''
  })
  
  const submit = async () => {
    await profileService.update(form.value)
    alert('Profil mis à jour avec succès')
  }
  </script>
  
  <style scoped>
  .input {
    @apply border px-3 py-2 w-full rounded mt-1;
  }
  </style>
  