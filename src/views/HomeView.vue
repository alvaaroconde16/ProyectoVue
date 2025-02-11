<template>
  <div class="container mt-4">

    <!-- Componente SearchBar para búsqueda -->
    <SearchBar @results="handleResults" />


    <!-- Resultados de la búsqueda -->
    <SearchResults :results="searchResults" />


    <!-- Lista de canciones -->
    <!-- <div class="list-group my-4" v-if="songs.length > 0">
      <div class="" v-for="song in songs" :key="song.id">
        <SongCard :song="song" />
      </div>
    </div>  -->

    <!-- Grid de artistas destacados -->
    <FeaturedArtists />

    <!-- Carrusel de canciones destacadas -->
    <SongCarousel />

  </div>
</template>

<script setup>
import { ref } from 'vue';
import SongCarousel from '../components/SongCarousel.vue';
import FeaturedArtists from '../components/FeaturedArtists.vue';
import SearchBar from '../components/SearchBar.vue';
import SearchResults from '@/components/SearchResults.vue';
// import SongCard from '@/components/SongCard.vue';

// const songs = ref([]); 
const searchResults = ref([]);

const handleResults = (data) => {
  searchResults.value = data.slice(0, 12); // Mostramos hasta 10 resultados
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
