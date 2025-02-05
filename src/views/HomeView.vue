<template>
  <div class="container mt-4">

    <!-- Componente SearchBar para búsqueda -->
    <SearchBar @results="handleResults" />

    <!-- Lista de canciones -->
    <div class="list-group my-4" v-if="songs.length > 0">
      <div class="" v-for="song in songs" :key="song.id">
        <SongCard :song="song" />
      </div>
    </div>

    <!-- Grid de artistas destacados -->
    <FeaturedArtists />

    <!-- Carrusel de canciones destacadas -->
    <SongCarousel />

  </div>
</template>

<script setup>
import { ref } from 'vue';
import SongCarousel from '../components/SongCarousel.vue';
import FeaturedArtists from '../components/FeaturedArtists.vue';
import { useFavoritesStore } from '@/stores/favorites';
import { useMusicStore } from "@/stores/music";
import SearchBar from '../components/SearchBar.vue';
import SongCard from '@/components/SongCard.vue';

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
