<template>
    <div class="container mt-5">
      <h3 class="mb-4">Álbumes Populares</h3>
  
      <!-- Grid de álbumes -->
      <div class="album-grid">
        <div v-for="album in albums.slice(0, 5)" :key="album.id" class="album-item">
          <RouterLink :to="'/album/' + album.id" class="album-link">
            <div class="album-card">
              <img :src="album.cover_medium" class="album-img" :alt="album.title" />
              <p class="album-title">{{ album.title }}</p>
              <p class="album-text text-secondary">{{ album.artist.name }}</p>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  
  const albums = ref([]);
  
  // Obtener álbumes populares de Deezer
  const fetchPopularAlbums = async () => {
    try {
      const response = await fetch("http://localhost:8080/https://api.deezer.com/chart");
      if (!response.ok) throw new Error("Error al obtener los álbumes populares");
  
      const data = await response.json();
      albums.value = data.albums.data;
    } catch (error) {
      console.error(error.message);
    }
  };
  
  onMounted(fetchPopularAlbums);
  </script>
  
  <style scoped>
  /* Estilos generales */
  .album-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    justify-content: center;
  }

  .album-link {
    text-decoration: none;
    color: inherit;
  }
  
  .album-item {
    text-align: center;
  }
  
  .album-card {
    background-color: transparent;
    border: 0;
    padding: 10px;
    transition: transform 0.3s ease;
  }
  
  .album-card:hover {
    transform: scale(1.05);
  }
  
  .album-img {
    width: 100%;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }
  
  .album-title {
    margin-top: 10px;
    color: white;
  }
  
  h3 {
    color: white;
  }
  </style>
  