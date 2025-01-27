<template>
    <div>
      <h1>Búsqueda de canciones en Deezer</h1>
      <!-- Componente hijo -->
      <SearchBar @results="handleResults" />
       <!-- Lista de canciones -->
      <ul v-if="songs.length > 0">
        <li v-for="song in songs" :key="song.id">
          <img :src="song.album.cover_small" alt="Porta del álbum">  <strong>{{ song.title }}</strong> - <button @click="toggleFavorite(song)">
              {{
                isFavorite(song.id)
                  ? "💙"
                  : "🤍"
              }}
            </button> - <audio :src="song.preview" controls></audio> - {{ song.artist.name }} - {{ song.album.title }} - {{ Math.floor(song.duration / 60) }}:{{ song.duration % 60 < 10 ? "0" : "" }}{{ song.duration % 60 }}
        </li>
      </ul>
      <p v-else>No hay resultados para mostrar</p>
    </div>

    <p>
      Para que salgan los resultados debes entrar en
      <a href="https://cors-anywhere.herokuapp.com/corsdemo"
        >https://cors-anywhere.herokuapp.com/corsdemo</a
      >
    </p>
    
  </template>

  <script setup>
    import { ref } from "vue";
    import SearchBar from "../components/SearchBar.vue"; // Importa el componente hijo
    import { useFavoritesStore } from '@/stores/favorites';

    const songs = ref([]); // Estado para almacenar la lista de canciones
    const favoritesStore = useFavoritesStore();
     

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
  color: #dc3545;
}
.search-page {
  padding: 20px;
}

.album-info {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 10px;
}

.album-info img {
  margin-top: 10px;
  width: 200px;
  border-radius: 10px;
}

.songs {
  margin-top: 20px;
}

.song-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.song-card {
  padding: 10px;
  border: 1px solid #007bff;
  border-radius: 10px;
  background-color: #e9ecef;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.song-card audio {
  margin-top: 10px;
  width: 100%;
}

button {
  background: none;
  border: none;
}
</style>