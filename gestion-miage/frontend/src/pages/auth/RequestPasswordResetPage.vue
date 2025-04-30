<template>
  <div class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <!-- Animated gray gradient background -->
    <div class="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-300 to-gray-200 animate-gradient"></div>

    <!-- Request Card -->
    <div class="relative bg-white p-8 sm:p-10 rounded-3xl shadow-2xl w-full max-w-md transform transition-transform duration-500 hover:scale-105 animate-fade-up z-10">
      <!-- Header with Diploma Icon -->
      <div class="flex items-center justify-center space-x-3 mb-6">
        <h1 class="text-3xl sm:text-4xl font-extrabold text-gray-800">Réinitialisation du mot de passe</h1>
        <div class="w-10 h-10" :class="{ 'animate-diploma': diplomaState === 'typing' }">
          <!-- Diploma SVG Icon -->
          <svg viewBox="0 0 64 64" class="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M32 2L12 12v20c0 11.046 8.954 20 20 20s20-8.954 20-20V12L32 2z" stroke="#4B5563" stroke-width="2"/>
            <path d="M32 42c-8.837 0-16-7.163-16-16V14l16-8 16 8v12c0 8.837-7.163 16-16 16z" fill="#CBD5E1"/>
            <path d="M24 14h16v20H24V14z" fill="#E5E7EB"/>
            <circle cx="32" cy="24" r="4" fill="#4B5563"/>
          </svg>
        </div>
      </div>

      <!-- Success & Error Messages -->
      <div v-if="success" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 animate-fade-in">
        {{ success }}
      </div>
      <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 animate-shake">
        {{ error }}
      </div>

      <!-- Request Form -->
      <form @submit.prevent="requestReset" class="space-y-6">
        <div>
          <label for="email" class="block text-gray-700 text-sm sm:text-base font-semibold mb-2">
            Veuillez saisir votre adresse email pour recevoir un lien de réinitialisation
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            @input="onTyping"
            class="w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-300 focus:border-gray-500 transition-all duration-300"
            placeholder="votre.email@example.com"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            class="w-full flex justify-center items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 active:scale-95 animate-pulse-on-hover"
            :disabled="loading"
          >
            <span v-if="loading">Envoi en cours...</span>
            <span v-else>Envoyer le lien de réinitialisation</span>
          </button>
        </div>
        <div class="text-center">
          <router-link to="/auth/login" class="text-sm text-blue-500 hover:underline hover:text-blue-600 transition-colors duration-300">
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
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const loading = ref(false)
const error = ref('')
const success = ref('')
// Diploma icon animation state
const diplomaState = ref('')

const requestReset = async () => {
  loading.value = true
  error.value = ''
  success.value = ''
  try {
    await authService.requestPasswordReset(email.value)
    
    success.value = 'Un lien de réinitialisation a été envoyé à votre adresse email.'
    
    // Stocker l'email dans sessionStorage au lieu de le passer dans l'URL
    sessionStorage.setItem('resetEmail', email.value)
    
    // Rediriger sans paramètre d'URL
    router.push('/auth/confirm-code')
    
    email.value = ''
  } catch (err) {
    error.value = err.response?.data?.message || 'Erreur lors de la demande de réinitialisation'
  } finally {
    loading.value = false
  }
}

// Animate diploma on input
function onTyping() {
  diplomaState.value = 'typing'
  setTimeout(() => {
    diplomaState.value = ''
  }, 500)
}
</script>

<style scoped>
/* Background gradient animation */
@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 8s ease infinite;
}

/* Fade-up card entrance */
@keyframes fadeUp {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}
.animate-fade-up {
  animation: fadeUp 0.8s ease-out forwards;
}

/* Fade-in for success message */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

/* Shake for error message */
@keyframes shake {
  0%,100% { transform: translateX(0); }
  20%,60% { transform: translateX(-8px); }
  40%,80% { transform: translateX(8px); }
}
.animate-shake {
  animation: shake 0.6s ease-in-out;
}

/* Pulse on button hover */
@keyframes pulseHover {
  0%,100% { transform: scale(1); }
  50% { transform: scale(1.03); }
}
.animate-pulse-on-hover:hover {
  animation: pulseHover 1s ease-in-out infinite;
}

/* Diploma bounce animation */
@keyframes diplomaBounce {
  0%,100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}
.animate-diploma {
  animation: diplomaBounce 0.5s ease-in-out;
}
</style>
