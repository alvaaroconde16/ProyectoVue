<!-- SongCard.vue -->
<template>
  <div class="list-group-item d-flex align-items-center justify-content-between">

    <!-- Portada del álbum -->
    <img :src="song.album.cover_small" alt="Portada" class="rounded me-3" style="width: 50px; height: 50px; object-fit: cover;"/>

    <!-- Información de la canción -->
    <div class="flex-grow-1">
      <h5 class="mb-0">{{ song.title }}
        <span class="text-muted small ms-2">{{ Math.floor(song.duration / 60) }}:{{ song.duration % 60 < 10 ? "0" : "" }}{{ song.duration % 60 }}</span>
      </h5>
      <p class="text-muted mb-0">{{ song.artist.name }} • {{ song.album.title }}</p>
    </div>

    <!-- Botón de favoritos -->
    <button class="btn btn-outline-danger me-2" @click="toggleFavorite">
      <i :class="isFavorite ? 'bi bi-heart-fill' : 'bi bi-heart'"></i>
    </button>

    <!-- Botón de reproducción -->
    <button class="btn btn-primary" @click="setCurrentSong">
      <i class="bi bi-play-circle"></i>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useFavoritesStore } from '@/stores/favorites';
import { useMusicStore } from "@/stores/music";

// Propiedad 'song' que recibe la canción que se va a mostrar
const props = defineProps({
  song: Object
});

const favoritesStore = useFavoritesStore();
const musicStore = useMusicStore();

// Estado para comprobar si la canción es favorita
const isFavorite = ref(favoritesStore.isFavorite(props.song.id));

// Función para cambiar el estado de favorito
const toggleFavorite = () => {
  if (isFavorite.value) {
    favoritesStore.removeSong(props.song.id);
  } else {
    favoritesStore.addSong(props.song);
  }
  isFavorite.value = !isFavorite.value;
};

// Función para reproducir la canción seleccionada
const setCurrentSong = () => {
  musicStore.setCurrentSong(props.song);
};
</script>

<style scoped>
/* Puedes agregar estilos aquí si es necesario */
</style>
