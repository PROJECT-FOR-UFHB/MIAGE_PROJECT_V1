<template>
  <button @click="logout" class="text-white hover:text-gray-200">
    <font-awesome-icon :icon="['fas', 'sign-out-alt']" class="mr-1" />
    Déconnexion
  </button>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import apiClient from '../services/apiClient'

const authStore = useAuthStore()
const router = useRouter()

const logout = async () => {
  try {
    // Appeler l'API de déconnexion
    await apiClient.post('/auth/logout')
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error)
  } finally {
    // Déconnecter l'utilisateur localement
    authStore.logout()
    // Rediriger vers la page de connexion
    router.push('/login')
  }
}
</script>
