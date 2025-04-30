<template>
    <div class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <!-- Animated subtle gradient background -->
      <div class="absolute inset-0 bg-gradient-to-r from-gray-700 via-gray-900 to-black animate-gradient"></div>
      <!-- Overlay for contrast -->
      <div class="absolute inset-0 bg-black opacity-50"></div>
  
      <!-- Confirmation Code Card -->
      <div class="relative bg-white bg-opacity-90 backdrop-blur-lg p-8 rounded-3xl shadow-2xl max-w-lg w-full">
        <h2 class="text-2xl font-bold text-center mb-4 text-gray-800">Code de confirmation</h2>
        <p class="text-center text-gray-600 mb-6">Entrez le code à 6 chiffres envoyé par email</p>
  
        <!-- Message d'erreur animé -->
        <div v-if="formState.errorMessage" class="mb-6 error-message-container">
          <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md error-message">
            <div class="flex items-center">
              <svg class="w-6 h-6 mr-2 error-icon" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
              </svg>
              <span>{{ formState.errorMessage }}</span>
            </div>
          </div>
        </div>
  
        <div class="flex justify-between space-x-3 mb-8">
          <input
            v-for="(digit, idx) in code"
            :key="idx"
            v-model="code[idx]"
            type="text"
            maxlength="1"
            @focus="focused = idx"
            @blur="focused = -1"
            @input="onInput(idx, $event)"
            :ref="el => inputRefs[idx] = el"
            class="w-12 h-12 text-center text-xl font-bold border-2 rounded transition-all duration-300
                   bg-white bg-opacity-80
                   border-gray-400
                   focus:border-indigo-400 focus:shadow-lg focus:scale-110
                   input-float"
            :class="{ 'border-red-500 shake': formState.errorMessage }"
          />
        </div>
  
        <button
          @click="submitCode"
          class="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-full font-semibold transition-transform duration-300 hover:scale-105 active:scale-95"
        >
          Valider
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, nextTick, onMounted } from 'vue'
  import { authService } from '@/services'
  import { useRouter, useRoute } from 'vue-router'
  
  const router = useRouter()
  const route = useRoute()
  
  // Reactive array for 6-digit code
  const code = ref(Array(6).fill(''))
  // Track focused index for styling or logic
  const focused = ref(-1)
  // Refs to input elements
  const inputRefs = ref([])
  
  // État du formulaire incluant le message d'erreur et l'email
  const formState = reactive({
    errorMessage: '',
    email: ''
  })
  
  // Récupérer l'email depuis sessionStorage au chargement du composant
  onMounted(() => {
    formState.email = sessionStorage.getItem('resetEmail') || ''
    
    // Rediriger si aucun email n'est trouvé
    if (!formState.email) {
      router.push('/auth/request-password-reset')
      formState.errorMessage = "Session expirée. Veuillez recommencer le processus de réinitialisation."
    }
  })
  
  // Handle input and auto-focus next
  function onInput(idx, event) {
    const value = event.target.value.slice(-1)
    code.value[idx] = value
    if (value && idx < code.value.length - 1) {
      nextTick(() => {
        inputRefs.value[idx + 1]?.focus()
      })
    }
  }
  
  // Réinitialiser le code
  function resetCode() {
    code.value = Array(6).fill('')
    nextTick(() => {
      inputRefs.value[0]?.focus()
    })
  }
  
  // Submission handler
  const submitCode = async () => {
    const entered = code.value.join('')
    console.log('Code saisi :', entered)
    
    try {
      // Effacer tout message d'erreur précédent
      formState.errorMessage = ''
      
      // Utilisation de try/catch pour gérer les erreurs potentielles
      if (!formState.email) {
        throw new Error("Email manquant. Veuillez recommencer le processus de réinitialisation.")
      }
      
      await authService.verifyCode(entered, formState.email)
      
      // Transmettre l'email à la page suivante via sessionStorage (pas dans l'URL)
      router.push('/auth/change-password')
    } catch (error) {
      console.error("Erreur lors de la vérification du code:", error)
      formState.errorMessage = "Code incorrect. Veuillez réessayer."
      resetCode()
      
      // Masquer le message d'erreur après 5 secondes
      setTimeout(() => {
        formState.errorMessage = ''
      }, 5000)
    }
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
    animation: gradient 12s ease infinite;
  }
  
  /* Inputs floating animation */
  @keyframes float {
    0%,100% { transform: translateY(0); }
    50% { transform: translateY(-4px); }
  }
  .input-float {
    animation: float 5s ease-in-out infinite;
  }
  
  /* Animation pour le message d'erreur */
  .error-message-container {
    animation: slideIn 0.5s ease forwards;
  }
  
  .error-message {
    animation: pulse 2s infinite;
  }
  
  .error-icon {
    animation: rotate 1s ease-in-out;
  }
  
  /* Animation de secousse pour les inputs en cas d'erreur */
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
  }
  
  .shake {
    animation: shake 0.5s ease-in-out;
  }
  
  @keyframes slideIn {
    0% { transform: translateY(-20px); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.8; }
  }
  
  @keyframes rotate {
    0% { transform: rotate(0deg); }
    15% { transform: rotate(-20deg); }
    30% { transform: rotate(20deg); }
    45% { transform: rotate(-15deg); }
    60% { transform: rotate(15deg); }
    75% { transform: rotate(-5deg); }
    100% { transform: rotate(0deg); }
  }
  
  /* Responsive adjustments */
  @media (max-width: 640px) {
    .max-w-lg { max-width: 95%; }
    input { width: 12vw; height: 12vw; font-size: 6vw; }
  }
  </style>
  