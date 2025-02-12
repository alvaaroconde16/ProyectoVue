<template>
    <div class="search-results">
      <!-- Resultados de canciones -->
      <div v-if="songs.length">
        <h3 class="my-4">Canciones</h3>
        <div class="results-list song-list">
          <div v-for="song in songs" :key="song.id">
            <SongCard :song="song" />
          </div>
        </div>
      </div>

      <!-- Resultados de artistas -->
      <div v-if="artists.length">
        <h3 class="mt-5 mb-4">Artistas</h3>
        <div class="results-list artist-list">
          <div v-for="artist in artists" :key="artist.id">
            <ArtistCard :artist="artist" />
          </div>
        </div>
      </div>
  
      <!-- Resultados de álbumes -->
      <div v-if="albums.length">
        <h3 class="mb-4">Álbumes</h3>
        <div class="results-list album-list">
          <div v-for="album in albums" :key="album.id">
            <AlbumCard :album="album" />
          </div>
        </div>
      </div>
    </div>
  </template>
  
<script setup>
  import { defineProps, ref, computed } from 'vue';
  import SongCard from './SongCard.vue';
  import AlbumCard from './AlbumCard.vue';
  import ArtistCard from './ArtistCard.vue';
  
  // Recibe los resultados de la búsqueda
  const props = defineProps({
    results: Array,
  });
  
  // Computados para separar los resultados en canciones, álbumes y artistas
  const songs = computed(() => props.results.filter(item => item.type === 'track'));
  const albums = computed(() => props.results.filter(item => item.type === 'album'));
  const artists = computed(() => props.results.filter(item => item.type === 'artist'));
</script>
  
<style scoped>
  .search-results {
    margin-top: 20px;
    color: white;
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
  
  .card {
    cursor: pointer;
  }
</style>
  