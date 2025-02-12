<template>
  <div class="album-card">
    <!-- Carátula del álbum -->
    <img :src="album.cover_medium" class="card-img-top album-image" :alt="album.title" />

    <div class="card-body">
      <!-- Título del álbum -->
      <h5 class="card-title mt-1">{{ album.title }}</h5>
    </div>
  </div>
</template>

<script setup>
  import { defineProps } from "vue";

  // Propiedad 'album' que recibe la información del álbum
  const props = defineProps({
    album: Object,
  });
</script>

<style scoped>
.album-card {
  background-color: transparent;
  border: 0;
  color: white;
}

.card-title {
  font-size: 18px;
  margin-top: 15px;
}
</style>
