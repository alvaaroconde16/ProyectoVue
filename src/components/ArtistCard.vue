<template>
    <div class="artist-card">
      <!-- Imagen del artista -->
      <img :src="artist?.picture_medium || ''" alt="Imagen del artista" class="artist-image" />
  
      <!-- Información del artista -->
      <div class="artist-info">
        <h5>{{ artist?.name || 'Nombre del Artista' }}</h5>
        <p>{{ artist?.nb_album || 0 }} álbumes</p>
      </div>
  
      <!-- Botón opcional para más detalles -->
      <button class="btn btn-link" @click="handleClick">
        <i class="bi bi-person-circle"></i> Ver más
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  // Recibir la información del artista como prop
  const props = defineProps({
    artist: {
      type: Object,
      required: true
    }
  });
  
  // Función que se ejecuta al hacer click en el botón (puedes redirigir a detalles del artista o hacer algo más)
  const handleClick = () => {
    console.log("Ver detalles del artista:", props.artist);
  };
  </script>
  
  <style scoped>
  .artist-card {
    background-color: #333;
    color: white;
    padding: 10px;
    border-radius: 10px;
    text-align: center;
    max-width: 200px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  }
  
  .artist-image {
    width: 100%;
    height: auto;
    border-radius: 50%;
    margin-bottom: 10px;
  }
  
  .artist-info h5 {
    font-size: 16px;
    margin: 0;
  }
  
  .artist-info p {
    font-size: 14px;
    color: #bbb;
  }
  
  .btn {
    color: #fff;
    font-size: 24px;
    cursor: pointer;
  }
  
  .btn:hover {
    color: #ccc;
  }
  </style>
  