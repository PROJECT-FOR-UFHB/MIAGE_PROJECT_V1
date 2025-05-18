<template>
  <div class="max-w-6xl mx-auto bg-white rounded shadow p-6">
    <div v-if="loading" class="flex justify-center items-center p-8">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
    
    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {{ error }}
    </div>
    
    <div v-else>
      <!-- En-tête avec les informations principales -->
      <div class="mb-6 border-b pb-4">
        <div class="flex justify-between items-start">
          <div>
            <h1 class="text-2xl font-bold">{{ request.type_de_demande.lib_type_de_demande }}</h1>
            <p class="text-gray-600">
              <span class="font-semibold">Demande #{{ request.id_demande }}</span> - 
              Soumise le {{ formatDate(request.created_at) }}
            </p>
          </div>
          <span 
            class="px-3 py-1 rounded text-sm font-semibold"
            :class="getStatusClass(request.statut.id_statut)"
          >
            {{ request.statut.statut }}
          </span>
        </div>
      </div>
      
      <!-- Informations et documents -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <!-- Colonne de gauche: Infos demande et étudiant -->
        <div>
          <h2 class="text-lg font-semibold mb-4">Informations de la demande</h2>
          
          <div class="bg-gray-50 p-4 rounded mb-6">
            <div class="mb-4">
              <p class="text-sm text-gray-500">Type de demande</p>
              <p>{{ request.type_de_demande?.lib_type_de_demande || 'N/A' }}</p>
            </div>
            
           <!-- <div class="mb-4">
              <p class="text-sm text-gray-500">Description</p>
              <p class="whitespace-pre-line">{{ request.description }}</p>
            </div>-->
            
            <div class="mb-4">
              <p class="text-sm text-gray-500">Niveau</p>
              <p>{{ request.niveau.lib_niveau || 'N/A' }}</p>
            </div>
            
            <div>
              <p class="text-sm text-gray-500">Année du document demandé</p>
              <p>{{ request.annee_document_demande || 'N/A' }}</p>
            </div>
          </div>
          
          <h2 class="text-lg font-semibold mb-4">Informations de l'étudiant</h2>
          
          <div class="bg-gray-50 p-4 rounded">
            <div class="mb-4">
              <p class="text-sm text-gray-500">Nom</p>
              <p>{{ request.etudiant?.nom || 'N/A' }}</p>
            </div>
            
            <div class="mb-4">
              <p class="text-sm text-gray-500">Prénom</p>
              <p>{{ request.etudiant?.prenom || 'N/A' }}</p>
            </div>
            
            <div>
              <p class="text-sm text-gray-500">Email</p>
              <p>{{ request.etudiant?.email || 'N/A' }}</p>
            </div>
          </div>
        </div>
        
        <!-- Colonne de droite: Documents attachés -->
        <div>
          <h2 class="text-lg font-semibold mb-4">Documents attachés</h2>
          
          <div v-for="file in files" :key="file.id_piece" class="mb-4">
              <!-- Si le fichier est une image -->
              <div v-if="isImage(file.fichier_path)">

                <DocumentPreview
                  :title="file.type_de_piece_jointe.lib_type_de_piece_jointe"
                  :imageSrc="getFileUrl(file.fichier_path)"
                  :downloadLink="getFileUrl(file.fichier_path)"
                />
                          
              </div>

              <!-- Si c'est un PDF -->
              <div v-else-if="isPdf(file.fichier_path)">
                  <DocumentPreviewPdf
                    :title="file.type_de_piece_jointe.lib_type_de_piece_jointe"
                    :src="getCorsUrl(file.id_piece)"
                  />
                  
              </div>

              <!-- Si c’est un autre type de fichier -->
              <div v-else>
                <font-awesome-icon icon="file-alt" class="text-blue-500 text-3xl" />
              </div>

              <!-- Nom du type de pièce et bouton de téléchargement -->

          </div>
          
          <h2 class="text-lg font-semibold mb-4">Progression de la demande</h2>
          
          <div class="bg-gray-50 p-4 rounded">
            <div v-for="(step, index) in validationSteps" :key="index" class="mb-4 flex items-start">
              <div class="mr-2 mt-1">
                <div 
                  class="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs"
                  :class="getStepStatusClass(step.status)"
                >
                  <font-awesome-icon v-if="step.status === 'completed'" icon="check" />
                  <font-awesome-icon v-else-if="step.status === 'rejected'" icon="times" />
                  <span v-else>{{ index + 1 }}</span>
                </div>
                <div v-if="index < validationSteps.length - 1" class="w-0.5 h-8 bg-gray-300 mx-auto"></div>
              </div>
              <div>
                <p class="font-medium">{{ step.name }}</p>
                <p class="text-sm text-gray-500">{{ step.date || 'En attente' }}</p>
                <p v-if="step.comment" class="text-sm italic mt-1">"{{ step.comment }}"</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Formulaire de traitement -->
      <div v-if="canProcess" class="mb-6 bg-blue-50 p-4 rounded">
        <h2 class="text-lg font-semibold mb-4">Traiter cette demande</h2>
        
        <div v-if="processingSuccess" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {{ processingSuccess }}
        </div>
        
        <div v-if="processingError" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {{ processingError }}
        </div>
        
        <form @submit.prevent="processRequest">
          <div class="mb-4">
            <label class="block mb-1 font-medium">
              Décision
            </label>
            <div class="flex space-x-4">
              <label class="inline-flex items-center">
                <input 
                  type="radio" 
                  v-model="processing.decision" 
                  value="approved" 
                  class="text-blue-500"
                  :disabled="processingLoading"
                />
                <span class="ml-2">Approuver</span>
              </label>
              <label class="inline-flex items-center">
                <input 
                  type="radio" 
                  v-model="processing.decision" 
                  value="rejected" 
                  class="text-red-500"
                  :disabled="processingLoading"
                />
                <span class="ml-2">Rejeter</span>
              </label>
            </div>
          </div>
          
          <div class="mb-4">
            <label class="block mb-1 font-medium">
              Commentaire
            </label>
            <textarea 
              v-model="processing.comment"
              rows="3"
              class="border border-gray-300 rounded w-full px-2 py-1 focus:outline-none focus:ring-1 focus:ring-brandBlue"
              :disabled="processingLoading"
            ></textarea>
          </div>
          
          <div class="flex justify-end">
            <button 
              type="submit"
              class="bg-brandBlue text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
              :disabled="processingLoading"
            >
              <span v-if="processingLoading">Traitement en cours...</span>
              <span v-else>Soumettre la décision</span>
            </button>
          </div>
        </form>
      </div>
      
      <!-- Boutons d'action -->
      <div class="flex justify-end space-x-4">
        <router-link 
          to="/secretariat/demandes-recus" 
          class="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
        >
          Retour
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { requestService, fileService } from '@/services'
import DocumentPreview from "@/components/DocumentPreview.vue";
import DocumentPreviewPdf from "@/components/DocumentPreviewPdf.vue";


