<template>
  <main class="bg-gray-100 min-h-screen pt-6">
    <div class="max-w-3xl mx-auto bg-white rounded shadow p-6">
      <h2 class="text-2xl font-semibold mb-4">Mon profil</h2>

      <!-- Formulaire de profil -->
      <form @submit.prevent="submit" class="space-y-4">
        <!-- Champ nom -->
        <div>
          <label class="block font-medium">Nom</label>
          <input v-model="form.nom" class="input" />
        </div>

        <!-- Champ prénom -->
        <div>
          <label class="block font-medium">Prénom</label>
          <input v-model="form.prenom" class="input" />
        </div>

        <!-- Champ email -->
        <div>
          <label class="block font-medium">Email</label>
          <input v-model="form.email" class="input" />
        </div>

        <!-- Champ mot de passe -->
        <div>
          <label class="block font-medium">Nouveau mot de passe</label>
          <input v-model="form.password" type="password" class="input" />
        </div>

        <!-- Bouton -->
        <div class="text-right">
          <button
            type="submit"
            class="bg-brandBlue text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Mettre à jour
          </button>
        </div>
      </form>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// import { profileService } from '@/services' // 🔌 à activer plus tard

// 🔧 Formulaire avec données mockées
const form = ref({
  nom: 'Kouassi',
  prenom: 'Yao',
  email: 'yao.kouassi@univ.ci',
  password: ''
})

// 📦 Chargement initial (simulation)
onMounted(() => {
  // Exemple futur :
  // const res = await profileService.getMe()
  // form.value = res.data
})

// 📨 Soumission
const submit = async () => {
  alert('✅ Profil mis à jour (simulation)')
  // await profileService.update(form.value)
}
</script>

<style scoped>
.input {
  @apply border px-3 py-2 w-full rounded mt-1;
}
</style>
