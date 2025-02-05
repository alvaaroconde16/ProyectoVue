<template>
    <div class="container mt-5">
      <h2 class="mb-5 text-center">Artistas Destacados</h2>
      <div class="row row-cols-2 row-cols-md-4 row-cols-lg-5 g-5 justify-content-center">
        <div class="col text-center" v-for="artist in artists.slice(0, 5)" :key="artist.id">
          <div class="artist-container">
            <ArtistCard :artist="artist" />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import ArtistCard from "./ArtistCard.vue";
  
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
  /* Contenedor del artista */
  .artist-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 0;
    margin: 0;
  }
  
  /* Imagen redonda */
  .artist-img {
    width: 230px;
    height: 230px;
    border-radius: 50%;
    object-fit: cover;
    transition: transform 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }
  
  /* Efecto hover en la imagen */
  .artist-img:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }
  
  /* Nombre del artista */
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
  