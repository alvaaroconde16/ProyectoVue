<template>
  <div class="music-player">
      <!-- Información de la canción -->
      <div class="left-section">
          <img :src="song?.album?.cover_medium || 'https://static.vecteezy.com/system/resources/thumbnails/009/393/830/small/black-vinyl-disc-record-for-music-album-cover-design-free-png.png'" alt="Portada del álbum" />
          
          <div>
              <h5>{{ song?.title || '' }}</h5>
              <p>{{ song?.artist?.name || '' }}</p>
          </div>
          
          <button v-if="song" class="btn btn-link ms-2" @click="toggleFavorite(song)">
              <i :class="isFavorite(song?.id) ? 'bi bi-heart-fill' : 'bi bi-heart'"></i>
          </button>
      </div>

      <!-- Controles de reproducción -->
      <div class="center-section">
          <div class="controls">
            <button @click="seekBackward">
              <i class="bi bi-skip-start-fill"></i> <!-- Icono de retroceder -->
            </button>

            <button @click="togglePlayback">
              <i :class="isPlaying ? 'bi bi-pause-fill' : 'bi bi-play-fill'"></i>
            </button>

            <!-- Botón de adelantar -->
            <button @click="seekForward">
              <i class="bi bi-skip-end-fill"></i> <!-- Icono de adelantar -->
            </button>
          </div>
      
          <!-- Barra de progreso -->
          <input type="range" min="0" :max="duration" step="0.1" v-model="currentTime" @input="seek"/>
      </div>

      <!-- Control de volumen -->
      <div class="right-section me-4">
          <i class="bi bi-volume-up me-3"></i>
          <input type="range" min="0" max="1" step="0.01" v-model="volume" @input="updateVolume" class="volume-slider" />
      </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";
import { useFavoritesStore } from "@/stores/favorites"; // Store para favoritos
import { useMusicStore } from "@/stores/music"; // Store global de música

const favoritesStore = useFavoritesStore();
const musicStore = useMusicStore(); // Usamos la store para manejar la canción globalmente

// Obtiene la canción actual desde la store
const song = ref(musicStore.currentSong);

// Comprobamos si la canción está en favoritos
const toggleFavorite = (song) => {
if (song && favoritesStore.isFavorite(song.id)) {
  favoritesStore.removeSong(song.id);
} else {
  favoritesStore.addSong(song);
}
};

const isFavorite = (id) => favoritesStore.isFavorite(id);

// VARIABLES PARA EL REPRODUCTOR
const audio = ref(null); 
const isPlaying = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const volume = ref(1); 

// Función para alternar reproducción/pausa
const togglePlayback = () => {
if (audio.value) {
  if (isPlaying.value) {
    audio.value.pause();
  } else {
    audio.value.play();
  }
  isPlaying.value = !isPlaying.value;
}
};

// Configurar el audio con la canción actual
const setAudio = (newSong) => {
if (newSong?.preview) {
  if (audio.value) {
    audio.value.pause();
    audio.value.currentTime = 0;
  }

  audio.value = new Audio(newSong.preview);
  audio.value.addEventListener("timeupdate", updateTime);
  audio.value.addEventListener("ended", () => {
    isPlaying.value = false;
  });

  audio.value.play();
  isPlaying.value = true;
}
};

// Observar cambios en la canción actual (cuando cambia en la store)
watch(() => musicStore.currentSong, (newSong) => {
    setAudio(newSong);
    song.value = newSong;
}, { immediate: true }); // Ejecutar al montar el componente

// Actualizar el tiempo actual
const updateTime = () => {
if (audio.value) {
  currentTime.value = audio.value.currentTime;
  duration.value = audio.value.duration;
}
};

// Función para actualizar el volumen
const updateVolume = () => {
if (audio.value) {
  audio.value.volume = volume.value;
}
};

// Configura el audio al principio
onMounted(() => {
if (musicStore.currentSong) {
  setAudio(musicStore.currentSong);
}
});

// Detener la música al desmontar
onUnmounted(() => {
if (audio.value) {
  audio.value.pause();
  audio.value.currentTime = 0;
}
});

</script>

<style scoped>
.music-player {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #222;
  color: white;
  display: flex;
  align-items: center;
  padding: 12px 20px;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.5);
}

.left-section {
  display: flex;
  align-items: center;
}

.left-section img {
  height: 60px;
  object-fit: cover;
  border-radius: 5px;
  margin-right: 15px;
}

.left-section h5 {
  margin: 0;
  font-size: 16px;
}

.left-section p {
  margin: 0;
  font-size: 14px;
  color: #bbb;
}

.center-section {
  flex: 1;
  text-align: center;
}

.center-section input[type="range"] {
  width: 60%;
}

.controls button {
  background: none;
  border: none;
  color: white;
  font-size: 25px;
  cursor: pointer;
}

.controls button:hover {
  color: #ccc;
}

.volume-slider {
  width: 100px;
}

.right-section {
  display: flex;
  align-items: center;
}

.right-section i {
  font-size: 20px;
}
</style>
