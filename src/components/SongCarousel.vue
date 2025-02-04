<template>
  <div>
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

/* ====== Estilos del Grid de Canciones ====== */
.container {
  max-width: 1200px;
}

.row-cols-md-4 {
  margin-top: 2rem;
}

/* Estilo de las tarjetas */
.card-modern {
  border-radius: 15px;
  overflow: hidden;
  background-color: #222; /* Fondo oscuro para que resalten las imágenes */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease, filter 0.3s ease;
  position: relative;
}

.card-modern:hover {
  transform: translateY(-5px); /* Efecto sutil de elevación */
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.4);
  filter: brightness(1.1); /* Aumentamos el brillo al pasar el ratón */
}

.card-img-top {
  border-bottom: 3px solid #1e90ff; /* Línea color moderna */
  border-radius: 10px 10px 0 0; /* Bordes redondeados en la imagen */
  object-fit: cover;
  transition: transform 0.4s ease; /* Efecto de zoom */
}

.card-modern:hover .card-img-top {
  transform: scale(1.05); /* Zoom sutil al pasar el ratón sobre la imagen */
}

.card-body {
  padding: 1.5rem;
  text-align: center;
}

.card-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: color 0.3s ease;
}

.card-title:hover {
  color: #ff6f61; /* Color para el título cuando pasa el ratón */
}

.card-text {
  font-size: 0.9rem;
  color: #b0b0b0;
  font-weight: 500;
  margin-top: 0.5rem;
}

/* Estilo de los encabezados */
h2 {
  color: #ff6f61;
  font-size: 2rem;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 2rem;
}

/* Espaciado entre las tarjetas */
.row-cols-1 {
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .card-modern {
    margin-bottom: 2rem;
  }
}
</style>
