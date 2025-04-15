<template>
    <div class="relative min-h-screen font-sans text-gray-800 bg-gray-100">
      <!-- Sidebar secrétaire -->
      <SidebarSecretaire />
  
      <!-- Barre horizontale secrétaire -->
      <HeaderSecretaire />
  
      <!-- Contenu principal : le tableau -->
      <main class="pl-64 pt-4">
        <div class="max-w-6xl mx-auto bg-white rounded shadow p-6">
          <h2 class="text-xl font-semibold mb-4">Demandes reçues</h2>
          <table class="w-full border-collapse">
            <thead>
              <tr class="text-left bg-gray-200">
                <th class="p-3 border-b">Numéro demande</th>
                <th class="p-3 border-b">Nom étudiant</th>
                <th class="p-3 border-b">Niveau</th>
                <th class="p-3 border-b">Libellé</th>
                <th class="p-3 border-b">Date</th>
                <th class="p-3 border-b"></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(demande, index) in demandes"
                :key="index"
                class="hover:bg-gray-100"
              >
                <td class="p-3 border-b">{{ demande.numero }}</td>
                <td class="p-3 border-b">{{ demande.nomEtudiant }}</td>
                <td class="p-3 border-b">{{ demande.niveau }}</td>
                <td class="p-3 border-b">{{ demande.libelle }}</td>
                <td class="p-3 border-b">{{ demande.date }}</td>
                <td class="p-3 border-b">
                  <button
                    class="bg-brandBlue text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                  >
                    Voir détails
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  </template>
  
  <script setup>
  // Import des composants via l'alias '@'
  import SidebarSecretaire from '@/components/secretariat/SidebarSecretaire.vue'
  import HeaderSecretaire from '@/components/secretariat/HeaderSecretaire.vue'
  
  // Exemple de données simulées (mock). 
  // Tu pourras plus tard charger ça depuis ton backend Laravel, par exemple.
  const demandes = [
    {
      numero: 'N°AT001',
      nomEtudiant: 'KOUADIO ANGE',
      niveau: 'L1',
      libelle: 'Attestation de fréquentation',
      date: '20/03/2025'
    },
    {
      numero: 'N°AT002',
      nomEtudiant: 'DOE John',
      niveau: 'L3',
      libelle: 'Inscription tardive',
      date: '21/03/2025'
    },
    {
      numero: 'N°AT003',
      nomEtudiant: 'YAO Clement',
      niveau: 'M1',
      libelle: 'Relevé de notes',
      date: '22/03/2025'
    }
  ]
  </script>
  