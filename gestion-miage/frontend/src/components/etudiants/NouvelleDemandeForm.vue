<!-- NouvelleDemandeForm.vue -->
<template>
  <!-- Ici, on se contente du fond et du padding vertical puisque la gauche est déjà prise en compte par le layout -->
  <main class="bg-gray-100 min-h-screen pt-4">
    <div class="max-w-4xl mx-auto">
      <!-- Message de succès -->
      <div v-if="success" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
        {{ success }}
      </div>
      
      <!-- Message d'erreur -->
      <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {{ error }}
      </div>
      
      <form @submit.prevent="submitRequest">
        <!-- Section : Informations de l'étudiant -->
        <div class="bg-white p-6 rounded shadow mb-8">
          <h2 class="text-lg font-semibold mb-4">Informations de l'étudiant</h2>
          <div class="grid grid-cols-2 gap-4">
            <!-- Nom -->
            <div>
              <label class="block mb-1 font-medium flex items-center">
                <font-awesome-icon :icon="['fas', 'user']" class="text-brandBlue mr-2" />
                Nom de l'étudiant
              </label>
              <input 
                v-model="form.nom"
                type="text"
                class="border border-gray-300 rounded w-full px-2 py-1 focus:outline-none focus:ring-1 focus:ring-brandBlue" 
                :disabled="loading"
              />
            </div>
            <!-- Prénom -->
            <div>
              <label class="block mb-1 font-medium flex items-center">
                <font-awesome-icon :icon="['fas', 'user']" class="text-brandBlue mr-2" />
                Prénom de l'étudiant
              </label>
              <input 
                v-model="form.prenom"
                type="text"
                class="border border-gray-300 rounded w-full px-2 py-1 focus:outline-none focus:ring-1 focus:ring-brandBlue" 
                :disabled="loading"
              />
            </div>
            <!-- Niveau -->
            <div>
              <label class="block mb-1 font-medium flex items-center">
                <font-awesome-icon :icon="['fas', 'graduation-cap']" class="text-brandBlue mr-2" />
                Niveau
              </label>
              <select 
                v-model="form.id_niveau"
                class="border border-gray-300 rounded w-full px-2 py-1 focus:outline-none focus:ring-1 focus:ring-brandBlue"
                :disabled="loading"
              >
                <option disabled value="">Sélectionner votre niveau</option>
                <option value="L3">Licence 3</option>
                <option value="M1">Master 1</option>
                <option value="M2">Master 2</option>
              </select>
            </div>
            <!-- Année universitaire -->
            <div>
              <label class="block mb-1 font-medium flex items-center">
                <font-awesome-icon :icon="['fas', 'calendar']" class="text-brandBlue mr-2" />
                Année universitaire
              </label>
              <input 
                v-model="form.annee_document_demande"
                type="text"
                class="border border-gray-300 rounded w-full px-2 py-1 focus:outline-none focus:ring-1 focus:ring-brandBlue" 
                :disabled="loading"
              />
            </div>
          </div>
        </div>

        <!-- Section : Informations de la demande -->
        <div class="bg-white p-6 rounded shadow mb-8">
          <h2 class="text-lg font-semibold mb-4">Informations de la demande</h2>
          <div class="grid grid-cols-2 gap-4">
            <!-- Type de demande -->
            <div>
              <label class="block mb-1 font-medium flex items-center">
                <font-awesome-icon :icon="['fas', 'clipboard-list']" class="text-brandBlue mr-2" />
                Type de demande
              </label>
              <select 
                v-model="form.id_type_de_demande"
                class="border border-gray-300 rounded w-full px-2 py-1 focus:outline-none focus:ring-1 focus:ring-brandBlue"
                :disabled="loading"
                @change="loadRequiredFiles"
              >
                <option disabled value="">Sélectionner un type de demande</option>
                <option v-for="type in requestTypes" :key="type.id_type_de_demande" :value="type.id_type_de_demande">
                  {{ type.lib_type_de_demande }}
                </option>
              </select>
            </div>
            <!-- Libellé de la demande -->
            <div>
              <label class="block mb-1 font-medium flex items-center">
                <font-awesome-icon :icon="['fas', 'info-circle']" class="text-brandBlue mr-2" />
                Libellé de la demande
              </label>
              <input 
                v-model="form.titre"
                type="text"
                class="border border-gray-300 rounded w-full px-2 py-1 focus:outline-none focus:ring-1 focus:ring-brandBlue" 
                :disabled="loading"
              />
            </div>
            
            <!-- Description de la demande -->
            <div class="col-span-2">
              <label class="block mb-1 font-medium flex items-center">
                <font-awesome-icon :icon="['fas', 'info-circle']" class="text-brandBlue mr-2" />
                Description de la demande
              </label>
              <textarea 
                v-model="form.description"
                rows="4"
                class="border border-gray-300 rounded w-full px-2 py-1 focus:outline-none focus:ring-1 focus:ring-brandBlue"
                :disabled="loading"
              ></textarea>
            </div>
            
            <!-- Fichiers requis -->
            <div v-if="requiredFiles.length > 0" class="col-span-2 mt-4">
              <h3 class="text-md font-semibold mb-2">Documents requis</h3>
              <div v-for="(fileType, index) in requiredFiles" :key="index" class="mb-4">
                <label class="block mb-1 font-medium flex items-center">
                  <font-awesome-icon :icon="['fas', 'paperclip']" class="text-brandBlue mr-2" />
                  {{ fileType.lib_type_de_piece_jointe }} <span class="text-red-500 ml-1">*</span>
                </label>
                <input 
                  type="file"
                  @change="(e) => handleFileChange(e, fileType.id_type_de_piece_jointe)"
                  class="border border-gray-300 rounded w-full px-2 py-1 focus:outline-none focus:ring-1 focus:ring-brandBlue"
                  :disabled="loading"
                />
              </div>
            </div>
            
            <!-- Autres fichiers -->
            <div class="col-span-2">
              <label class="block mb-1 font-medium flex items-center">
                <font-awesome-icon :icon="['fas', 'paperclip']" class="text-brandBlue mr-2" />
                Autres documents
              </label>
              <input 
                type="file"
                multiple
                @change="handleOtherFilesChange"
                class="border border-gray-300 rounded w-full px-2 py-1 focus:outline-none focus:ring-1 focus:ring-brandBlue" 
                :disabled="loading"
              />
              <p class="text-sm text-gray-500 mt-1">Vous pouvez ajouter plusieurs fichiers</p>
            </div>
          </div>
        </div>

        <!-- Bouton d'envoi aligné à droite -->
        <div class="flex justify-end">
          <button 
            type="submit"
            class="bg-brandBlue text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
            :disabled="loading"
          >
            <span v-if="loading">Traitement en cours...</span>
            <span v-else>Envoyer la demande</span>
          </button>
        </div>
      </form>
    </div>
  </main>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { requestService, fileService, authService } from '@/services'

