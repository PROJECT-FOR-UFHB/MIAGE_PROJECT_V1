<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold text-center mb-6">Connexion</h1>
      
      <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {{ error }}
      </div>

      <form @submit.prevent="login">
        <!-- Email -->
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
        
        <!-- Mot de passe -->
        <div class="mb-6">
          <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Mot de passe</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            placeholder="Votre mot de passe"
            required
          />
          <div class="text-right mt-2">
            <router-link to="/auth/request-password-reset" class="text-sm text-blue-500 hover:underline">
              Mot de passe oublié ?
            </router-link>
          </div>
        </div>
        
        <!-- Bouton de connexion -->
        <div class="mb-6">
          <button
            type="submit"
            class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            :disabled="loading"
          >
            <span v-if="loading">Connexion en cours...</span>
            <span v-else>Se connecter</span>
          </button>
        </div>
        
        <!-- Lien vers l'inscription -->
        <div class="text-center">
          <p class="text-sm">
            Vous n'avez pas de compte ?
            <router-link to="/auth/register" class="text-blue-500 hover:underline">
              Inscrivez-vous
            </router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter }    from 'vue-router'
import authService      from '@/services/authService'  // garde ton chemin d'import d'origine

const router  = useRouter()
const loading = ref(false)
const error   = ref('')

const form = reactive({
  email: '',
  password: ''
})

const login = async () => {
  loading.value = true
  error.value   = ''

  try {
    // Appel à l'API pour se connecter
    await authService.login(form.email, form.password)

    // Récupérer le code du rôle stocké (ETU, SEC, etc.)
    const role = authService.getUserRole()

    // Rediriger comme à l'inscription
    if (role === 'ETU') {
      router.push('/etudiants/espace-etudiant')
    } else if (role === 'SEC') {
      router.push('/secretariat/tableau-de-bord')
    } else {
      router.push('/')  // fallback si rôle inattendu
    }

  } catch (err) {
    if (err.response?.data?.message) {
      error.value = err.response.data.message
    } else {
      error.value = 'Erreur de connexion au serveur'
    }
  } finally {
    loading.value = false
  }
}
</script>
