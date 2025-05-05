<template>
    <aside class="fixed left-0 top-0 h-full w-64 bg-white shadow-md p-4 z-10">
      <div class="flex justify-center mb-8">
        <img src="/src/assets/logo_de_miage.png" alt="Logo MIAGE" class="h-20" />
      </div>
      <nav>
        <ul class="space-y-4">
          <li>
            <router-link to="/admin/dashboard" class="sidebar-link">
              <font-awesome-icon :icon="['fas', 'gauge']" class="mr-2" />
              Tableau de bord
            </router-link>
          </li>
          <li>
            <router-link to="/admin/utilisateurs" class="sidebar-link">
              <font-awesome-icon :icon="['fas', 'users']" class="mr-2" />
              Utilisateurs
            </router-link>
          </li>
          <li>
            <router-link to="/admin/roles" class="sidebar-link">
              <font-awesome-icon :icon="['fas', 'user-shield']" class="mr-2" />
              Rôles & accès
            </router-link>
          </li>
          <li>
            <router-link to="/admin/logs" class="sidebar-link">
              <font-awesome-icon :icon="['fas', 'scroll']" class="mr-2" />
              Logs & sécurité
            </router-link>
          </li>
          <li>
            <router-link to="/admin/parametres" class="sidebar-link">
              <font-awesome-icon :icon="['fas', 'sliders-h']" class="mr-2" />
              Paramètres système
            </router-link>
          </li>
          <li>
            <router-link to="/admin/sauvegardes" class="sidebar-link">
              <font-awesome-icon :icon="['fas', 'database']" class="mr-2" />
              Sauvegardes
            </router-link>
          </li>
          <li>
            <router-link to="/admin/profil" class="sidebar-link">
              <font-awesome-icon :icon="['fas', 'user-cog']" class="mr-2" />
              Mon profil
            </router-link>
          </li>
        </ul>
      </nav>
    </aside>
  </template>
  
  <style scoped>
  .sidebar-link {
    display: flex;
    align-items: center;
    padding: 0.75rem 1rem;
    color: #2563eb;
    border-radius: 0.5rem;
    transition: background 0.2s;
  }
  .sidebar-link:hover {
    background-color: #f3f4f6;
  }
  </style>
  