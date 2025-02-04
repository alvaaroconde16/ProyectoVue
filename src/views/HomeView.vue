<template>
  <div class="container mt-4">
    <h1 class="text-center mb-4">Buscar canciones en Deezer</h1>

    <!-- Componente SearchBar para búsqueda -->
    <SearchBar @results="handleResults" />

    <!-- Lista de canciones -->
    <div class="list-group my-4" v-if="songs.length > 0">
      <div class="list-group-item d-flex align-items-center justify-content-between" v-for="song in songs" :key="song.id">
        
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
        <button class="btn btn-outline-danger me-2" @click="toggleFavorite(song)">
          <i :class="isFavorite(song.id) ? 'bi bi-heart-fill' : 'bi bi-heart'"></i>
        </button>

        <!-- Botón de reproducción -->
        <button class="btn btn-primary" @click="setCurrentSong(song)">
          <i class="bi bi-play-circle"></i>
        </button>
      </div>
    </div>

    <!-- Carrusel de canciones destacadas -->
    <SongCarousel />
    
    <!-- Grid de artistas destacados -->
    <FeaturedArtists />

  </div>
</template>

<script setup>
import { ref } from 'vue';
import SearchBar from '../components/SearchBar.vue';
import SongCarousel from '../components/SongCarousel.vue';
import FeaturedArtists from '../components/FeaturedArtists.vue';
import { useFavoritesStore } from '@/stores/favorites';
import { useMusicStore } from "@/stores/music";

const songs = ref([]); 
const favoritesStore = useFavoritesStore();
const musicStore = useMusicStore();

const setCurrentSong = (song) => {
  musicStore.setCurrentSong(song);
};

const handleResults = (data) => {
  songs.value = data.slice(0, 10); // Mostramos hasta 10 resultados
};

const toggleFavorite = (song) => {
  if (favoritesStore.isFavorite(song.id)) {
    favoritesStore.removeSong(song.id);
  } else {
    favoritesStore.addSong(song);
  }
};

const isFavorite = (id) => favoritesStore.isFavorite(id);
</script>

<style scoped>
h1 {
  /* color: #ff6f61; */
  color: #1e90ff;
  /* color: #d147a3; */
}

.list-group-item {
  transition: all 0.2s ease-in-out;
}

.list-group-item:hover {
  background-color: #f8f9fa;
}

button {
  transition: all 0.2s ease-in-out;
}

button:hover {
  transform: scale(1.1);
}
</style>
