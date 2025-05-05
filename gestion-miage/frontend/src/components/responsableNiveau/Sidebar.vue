<template>
  <aside class="absolute top-0 left-0 h-full w-64 bg-white p-4 shadow-md">
    <div class="mb-8 flex justify-center">
      <img src="/src/assets/logo_de_miage.png" alt="Logo MIAGE" class="h-20" />
    </div>
    <nav>
      <ul class="space-y-4">
        <li>
          <router-link to="/responsable/tableau-de-bord" class="sidebar-link" active-class="active-link">
            <font-awesome-icon :icon="['fas', 'chart-bar']" class="mr-2" />
            Tableau de bord
          </router-link>
        </li>
        <li>
          <router-link to="/responsable/demandes" class="sidebar-link" active-class="active-link">
            <font-awesome-icon :icon="['fas', 'file-alt']" class="mr-2" />
            Demandes de mon niveau
          </router-link>
        </li>
        <li>
          <router-link to="/responsable/historique" class="sidebar-link" active-class="active-link">
            <font-awesome-icon :icon="['fas', 'archive']" class="mr-2" />
            Historique complet
          </router-link>
        </li>
        <li>
          <router-link to="/responsable/notifications" class="sidebar-link" active-class="active-link">
            <font-awesome-icon :icon="['fas', 'bell']" class="mr-2" />
            Notifications
          </router-link>
        </li>
        <li>
          <router-link to="/responsable/profil" class="sidebar-link" active-class="active-link">
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
