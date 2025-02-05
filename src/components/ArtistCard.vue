<!-- ArtistCard.vue -->
<template>
  <div class="artist-card">
    <img :src="artist.picture_xl" class="artist-img" :alt="artist.name" />
    <p class="artist-name">{{ artist.name }}</p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

// Definimos las props que recibirá este componente
const props = defineProps({
  artist: Object // Recibe un objeto que contiene los datos del artista
});
</script>

<style scoped>
.artist-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0;
  margin: 0;
}

.artist-img {
  width: 230px;
  height: 230px;
  border-radius: 50%;
  object-fit: cover;
  transition: transform 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.artist-img:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.artist-name {
  margin-top: 10px;
  font-size: 1rem;
  font-weight: 600;
  color: #333;
}
</style>
