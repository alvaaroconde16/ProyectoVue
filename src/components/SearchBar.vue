<template>
  <div class="search-container">
    <div class="search-input">
      <input type="text" v-model="searchQuery" @keyup.enter="searchDeezer" placeholder="¿Qué quieres reproducir?" />
      
      <button @click="toggleSort">
        <i class="bi bi-sort-alpha-down"></i> <!-- Ícono de orden alfabético -->
      </button>
      
      <button @click="searchDeezer">
        <i class="bi bi-search"></i> <!-- Ícono de búsqueda de Bootstrap -->
      </button>
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue";

  const searchQuery = ref(""); // Estado reactivo para la barra de búsqueda
 
  // Función para realizar la búsqueda
  const searchDeezer = async () => {
    if (searchQuery.value.trim() === "") return; // Evita búsquedas vacías

    try {
      // Hacemos tres búsquedas en paralelo con Promise.all (canciones, álbumes y artistas)
      const [tracksRes, albumsRes, artistsRes] = await Promise.all([
        fetch(`http://localhost:8080/https://api.deezer.com/search/track?q=${encodeURIComponent(searchQuery.value)}`).then(res => res.json()),
        fetch(`http://localhost:8080/https://api.deezer.com/search/album?q=${encodeURIComponent(searchQuery.value)}`).then(res => res.json()),
        fetch(`http://localhost:8080/https://api.deezer.com/search/artist?q=${encodeURIComponent(searchQuery.value)}`).then(res => res.json())
      ]);

      // Emitimos los resultados, combinando los tres tipos
      const results = [
        ...tracksRes.data.slice(0,12).map(item => ({ ...item, type: "track" })),
        ...albumsRes.data.slice(0,5).map(item => ({ ...item, type: "album" })),
        ...artistsRes.data.slice(0,5).map(item => ({ ...item, type: "artist" }))
      ];

      emit("results", results); // Emitimos los resultados al componente padre

    } catch (error) {
      console.error("Error al buscar en Deezer:", error);
    }
  };

  // Función para emitir el evento de ordenación
  const toggleSort = () => {
    emit("toggleSort");
  };

  // Define la función para emitir eventos
  const emit = defineEmits(["results"]);
</script>


  
<style scoped>
  .search-container {
    display: flex;
    justify-content: center;
    margin: 6px 0;
  }
   .search-input {
    width: 100%;
    max-width: 600px; /* Opcional: limitar el ancho máximo */
    display: flex;
    align-items: center;
    border: 1px solid #363636;
    border-radius: 5px;
    background-color: #1f1f1f;
  }
   .search-input input {
    flex: 1;
    border: none;
    outline: none;
    padding: 10px;
    font-size: 16px;
    border-radius: 5px 0 0 5px;
    background-color: #1f1f1f;
    color: white;
  }
   .search-input button {
    border: none;
    background-color: transparent;
    padding: 0 10px;
    cursor: pointer;
    color: #ff6b81;
    font-size: 20px;
  }
   .search-input button:hover {
    /* color: #363636; */
    color: white;
  }
</style> 