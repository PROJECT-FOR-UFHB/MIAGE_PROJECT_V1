<template>
  <main class="bg-gray-100 min-h-screen pt-10 px-4 pb-10">
    <div class="max-w-3xl mx-auto bg-white p-6 rounded shadow space-y-6">

      <!-- Informations personnelles -->
      <section>
        <h2 class="text-xl font-semibold mb-4 text-gray-800">Mes informations</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block mb-1 font-medium text-sm">Nom</label>
            <input v-model="form.nom" type="text" class="input-style" disabled />
          </div>
          <div>
            <label class="block mb-1 font-medium text-sm">Prénom</label>
            <input v-model="form.prenom" type="text" class="input-style" disabled />
          </div>
          <div class="md:col-span-2">
            <label class="block mb-1 font-medium text-sm">Email</label>
            <input v-model="form.email" type="email" class="input-style" />
          </div>
        </div>
        <!-- Bouton pour modifier email -->
        <button @click="updateProfile" class="btn-primary mt-4" :disabled="loading">
          Mettre à jour
        </button>
      </section>

      <!-- Changer le mot de passe -->
      <section>
        <h2 class="text-xl font-semibold mb-4 text-gray-800">Changer mon mot de passe</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block mb-1 font-medium text-sm">Mot de passe actuel</label>
            <input v-model="passwordForm.current" type="password" class="input-style" />
          </div>
          <div>
            <label class="block mb-1 font-medium text-sm">Nouveau mot de passe</label>
            <input v-model="passwordForm.new" type="password" class="input-style" />
          </div>
          <div class="md:col-span-2">
            <label class="block mb-1 font-medium text-sm">Confirmer le mot de passe</label>
            <input v-model="passwordForm.confirm" type="password" class="input-style" />
          </div>
        </div>
        <!-- Bouton pour modifier mot de passe -->
        <button @click="updateProfile" class="btn-primary mt-4" :disabled="loading">
          Changer le mot de passe
        </button>
      </section>

      <!-- Messages -->
      <div v-if="message" class="text-green-600 font-medium">{{ message }}</div>
      <div v-if="error" class="text-red-600 font-medium">{{ error }}</div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import apiClient from '@/services/apiClient'

const form = ref({
  nom: '',
  prenom: '',
  email: ''
})

const passwordForm = ref({
  current: '',
  new: '',
  confirm: ''
})

const message = ref('')
const error = ref('')
const loading = ref(false)

// Chargement initial du profil
onMounted(async () => {
  loading.value = true
  try {
    const res = await apiClient.get('/profile')
    if (res.data?.status) {
      const user = res.data.data
      form.value = {
        nom: user.nom,
        prenom: user.prenom,
        email: user.email
      }
    } else {
      error.value = 'Impossible de charger les informations.'
    }
  } catch (err) {
    error.value = 'Erreur lors du chargement du profil.'
    console.error(err)
  } finally {
    loading.value = false
  }
})

// Soumettre la mise à jour du profil + mot de passe si fourni
const updateProfile = async () => {
  message.value = ''
  error.value = ''
  loading.value = true

  try {
    const payload = {
      email: form.value.email
    }

    if (passwordForm.value.current || passwordForm.value.new || passwordForm.value.confirm) {
      if (!passwordForm.value.current || !passwordForm.value.new || !passwordForm.value.confirm) {
        error.value = 'Tous les champs du mot de passe doivent être remplis.'
        loading.value = false
        return
      }

      if (passwordForm.value.new !== passwordForm.value.confirm) {
        error.value = 'Les mots de passe ne correspondent pas.'
        loading.value = false
        return
      }

      payload.current_password = passwordForm.value.current
      payload.password = passwordForm.value.new
      payload.password_confirmation = passwordForm.value.confirm
    }

    const res = await apiClient.put('/profile', payload)

    if (res.data?.status) {
      message.value = res.data.message || 'Profil mis à jour avec succès.'
      passwordForm.value = { current: '', new: '', confirm: '' }
    } else {
      error.value = res.data.message || 'Échec de la mise à jour.'
    }
  } catch (err) {
    error.value = err.response?.data?.message || 'Erreur serveur.'
    console.error(err)
  } finally {
    loading.value = false
  }
}
</script>


<style scoped>
.input-style {
  @apply w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500;
}

.btn-primary {
  @apply bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition;
}
</style>
