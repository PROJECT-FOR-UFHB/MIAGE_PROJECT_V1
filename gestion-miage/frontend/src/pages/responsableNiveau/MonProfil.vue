<template>
    <main class="bg-gray-100 min-h-screen pt-6">
      <div class="max-w-2xl mx-auto bg-white p-6 rounded shadow">
        <h2 class="text-xl font-semibold mb-6">Mon profil</h2>
  
        <!-- ✅ Message de succès -->
        <div
          v-if="success"
          class="bg-green-100 text-green-700 px-4 py-3 rounded mb-4 border border-green-300"
        >
          {{ success }}
        </div>
  
        <!-- ❌ Message d’erreur -->
        <div
          v-if="error"
          class="bg-red-100 text-red-700 px-4 py-3 rounded mb-4 border border-red-300"
        >
          {{ error }}
        </div>
  
        <!-- 📋 Formulaire -->
        <form @submit.prevent="mettreAJourProfil">
          <div class="space-y-4">
            <!-- 📛 Nom -->
            <div>
              <label class="block font-medium">Nom</label>
              <input
                v-model="form.nom"
                type="text"
                class="form-input"
                :disabled="loading"
              />
            </div>
  
            <!-- 📛 Prénom -->
            <div>
              <label class="block font-medium">Prénom</label>
              <input
                v-model="form.prenom"
                type="text"
                class="form-input"
                :disabled="loading"
              />
            </div>
  
            <!-- ✉️ Email -->
            <div>
              <label class="block font-medium">Email</label>
              <input
                v-model="form.email"
                type="email"
                class="form-input"
                :disabled="loading"
              />
            </div>
  
            <!-- 🎓 Niveau supervisé -->
            <div>
              <label class="block font-medium">Niveau supervisé</label>
              <input
                type="text"
                class="form-input bg-gray-100"
                :value="niveauSupervise"
                disabled
              />
            </div>
  
            <!-- 🔒 Nouveau mot de passe -->
            <div>
              <label class="block font-medium">Nouveau mot de passe</label>
              <input
                v-model="form.mot_de_passe"
                type="password"
                class="form-input"
                :disabled="loading"
              />
            </div>
          </div>
  
          <div class="mt-6 text-right">
            <button
              type="submit"
              class="bg-brandBlue text-white px-4 py-2 rounded hover:bg-blue-700"
              :disabled="loading"
            >
              {{ loading ? "Enregistrement..." : "Mettre à jour" }}
            </button>
          </div>
        </form>
      </div>
    </main>
  </template>
  
  <script setup>
  import { ref, reactive, onMounted } from 'vue'
  // import { responsableService } from '@/services' // ← Pour les appels API
  
  const loading = ref(false)
  const success = ref('')
  const error = ref('')
  const niveauSupervise = ref('Licence 3') // 👈 À remplacer plus tard par une valeur depuis l'API
  
  const form = reactive({
    nom: '',
    prenom: '',
    email: '',
    mot_de_passe: ''
  })
  
  // 📥 Charger les infos depuis l’API (mocké ici)
  onMounted(async () => {
    loading.value = true
    try {
      // const res = await responsableService.getProfile()
      // Object.assign(form, res.data)
      form.nom = 'Kouassi'
      form.prenom = 'Jean-Pierre'
      form.email = 'jean.kouassi@univ.edu'
    } catch (err) {
      error.value = 'Erreur de chargement du profil'
    } finally {
      loading.value = false
    }
  })
  
  // 📤 Enregistrer les modifications
  const mettreAJourProfil = async () => {
    loading.value = true
    error.value = ''
    success.value = ''
  
    try {
      // await responsableService.updateProfile(form)
      success.value = 'Profil mis à jour avec succès'
      form.mot_de_passe = ''
    } catch (err) {
      error.value = 'Erreur lors de la mise à jour du profil'
    } finally {
      loading.value = false
    }
  }
  </script>
  
  <style scoped>
  .form-input {
    @apply border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring focus:ring-blue-300;
  }
  </style>
  