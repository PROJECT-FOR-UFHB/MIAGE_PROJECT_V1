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
              <input v-model="form.nom" type="text"
                class="border border-gray-300 rounded w-full px-2 py-1 focus:outline-none focus:ring-1 focus:ring-brandBlue"
                :disabled="loading" />
            </div>
            <!-- Prénom -->
            <div>
              <label class="block mb-1 font-medium flex items-center">
                <font-awesome-icon :icon="['fas', 'user']" class="text-brandBlue mr-2" />
                Prénom de l'étudiant
              </label>
              <input v-model="form.prenom" type="text"
                class="border border-gray-300 rounded w-full px-2 py-1 focus:outline-none focus:ring-1 focus:ring-brandBlue"
                :disabled="loading" />
            </div>
            <!-- Niveau -->
            <div>
              <label class="block mb-1 font-medium flex items-center">
                <font-awesome-icon :icon="['fas', 'graduation-cap']" class="text-brandBlue mr-2" />
                Niveau
              </label>
              <select v-model="form.niveau"
                class="border border-gray-300 rounded w-full px-2 py-1 focus:outline-none focus:ring-1 focus:ring-brandBlue"
                :disabled="loading">
                <option disabled value="">Sélectionner votre niveau</option>

                <!-- itération dynamique -->
                <option v-for="niv in tabNiveaux" :key="niv.id_niveau" :value="niv.id_niveau">
                  {{ niv.lib_niveau }}
                </option>
              </select>
            </div>
            <!-- Année universitaire -->
            <div>
              <label class="block mb-1 font-medium flex items-center">
                <font-awesome-icon :icon="['fas', 'calendar']" class="text-brandBlue mr-2" />
                Année universitaire
              </label>
              <input v-model="form.annee_universitaire" type="text"
                class="border border-gray-300 rounded w-full px-2 py-1 focus:outline-none focus:ring-1 focus:ring-brandBlue"
                :disabled="loading" />
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
              <select v-model="form.id_type_demande"
                class="border border-gray-300 rounded w-full px-2 py-1 focus:outline-none focus:ring-1 focus:ring-brandBlue"
                :disabled="loading" @change="loadRequiredFiles">
                <option disabled value="">Sélectionner un type de demande</option>
                <option v-for="type in tabDeTypeDeDemande" :key="type.id_type_de_demande" :value="type.id_type_de_demande">
                  {{ type.lib_type_de_demande }}
                </option>

              </select>
            </div>
            <!-- Libellé de la demande -->
            <!--<div>
              <label class="block mb-1 font-medium flex items-center">
                <font-awesome-icon :icon="['fas', 'info-circle']" class="text-brandBlue mr-2" />
                Libellé de la demande
              </label>
              <input v-model="form.titre" type="text"
                class="border border-gray-300 rounded w-full px-2 py-1 focus:outline-none focus:ring-1 focus:ring-brandBlue"
                :disabled="loading" />
            </div>-->

            <!-- Description de la demande -->
            <div class="col-span-2">
              <label class="block mb-1 font-medium flex items-center">
                <font-awesome-icon :icon="['fas', 'info-circle']" class="text-brandBlue mr-2" />
                Description de la demande
              </label>
              <textarea v-model="form.description" rows="4"
                class="border border-gray-300 rounded w-full px-2 py-1 focus:outline-none focus:ring-1 focus:ring-brandBlue"
                :disabled="loading"></textarea>
            </div>

            <!-- Fichiers requis -->
            <div v-if="requiredFiles.length > 0" class="col-span-2 mt-4">
              <h3 class="text-md font-semibold mb-2">Documents requis</h3>
              <div v-for="(fileType, index) in requiredFiles" :key="fileType.id_type_de_piece_jointe" class="mb-4">
                <label class="block mb-1 font-medium flex items-center">
                  <font-awesome-icon :icon="['fas', 'paperclip']" class="text-brandBlue mr-2" />
                  {{ fileType.lib_type_de_piece_jointe }} <span class="text-red-500 ml-1">*</span>
                </label>
                <input type="file" @change="(e) => handleFileChange(e, fileType.id_type_de_piece_jointe)"
                  class="border border-gray-300 rounded w-full px-2 py-1 focus:outline-none focus:ring-1 focus:ring-brandBlue"
                  :disabled="loading" />
                <p class="text-sm text-gray-500 mt-1">{{ fileType.description }}</p>
              </div>
            </div>

            <!-- Autres fichiers -->
            <div class="col-span-2">
              <label class="block mb-1 font-medium flex items-center">
                <font-awesome-icon :icon="['fas', 'paperclip']" class="text-brandBlue mr-2" />
                Autres documents
              </label>
              <input type="file" multiple @change="handleOtherFilesChange"
                class="border border-gray-300 rounded w-full px-2 py-1 focus:outline-none focus:ring-1 focus:ring-brandBlue"
                :disabled="loading" />
              <p class="text-sm text-gray-500 mt-1">Vous pouvez ajouter plusieurs fichiers</p>
            </div>
          </div>
        </div>

        <!-- Bouton d'envoi aligné à droite -->
        <div class="flex justify-end">
          <button type="submit" class="bg-brandBlue text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
            :disabled="loading">
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
import { authService,studentService } from '@/services'

// État (Variables) du formulaire
const form = reactive({
  nom: '',
  prenom: '',
  niveau: '',
  annee_universitaire: '',
  id_type_demande: '',
  //titre: '',
  description: ''
})

let pieces_jointes;

