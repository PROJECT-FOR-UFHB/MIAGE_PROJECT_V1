<template>
    <aside class="absolute top-0 left-0 h-full w-64 bg-white p-4 shadow-md">
      <!-- Logo -->
      <div class="mb-8 flex justify-center">
        <img
          src="/src/assets/logo_de_miage.png"
          alt="Logo MIAGE"
          class="h-12"
        />
      </div>
      <!-- Navigation -->
      <nav>
        <ul class="space-y-4">
          <li>
            <a href="#" class="block text-gray-800 px-3 py-2 rounded hover:bg-gray-100 transition-colors">
              <!-- Icône pour "Espace étudiant" (par exemple faGraduationCap) -->
              <font-awesome-icon :icon="['fas', 'graduation-cap']" class="mr-2" />
              Espace étudiant
            </a>
          </li>
          <li>
            <a href="#" class="block text-gray-800 px-3 py-2 rounded bg-gray-100 font-semibold transition-colors">
              <!-- Icône pour "Nouvelle demande" (faFileAlt) -->
              <font-awesome-icon :icon="['fas', 'file-alt']" class="mr-2" />
              Nouvelle demande
            </a>
          </li>
          <li>
            <a href="#" class="block text-gray-800 px-3 py-2 rounded hover:bg-gray-100 transition-colors">
              <!-- Icône pour "Mes demandes" (faClipboardList) -->
              <font-awesome-icon :icon="['fas', 'clipboard-list']" class="mr-2" />
              Mes demandes
            </a>
          </li>
          <li>
            <a href="#" class="block text-gray-800 px-3 py-2 rounded hover:bg-gray-100 transition-colors">
              <!-- Icône pour "Profil" (faUser) -->
              <font-awesome-icon :icon="['fas', 'user']" class="mr-2" />
              Profil
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  </template>
  
  <script setup>
  // Pas besoin d'ajouter d'import ici pour le composant <font-awesome-icon>
  // puisqu'il est déjà enregistré globalement dans main.js.
  </script>
  