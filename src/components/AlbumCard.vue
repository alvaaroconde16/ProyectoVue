<template>
    <div class="album-card">
      <!-- Carátula del álbum -->
      <img :src="album?.cover_medium || ''" alt="Portada del álbum" class="album-cover" />
  
      <!-- Información del álbum -->
      <div class="album-info">
        <h5>{{ album?.title || 'Título del álbum' }}</h5>
        <p>{{ album?.artist?.name || 'Artista' }}</p>
      </div>
  
      <!-- Botón (opcional) para agregar a una lista, ver más detalles, etc. -->
      <button class="btn btn-link" @click="handleClick">
        <i class="bi bi-play-circle"></i> Ver más
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  // Recibir el álbum como prop
  const props = defineProps({
    album: {
      type: Object,
      required: true
    }
  });
  
  // Función que se ejecuta al hacer click en el botón (puedes modificarla según necesidad)
  const handleClick = () => {
    // Aquí puedes agregar la lógica para hacer algo cuando el usuario haga clic, como ir a la página del álbum.
    console.log("Ver detalles del álbum:", props.album);
  };
  </script>
  
  <style scoped>
  .album-card {
    background-color: #333;
    color: white;
    padding: 10px;
    border-radius: 10px;
    text-align: center;
    max-width: 200px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  }
  
  .album-cover {
    width: 100%;
    height: auto;
    border-radius: 5px;
    margin-bottom: 10px;
  }
  
  .album-info h5 {
    font-size: 16px;
    margin: 0;
  }
  
  .album-info p {
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
  