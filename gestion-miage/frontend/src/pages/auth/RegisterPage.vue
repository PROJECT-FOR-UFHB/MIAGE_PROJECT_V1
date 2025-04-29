<template>
  <div class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <!-- Modification du gradient avec un contraste plus prononcé -->
    <div class="absolute inset-0 bg-gradient-to-br from-gray-50 via-gray-300 to-gray-400 animate-gradient"></div>
    <div class="absolute inset-12 border-8 border-transparent rounded-3xl bg-clip-padding bg-gradient-to-br from-gray-100 via-gray-400 to-gray-100 animate-border"></div>

    <!-- Registration Card -->
    <div
      class="relative bg-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-2xl w-full max-w-4xl transform transition-transform duration-500 hover:scale-105 animate-fade-up"
    >
      <!-- Header with Animated Face -->
      <div class="flex items-center justify-center space-x-4 mb-8">
        <h1 class="text-3xl sm:text-4xl font-extrabold text-gray-800 tracking-wide">Inscription Étudiant</h1>
        <div
          class="w-12 h-12"
          :class="{
            'animate-smile': faceState === 'smile',
            'animate-stare': faceState === 'stare',
            'animate-neutral': faceState === 'neutral',
            'animate-joy': faceState === 'joy',
            'animate-shake': faceState === 'shake'
          }"
        >
          <svg viewBox="0 0 100 100" class="w-full h-full">
            <circle cx="50" cy="50" r="48" fill="#FFE0B2" stroke="#F5A623" stroke-width="4" />
            <circle cx="35" cy="40" r="6" fill="#333" />
            <circle cx="65" cy="40" r="6" fill="#333" />
            <path
              v-if="faceState === 'smile' || faceState === 'joy'"
              d="M30,60 Q50,80 70,60"
              stroke="#333"
              stroke-width="4"
              fill="none"
              stroke-linecap="round"
            />
            <path
              v-else-if="faceState === 'stare'"
              d="M30,65 Q50,60 70,65"
              stroke="#333"
              stroke-width="4"
              fill="none"
              stroke-linecap="round"
            />
            <path
              v-else
              d="M30,63 Q50,70 70,63"
              stroke="#333"
              stroke-width="4"
              fill="none"
              stroke-linecap="round"
            />
          </svg>
        </div>
      </div>

      <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 animate-shake">
        {{ error }}
      </div>

      <form @submit.prevent="handleSubmit" class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Left Panel -->
        <div :class="['transition-transform duration-700', panelState === 'slide' ? 'translate-x-full opacity-0' : '']">
          <div class="mb-4">
            <label for="nom" class="block text-gray-700 text-sm sm:text-base font-semibold mb-2">Nom</label>
            <input
              id="nom"
              v-model="form.nom"
              type="text"
              @input="validateField('nom')"
              :class="fieldClass('nom')"
              placeholder="Votre nom"
              required
            />
          </div>
          <div class="mb-4">
            <label for="prenom" class="block text-gray-700 text-sm sm:text-base font-semibold mb-2">Prénom</label>
            <input
              id="prenom"
              v-model="form.prenom"
              type="text"
              @input="validateField('prenom')"
              :class="fieldClass('prenom')"
              placeholder="Votre prénom"
              required
            />
          </div>
        </div>

        <!-- Right Panel -->
        <div>
          <div class="mb-4">
            <label for="email" class="block text-gray-700 text-sm sm:text-base font-semibold mb-2">Email</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              @focus="onEmailFocus"
              @input="onEmailInput; validateField('email'); checkSlide()"
              @blur="onEmailBlur"
              :class="fieldClass('email')"
              placeholder="votre.email@example.com"
              required
            />
          </div>
          <div class="relative mb-4">
            <label for="password" class="block text-gray-700 text-sm sm:text-base font-semibold mb-2">Mot de passe</label>
            <input
              :type="passwordVisible ? 'text' : 'password'"
              id="password"
              v-model="form.password"
              @input="validateField('password'); checkSlide()"
              class="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition-all duration-300 placeholder-gray-400 text-sm sm:text-base"
              placeholder="Votre mot de passe"
              required
            />
            <button
              type="button"
              @click="togglePassword"
              class="absolute inset-y-0 right-0 pr-2 flex items-center"
            >
              <div class="w-8 h-8 relative" :class="{ 'cover-eyes': !passwordVisible, 'uncover-eyes': passwordVisible }">
                <svg viewBox="0 0 100 100" class="w-full h-full">
                  <circle cx="50" cy="50" r="48" fill="#BBDEFB" stroke="#2196F3" stroke-width="4" />
                  <circle cx="35" cy="40" r="6" fill="#333" />
                  <circle cx="65" cy="40" r="6" fill="#333" />
                  <rect v-if="!passwordVisible" x="25" y="30" width="20" height="10" fill="#BBDEFB" class="hand-left transition-transform duration-500" />
                  <rect v-if="!passwordVisible" x="55" y="30" width="20" height="10" fill="#BBDEFB" class="hand-right transition-transform duration-500" />
                </svg>
              </div>
            </button>
          </div>

          <div class="mb-6">
            <button
              type="submit"
              :class="[
                'w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 relative overflow-hidden',
                submitState === 'bounce' ? 'animate-bounce-twice' : ''
              ]"
              :disabled="loading"
              @mouseover="faceState = 'joy'"
              @mouseleave="faceState = 'neutral'"
            >
              <span v-if="loading">Inscription en cours...</span>
              <span v-else>S'inscrire</span>
            </button>
          </div>

          <div class="text-center">
            <p class="text-sm sm:text-base text-gray-600">
              Vous avez déjà un compte ?
              <router-link to="/auth/login" class="text-blue-500 hover:underline hover:text-blue-600 transition-colors duration-300">
                Connectez-vous
              </router-link>
            </p>
          </div>
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
const form = reactive({ nom: '', prenom: '', email: '', password: '' })