// État du formulaire
const form = reactive({
  nom: '',
  prenom: '',
  id_niveau: '',
  annee_document_demande: '',
  id_type_de_demande: '',
  titre: '',
  description: ''
})

// Autres états
const loading = ref(false)
const error = ref('')
const success = ref('')
const requestTypes = ref([])
const requiredFiles = ref([])
const files = reactive({
  required: {},
  other: []
})

// Charger les types de demandes lors du montage du composant
onMounted(async () => {
  try {
    loading.value = true
    
    // Récupérer les types de demandes
    const response = await requestService.getRequestTypes()
    
    // Vérifier le format de la réponse selon l'API
    if (response.data && response.data.status && response.data.data) {
      // Format standard de l'API: { status: true, data: [...] }
      requestTypes.value = response.data.data
    } else if (response.data && Array.isArray(response.data)) {
      // Format alternatif: directement un tableau
      requestTypes.value = response.data
    }
    
    // Récupérer les informations de l'utilisateur connecté
    const user = authService.getUser()
    if (user) {
      form.nom = user.nom || ''
      form.prenom = user.prenom || ''
    }
    
    // Mettre l'année universitaire actuelle par défaut
    const currentYear = new Date().getFullYear()
    form.annee_document_demande = `${currentYear}-${currentYear + 1}`
    
  } catch (err) {
    console.error('Erreur lors du chargement des types de demande:', err)
    error.value = 'Erreur lors du chargement des types de demande'
  } finally {
    loading.value = false
  }
})

