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

      <form @submit.prevent="resetPassword" v-if="!success">
        <div class="mb-4">
          <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input 
            id="email" 
            v-model="form.email" 
            type="email" 
            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            placeholder="votre.email@example.com"
            required
          />
        </div>
        
        <div class="mb-4">
          <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Nouveau mot de passe</label>
          <input 
            id="password" 
            v-model="form.password" 
            type="password" 
            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            placeholder="Votre nouveau mot de passe"
            required
          />
        </div>
        
        <div class="mb-6">
          <label for="password_confirmation" class="block text-gray-700 text-sm font-bold mb-2">
            Confirmer le mot de passe
          </label>
          <input 
            id="password_confirmation" 
            v-model="form.email" 
            type="password" 
            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            placeholder="Confirmez votre nouveau mot de passe"
            required
          />
        </div>
        
        <div class="mb-6">
          <button 
            type="submit" 
            class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            :disabled="loading"
          >
            <span v-if="loading">Réinitialisation en cours...</span>
            <span v-else>Réinitialiser le mot de passe</span>
          </button>
        </div>
      </form>
      
      <div v-if="success" class="text-center mt-4">
        <router-link to="/auth/login" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-block">
          Aller à la page de connexion
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { authService } from '@/services'

const route = useRoute()
const loading = ref(false)
const error = ref('')
const success = ref('')

const form = reactive({
  
  email: '',
 
})

onMounted(() => {
  // Récupérer le token depuis les paramètres de l'URL
  const token = route.query.token
  if (token) {
    form.token = token
  }
  
  

})

const resetPassword = async () => {
  loading.value = true
  error.value = ''
  
  if (form.password !== form.password_confirmation) {
    error.value = 'Les mots de passe ne correspondent pas.'
    loading.value = false
    return
  }
  
  try {
    await authService.requestPasswordReset(form)
    success.value = 'Votre mot de passe a été réinitialisé avec succès.'
  } catch (err) {
    if (err.response && err.response.data) {
      if (err.response.data.errors) {
        // Gestion des erreurs de validation
        const errorMessages = Object.values(err.response.data.errors).flat()
        error.value = errorMessages.join(', ')
      } else {
        error.value = err.response.data.message || 'Erreur lors de la réinitialisation du mot de passe'
      }
    } else {
      error.value = 'Erreur de connexion au serveur'
    }
  } finally {
    loading.value = false
  }
}
</script> 