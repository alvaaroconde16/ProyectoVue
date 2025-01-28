<template>
    <div class="music-player">
        <!-- Información de la canción -->
        <div class="left-section">
            <img :src="song.album?.cover_medium" alt="Portada del álbum" />
            
            <div>
                <h5>{{ song.title }}</h5>
                <p>{{ song.artist?.name || "" }}</p>
            </div>
            
            <button class="btn btn-link ms-2" @click="toggleFavorite(song)">
                <i :class="isFavorite(song.id) ? 'bi bi-heart-fill' : 'bi bi-heart'"></i>
            </button>
        </div>
  
        <!-- Controles de reproducción -->
        <div class="center-section">

            <!-- Botones de control -->
            <div class="controls">
              <button @click="togglePlayback">
                <i :class="isPlaying ? 'bi bi-pause-fill' : 'bi bi-play-fill'"></i>
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
    import { useFavoritesStore } from '@/stores/favorites'; // Store para favoritos

    const favoritesStore = useFavoritesStore();

    //Comprobamos si la canción la tenemos en favoritos
    const toggleFavorite = (song) => {
      if (favoritesStore.isFavorite(song.id)) {
        favoritesStore.removeSong(song.id);
      } else {
        favoritesStore.addSong(song);
      }
    };

    const isFavorite = (id) => favoritesStore.isFavorite(id);

    //AQUI EMPIEZAN LOS COMPONENTES PARA EL REPRODUCTOR DE MUSICA
    // Props
    const props = defineProps({
      song: {
        type: Object,     // La propiedad 'song' debe ser un objeto
        required: false,
        default: null,
      },
    });

    // VARIABLES PARA USAR EN EL COMPONENTE
    const audio = ref(null); // Referencia al objeto de audio
    const isPlaying = ref(false);
    const currentTime = ref(0);
    const duration = ref(0);
    const volume = ref(1);  // Variable reactiva para controlar el volumen


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


    // Configurar el audio con la canción actual, nada mas iniciar el componente
    const setAudio = (newSong) => {
      if (newSong?.preview) {
        // Si ya había un audio en reproducción, detenerlo
        if (audio.value) {
          audio.value.pause();
          audio.value.currentTime = 0;
        }

        // Crea una nueva instancia del objeto Audio con el enlace de la nueva canción.
        audio.value = new Audio(newSong.preview);

        // Evento: actualiza el tiempo actual durante la reproducción, sirve para que la barra de progreso vaya avanzando
        audio.value.addEventListener("timeupdate", updateTime);

        // Evento: cuando termina el audio, cambia el estado de reproducción a falso
        audio.value.addEventListener("ended", () => {
          isPlaying.value = false;
        });

        audio.value.play(); // Reproducir la canción
        isPlaying.value = true; // Cambiar el estado de reproducción a verdadero
      }
    };

  
    // Configurar el audio cada vez que cambia la canción. El watch es una función de Vue 3 que permite observar cambios en una propiedad.
    watch( () => props.song, (newSong) => {
        if (newSong.preview) {

          // Si ya había un audio en reproducción, detenerlo
          if (audio.value) {
            audio.value.pause();
            audio.value.currentTime = 0;
          }

          // Crea una nueva instancia del objeto Audio con el enlace de la nueva canción.
          audio.value = new Audio(newSong.preview);

          // Evento: actualiza el tiempo actual durante la reproducción, sirve para que la barra de progreso vaya avanzando
          audio.value.addEventListener("timeupdate", updateTime);

          // Evento: cuando termina el audio, cambia el estado de reproducción a falso
          audio.value.addEventListener("ended", () => {
            isPlaying.value = false;
          });

          audio.value.play();      // Reproducir la canción
          isPlaying.value = true;  // Cambiar el estado de reproducción a verdadero
        }
      }
    );
  
    // Actualizar el tiempo actual
    const updateTime = () => {
      if (audio.value) {
        currentTime.value = audio.value.currentTime;  // Actualiza el tiempo actual del audio
        duration.value = audio.value.duration;        // Actualiza la duración total del audio
      }
    }; 

    // Función para actualizar el volumen
    const updateVolume = () => {
      if (audio.value) {
        audio.value.volume = volume.value;  // Actualiza el volumen de audio al valor reactivo
      }
    };

    // Configura el audio al principio y cuando cambie la canción
    onMounted(() => {
      if (props.song) {
        setAudio(props.song);
      }
    });

    // Detener la música cuando el componente se desmonte
    onUnmounted(() => {
      if (audio.value) {
        audio.value.pause(); // Detenemos la canción
        audio.value.currentTime = 0; // Reseteamos el tiempo de la canción a 0
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

    
    /* AHORA COMIENZA LA PARTE CENTRAL */
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
        font-size: 26px;
        cursor: pointer;
    }
    
    .controls button:hover {
        color: #ccc;
    }
    
    /* Estilo para el control de volumen */
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
  