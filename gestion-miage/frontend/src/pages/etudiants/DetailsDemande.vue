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
            <h1 class="text-2xl font-bold">{{ request.titre }}</h1>
            <p class="text-gray-600">
              <span class="font-semibold">Demande #{{ request.id_demande }}</span> - 
              Créée le {{ formatDate(request.created_at) }}
            </p>
          </div>
          <span 
            class="px-3 py-1 rounded text-sm font-semibold"
            :class="getStatusClass(request.id_statut)"
          >
            {{ request.statut }}
          </span>
        </div>
      </div>
      
      <!-- Informations détaillées -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <!-- Colonne de gauche: Infos demande -->
        <div>
          <h2 class="text-lg font-semibold mb-4">Informations de la demande</h2>
          
          <div class="bg-gray-50 p-4 rounded">
            <div class="mb-4">
              <p class="text-sm text-gray-500">Type de demande</p>
              <p>{{ request?.id_type_de_demande || 'N/A' }}</p>
            </div>
            
            <div class="mb-4">
              <p class="text-sm text-gray-500">Description</p>
              <p class="whitespace-pre-line">{{ request.description }}</p>
            </div>
            
            <div class="mb-4">
              <p class="text-sm text-gray-500">Niveau</p>
              <p>{{ request.id_niveau || 'N/A' }}</p>
            </div>
            
            <div>
              <p class="text-sm text-gray-500">Année universitaire</p>
              <p>{{ request.annee_document_demande || 'N/A' }}</p>
            </div>
          </div>
        </div>
        
        <!-- Colonne de droite: Statut et progression -->
        <div>
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
      
      <!-- Fichiers attachés -->
      <div class="mb-8">
        <h2 class="text-lg font-semibold mb-4">Documents attachés</h2>
        
        <div v-if="files.length === 0" class="bg-gray-50 p-4 rounded text-gray-600">
          Aucun document n'est attaché à cette demande.
        </div>
        
        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="file in files" :key="file.id_piece" class="bg-gray-50 p-4 rounded flex items-center justify-between">
            <div class="flex items-center">
              <font-awesome-icon icon="file-alt" class="text-blue-500 mr-2" />
              <div>
                <p class="font-medium">{{ file.fichier_path }}</p>
                <!--<p class="text-sm text-gray-500">{{ formatFileSize(file.taille) }}</p>-->
              </div>
            </div>
            
            <button 
              @click="downloadFile(file.id_piece)" 
              class="text-blue-500 hover:text-blue-700"
            >
              Télécharger
            </button>
          </div>
        </div>
      </div>
      
      <!-- Boutons d'action -->
      <div class="flex justify-end space-x-4">
        <router-link 
          to="/etudiants/espace-etudiant" 
          class="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
        >
          Retour
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { requestService, fileService } from '@/services'

const route = useRoute()
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

onMounted(async () => {
  const requestId = route.params.id
  
  try {
    await Promise.all([
      loadRequest(requestId),
      loadValidationHistory(requestId)
    ])
  } catch (err) {
    console.error('Erreur lors du chargement des données:', err)
    error.value = 'Erreur lors du chargement des données de la demande.'
  } finally {
    loading.value = false
  }
})

// Charger les détails de la demande
const loadRequest = async (requestId) => {
  try {
    const response = await requestService.getRequest(requestId)
    if (response.data && response.data.status) {
      request.value = response.data.data
      files = response.data.data.pieces_jointes || []


    } else {
      throw new Error('Impossible de charger les détails de la demande')
    }
  } catch (err) {
    console.error('Erreur lors du chargement de la demande:', err)
    throw err
  }
}

// Charger les fichiers de la demande
const loadFiles = async (requestId) => {
  try {

  } catch (err) {
    console.error('Erreur lors du chargement des fichiers:', err)
    // On ne relaie pas cette erreur car ce n'est pas critique
  }
}

// Charger l'historique des validations
const loadValidationHistory = async (requestId) => {
  try {
    const response = await requestService.getValidationHistory(requestId)
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
    case 'en attente':
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
</script> 