const route = useRoute()
const router = useRouter()
const loading = ref(true)
const error = ref('')
const request = ref({})
let files = []
const validationSteps = reactive([
  { name: 'Secrétariat', status: 'pending', date: null, comment: null },
  { name: 'Service financier', status: 'pending', date: null, comment: null },
  { name: 'Directeur MIAGE', status: 'pending', date: null, comment: null },
  { name: 'Directeur UFR', status: 'pending', date: null, comment: null }
])
const processingLoading = ref(false)
const processingError = ref('')
const processingSuccess = ref('')
const processing = reactive({
  decision: 'approved',
  comment: ''
})

// Déterminer si la demande peut être traitée
const canProcess = computed(() => {
  if (!request.value || !request.value.statut) return false
  
  // La demande peut être traitée si elle est "En attente" ou "En cours"
  const status = request.value.statut.id_statut
  return status === 'en attente' || status === 'en cours'
})

/**
 * Pendant le chargement de la page
 */
onMounted(async () => {
  const urlIdDemande = route.params.id
  
  try {
    await Promise.all([
      loadRequest(urlIdDemande),
      loadValidationHistory(urlIdDemande)
    ])
  } catch (err) {
    error.value = 'Erreur lors du chargement des données de la demande.'
  } finally {
    loading.value = false
  }
})

// Charger les détails de la demande
const loadRequest = async (urlIdDemande) => {
  try {
    const response = await requestService.getRequest(urlIdDemande)
    if (response.data && response.data.status) {
      request.value = response.data.data
      files = response.data.data.pieces_jointes || []

      console.log(request.value)
    } else {
      throw new Error('Impossible de charger les détails de la demande')
    }
  } catch (err) {
    console.error('Erreur lors du chargement de la demande:', err)
    throw err
  }
}

