<template>
  <div>
    <!-- Carrusel de canciones -->
    <div id="songCarousel" class="carousel slide" data-bs-ride="carousel">
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


    <!-- Grid de canciones destacadas -->
    <div class="container mt-5">
      <h2 class="mb-3">Canciones Destacadas</h2>
      <div class="row row-cols-1 row-cols-md-4 g-4">
        <div class="col" v-for="song in tracks.slice(0,8)" :key="song.id">
          <div class="card">
            <img :src="song.album.cover_medium" class="card-img-top" alt="Portada del álbum">
            <div class="card-body">
              <h5 class="card-title">{{ song.title }}</h5>
              <p class="card-text">{{ song.artist.name }} - {{ song.album.title }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const tracks = ref([]); // Estado para almacenar las canciones destacadas

// Función para obtener las canciones destacadas de la API
const fetchFeaturedSongs = async () => {
  try {
    const response = await fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart');
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
  background-color: black; /* Color de los controles */
}

.carousel-inner img {
  max-height: 400px; /* Ajustar el tamaño de las imágenes */
  object-fit: cover; /* Asegurar que las imágenes cubren el espacio */
}

h1, h2 {
  color: #007bff;
}
</style>
