<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 v-if="!modeVerification" class="text-2xl font-bold text-center mb-6">Inscription Étudiant</h1>
      <h1 v-else class="text-2xl font-bold text-center mb-6">Confirmation d'identité</h1>


      <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {{ error }}
      </div>

      <form @submit.prevent="register">
        <div class="grid gap-4 mb-4">

        <div v-if="!modeVerification" class="mb-4">
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

        <div v-else class="mb-4">
          <label for="otp" class="block text-gray-700 text-sm font-bold mb-2">Veuillez entrer le code de vérification envoyé par email</label>
          <input
            id="otp"
            v-model="form.otp"
            type="string"
            max="6"
            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            placeholder="012345"
            required
          />
        </div>

      </div>

        <div class="mb-6">

          <button
            v-if="!modeVerification"
            type="submit"
            class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            :disabled="loading"
          >
            <span v-if="loading">Inscription en cours...</span>
            <span v-else>S'inscrire</span>
          </button>
          <button
            v-else
            type="submit"
            class="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            :disabled="loading"
          >
            <span v-if="loading">Inscription en cours...</span>
            <span v-else>Confimer</span>
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
const modeVerification = ref(false);

const form = reactive({
  email: '',
  otp: '',
})


const register = async () => {
  loading.value = true
  error.value = ''
  let statut;
  try {
    if(!modeVerification.value){
      statut = await authService.registerStudent(form);
      if (statut.status === 200) modeVerification.value = true;
      error.value = statut.message
    }else{
      statut = await authService.verifOtp(form);
      if (statut.status === 200) {
        router.push('/auth/create-password');
        sessionStorage.setItem('email',statut.data.email)
      }
      error.value = statut.message

    }
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
