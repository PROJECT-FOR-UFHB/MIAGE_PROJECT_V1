<template>
<<<<<<< HEAD:gestion-miage/frontend/src/components/ui/Header.vue
    <header class="bg-brandBlue h-16 flex items-center pl-64 justify-center text-white shadow">
      <div class="flex items-center">
        <font-awesome-icon :icon="icon" class="mr-2 text-brandGreen" />
        <h1 class="text-xl font-semibold">{{ title }}</h1>
      </div>
    </header>
  </template>
  
  <script setup>
  const props = defineProps({
    title: {
      type: String,
      required: true
    },
    icon: {
      type: Array,
      required: true
    }
  })
  </script>
  
=======
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
>>>>>>> auditFront:gestion-miage/frontend/src/components/secretariat/Header.vue