// Animation states
const faceState = ref('neutral')   // neutral | smile | stare | joy | shake
const passwordVisible = ref(false)
const panelState = ref('')         // '' or 'slide'
const submitState = ref('')        // '' or 'bounce'

// Helpers to validate format
const validEmail = email => /^\S+@\S+\.\S+$/.test(email)
const validPassword = pwd => pwd.length >= 6

// Field validation for CSS
const validFields = reactive({ nom: false, prenom: false, email: false, password: false })
function validateField(field) {
  validFields[field] = field === 'email'
    ? validEmail(form[field])
    : field === 'password'
    ? validPassword(form[field])
    : form[field].trim().length > 0
}

function fieldClass(field) {
  return [
    'w-full px-3 py-2 sm:py-3 border rounded-xl transition-all duration-300',
    validFields[field]
      ? 'border-green-400 focus:ring-4 focus:ring-green-300 focus:border-green-500'
      : 'border-gray-300 focus:ring-4 focus:ring-blue-300 focus:border-blue-500'
  ]
}

// Face animations
function onEmailFocus() { faceState.value = 'smile' }
function onEmailInput() { faceState.value = 'smile' }
function onEmailBlur() { faceState.value = 'stare' }

// Check slide when right panel valid
function checkSlide() {
  if (validFields.email && validFields.password) panelState.value = 'slide'
}

// Toggle password visibility
function togglePassword() { passwordVisible.value = !passwordVisible.value }

// Handle submit with bounce animation
async function handleSubmit() {
  submitState.value = 'bounce'
  await new Promise(r => setTimeout(r, 800))
  submitState.value = ''

  loading.value = true
  error.value = ''
  try {
    await authService.registerStudent(form)
    router.push('/etudiants/espace-etudiant')
  } catch (err) {
    error.value = err.response?.data?.message || 'Erreur lors de l inscription'
    faceState.value = 'shake'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Animation du gradient avec transition plus marquée */
@keyframes gradient { 
  0% { 
    background-position: 0% 50%;
    background-image: linear-gradient(45deg, #f9fafb, #9ca3af, #4b5563);
  }
  50% { 
    background-position: 100% 50%;
    background-image: linear-gradient(45deg, #4b5563, #9ca3af, #f9fafb);
  }
  100% { 
    background-position: 0% 50%;
    background-image: linear-gradient(45deg, #f9fafb, #9ca3af, #4b5563);
  }
}

.animate-gradient { 
  background-size: 200% 200%;
  animation: gradient 4s ease infinite;
}

/* Animation de la bordure avec plus de contraste */
@keyframes borderAnim { 
  0% { border-image-source: linear-gradient(45deg, #f9fafb, #4b5563); }
  50% { border-image-source: linear-gradient(45deg, #4b5563, #f9fafb); }
  100% { border-image-source: linear-gradient(45deg, #f9fafb, #4b5563); }
}
.animate-border { border-image-slice: 1; animation: borderAnim 6s ease infinite; }

/* Fade up card */
@keyframes fadeUp { 0% { opacity: 0; transform: translateY(30px); } 100% { opacity: 1; transform: translateY(0); } }
.animate-fade-up { animation: fadeUp 0.8s ease-out forwards; }

/* Shake error */
@keyframes shake { 0%,100% { transform: translateX(0); } 20%,60% { transform: translateX(-10px); } 40%,80% { transform: translateX(10px); } }
.animate-shake { animation: shake 0.6s ease-in-out; }

/* Face animations */
@keyframes smile { 0%,100% { transform: scale(1); } 50% { transform: scale(1.1); } }
.animate-smile { animation: smile 1s ease-in-out infinite; }
@keyframes stare { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
.animate-stare { animation: stare 2s ease-in-out infinite; }
@keyframes neutral { 0% { transform: scale(1); } 100% { transform: scale(1); } }
.animate-neutral { animation: neutral 0s; }
@keyframes joy { 0%,100% { transform: translateY(0); } 25% { transform: translateY(-10px); } 75% { transform: translateY(0); } }
.animate-joy { animation: joy 0.5s ease-in-out; }

/* Slide left panel */
.transition-transform { transition: transform 0.7s ease, opacity 0.7s ease; }
.translate-x-full { transform: translateX(100%); opacity: 0; }

/* Bounce twice on submit */
@keyframes bounceTwice { 0%,100% { transform: translateY(0); } 25% { transform: translateY(-15px); } 50% { transform: translateY(0); } 75% { transform: translateY(-8px); } }
.animate-bounce-twice { animation: bounceTwice 0.8s ease; }

/* Cover/uncover eyes */
.cover-eyes .hand-left { transform: translate(-10px, -10px) rotate(-20deg); }
.cover-eyes .hand-right { transform: translate(10px, -10px) rotate(20deg); }
.uncover-eyes .hand-left, .uncover-eyes .hand-right { transform: translate(0, -30px); }

/* Responsive tweaks */
@media (max-width: 768px) {
  .max-w-4xl { max-width: 95%; }
  .inset-12 { inset: 8px; }
}
</style>
