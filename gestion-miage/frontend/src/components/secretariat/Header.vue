<template>
  <CommonHeader :title="title" :icon="icon">
    <template #actions>
      <!-- Actions spécifiques au secrétariat si nécessaire -->
    </template>
  </CommonHeader>
</template>

<script setup>
import CommonHeader from '../common/CommonHeader.vue'

defineProps({
  title: String,
  icon: Array
})
</script>
