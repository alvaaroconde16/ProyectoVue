<template>
  <div class="song-card d-flex align-items-center">
    <!-- Portada del álbum -->
    <div class="album-cover">
      <img :src="song.album.cover_big" alt="Portada" class="cover-img" />
      <button class="play-btn d-flex justify-content-center" @click="setCurrentSong">
        <i class="bi bi-play-fill"></i>
      </button>
    </div>

    <!-- Información de la canción -->
    <div class="song-info flex-grow-1">
      <h5 class="song-title">
        {{ song.title }}
        <span class="duration">{{ Math.floor(song.duration / 60) }}:{{ song.duration % 60 < 10 ? "0" : "" }}{{ song.duration % 60 }}</span>
      </h5>
      <p class="song-details">{{ song.artist.name }} • {{ song.album.title }}</p>
    </div>

    <!-- Botón de favoritos -->
    <button class="fav-btn" @click="toggleFavorite">
      <i :class="isFavorite ? 'bi bi-heart-fill active' : 'bi bi-heart'"></i>
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useFavoritesStore } from '@/stores/favorites';
import { useMusicStore } from "@/stores/music";

// Recibe la canción como prop
const props = defineProps({
  song: Object
});

const favoritesStore = useFavoritesStore();
const musicStore = useMusicStore();

// Estado para saber si la canción es favorita
const isFavorite = computed(() => favoritesStore.isFavorite(props.song.id));

// Función para alternar favorito
const toggleFavorite = () => {
  isFavorite.value
    ? favoritesStore.removeSong(props.song.id)
    : favoritesStore.addSong(props.song);
};

// Función para reproducir la canción
const setCurrentSong = () => {
  musicStore.setCurrentSong(props.song);
};
</script>

<style scoped>
/* Contenedor principal */
.song-card {
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 12px;
  position: relative;
}

.song-card:hover {
  background: #dddddd;
}

/* Portada del álbum */
.album-cover {
  position: relative;
  width: 55px;
  height: 55px;
  border-radius: 8px;
  overflow: hidden;
}

.cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Botón de reproducción */
.play-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  opacity: 0;
  transition: opacity 0.3s;
}

.album-cover:hover .play-btn {
  opacity: 1;
}

.play-btn i {
  font-size: 20px;
  color: #000;
}

/* Información de la canción */
.song-info {
  margin-left: 15px;
}

.song-title {
  font-size: 16px;
  font-weight: bold;
  margin: 0;
}

.duration {
  font-size: 14px;
  margin-left: 10px;
}

.song-details {
  font-size: 14px;
  margin: 3px 0 0;
}

/* Botón de favoritos */
.fav-btn {
  background: none;
  border: none;
  color: #ff6b81;
  font-size: 22px;
  transition: color 0.3s;
}
</style>
