<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold text-center mb-6">Réinitialisation du mot de passe</h1>

      <div v-if="success" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
        {{ success }}
      </div>

      <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {{ error }}
      </div>

      <form @submit.prevent="requestReset">
        <div class="mb-4">
          <label for="email" class="block text-gray-700 text-sm font-bold mb-2">
            Veuillez saisir votre adresse email pour recevoir un lien de réinitialisation
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            placeholder="votre.email@example.com"
            required
          />
        </div>

        <div class="mb-6">
          <button
            type="submit"
            class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            :disabled="loading"
          >
            <span v-if="loading">Envoi en cours...</span>
            <span v-else>Envoyer le lien de réinitialisation</span>
          </button>
        </div>

        <div class="text-center">
          <router-link to="/auth/login" class="text-sm text-blue-500 hover:underline">
            Retour à la page de connexion
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { authService } from '@/services'

const email = ref('')
const loading = ref(false)
const error = ref('')
const success = ref('')

const requestReset = async () => {
  loading.value = true
  error.value = ''
  success.value = ''

  try {
    await authService.requestPasswordReset(email.value)
    success.value = 'Un lien de réinitialisation a été envoyé à votre adresse email.'
    email.value = '' // Réinitialiser le champ
  } catch (err) {
    if (err.response && err.response.data) {
      error.value = err.response.data.message || 'Erreur lors de la demande de réinitialisation'
    } else {
      error.value = 'Erreur de connexion au serveur'
    }
  } finally {
    loading.value = false
  }
}
</script>