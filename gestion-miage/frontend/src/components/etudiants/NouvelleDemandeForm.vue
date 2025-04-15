<template>
  <main class="pl-64 bg-gray-100 min-h-screen pt-4">
    <div class="max-w-4xl mx-auto">
      <form>
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
              <input type="text"
                class="border border-gray-300 rounded w-full px-2 py-1 focus:outline-none focus:ring-1 focus:ring-brandBlue" />
            </div>
            <!-- Prénom -->
            <div>
              <label class="block mb-1 font-medium flex items-center">
                <font-awesome-icon :icon="['fas', 'user']" class="text-brandBlue mr-2" />
                Prénom de l'étudiant
              </label>
              <input type="text"
                class="border border-gray-300 rounded w-full px-2 py-1 focus:outline-none focus:ring-1 focus:ring-brandBlue" />
            </div>
            <!-- Niveau -->
            <div>
              <label class="block mb-1 font-medium flex items-center">
                <font-awesome-icon :icon="['fas', 'graduation-cap']" class="text-brandBlue mr-2" />
                Niveau
              </label>
              <select
                class="border border-gray-300 rounded w-full px-2 py-1 focus:outline-none focus:ring-1 focus:ring-brandBlue">
                <option disabled selected>Sélectionner votre niveau</option>
                <option value="L1">Licence 1</option>
                <option value="L2">Licence 2</option>
                <option value="L3">Licence 3</option>
              </select>
            </div>
            <!-- Année universitaire -->
            <div>
              <label class="block mb-1 font-medium flex items-center">
                <font-awesome-icon :icon="['fas', 'calendar']" class="text-brandBlue mr-2" />
                Année universitaire
              </label>
              <input type="text"
                class="border border-gray-300 rounded w-full px-2 py-1 focus:outline-none focus:ring-1 focus:ring-brandBlue" />
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
                class="border border-gray-300 rounded w-full px-2 py-1 focus:outline-none focus:ring-1 focus:ring-brandBlue">
                <option disabled selected>Sélectionner un type de demande</option>
                <option value="administrative">Administratif</option>
                <option value="technique">Technique</option>
                <option value="academique">Académique</option>
              </select>
            </div>
            <!-- Libellé de la demande -->
            <div>
              <label class="block mb-1 font-medium flex items-center">
                <font-awesome-icon :icon="['fas', 'info-circle']" class="text-brandBlue mr-2" />
                Libellé de la demande
              </label>
              <input type="text"
                class="border border-gray-300 rounded w-full px-2 py-1 focus:outline-none focus:ring-1 focus:ring-brandBlue" />
            </div>
            <!-- Fichier -->
            <div class="col-span-2">
              <label class="block mb-1 font-medium flex items-center">
                <font-awesome-icon :icon="['fas', 'paperclip']" class="text-brandBlue mr-2" />
                Fichier
              </label>
              <input type="file"
                class="border border-gray-300 rounded w-full px-2 py-1 focus:outline-none focus:ring-1 focus:ring-brandBlue" />
              <p class="text-sm text-gray-500 mt-1">Aucun fichier sélectionné</p>
            </div>
          </div>
        </div>

        <!-- Bouton d'envoi aligné à droite -->
        <div class="flex justify-end">
          <button type="submit" class="bg-brandBlue text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors">
            Envoyer
          </button>
        </div>
      </form>
    </div>
  </main>
</template>

<script setup>
// Rien de spécifique ici
</script>