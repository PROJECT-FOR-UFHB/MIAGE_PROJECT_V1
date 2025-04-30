<template>
  <div class="space-y-6 p-4 md:p-6 lg:p-8">
    <!-- Section des statistiques -->
    <div class="max-w-6xl mx-auto bg-white/30 backdrop-blur-lg rounded-2xl shadow-lg p-6 mb-6 transition-transform hover:scale-105">
      <h2 class="text-xl font-semibold mb-4 text-white drop-shadow-md">Tableau de bord</h2>
      
      <div v-if="loading" class="flex justify-center items-center p-8">
        <div class="animate-spin-slow rounded-full h-12 w-12 border-t-2 border-b-2 border-brandBlue"></div>
      </div>
      
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Demandes en attente -->
        <div class="glass-card">
          <font-awesome-icon :icon="['fas', 'hourglass-half']" class="icon-anim text-brandBlue text-3xl mb-2" />
          <p class="text-lg font-semibold">En attente</p>
          <p class="text-2xl font-bold">{{ stats.pending || 0 }}</p>
        </div>
        <!-- Demandes passées -->
        <div class="glass-card">
          <font-awesome-icon :icon="['fas', 'history']" class="icon-anim text-gray-600 text-3xl mb-2" />
          <p class="text-lg font-semibold">Passées</p>
          <p class="text-2xl font-bold">{{ stats.total || 0 }}</p>
        </div>
        <!-- Demandes validées -->
        <div class="glass-card">
          <font-awesome-icon :icon="['fas', 'check-circle']" class="icon-anim text-green-500 text-3xl mb-2" />
          <p class="text-lg font-semibold">Validées</p>
          <p class="text-2xl font-bold">{{ stats.approved || 0 }}</p>
        </div>
        <!-- Demandes rejetées -->
        <div class="glass-card">
          <font-awesome-icon :icon="['fas', 'ban']" class="icon-anim text-red-500 text-3xl mb-2" />
          <p class="text-lg font-semibold">Rejetées</p>
          <p class="text-2xl font-bold">{{ stats.rejected || 0 }}</p>
        </div>
      </div>
    </div>
    
    <!-- Section des demandes récentes -->
    <div class="max-w-6xl mx-auto bg-white/30 backdrop-blur-lg rounded-2xl shadow-lg p-6 transition-transform hover:scale-105">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-semibold text-white drop-shadow-md">Vos demandes récentes</h2>
        <router-link 
          to="/etudiants/nouvelle-demande" 
          class="btn-primary flex items-center"
        >
          <font-awesome-icon :icon="['fas', 'file-alt']" class="mr-2" />
          Nouvel demande
        </router-link>
      </div>
      
      <div v-if="loading" class="flex justify-center items-center p-8">
        <div class="animate-spin-slow rounded-full h-12 w-12 border-t-2 border-b-2 border-brandBlue"></div>
      </div>
      
      <div v-else-if="requests.length === 0" class="text-center py-8 bg-white/20 rounded-lg backdrop-blur-sm">
        <p class="text-gray-100">Aucune demande trouvée</p>
        <router-link 
          to="/etudiants/nouvelle-demande" 
          class="btn-primary mt-4 flex items-center"
        >
          Créer votre première demande
        </router-link>
      </div>
      
      <div v-else>
        <div class="overflow-x-auto">
          <table class="min-w-full bg-transparent">
            <thead>
              <tr class="bg-white/20 text-gray-100 uppercase text-sm leading-normal backdrop-blur-sm">
                <th class="py-3 px-4 text-left">ID</th>
                <th class="py-3 px-4 text-left">Type</th>
                <th class="py-3 px-4 text-left">Titre</th>
                <th class="py-3 px-4 text-left">Date</th>
                <th class="py-3 px-4 text-left">Statut</th>
                <th class="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody class="text-gray-200 text-sm">
              <tr 
                v-for="request in requests" 
                :key="request.id" 
                class="border-b border-white/20 hover:bg-white/10 transition-colors"
              >
                <td class="py-3 px-4">#{{ request.id }}</td>
                <td class="py-3 px-4">{{ request.type_demande?.nom || 'N/A' }}</td>
                <td class="py-3 px-4">{{ request.titre }}</td>
                <td class="py-3 px-4">{{ formatDate(request.created_at) }}</td>
                <td class="py-3 px-4">
                  <span 
                    class="px-2 py-1 rounded text-xs font-semibold"
                    :class="getStatusClass(request.statut)"
                  >
                    {{ request.statut }}
                  </span>
                </td>
                <td class="py-3 px-4">
                  <button 
                    @click="viewRequest(request.id)"
                    class="text-brandBlue hover:text-brandBlue-light transition-colors"
                  >
                    Voir
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="mt-4 flex justify-center">
          <button 
            @click="loadMoreRequests" 
            class="btn-secondary"
            v-if="hasMoreRequests"
            :disabled="loading"
          >
            Charger plus
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// inchangé
</script>

<style scoped>
/* Glassmorphism cards */
.glass-card {
  @apply bg-white/20 backdrop-blur-md rounded-xl p-6 flex flex-col items-center shadow-md transition-transform hover:scale-105 hover:shadow-xl;
}

/* Animated icons */
@keyframes pulse-slow {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.1); }
}
.animate-spin-slow {
  animation: spin 1.5s linear infinite;
}
.icon-anim {
  animation: pulse-slow 2s ease-in-out infinite;
}

/* Buttons */
.btn-primary {
  @apply bg-brandBlue text-white px-4 py-2 rounded-lg backdrop-blur-sm ring-2 ring-brandBlue/50 hover:ring-brandBlue transition-all;
}
.btn-secondary {
  @apply bg-white/20 text-gray-200 px-4 py-2 rounded-lg backdrop-blur-sm ring-2 ring-white/30 hover:ring-white transition-all;
}
</style>
