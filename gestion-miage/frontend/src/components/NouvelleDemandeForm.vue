<template>
    <!-- Le padding à gauche (pl-64) laisse la place pour la sidebar en position absolue -->
    <main class="pl-64 bg-gray-100 min-h-screen pt-4">
      <!-- Conteneur centré avec une largeur maximale -->
      <div class="max-w-4xl mx-auto">
        <form>
          <!-- Section : Informations de l'étudiant -->
          <div class="bg-white p-6 rounded shadow mb-8">
            <h2 class="text-lg font-semibold mb-4">Informations de l'étudiant</h2>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block mb-1 font-medium">Nom de l'étudiant</label>
                <input
                  type="text"
                  class="border border-gray-300 rounded w-full px-2 py-1 focus:outline-none focus:ring-1 focus:ring-brandBlue"
                />
              </div>
              <div>
                <label class="block mb-1 font-medium">Prénom de l'étudiant</label>
                <input
                  type="text"
                  class="border border-gray-300 rounded w-full px-2 py-1 focus:outline-none focus:ring-1 focus:ring-brandBlue"
                />
              </div>
              <div>
                <label class="block mb-1 font-medium">Niveau</label>
                <input
                  type="text"
                  class="border border-gray-300 rounded w-full px-2 py-1 focus:outline-none focus:ring-1 focus:ring-brandBlue"
                />
              </div>
              <div>
                <label class="block mb-1 font-medium">Année universitaire</label>
                <input
                  type="text"
                  class="border border-gray-300 rounded w-full px-2 py-1 focus:outline-none focus:ring-1 focus:ring-brandBlue"
                />
              </div>
            </div>
          </div>
  
          <!-- Section : Informations de la demande -->
          <div class="bg-white p-6 rounded shadow mb-8">
            <h2 class="text-lg font-semibold mb-4">Informations de la demande</h2>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block mb-1 font-medium">Type de demande</label>
                <input
                  type="text"
                  class="border border-gray-300 rounded w-full px-2 py-1 focus:outline-none focus:ring-1 focus:ring-brandBlue"
                />
              </div>
              <div>
                <label class="block mb-1 font-medium">Libellé de la demande</label>
                <input
                  type="text"
                  class="border border-gray-300 rounded w-full px-2 py-1 focus:outline-none focus:ring-1 focus:ring-brandBlue"
                />
              </div>
              <div class="col-span-2">
                <label class="block mb-1 font-medium">Fichier</label>
                <input
                  type="file"
                  class="border border-gray-300 rounded w-full px-2 py-1 focus:outline-none focus:ring-1 focus:ring-brandBlue"
                />
                <p class="text-sm text-gray-500 mt-1">Aucun fichier sélectionné</p>
              </div>
            </div>
          </div>
  
          <!-- Bouton d'envoi aligné à droite -->
          <div class="flex justify-end">
            <button
              type="submit"
              class="bg-brandBlue text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Envoyer
            </button>
          </div>
        </form>
      </div>
    </main>
  </template>
  
  <script setup>
  // Ajoute ici la logique ou le binding avec v-model selon tes besoins.
  </script>
  