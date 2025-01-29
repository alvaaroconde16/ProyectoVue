<template>
    <div>
      <h1>Búsqueda de canciones en Deezer</h1>
      <!-- Componente hijo -->
      <SearchBar @results="handleResults" />

      <!-- Tabla de canciones -->
      <div class="table-responsive mt-4" v-if="songs.length > 0">
        <table class="table table-striped table-bordered">
          <thead class="table-primary">
            <tr>
              <th>Portada</th>
              <th>Título</th>
              <th>Favorito</th>
              <th>Preview</th>
              <th>Artista</th>
              <th>Álbum</th>
              <th>Duración</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="song in songs" :key="song.id">
              <td>
                <img :src="song.album.cover_small" alt="Portada del álbum" style="width: 50px; height: 50px;"/>
              </td>

              <td><strong>{{ song.title }}</strong></td>

              <td class="text-center">
                <button class="btn btn-link" @click="toggleFavorite(song)">
                  <i :class="isFavorite(song.id) ? 'bi bi-heart-fill' : 'bi bi-heart'"></i>
                </button>
                
              </td>

              <td class="text-center">
                <button class="btn btn-link" @click="setCurrentSong(song)">
                  <i class="bi bi-play-circle"></i>
                </button>
              </td>

              <td>{{ song.artist.name }}</td>
              <td>{{ song.album.title }}</td>

              <td class="text-center">
                {{ Math.floor(song.duration / 60) }}:{{ song.duration % 60 < 10 ? "0" : "" }}{{ song.duration % 60 }}
              </td>
            </tr>
          </tbody>
        </table>
        <MusicPlayer v-if="currentSong" :song="currentSong" />
      </div>
    </div>

    <p>
      Para que salgan los resultados debes entrar en
      <a href="https://cors-anywhere.herokuapp.com/corsdemo">https://cors-anywhere.herokuapp.com/corsdemo</a>
    </p>
    
  </template>

  <script setup>
    import { ref } from "vue";
    import SearchBar from "../components/SearchBar.vue"; // Importa el componente hijo
    import { useFavoritesStore } from '@/stores/favorites';
    import MusicPlayer from "@/components/MusicPlayer.vue";

    const songs = ref([]); // Estado para almacenar la lista de canciones
    const favoritesStore = useFavoritesStore();
    const currentSong = ref(null); // Canción actualmente en reproducción
     

    // Maneja los resultados emitidos por el componente hijo
    const handleResults = (data) => {
      songs.value = data; // Actualiza la lista de canciones
    };


    // Cambiar la canción actual en el MusicPlayer
    const setCurrentSong = (song) => {
      currentSong.value = song; // Establece la canción seleccionada
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
  color: #dc3545;
}

table td {
  vertical-align: middle;
}
</style>