// Charger l'historique des validations
const loadValidationHistory = async (urlIdDemande) => {
  try {
    const response = await requestService.getValidationHistory(urlIdDemande)
    if (response.data && response.data.status) {
      const history = response.data.data || []
      
      // Mettre à jour les étapes de validation
      history.forEach(validation => {
        let stepIndex = -1
        
        if (validation.type === 'secretary') stepIndex = 0
        else if (validation.type === 'financial') stepIndex = 1
        else if (validation.type === 'director') stepIndex = 2
        else if (validation.type === 'ufr_director') stepIndex = 3
        
        if (stepIndex >= 0) {
          validationSteps[stepIndex].status = validation.status === 'approved' ? 'completed' : 'rejected'
          validationSteps[stepIndex].date = formatDate(validation.date)
          validationSteps[stepIndex].comment = validation.comment
        }
      })
      
      // Mettre à jour le statut des étapes en attente
      // Si une étape est rejetée, toutes les étapes suivantes restent en attente
      // Si une étape est complétée, l'étape suivante devient active
      let activeFound = false
      for (let i = 0; i < validationSteps.length; i++) {
        if (validationSteps[i].status === 'rejected') {
          break
        }
        
        if (validationSteps[i].status === 'pending' && !activeFound) {
          validationSteps[i].status = 'active'
          activeFound = true
        }
      }
    }
  } catch (err) {
    console.error('Erreur lors du chargement de l\'historique des validations:', err)
    // On ne relaie pas cette erreur car ce n'est pas critique
  }
}

// Télécharger un fichier
const downloadFile = async (fileId) => {
  try {
    const response = await fileService.getFile(fileId)
    
    // Créer un lien pour télécharger le fichier
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    
    // Essayer de récupérer le nom du fichier depuis les en-têtes
    const contentDisposition = response.headers['content-disposition']
    let filename = 'fichier'
    
    if (contentDisposition) {
      const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
      const matches = filenameRegex.exec(contentDisposition)
      if (matches != null && matches[1]) {
        filename = matches[1].replace(/['"]/g, '')
      }
    }
    
    link.setAttribute('download', filename)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
  } catch (err) {
    console.error('Erreur lors du téléchargement du fichier:', err)
    alert('Erreur lors du téléchargement du fichier')
  }
}

// Traiter la demande
const processRequest = async () => {
  processingLoading.value = true
  processingError.value = ''
  processingSuccess.value = ''
  
  try {
    // Préparer les données pour la validation
    const validationData = {
      id_demande: request.value.id_demande,
      statut: processing.decision === 'approved' ? true : false,
      commentaire: processing.comment,
      id_personnel: sessionStorage.getItem('user_id')
    }
    
    // Appeler l'API pour traiter la demande
    await requestService.validateRequest(validationData)
    
    // Mettre à jour l'interface
    processingSuccess.value = `La demande a été ${processing.decision === 'approved' ? 'approuvée' : 'rejetée'} avec succès.`
    
    // Recharger les données après traitement
    await Promise.all([
      loadRequest(request.value.id),
      loadValidationHistory(request.value.id)
    ])
    
    // Réinitialiser le formulaire
    processing.comment = ''
    
  } catch (err) {
    console.error('Erreur lors du traitement de la demande:', err)
    
    if (err.response && err.response.data) {
      processingError.value = err.response.data.message || 'Erreur lors du traitement de la demande.'
    } else {
      processingError.value = 'Erreur de connexion au serveur.'
    }
  } finally {
    processingLoading.value = false
  }
}

// Formater la date
const formatDate = (dateString) => {
  if (!dateString) return null
  
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

// Formater la taille du fichier
const formatFileSize = (bytes) => {
  if (!bytes || isNaN(bytes)) return 'Taille inconnue'
  
  const sizes = ['octets', 'Ko', 'Mo', 'Go']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`
}

// Obtenir la classe CSS en fonction du statut
const getStatusClass = (status) => {
  if (!status) return 'bg-gray-200 text-gray-800'
  
  switch (status.toLowerCase()) {
    case 'NIV01':
      return 'bg-yellow-100 text-yellow-800'
    case 'validée':
    case 'approuvée':
      return 'bg-green-100 text-green-800'
    case 'rejetée':
      return 'bg-red-100 text-red-800'
    case 'en cours':
      return 'bg-blue-100 text-blue-800'
    default:
      return 'bg-gray-200 text-gray-800'
  }
}

// Obtenir la classe CSS en fonction du statut de l'étape
const getStepStatusClass = (status) => {
  switch (status) {
    case 'completed':
      return 'bg-green-500'
    case 'active':
      return 'bg-blue-500'
    case 'rejected':
      return 'bg-red-500'
    default:
      return 'bg-gray-300 text-gray-600'
  }
}

const getFileExtension = (filename) => {
  return filename.split('.').pop().toLowerCase()
}

const isImage = (file) => {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp']
  const ext = getFileExtension(file || '')
  return imageExtensions.includes(ext)
}

const isPdf = (file) => {
  console.log(file)
  const ext = getFileExtension(file || '')
  return ext === 'pdf'
}
const getFileUrl = (cheminFichier) => {
  return `${import.meta.env.VITE_FILE_URL}${cheminFichier}`
}
const getCorsUrl = (idPiece) => {
  return `${import.meta.env.VITE_API_URL}/files/${idPiece}`
}
</script> 
