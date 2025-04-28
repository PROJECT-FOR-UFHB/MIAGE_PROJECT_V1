<template>
  <button 
    @click="logout" 
    class="flex items-center px-4 py-2 text-red-600 hover:bg-red-100 hover:text-red-800 rounded transition-colors"
    :disabled="loading"
  >
    <font-awesome-icon icon="sign-out-alt" class="mr-2" />
    <span v-if="loading">Déconnexion...</span>
    <span v-else>Se déconnecter</span>
  </button>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '@/services'

const router = useRouter()
const loading = ref(false)

const logout = async () => {
  loading.value = true
  
  try {
    await authService.logout()
    // Redirection vers la page de connexion
    router.push('/auth/login')
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error)
    // En cas d'erreur, on force la déconnexion côté client
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user')
    localStorage.removeItem('user_role')
    router.push('/auth/login')
  } finally {
    loading.value = false
  }
}
</script> 