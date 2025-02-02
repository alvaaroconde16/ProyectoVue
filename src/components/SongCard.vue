<template>
    <div class="song-card">
      <!-- Carátula de la canción -->
      <img :src="song?.album?.cover_medium || ''" alt="Portada del álbum" class="song-cover" />
  
      <!-- Información de la canción -->
      <div class="song-info">
        <h5>{{ song?.title || 'Título de la canción' }}</h5>
        <p>{{ song?.artist?.name || 'Artista' }}</p>
      </div>
  
      <!-- Botón para agregar a playlist -->
      <button class="btn btn-link" @click="togglePlaylist">
        <i :class="isFavorite(song.id) ? 'bi bi-heart-fill' : 'bi bi-heart'"></i>
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useFavoritesStore } from "@/stores/favorites"; // Si usamos el store de favoritos
  import { useMusicStore } from "@/stores/music"; // Si queremos usarlo para manejar la canción actual
  
  // Recibir la canción como prop
  const props = defineProps({
    song: {
      type: Object,
      required: true
    }
  });
  
  // Acceder al store de favoritos
  const favoritesStore = useFavoritesStore();
  
  // Función para agregar o quitar de la playlist
  const togglePlaylist = () => {
    if (isFavorite(props.song.id)) {
      favoritesStore.removeSong(props.song.id); // Si está en la lista, lo eliminamos
    } else {
      favoritesStore.addSong(props.song); // Si no está en la lista, lo agregamos
    }
  };
  
  // Función para verificar si la canción está en la playlist
  const isFavorite = (id) => {
    return favoritesStore.isFavorite(id);
  };
  </script>
  
  <style scoped>
  .song-card {
    background-color: #333;
    color: white;
    padding: 10px;
    border-radius: 10px;
    text-align: center;
    max-width: 200px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  }
  
  .song-cover {
    width: 100%;
    height: auto;
    border-radius: 5px;
    margin-bottom: 10px;
  }
  
  .song-info h5 {
    font-size: 16px;
    margin: 0;
  }
  
  .song-info p {
    font-size: 14px;
    color: #bbb;
  }
  
  .btn {
    color: #fff;
    font-size: 24px;
    cursor: pointer;
  }
  
  .btn:hover {
    color: #ccc;
  }
  </style>
  