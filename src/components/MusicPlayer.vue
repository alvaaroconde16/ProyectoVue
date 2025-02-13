<template>
  <div class="music-player d-flex">
      <!-- Información de la canción -->
      <div class="left-section">
          <img :src="song?.album?.cover_medium || 'https://static.vecteezy.com/system/resources/thumbnails/009/393/830/small/black-vinyl-disc-record-for-music-album-cover-design-free-png.png'" alt="Portada del álbum" />
          
          <div class="song-info">
              <h5>{{ song?.title || '' }}</h5>
              <p>{{ song?.artist?.name || '' }}</p>
          </div>
          
          <button v-if="song" class="btn-favorite" @click="toggleFavorite(song)">
              <i :class="isFavorite(song?.id) ? 'bi bi-heart-fill' : 'bi bi-heart'"></i>
          </button>
      </div>

      <!-- Controles de reproducción -->
      <div class="center-section">
          <div class="controls">
            <button @click="seekBackward" class="control-btn">
              <i class="bi bi-skip-start-fill"></i>
            </button>

            <button @click="togglePlayback" class="control-btn">
              <i :class="isPlaying ? 'bi bi-pause-fill' : 'bi bi-play-fill'"></i>
            </button>

            <button @click="seekForward" class="control-btn">
              <i class="bi bi-skip-end-fill"></i>
            </button>
          </div>
      
          <!-- Barra de progreso -->
          <input type="range" min="0" :max="duration" step="0.1" v-model="currentTime" @input="seek" class="progress-bar" />
      </div>

      <!-- Control de volumen -->
      <div class="right-section">
          <i class="bi bi-volume-up me-3"></i>
          <input type="range" min="0" max="1" step="0.01" v-model="volume" @input="updateVolume" class="volume-slider" />
      </div>
  </div>
</template>

<script setup>
  import { ref, watch, onMounted } from "vue";
  import { useFavoritesStore } from "@/stores/favorites"; // Store para favoritos
  import { useMusicStore } from "@/stores/music"; // Store global de música

  const favoritesStore = useFavoritesStore();
  const musicStore = useMusicStore(); // Usamos la store para manejar la canción globalmente

  // Obtiene la canción actual desde la store
  const song = ref(musicStore.currentSong);

  // COMPROBAMOS SI LA CANCIÓN ESTÁ EN FAVORITOS
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

</script>

<style scoped>
.music-player {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #2b2b2b;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between; /* Espacio uniforme entre las secciones */
  padding: 2px 20px;
  box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.3);
}

/* Sección izquierda con tamaño fijo */
.left-section {
  display: flex;
  align-items: center;
  width: 200px; /* Tamaño fijo para que no se mueva */
}

/* Imagen del álbum */
.left-section img {
  height: 50px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
}

.song-info {
  margin-left: 17px;
  align-items: center;
  white-space: nowrap; /* Evita que el texto salte a otra línea */
}

.song-info h5 {
  font-size: 17px;
  font-weight: bold;
}

.song-info p {
  font-size: 14px;
  color: #b0b0b0;
  margin: 0;
}

/* Botón de favoritos */
.btn-favorite {
  background: none;
  border: none;
  color: #ff6b81;
  font-size: 20px;
  transition: color 0.3s ease;
  margin-left: 15px;
}

/* Sección central ocupa todo el espacio disponible */
.center-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

/* Botones de control */
.controls {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.controls button {
  background: none;
  border: none;
  color: white;
  font-size: 30px;
  cursor: pointer;
  transition: transform 0.1s ease, color 0.2s ease;
}

.controls button:hover {
  color: #ff6b81;
  transform: scale(1.1);
}

/* Barra de progreso siempre centrada */
.progress-bar {
  width: 50%;
  margin: 10px auto;
  height: 6px;
  border-radius: 5px;
  background-color: #ff6b81;
}

/* Sección derecha con tamaño fijo */
.right-section {
  display: flex;
  align-items: center;
  width: 200px; /* Tamaño fijo */
  justify-content: flex-end; /* Para que el volumen se quede a la derecha */
}

.right-section i {
  font-size: 22px;
}

.volume-slider {
  width: 100px;
  height: 5px;
  margin-left: 5px;
  margin-right: 10px;
}


</style>
