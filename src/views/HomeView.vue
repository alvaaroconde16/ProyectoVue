<template>
  <div class="container mt-4">

    <!-- Componente SearchBar para búsqueda -->
    <SearchBar @results="handleResults" @toggleSort="toggleSort" />


    <!-- Resultados de la búsqueda -->
    <SearchResults :results="searchResults" :sorted="isSorted" />


    <!-- Carrusel de canciones destacadas -->
    <SongCarousel />


    <!-- Grid de artistas destacados -->
    <FeaturedArtists />


    <!-- Grid de álbunes populares -->
    <PopularAlbums />
    
  </div>
</template>

<script setup>
import { ref } from 'vue';
import SongCarousel from '../components/SongCarousel.vue';
import FeaturedArtists from '../components/FeaturedArtists.vue';
import SearchBar from '../components/SearchBar.vue';
import SearchResults from '@/components/SearchResults.vue';
import PopularAlbums from '@/components/PopularAlbums.vue';

const searchResults = ref([]);
const isSorted = ref(false); // Estado para controlar la ordenación

// Maneja los resultados emitidos desde SearchBar
const handleResults = (data) => {
  searchResults.value = data; // Guardamos los resultados para mostrarlos
};

// Alterna el estado de ordenación
const toggleSort = () => {
  isSorted.value = !isSorted.value; // Cambia el estado de la ordenación
};

</script>

<style scoped>
h1 {
  /* color: #ff6f61; */
  color: #1e90ff;
  /* color: #d147a3; */
}

.list-group-item {
  transition: all 0.2s ease-in-out;
}
</style>
