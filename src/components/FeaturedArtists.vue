<template>
  <div class="container mt-5">
    <h2 class="mb-4 text-center">Artistas Destacados</h2>

    <!-- Contenedor con scroll horizontal -->
    <div class="overflow-x-auto">
      <div class="d-flex pt-3 ms-3 gap-4">
        <div class="text-center" v-for="artist in artists.slice(0, 10)" :key="artist.id">
          <div class="artist-container">
            <RouterLink :to="'/artist/' + artist.id" class="artist-link">
              <div class="artist-card d-flex flex-column align-items-center">
                <img :src="artist.picture_xl" class="artist-img" :alt="artist.name" />
                <p class="artist-name">{{ artist.name }}</p>
              </div>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const artists = ref([]);

// Obtener artistas destacados de Deezer
const fetchFeaturedArtists = async () => {
  try {
    const response = await fetch("http://localhost:8080/https://api.deezer.com/chart");
    if (!response.ok) throw new Error("Error al obtener los artistas destacados");

    const data = await response.json();
    artists.value = data.artists.data;
  } catch (error) {
    console.error(error.message);
  }
};

onMounted(fetchFeaturedArtists);
</script>

<style scoped>
.artist-img {
  width: 230px;
  height: 230px;
  border-radius: 50%;
  object-fit: cover;
  transition: transform 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.artist-img:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.artist-name {
  margin-top: 10px;
  font-size: 1rem;
  font-weight: 600;
  color: #333;
}

h2 {
  color: #1e90ff;
}

/* Hacer scroll horizontal al contenedor */
.overflow-x-auto {
  overflow-x: auto;
  padding-bottom: 10px; /* Para evitar que el scroll esté pegado al borde */
}

/* Asegura que los items estén alineados horizontalmente */
.d-flex {
  display: flex;
  flex-wrap: nowrap;
}

/* Separación entre los artistas */
.gap-4 {
  gap: 1.5rem;
}
</style>
