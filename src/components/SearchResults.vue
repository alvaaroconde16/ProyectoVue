<template>
  <div class="search-results">
    <!-- Botones de filtro -->
    <div class="filter-buttons">
      <button @click="filter = 'all'" :class="{ active: filter == 'all' }">Mostrar Todo</button>
      <button @click="filter = 'songs'" :class="{ active: filter == 'songs' }">Canciones</button>
      <button @click="filter = 'artists'" :class="{ active: filter == 'artists' }">Artistas</button>
      <button @click="filter = 'albums'" :class="{ active: filter == 'albums' }">Álbumes</button>
    </div>

    <!-- Resultados de canciones -->
    <div v-if="(filter == 'all' || filter == 'songs') && songs.length > 0">
      <h3 class="my-4">Canciones</h3>
      <div class="results-list song-list">
        <div v-for="song in songs" :key="song.id">
          <SongCard :song="song" />
        </div>
      </div>
    </div>

    <!-- Resultados de artistas -->
    <div v-if="(filter == 'all' || filter == 'artists') && artists.length > 0">
      <h3 class="my-4">Artistas</h3>
      <div class="results-list artist-list">
        <div v-for="artist in artists" :key="artist.id">
          <ArtistCard :artist="artist" />
        </div>
      </div>
    </div>
  
    <!-- Resultados de álbumes -->
    <div v-if="(filter == 'all' || filter == 'albums') && albums.length > 0" class="mb-5">
      <h3 class="my-4">Álbumes</h3>
      <div class="results-list album-list">
        <div v-for="album in albums" :key="album.id">
          <AlbumCard :album="album" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed, ref } from 'vue';
  import SongCard from './SongCard.vue';
  import AlbumCard from './AlbumCard.vue';
  import ArtistCard from './ArtistCard.vue';
  
  // Recibe los resultados de la búsqueda
  const props = defineProps({
    results: Array,
    sorted: Boolean,
  });

  // Estado reactivo para controlar el filtro seleccionado
  const filter = ref('all');

  // Función para ordenar alfabéticamente, si sorted = true, ordenará los resultados por titulo y nombre, de lo contrario, devolverá los elementos como estaban
  const sortResults = (items) => {
    return props.sorted
      ? [...items].sort((a, b) => (a.title || a.name).localeCompare(b.title || b.name))
      : items;
  };

  // Computados para separar y ordenar los resultados
  const songs = computed(() => sortResults(props.results.filter(item => item.type == "track")));
  const albums = computed(() => sortResults(props.results.filter(item => item.type == "album")));
  const artists = computed(() => sortResults(props.results.filter(item => item.type == "artist")));
</script>

<style scoped>
  .search-results {
    margin-top: 20px;
    color: white;
  }

  /* Estilo para los botones de filtro */
  .filter-buttons {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 20px;
  }

  .filter-buttons button {
    padding: 10px 20px;
    background-color: #4a4a4a; /* Gris oscuro */
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2); /* Sombra sutil */
  }

  .filter-buttons button.active {
    background-color: #2d2d2d; /* Gris más oscuro cuando está activo */
    transform: scale(1.05); /* Escala ligeramente el botón */
  }

  .filter-buttons button:hover {
    background-color: #3a3a3a; /* Gris medio al pasar el ratón */
  }

  .results-list {
    display: grid;
    gap: 20px;
  }

  .song-list {
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  }

  .album-list {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }

  .artist-list {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  /* Estilo para mensaje cuando no hay resultados */
  .no-results {
    text-align: center;
    color: #aaa;
    font-size: 1.2rem;
  }
</style>
