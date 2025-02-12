<template>
    <div class="container">
      <h1 class="text-center my-4">Búsqueda de canciones en Deezer</h1>
      <!-- Componente hijo -->
      <SearchBar @results="handleResults" />


      <!-- Resultados de la búsqueda -->
      <SearchResults :results="searchResults" />


      <!-- Lista de canciones -->
      <!-- <div class="list-group my-4" v-if="songs.length > 0"> -->
        <!-- <div class="list-group-item d-flex align-items-center justify-content-between" v-for="song in songs" :key="song.id"> -->
          <!-- <SongCard :song="song" /> -->
        <!-- </div> -->
      <!-- </div> -->
    </div>

    <!-- <p class="mt-5"> -->
      <!-- Para que salgan los resultados debes entrar en -->
      <!-- <a href="https://cors-anywhere.herokuapp.com/corsdemo">https://cors-anywhere.herokuapp.com/corsdemo</a> -->
    <!-- </p> -->
    
  </template>

  <script setup>
    import { ref, onMounted, watch } from "vue";
    import SearchBar from "../components/SearchBar.vue"; // Importa el componente hijo
    import SearchResults from '@/components/SearchResults.vue';
    
    const searchResults = ref([]); // Estado para almacenar los resultados de la búsqueda

    // Maneja los resultados emitidos por el componente hijo
    const handleResults = (data) => {
      searchResults.value = data; // Actualiza la lista de canciones
    };
  </script>

<style scoped>
h1 {
  color: #1e90ff;
}

table td {
  vertical-align: middle;
}
</style>