<template>
  <div class="artist-card card">
    <!-- Imagen del artista -->
    <RouterLink :to="'/artist/' + artist.id" class="artist-link">
      <img :src="artist.picture_medium" class="card-img-top artist-image" :alt="artist.name" />
      
      <div class="card-body">
        <!-- Nombre del artista -->
          <h5 class="card-title mt-1">{{ artist.name }}</h5>
          <p class="text-secondary">{{ artist.nb_fan }} fans</p>
      </div>
  </RouterLink>
  </div>
</template>

<script setup>
  import { defineProps } from "vue";

  // Propiedad 'artist' que recibe la información del artista
  const props = defineProps({
    artist: Object,
  });
</script>

<style scoped>
.artist-card {
  border-radius: 10px;
  background-color: transparent;
  border: 0;
  color: white;
}

.artist-link {
  text-decoration: none;
  color: inherit;
}

.artist-image {
  border-radius: 50%;
  height: auto;
  object-fit: cover;
}

.card-title {
  margin-top: 15px;
  font-size: 18px;
}

.card-body {
  text-align: center;
  padding: 15px;
}
</style>
