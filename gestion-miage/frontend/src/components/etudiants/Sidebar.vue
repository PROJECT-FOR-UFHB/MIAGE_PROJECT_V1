<template>
  <aside class="absolute top-0 left-0 h-full w-64 bg-white p-4 shadow-md">
    <div class="mb-8 flex justify-center">
      <img
        src="/src/assets/logo_de_miage.png"
        alt="Logo MIAGE"
        class="h-20"
      />
    </div>
    <!-- Navigation -->
    <nav>
      <ul class="space-y-4">
        <li>
          <!-- Lien Espace étudiant -->
          <router-link
            to="/etudiants/espace-etudiant"
            class="block text-brandBlue px-3 py-2 rounded hover:bg-gray-100 transition-colors flex items-center"
            active-class="bg-gray-100 font-semibold"
          >
            <font-awesome-icon :icon="['fas', 'graduation-cap']" class="mr-2 text-brandBlue" />
            Espace étudiant
          </router-link>
        </li>
        <li>
          <!-- Lien Nouvelle demande -->
          <router-link
            to="/etudiants/nouvelle-demande"
            class="block text-brandBlue px-3 py-2 rounded hover:bg-gray-100 transition-colors flex items-center"
            active-class="bg-gray-100 font-semibold"
          >
            <font-awesome-icon :icon="['fas', 'file-alt']" class="mr-2 text-brandBlue" />
            Nouvelle demande
          </router-link>
        </li>
        <li>
          <!-- Lien Mes demandes -->
          <router-link
            to="#"
            class="block text-brandBlue px-3 py-2 rounded hover:bg-gray-100 transition-colors flex items-center"
          >
            <font-awesome-icon :icon="['fas', 'clipboard-list']" class="mr-2 text-brandBlue" />
            Mes demandes
          </router-link>
        </li>
        <li>
          <!-- Lien Profil -->
          <router-link
            to="#"
            class="block text-brandBlue px-3 py-2 rounded hover:bg-gray-100 transition-colors flex items-center"
          >
            <font-awesome-icon :icon="['fas', 'user']" class="mr-2 text-brandBlue" />
            Profil
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
</script>
