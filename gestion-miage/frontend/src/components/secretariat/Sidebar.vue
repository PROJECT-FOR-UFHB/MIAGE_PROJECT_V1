<template>
  <aside class="absolute top-0 left-0 h-full w-64 bg-white p-4 shadow-md">
    <div class="mb-8 flex justify-center">
      <img src="/src/assets/logo_de_miage.png" alt="Logo MIAGE" class="h-20" />
    </div>
    <nav>
      <ul class="space-y-4">
        <!-- Lien vers le tableau de bord -->
        <li>
          <router-link
            to="/secretariat/tableau-de-bord"
            class="flex items-center text-gray-800 px-3 py-2 rounded hover:bg-gray-100 transition-colors"
            active-class="bg-gray-100 font-semibold"
          >
            <font-awesome-icon :icon="['fas', 'chart-simple']" class="mr-2 text-brandBlue" />
            Tableau de bord
          </router-link>
        </li>
        <!-- Lien vers les demandes reçues -->
        <li>
          <router-link
            to="/secretariat/demandes-recus"
            class="flex items-center text-gray-800 px-3 py-2 rounded hover:bg-gray-100 transition-colors"
            active-class="bg-gray-100 font-semibold"
          >
            <font-awesome-icon :icon="['fas', 'clipboard-list']" class="mr-2 text-brandBlue" />
            Demandes reçues
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
// Rien de spécial
</script>
