<template>

    <div class="flex items-center space-x-4">

            <!-- Image cliquable -->
            <img
            :src="helpers.getFileUrl(imageSrc)"
            alt="preview"
            class="preview-img"
            @click="openModal"
            />

            <!-- Modal plein écran -->
            <div v-if="isModalOpen" class="modal" @click.self="closeModal">
            <span class="close" @click="closeModal">&times;</span>
            <img :src="helpers.getFileUrl(imageSrc)" class="modal-content" alt="piece jointe" />
            </div>
            
        <div class="flex flex-col">
            <span class="font-medium">{{ title }}</span>
                        <!-- Lien de téléchargement -->
            <a :href="helpers.getFileUrl(imageSrc)" target="_blank" class="text-red-500 underline">Voir</a>
        </div>
    </div>
</template>

<script>
import helpers from '@/services/helpers';

export default {
  props: {
    title: String,
    imageSrc: String
  },
  data() {
    return {
      isModalOpen: false,
      helpers
    };
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    }
  }
};
</script>

<style scoped>


.preview-img {
  max-width: 200px;
  min-height: 200px;
display: block;
  margin: auto;
  cursor: pointer;
  border: 1px solid #ccc;
  object-fit: contain;
}

.modal {
  position: fixed;
  z-index: 1000;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  max-width: 90%;
  max-height: 90%;
  border-radius: 10px;
}

.close {
  position: absolute;
  top: 20px;
  right: 40px;
  font-size: 40px;
  color: white;
  cursor: pointer;
}
</style>
