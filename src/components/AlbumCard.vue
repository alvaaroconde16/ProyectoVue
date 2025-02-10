<template>
  <div class="album-card card">
    <!-- Carátula del álbum -->
    <img :src="album.cover_medium" class="card-img-top album-image" :alt="album.title" />

    <div class="card-body">
      <!-- Título del álbum -->
      <h5 class="card-title">{{ album.title }}</h5>

      <!-- Nombre del artista -->
      <p class="card-text text-muted">{{ album.name }}</p>
      
    </div>
  </div>
</template>

<script setup>
  import { defineProps } from "vue";

  // Propiedad 'album' que recibe la información del álbum
  const props = defineProps({
    album: Object
  });
</script>

<style scoped>
.album-card {
  border-radius: 10px;
  background-color: transparent;
  border: 0;
}

.card-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-top: 15px;
}
</style>
