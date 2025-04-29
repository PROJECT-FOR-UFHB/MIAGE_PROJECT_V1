<template>
  <div class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <!-- Animated subtle gradient background -->
    <div class="absolute inset-0 bg-gradient-to-r from-gray-400 via-gray-200 to-blue-300 animate-gradient"></div>
    <!-- Semi-transparent overlay -->
    <div class="absolute inset-0 bg-black opacity-50"></div>

    <!-- Login Card -->
    <div
      class="relative bg-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-2xl w-full max-w-md transform transition-transform duration-500 hover:scale-105 animate-fade-up"
    >
      <div class="flex items-center justify-center space-x-4 mb-6">
        <!-- Title -->
        <h1 class="text-3xl sm:text-4xl font-extrabold text-gray-800 tracking-wide">Connexion</h1>
        <!-- Animated Face for Email -->
        <div class="w-12 h-12" :class="{'animate-smile': faceState === 'smile', 'animate-stare': faceState === 'stare'}">
          <svg viewBox="0 0 100 100" class="w-full h-full">
            <circle cx="50" cy="50" r="48" fill="#FFE0B2" stroke="#F5A623" stroke-width="4" />
            <!-- Eyes -->
            <circle cx="35" cy="40" r="6" fill="#333" />
            <circle cx="65" cy="40" r="6" fill="#333" />
            <!-- Mouth changes with state -->
            <path v-if="faceState === 'smile'" d="M30,60 Q50,80 70,60" stroke="#333" stroke-width="4" fill="none" stroke-linecap="round" />
            <path v-else d="M30,65 Q50,60 70,65" stroke="#333" stroke-width="4" fill="none" stroke-linecap="round" />
          </svg>
        </div>
      </div>

      <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 animate-shake">
        {{ error }}
      </div>

      <form @submit.prevent="login" class="space-y-6">
        <!-- Email Field -->
        <div>
          <label for="email" class="block text-gray-700 text-sm sm:text-base font-semibold mb-2">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            @focus="onEmailFocus"
            @input="onEmailInput"
            @blur="onEmailBlur"
            class="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition-all duration-300 placeholder-gray-400 text-sm sm:text-base"
            placeholder="votre.email@example.com"
            required
          />
        </div>

        <!-- Password Field with Figure Toggle -->
        <div class="relative">
          <label for="password" class="block text-gray-700 text-sm sm:text-base font-semibold mb-2">Mot de passe</label>
          <input
            :type="passwordVisible ? 'text' : 'password'"
            id="password"
            v-model="form.password"
            class="w-full px-4 pr-12 py-3 sm:py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition-all duration-300 placeholder-gray-400 text-sm sm:text-base"
            placeholder="Votre mot de passe"
            required
          />
          <!-- Toggle Button with Small Figure -->
          <button
            type="button"
            @click="togglePassword"
            class="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <div class="w-8 h-8 relative" :class="{'cover-eyes': !passwordVisible, 'uncover-eyes': passwordVisible}">
              <svg viewBox="0 0 100 100" class="w-full h-full">
                <circle cx="50" cy="50" r="48" fill="#BBDEFB" stroke="#2196F3" stroke-width="4" />
                <!-- Eyes -->
                <circle cx="35" cy="40" r="6" fill="#333" />
                <circle cx="65" cy="40" r="6" fill="#333" />
                <!-- Hands to cover eyes -->
                <rect v-if="!passwordVisible" x="25" y="30" width="20" height="10" fill="#BBDEFB" class="hand-left transition-transform duration-500" />
                <rect v-if="!passwordVisible" x="55" y="30" width="20" height="10" fill="#BBDEFB" class="hand-right transition-transform duration-500" />
              </svg>
            </div>
          </button>
          <div class="text-right mt-2">
            <router-link to="/auth/request-password-reset" class="text-sm sm:text-base text-blue-500 hover:underline hover:text-blue-600 transition-colors duration-300">
              Mot de passe oublié ?
            </router-link>
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 sm:py-4 px-6 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 active:scale-95 relative overflow-hidden"
            :disabled="loading"
          >
            <span v-if="loading">Connexion en cours...</span>
            <span v-else>Se connecter</span>
          </button>
        </div>

        <div class="text-center">
          <p class="text-sm sm:text-base text-gray-100">
            Vous n'avez pas de compte ?
            <router-link to="/auth/register" class="text-blue-300 hover:underline hover:text-blue-100 transition-colors duration-300">
              Inscrivez-vous
            </router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: { email: '', password: '' },
      error: null,
      loading: false,
      faceState: 'neutral', // 'neutral' | 'smile' | 'stare'
      passwordVisible: false,
    };
  },
  methods: {
    onEmailFocus() {
      this.faceState = 'smile';
    },
    onEmailInput() {
      this.faceState = 'smile';
    },
    onEmailBlur() {
      this.faceState = 'stare';
    },
    togglePassword() {
      this.passwordVisible = !this.passwordVisible;
    },
    async login() {
      this.loading = true;
      try {
        // appel API de connexion
      } catch (err) {
        this.error = err.message;
        this.faceState = 'shake';
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
/* Gradient animation */
@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 8s ease infinite;
}

/* Fade up card */
@keyframes fadeUp {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}
.animate-fade-up {
  animation: fadeUp 0.8s ease-out forwards;
}

/* Shake error */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-10px); }
  40%, 80% { transform: translateX(10px); }
}
.animate-shake {
  animation: shake 0.5s ease-in-out;
}

/* Face animations */
@keyframes smile {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}
.animate-smile {
  animation: smile 1s ease-in-out infinite;
}

@keyframes stare {
  0% { transform: translateY(0); }
  50% { transform: translateY(-2px); }
  100% { transform: translateY(0); }
}
.animate-stare {
  animation: stare 2s ease-in-out infinite;
}

/* Hands cover/uncover eyes */
.cover-eyes .hand-left {
  transform: translate(-10px, -10px) rotate(-20deg);
}
.cover-eyes .hand-right {
  transform: translate(10px, -10px) rotate(20deg);
}
.uncover-eyes .hand-left,
.uncover-eyes .hand-right {
  transform: translate(0, -30px);
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .max-w-md { max-width: 90%; }
  .p-6 { padding: 1.5rem; }
}
</style>
