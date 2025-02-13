<template>
  <div class="playlist-item d-flex">
    <!-- Imagen del álbum -->
    <img :src="song.album.cover_small" alt="Portada del álbum" class="album-cover" />
    
    <!-- Información de la canción -->
    <div class="song-info">
      <h5>{{ song.title }}</h5>
      <p class="text-secondary">{{ song.artist.name }}</p>
    </div>
    
    <!-- Botones de acción -->
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
  align-items: center;
  padding: 10px 10px;
  border-top: 1px solid #363636;
  color: white;
}

.playlist-item:hover {
  background-color: #363636;
}

.album-cover {
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.song-info {
  flex: 1;
  margin-left: 15px;
}

.song-info h5 {
  margin-bottom: 5px;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
}

.song-info p {
  font-size: 14px;
  margin: 0;
  white-space: nowrap;
}

.actions button {
  background: none;
  border: none;
  font-size: 17px;
  padding: 8px 12px;
  border-radius: 5px;
}

.actions button:hover {
  background-color: #424242;
}

.actions .btn-danger {
  color: #ff3838;
}

.actions .btn-primary {
  color: #ff6b81;
}

</style>
