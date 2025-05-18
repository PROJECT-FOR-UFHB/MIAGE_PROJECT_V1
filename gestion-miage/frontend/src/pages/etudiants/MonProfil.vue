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
        <button @click="updateInfo" class="btn-primary mt-4" :disabled="loading">
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
            <small class="text-gray-500 text-sm">Entrez votre mot de passe actuel pour confirmer la modification.</small>
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
        <button @click="changePassword" class="btn-primary mt-4" :disabled="loading">
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
import studentService from '@/services/studentService'

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

// Chargement du profil étudiant connecté
onMounted(async () => {
  loading.value = true
  try {
    const res = await studentService.getProfile()
    if (res.data?.status) {
      const u = res.data.data
      form.value = {
        nom: u.nom,
        prenom: u.prenom,
        email: u.email
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

// Mise à jour email uniquement
const updateInfo = async () => {
  loading.value = true
  message.value = ''
  error.value = ''
  try {
    const res = await studentService.updateProfile({ email: form.value.email })
    if (res.data?.status) {
      message.value = 'Informations mises à jour avec succès.'
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

// Mise à jour du mot de passe
const changePassword = async () => {
  message.value = ''
  error.value = ''
  loading.value = true
  try {
    const { current, new: newPwd, confirm } = passwordForm.value
    if (!current || !newPwd || !confirm) {
      error.value = 'Tous les champs sont requis.'
      return
    }
    if (newPwd !== confirm) {
      error.value = 'Les mots de passe ne correspondent pas.'
      return
    }

    const res = await studentService.updateProfile({
      current_password: current,
      password: newPwd,
      password_confirmation: confirm
    })

    if (res.data?.status) {
      message.value = 'Mot de passe modifié avec succès.'
      passwordForm.value = { current: '', new: '', confirm: '' }
    } else {
      error.value = res.data.message || 'Erreur de modification.'
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
