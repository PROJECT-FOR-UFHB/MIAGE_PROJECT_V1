<!-- src/components/secAdmin/Header.vue -->
<template>
  <CommonHeader title="Secrétariat Administratif" :icon="['fas', 'user-tie']">
    <template #actions>
      <button class="text-white hover:text-gray-200">Déconnexion</button>
    </template>
  </CommonHeader>
</template>

<script setup>
import CommonHeader from '../common/CommonHeader.vue'

const props = defineProps({
  title: String,
  icon: Array
})
</script>