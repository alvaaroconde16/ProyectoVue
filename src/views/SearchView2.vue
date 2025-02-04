<template>
    <div class="container">
      <h1 class="text-center my-4">Búsqueda de canciones en Deezer</h1>
      <!-- Componente hijo -->
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
    </div>

    <p class="mt-5">
      Para que salgan los resultados debes entrar en
      <a href="https://cors-anywhere.herokuapp.com/corsdemo">https://cors-anywhere.herokuapp.com/corsdemo</a>
    </p>
    
  </template>

  <script setup>
    import { ref } from "vue";
    import SearchBar from "../components/SearchBar.vue"; // Importa el componente hijo
    import { useFavoritesStore } from '@/stores/favorites';
    import { useMusicStore } from "@/stores/music";

    const songs = ref([]); // Estado para almacenar la lista de canciones
    const favoritesStore = useFavoritesStore();
    const musicStore = useMusicStore();

    const setCurrentSong = (song) => {
      musicStore.setCurrentSong(song);
    };


    // Maneja los resultados emitidos por el componente hijo
    const handleResults = (data) => {
      songs.value = data; // Actualiza la lista de canciones
    };


    //Comprobamos si la canción la tenemos en favoritos
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
  color: #1e90ff;
}

table td {
  vertical-align: middle;
}
</style>