// Charger les fichiers requis pour un type de demande
const loadRequiredFiles = async () => {
  if (!form.id_type_de_demande) return
  
  try {
    loading.value = true
    const response = await requestService.getRequiredFileTypes(form.id_type_de_demande)
    
    // Vérifier le format de la réponse
    if (response.data && response.data.status && response.data.data) {
      // Format standard API
      requiredFiles.value = response.data.data
    } else if (response.data && Array.isArray(response.data)) {
      // Format alternatif
      requiredFiles.value = response.data
    } else {
      requiredFiles.value = []
    }
  } catch (err) {
    console.error('Erreur lors du chargement des fichiers requis:', err)
    error.value = 'Erreur lors du chargement des types de fichiers requis'
    requiredFiles.value = []
  } finally {
    loading.value = false
  }
}

// Gérer le changement d'un fichier requis
const handleFileChange = (event, fileTypeId) => {
  if (event.target.files.length > 0) {
    files.required[fileTypeId] = event.target.files[0]
  } else {
    delete files.required[fileTypeId]
  }
}

// Gérer le changement des autres fichiers
const handleOtherFilesChange = (event) => {
  files.other = Array.from(event.target.files)
}

// Soumettre la demande
const submitRequest = async () => {
  // Réinitialiser les messages
  error.value = ''
  success.value = ''
  loading.value = true
  
  try {
    // Vérification des champs obligatoires
    if (!form.titre || !form.description || !form.id_type_de_demande || !form.id_niveau) {
      error.value = 'Veuillez remplir tous les champs obligatoires'
      loading.value = false
      return
    }
    
    // 1. Créer la demande selon le format API
    const requestData = {
      titre: form.titre,
      description: form.description,
      id_type_de_demande: form.id_type_de_demande,
      id_niveau: form.id_niveau,
      annee_document_demande: form.annee_document_demande
    }
    
    const requestResponse = await requestService.createRequest(requestData)
    
    // Vérifier la réponse selon le format API
    if (!requestResponse.data || !requestResponse.data.status || !requestResponse.data.data) {
      throw new Error('Format de réponse incorrect lors de la création de la demande')
    }
    
    const requestId = requestResponse.data.data.id_demande
    
    // 2. Télécharger les fichiers requis
    for (const [fileTypeId, file] of Object.entries(files.required)) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('id_demande', requestId)
      formData.append('id_type_de_piece_jointe', fileTypeId)
      
      await fileService.uploadFile(formData)
    }
    
    // 3. Télécharger les autres fichiers
    for (const file of files.other) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('id_demande', requestId)
      
      await fileService.uploadFile(formData)
    }
    
    // Réinitialiser le formulaire après le succès
    Object.keys(form).forEach(key => {
      if (key !== 'nom' && key !== 'prenom' && key !== 'annee_document_demande') {
        form[key] = ''
      }
    })
    
    files.required = {}
    files.other = []
    requiredFiles.value = []
    
    success.value = 'Votre demande a été soumise avec succès'
    
  } catch (err) {
    console.error('Erreur lors de la soumission de la demande:', err)
    
    if (err.response && err.response.data) {
      if (err.response.data.errors) {
        // Gestion des erreurs de validation selon l'API
        const errorMessages = Object.values(err.response.data.errors).flat()
        error.value = errorMessages.join(', ')
      } else if (err.response.data.message) {
        // Message d'erreur standard de l'API
        error.value = err.response.data.message
      } else {
        error.value = 'Erreur lors de la soumission de la demande'
      }
    } else {
      error.value = 'Erreur de connexion au serveur'
    }
  } finally {
    loading.value = false
  }
}
</script>
