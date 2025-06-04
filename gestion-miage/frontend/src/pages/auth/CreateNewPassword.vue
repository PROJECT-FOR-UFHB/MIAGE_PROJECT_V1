<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold text-center mb-6">Création du nouveau mot de passe</h1>

      <div v-if="success" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
        {{ success }}
      </div>

      <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {{ error }}
      </div>

      <form @submit.prevent="createPassword" v-if="!success">

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
            v-model="form.password_confirmation"
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
            <span v-if="loading">Création en cours...</span>
            <span v-else>Enregistrer le mot de passe</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '@/services'

const router = useRouter()
const loading = ref(false)
const error = ref('')
const success = ref('')

const form = reactive({
  email: '',
  password: '',
  password_confirmation: ''
})

onMounted(() => {

  if(sessionStorage.getItem('auth_token')) router.push('/etudiants/espace-etudiant')

  const email = sessionStorage.getItem('email')

  if (email) {
    form.email = email
  }

})

const createPassword = async () => {
  loading.value = true
  error.value = ''

  if (form.password !== form.password_confirmation) {
    error.value = 'Les mots de passe ne correspondent pas.'
    loading.value = false
    return
  }

  try {
    await authService.createNewPassword(form).then(({ data }) => {
      if (data.token) {
        sessionStorage.setItem('auth_token', data.token)
        sessionStorage.setItem('user', JSON.stringify(data.user))
        // à l'inscription, on sait que c'est ETU
        sessionStorage.setItem('user_role', 'ETU')
        sessionStorage.setItem('user_type', 'etudiant')
        sessionStorage.setItem('user_id', data.user.id_etudiant)
      }
    });

    success.value = 'Votre mot de passe a été créé avec succès.'
    router.push('/etudiants/espace-etudiant')
  } catch (err) {
    if (err.response && err.response.data) {
      if (err.response.data.errors) {
        // Gestion des erreurs de validation
        const errorMessages = Object.values(err.response.data.errors).flat()
        error.value = errorMessages.join(', ')
      } else {
        error.value = err.response.data.message || 'Erreur lors de la création du mot de passe'
      }
    } else {
      error.value = 'Erreur de connexion au serveur'
    }
  } finally {
    loading.value = false
  }
}
</script>
