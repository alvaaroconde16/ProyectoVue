<template>
    <div class="container">
      <h2 class="text-center my-4">Búsqueda de canciones en Deezer</h2>
      <!-- Componente hijo -->
      <SearchBar @results="handleResults" @toggleSort="toggleSort"/>


      <!-- Resultados de la búsqueda -->
      <SearchResults :results="searchResults" :sorted="isSorted" />


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
h2 {
  /* color: #1e90ff; */
  color: white;
}

table td {
  vertical-align: middle;
}
</style>