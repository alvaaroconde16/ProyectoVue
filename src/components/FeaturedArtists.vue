<template>
    <div class="container mt-5">
      <h2 class="mb-5 text-center">Artistas Destacados</h2>
      <div class="row row-cols-2 row-cols-md-4 row-cols-lg-5 g-5 justify-content-center">
        <div class="col text-center" v-for="artist in artists.slice(0, 5)" :key="artist.id">
          <div class="artist-container">
            <RouterLink :to="'/artist/' + artist.id" class="artist-link">
              <div class="artist-card">
                <img :src="artist.picture_xl" class="artist-img" :alt="artist.name" />
                <p class="artist-name">{{ artist.name }}</p>
              </div>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  // import ArtistCard from "./ArtistCard.vue";
  // import { defineProps } from 'vue';

  // Definimos las props que recibirá este componente
  // const props = defineProps({
    // artist: Object // Recibe un objeto que contiene los datos del artista
  // });
  
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
  .artist-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 0;
    margin: 0;
  }

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
  </style>
  