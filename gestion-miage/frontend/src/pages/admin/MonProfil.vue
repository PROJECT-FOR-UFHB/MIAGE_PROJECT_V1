<template>
  <main class="bg-gray-100 min-h-screen pt-10">
    <div class="max-w-3xl mx-auto bg-white p-6 rounded shadow space-y-6">

      <!-- 🔹 Informations personnelles -->
      <section>
        <h2 class="text-xl font-semibold mb-4 text-gray-800">Mes informations</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block mb-1 font-medium text-sm">Nom</label>
            <input v-model="form.nom" type="text" class="input-style" disabled />
          </div>
          <div>
            <label class="block mb-1 font-medium text-sm">Prénom</label>
            <input v-model="form.prenom" type="text" class="input-style" disabled />
          </div>
          <div>
            <label class="block mb-1 font-medium text-sm">Email</label>
            <input v-model="form.email" type="email" class="input-style" />
          </div>
          <div>
            <label class="block mb-1 font-medium text-sm">Téléphone</label>
            <input v-model="form.telephone" type="tel" class="input-style" />
          </div>
        </div>
        <button @click="updateInfo" class="btn-primary mt-4" :disabled="loading">
          Mettre à jour
        </button>
      </section>

      <!-- 🔒 Modification mot de passe -->
      <section>
        <h2 class="text-xl font-semibold mb-4 text-gray-800">Changer mon mot de passe</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block mb-1 font-medium text-sm">Mot de passe actuel</label>
            <input v-model="passwordForm.current" type="password" class="input-style" />
          </div>
          <div>
            <label class="block mb-1 font-medium text-sm">Nouveau mot de passe</label>
            <input v-model="passwordForm.new" type="password" class="input-style" />
          </div>
        </div>
        <button @click="changePassword" class="btn-primary mt-4" :disabled="loading">
          Changer le mot de passe
        </button>
      </section>

      <!-- ✍️ Clé de signature numérique -->
      <section>
        <h2 class="text-xl font-semibold mb-4 text-gray-800">Clé de signature numérique</h2>
        <div>
          <label class="block mb-1 font-medium text-sm">Clé actuelle</label>
          <input v-model="form.signatureKey" type="text" class="input-style" placeholder="XXXX-XXXX-XXXX" />
          <small class="text-gray-500 text-sm">Utilisée pour signer les documents PDF de manière sécurisée.</small>
        </div>
        <button @click="updateKey" class="btn-primary mt-4" :disabled="loading">
          Mettre à jour la clé
        </button>
      </section>

      <!-- Message -->
      <div v-if="message" class="text-green-600 font-medium">{{ message }}</div>
      <div v-if="error" class="text-red-600 font-medium">{{ error }}</div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// État du formulaire principal
const form = ref({
  nom: '',
  prenom: '',
  email: '',
  telephone: '',
  signatureKey: ''
})

// Changement de mot de passe
const passwordForm = ref({
  current: '',
  new: ''
})

const message = ref('')
const error = ref('')
const loading = ref(false)

// 📡 Récupération du profil utilisateur (remplacer plus tard par un vrai appel API)
onMounted(() => {
  // 🔁 À remplacer par : await directorService.getProfile()
  const mockUser = {
    nom: 'Konan',
    prenom: 'Boris',
    email: 'boris@miage.edu.ci',
    telephone: '0708123456',
    signatureKey: 'MIAGE-2025-SIGN'
  }
  form.value = { ...mockUser }
})

// 💾 Mise à jour des infos personnelles
const updateInfo = async () => {
  loading.value = true
  message.value = ''
  error.value = ''
  try {
    // 📡 Appel API à faire : await directorService.updateProfile(form.value)
    await new Promise(res => setTimeout(res, 1000))
    message.value = 'Informations mises à jour avec succès.'
  } catch (err) {
    error.value = 'Erreur lors de la mise à jour.'
  } finally {
    loading.value = false
  }
}

// 🔑 Mise à jour mot de passe
const changePassword = async () => {
  loading.value = true
  message.value = ''
  error.value = ''
  try {
    if (!passwordForm.value.current || !passwordForm.value.new) {
      error.value = 'Veuillez remplir les champs du mot de passe.'
      return
    }
    // 📡 Appel API à faire : await directorService.updatePassword(passwordForm.value)
    await new Promise(res => setTimeout(res, 1000))
    message.value = 'Mot de passe modifié.'
    passwordForm.value = { current: '', new: '' }
  } catch (err) {
    error.value = 'Erreur lors du changement de mot de passe.'
  } finally {
    loading.value = false
  }
}

// 🔐 Mise à jour de la clé
const updateKey = async () => {
  loading.value = true
  message.value = ''
  error.value = ''
  try {
    if (!form.value.signatureKey) {
      error.value = 'Veuillez entrer une clé.'
      return
    }
    // 📡 Appel API à faire : await directorService.updateSignatureKey(form.value.signatureKey)
    await new Promise(res => setTimeout(res, 1000))
    message.value = 'Clé mise à jour avec succès.'
  } catch (err) {
    error.value = 'Erreur lors de la mise à jour de la clé.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.input-style {
  @apply w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500;
}
.btn-primary {
  @apply bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition;
}
</style>
