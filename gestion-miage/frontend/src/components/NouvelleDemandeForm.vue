<template>
    <div class="bg-white rounded shadow p-6">
      <!-- Titre 1 -->
      <h2 class="text-lg font-bold mb-4">Informations de l'étudiant</h2>
      <div class="grid grid-cols-3 gap-4 mb-6">
        <input type="text" placeholder="Nom de l'étudiant" class="input col-span-1" />
        <input type="text" placeholder="Prénom de l'étudiant" class="input col-span-1" />
        <input type="text" placeholder="Niveau" class="input col-span-1" />
        <input type="text" placeholder="Année universitaire" class="input col-span-3" />
      </div>
  
      <!-- Titre 2 -->
      <h2 class="text-lg font-bold mb-4">Informations de la demande</h2>
      <div class="grid grid-cols-3 gap-4 mb-6">
        <input type="text" placeholder="Type de demande" class="input col-span-1" />
        <input type="text" placeholder="Libellé de demande" class="input col-span-1" />
        <input type="file" class="input col-span-3" />
      </div>
  
      <button class="px-6 py-2 bg-brandBlue text-white rounded hover:bg-opacity-90">
        Envoyer
      </button>
    </div>
  </template>
  
  <style scoped>
  .input {
    @apply border border-gray-300 rounded px-3 py-2 w-full;
  }
  </style>
  