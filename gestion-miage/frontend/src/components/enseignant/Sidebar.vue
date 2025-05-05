<template>
    <aside class="fixed top-0 left-0 h-full w-64 bg-white p-4 shadow-md z-20">
      <div class="mb-8 flex justify-center mt-4">
        <img src="/src/assets/logo_de_miage.png" alt="Logo MIAGE" class="h-20" />
      </div>
      <nav>
        <ul class="space-y-4">
          <li>
            <router-link to="/enseignant/dashboard" class="sidebar-link" active-class="active-link">
              <font-awesome-icon :icon="['fas', 'chart-pie']" class="mr-2" />
              Tableau de bord
            </router-link>
          </li>
          <li>
            <router-link to="/enseignant/demandes-a-traiter" class="sidebar-link" active-class="active-link">
              <font-awesome-icon :icon="['fas', 'edit']" class="mr-2" />
              Demandes à traiter
            </router-link>
          </li>
          <li>
            <router-link to="/enseignant/historique" class="sidebar-link" active-class="active-link">
              <font-awesome-icon :icon="['fas', 'folder-open']" class="mr-2" />
              Recommandations / Thèmes
            </router-link>
          </li>
          <li>
            <router-link to="/enseignant/notifications" class="sidebar-link" active-class="active-link">
              <font-awesome-icon :icon="['fas', 'bell']" class="mr-2" />
              Notifications
            </router-link>
          </li>
          <li>
            <router-link to="/enseignant/profil" class="sidebar-link" active-class="active-link">
              <font-awesome-icon :icon="['fas', 'user']" class="mr-2" />
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
    padding: 0.5rem 1rem;
    color: #1e3a8a;
    border-radius: 0.375rem;
    transition: background 0.3s;
  }
  .sidebar-link:hover {
    background-color: #f3f4f6;
  }
  .active-link {
    font-weight: bold;
    background-color: #f3f4f6;
  }
  </style>
  