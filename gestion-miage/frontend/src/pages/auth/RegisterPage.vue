<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold text-center mb-6">Inscription Étudiant</h1>
      
      <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {{ error }}
      </div>

      <form @submit.prevent="register">
        <div class="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label for="nom" class="block text-gray-700 text-sm font-bold mb-2">Nom</label>
            <input 
              id="nom" 
              v-model="form.nom" 
              type="text" 
              class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Votre nom"
              required
            />
          </div>
          
          <div>
            <label for="prenom" class="block text-gray-700 text-sm font-bold mb-2">Prénom</label>
            <input 
              id="prenom" 
              v-model="form.prenom" 
              type="text" 
              class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Votre prénom"
              required
            />
          </div>
        </div>
        
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
          <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Mot de passe</label>
          <input 
            id="password" 
            v-model="form.password" 
            type="password" 
            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            placeholder="Votre mot de passe"
            required
          />
        </div>
        
        <div class="mb-6">
          <button 
            type="submit" 
            class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            :disabled="loading"
          >
            <span v-if="loading">Inscription en cours...</span>
            <span v-else>S'inscrire</span>
          </button>
        </div>
        
        <div class="text-center">
          <p class="text-sm">
            Vous avez déjà un compte ? 
            <router-link to="/auth/login" class="text-blue-500 hover:underline">
              Connectez-vous
            </router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '@/services'

const router = useRouter()
const loading = ref(false)
const error = ref('')

const form = reactive({
  nom: '',
  prenom: '',
  email: '',
  password: '',
  id_role: 1, // Rôle étudiant
  id_statut: 1 // Statut par défaut
})

const register = async () => {
  loading.value = true
  error.value = ''
  
  try {
    await authService.registerStudent(form)
    // Redirection vers l'espace étudiant après inscription
    router.push('/etudiants/espace-etudiant')
  } catch (err) {
    if (err.response && err.response.data) {
      if (err.response.data.errors) {
        // Gestion des erreurs de validation
        const errorMessages = Object.values(err.response.data.errors).flat()
        error.value = errorMessages.join(', ')
      } else {
        error.value = err.response.data.message || 'Erreur lors de l\'inscription'
      }
    } else {
      error.value = 'Erreur de connexion au serveur'
    }
  } finally {
    loading.value = false
  }
}
</script> 