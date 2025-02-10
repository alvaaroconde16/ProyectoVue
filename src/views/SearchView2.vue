<template>
    <div class="container">
      <h1 class="text-center my-4">Búsqueda de canciones en Deezer</h1>
      <!-- Componente hijo -->
      <SearchBar @results="handleResults" />

      <!-- Lista de canciones -->
      <div class="list-group my-4" v-if="songs.length > 0">
        <div class="list-group-item d-flex align-items-center justify-content-between" v-for="song in songs" :key="song.id">
          <SongCard :song="song" />
        </div>
      </div>
    </div>

    <!-- <p class="mt-5"> -->
      <!-- Para que salgan los resultados debes entrar en -->
      <!-- <a href="https://cors-anywhere.herokuapp.com/corsdemo">https://cors-anywhere.herokuapp.com/corsdemo</a> -->
    <!-- </p> -->
    
  </template>

  <script setup>
    import { ref, onMounted, watch } from "vue";
    import SearchBar from "../components/SearchBar.vue"; // Importa el componente hijo
    import { useFavoritesStore } from '@/stores/favorites';
    import { useMusicStore } from "@/stores/music";
    import SongCard from '@/components/SongCard.vue';

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