// Autres états (variables)
const loading       = ref(false)
const error         = ref('')
const success       = ref('')
const tabDeTypeDeDemande  = ref([])
const tabNiveaux       = ref([])
const mapTypeDeDemandePiecesJointes = new Map()
const requiredFiles = ref([])
const files         = reactive({ required: {}, other: [] })


// Données mock au besoin
const mockRequestTypes = [
  { id: 1, nom: "Attestation de scolarité" },
  { id: 2, nom: "Demande de stage" },
  { id: 3, nom: "Demande d'absence" },
  { id: 4, nom: "Demande de bourse" },
  { id: 5, nom: "Autre demande" }
]

//Partie de chargement des données
onMounted(async () => {
  loading.value = true
  try {
    // Charger les données pour le formulaire
    const elementsFormulaireReçus = await studentService.getElementsFormulaire()
    if (elementsFormulaireReçus.data?.status) {

      //Les types de demandes
      tabDeTypeDeDemande.value = elementsFormulaireReçus.data.data.types_de_demandes

      //Les niveaux pour la demande (Exemple : Bulletin de L2)
      tabNiveaux.value = elementsFormulaireReçus.data.data.niveaux

      //Section de remplissage de la map qui contient les types de demandes et leurs pièces jointes
      elementsFormulaireReçus.data.data.types_de_demandes.forEach((typeDeDemande) => {
        // Pour chaque type de demande, on extrait ses pièces jointes
        const pieces = typeDeDemande.types_de_pieces_jointes.map((piece) => {
          return {
            id_type_de_piece_jointe: piece.id_type_de_piece_jointe,
            lib_type_de_piece_jointe: piece.lib_type_de_piece_jointe
          };
        });

        // On stocke dans la map avec l'id du type de demande comme clé
        mapTypeDeDemandePiecesJointes.set(typeDeDemande.id_type_de_demande, pieces);
      });
        
    } else {
      console.warn('Mock types used')
      tabDeTypeDeDemande.value = mockRequestTypes
    }


    // Pré-remplir nom/prenom
    const user = authService.getUser()
    if (user) {
      form.nom    = user.nom    || user.last_name  || ''
      form.prenom = user.prenom || user.first_name || ''
    }

    // Par défaut année universitaire
    const y = new Date().getFullYear()
    form.annee_universitaire = `${y}-${y+1}`

  } catch (err) {
    console.error(err)
    error.value = 'Erreur lors du chargement des données'
  } finally {
    loading.value = false
  }
})
//Fin partie de chargement des données


/**
 * Charger les fichiers requis en fonction de la demande choisi
 */ 
const loadRequiredFiles = async () => {
  if (!form.id_type_demande) return
  loading.value = true
  try {
    const resp = mapTypeDeDemandePiecesJointes.get(form.id_type_demande)

    if (resp) {
      requiredFiles.value = resp
    } else {
      requiredFiles.value = []
    }
  } catch {
    error.value = 'Erreur lors du chargement des fichiers requis'
    requiredFiles.value = []
  } finally {
    loading.value = false
  }
}

// Gestion fichiers requis
const handleFileChange = (e, typeDePieceJointeId) => {
  const file = e.target.files[0];
  console.log(file)
  console.log(files)
  if (file) {
    files.required[typeDePieceJointeId] = file;
  }
}



// Gestion autres fichiers
const handleOtherFilesChange = e => {
  files.other = Array.from(e.target.files)
}

// Soumettre la demande
const submitRequest = async () => {
  error.value = ''
  success.value = ''
  loading.value = true

  // validation
  if (/*!form.titre ||*/ !form.description || !form.id_type_demande || !form.niveau) {
    error.value = 'Veuillez remplir tous les champs obligatoires'
    loading.value = false
    return
  }

  try {
    // Création de la demande
    /*const payload = {
      id_type_de_demande: form.id_type_demande,
      id_niveau: form.niveau,
      annee_document: form.annee_universitaire
    }
    const resp = await studentService.postElementsFormulaire(payload)
    if (!resp.data?.status || !resp.data.data) {
      throw new Error('Format réponse création incorrect')
    }*/

    const donneesFormulaire = new FormData();

    donneesFormulaire.append('id_type_de_demande', form.id_type_demande);
    donneesFormulaire.append('id_niveau', form.niveau);
    donneesFormulaire.append('annee_document', form.annee_universitaire);

    // Upload fichiers requis
    let index = 0

    for (const [id_type_de_piece_jointe, file] of Object.entries(files.required)) {
      console.log(file)
      console.log(files.required)
      donneesFormulaire.append(`pieces_jointes[${index}][id_type_de_piece_jointe]`, id_type_de_piece_jointe)
      donneesFormulaire.append(`pieces_jointes[${index}][fichier]`, file)
      index++
    }

    const resp = await studentService.postElementsFormulaire(donneesFormulaire)
    if (!resp.data?.status || !resp.data.data) {
      throw new Error('Format réponse création incorrect')
    }

    // Reset form
    Object.keys(form).forEach(k => {
      if (!['nom','prenom','annee_universitaire'].includes(k)) {
        form[k] = ''
      }
    })
    files.required = {}
    files.other    = []
    requiredFiles.value = []

    success.value = 'Votre demande a été soumise avec succès'
  } catch (err) {
    console.error(err)
    const d = err.response?.data
    if (d?.errors) {
      error.value = Object.values(d.errors).flat().join(', ')
    } else if (d?.message) {
      error.value = d.message
    } else {
      error.value = 'Erreur de soumission'
    }
  } finally {
    loading.value = false
  }
}
</script>
