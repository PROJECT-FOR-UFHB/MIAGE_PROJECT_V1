import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(null)

  // Computed
  const isAuthenticated = computed(() => !!token.value)

  // Actions
  function setUser(userData) {
    user.value = userData
  }

  function setToken(tokenValue) {
    token.value = tokenValue
    if (tokenValue) {
      sessionStorage.setItem('auth_token', tokenValue)
    } else {
      sessionStorage.removeItem('auth_token')
    }
  }

  function logout() {
    user.value = null
    token.value = null
    sessionStorage.removeItem('auth_token')
    sessionStorage.removeItem('user')
  }

  // Initialize from session storage
  function init() {
    const storedToken = sessionStorage.getItem('auth_token')
    if (storedToken) {
      token.value = storedToken
    }

    const storedUser = sessionStorage.getItem('user')
    if (storedUser) {
      try {
        user.value = JSON.parse(storedUser)
      } catch (e) {
        console.error('Failed to parse stored user', e)
      }
    }
  }

  // Call init when the store is created
  init()

  return {
    user,
    token,
    isAuthenticated,
    setUser,
    setToken,
    logout,
    init
  }
})
