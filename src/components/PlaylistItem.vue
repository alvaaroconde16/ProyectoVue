<template>
    <div class="playlist-item">
      <img :src="song.album.cover" alt="Portada del álbum" class="album-cover" />
      <div class="song-info">
        <h3>{{ song.title }}</h3>
        <p>{{ song.artist.name }}</p>
      </div>
      <div class="actions">
        <button class="btn btn-danger" @click="removeSong">
          <i class="bi bi-x-circle"></i> Eliminar
        </button>

        <button class="btn btn-primary ms-1" @click="setCurrentSong(song)">
              <i class="bi bi-play-circle"></i> Reproducir
        </button>
      </div>
    </div>
  </template>
  
  <script setup>  
    import { useMusicStore } from "@/stores/music";

    const musicStore = useMusicStore();

    const setCurrentSong = (song) => {
      musicStore.setCurrentSong(song);
    };

    const props = defineProps({
      song: Object, // Recibimos la canción como propiedad
    });

    const emitRemove = defineEmits(['remove']); // Emitimos el evento para eliminar la canción

    // Función para eliminar la canción de la playlist
    const removeSong = () => {
      emitRemove('remove'); // Emitimos el evento cuando se elimina la canción
    };
    </script>
    
    <style scoped>
    .playlist-item {
      display: flex;
      align-items: center;
      padding: 10px;
      border-bottom: 1px solid #ddd;
    }

    .album-cover {
      width: 60px;
      height: 60px;
      border-radius: 5px;
      margin-right: 15px;
    }

    .song-info {
      flex: 1;
    }
  </style>
  