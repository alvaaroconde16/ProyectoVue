<template>
  <div>
    <h2 class="text-center my-5">Canciones populares</h2>
    <!-- Carrusel de canciones -->
    <div id="songCarousel" class="carousel slide my-5" data-bs-ride="carousel">
      <div class="carousel-inner">
        <!-- Desplegar las canciones en el carrusel -->
        <div class="carousel-item" v-for="(song, index) in tracks" :key="song.id" :class="{ active: index === 0 }">
          <img :src="song.album.cover_xl" class="d-block w-100" alt="Portada del álbum">
          <div class="carousel-caption d-none d-md-block">
            <h5>{{ song.title }}</h5>
            <p>{{ song.artist.name }} - {{ song.album.title }}</p>
          </div>
        </div>
      </div>
      <!-- Controles del carrusel -->
      <button class="carousel-control-prev" type="button" data-bs-target="#songCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#songCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>

    
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const tracks = ref([]); // Estado para almacenar las canciones destacadas

// Función para obtener las canciones destacadas de la API
const fetchFeaturedSongs = async () => {
  try {
    const response = await fetch('http://localhost:8080/https://api.deezer.com/chart');
    if (!response.ok) {
      throw new Error('Error al obtener las canciones destacadas');
    }
    const data = await response.json();
    tracks.value = data.tracks.data; // Guardamos los tracks en el estado
  } catch (error) {
    console.error(error.message);
  }
};

// Llamar a la función para cargar las canciones cuando el componente se monta
onMounted(fetchFeaturedSongs);
</script>

<style scoped>
/* Estilos para el carrusel */
#songCarousel {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
}

.carousel-item {
  text-align: center;
}

.carousel-caption {
  background: rgba(0, 0, 0, 0.5); /* Fondo semitransparente */
  padding: 10px;
  border-radius: 5px;
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
  background-color: black;
}

.carousel-inner img {
  max-height: 400px; /* Ajustar el tamaño de las imágenes */
  object-fit: cover;
}
h2 {
  color: #1e90ff;
}
</style>
