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
  import { ref, nextTick } from 'vue'
  
  // Reactive array for 6-digit code
  const code = ref(Array(6).fill(''))
  // Track focused index for styling or logic
  const focused = ref(-1)
  // Refs to input elements
  const inputRefs = ref([])
  
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
  
  // Submission handler
  function submitCode() {
    const entered = code.value.join('')
    console.log('Code saisi :', entered)
    // TODO: appel API de confirmation
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
  
  /* Responsive adjustments */
  @media (max-width: 640px) {
    .max-w-lg { max-width: 95%; }
    input { width: 12vw; height: 12vw; font-size: 6vw; }
  }
  </style>
  