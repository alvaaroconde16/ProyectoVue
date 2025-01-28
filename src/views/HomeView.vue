<template>
  <div>
    <h1>Búsqueda de canciones en Deezer</h1>

    <!-- Componente SearchBar para búsqueda (solo afecta al grid, no al carrusel) -->
    <SearchBar @results="handleResults" />

     <!-- Tabla de canciones -->
     <div class="table-responsive mt-4" v-if="songs.length > 0">
        <table class="table table-striped table-bordered">
          <thead class="table-primary">
            <tr>
              <th scope="col">Portada</th>
              <th scope="col">Título</th>
              <th scope="col">Favorito</th>
              <th scope="col">Preview</th>
              <th scope="col">Artista</th>
              <th scope="col">Álbum</th>
              <th scope="col">Duración</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="song in songs" :key="song.id">
              <td>
                <img :src="song.album.cover_small" alt="Portada del álbum" class="img-thumbnail" style="width: 50px; height: 50px;"/>
              </td>

              <td><strong>{{ song.title }}</strong></td>

              <td>
                <button class="btn btn-link" @click="toggleFavorite(song)">
                  {{
                    isFavorite(song.id)
                      ? "💙"
                      : "🤍"
                  }}
                </button>
              </td>

              <td>
                <audio :src="song.preview" controls></audio>
              </td>

              <td>{{ song.artist.name }}</td>
              <td>{{ song.album.title }}</td>
              <td>
                {{ Math.floor(song.duration / 60) }}:{{ song.duration % 60 < 10 ? "0" : "" }}{{ song.duration % 60 }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    <br>


    <!-- MOSTRAR CARRUSEL Y GRID DE CANCIONES DESTACADAS -->
    <SongCarousel />
    
    
    <div class="container mt-4">
      <p>Bienvenido a la aplicación Deezer Music Client.</p>
      <p>Este proyecto sirve de base para la aplicación a desarrollar como tarea del curso.</p>
      <p>Para facilitar el desarrollo, este proyecto ya viene configurado con Bootstrap, Bootstrap Icons, SASS, router y Pinia.</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import SearchBar from '../components/SearchBar.vue'; // Componente de búsqueda
import SongCarousel from '../components/SongCarousel.vue'; // Componente de carrusel
import { useFavoritesStore } from '@/stores/favorites'; // Store para favoritos

const songs = ref([]); // Estado para las canciones filtradas según la búsqueda
const favoritesStore = useFavoritesStore();


// Función para manejar los resultados de búsqueda (solo afecta al grid)
const handleResults = (data) => {
  songs.value = data.slice(0,6); // Filtramos las canciones que se muestran en el grid
};

// Comprobamos si la canción está en favoritos
const toggleFavorite = (song) => {
  if (favoritesStore.isFavorite(song.id)) {
    favoritesStore.removeSong(song.id);
  } else {
    favoritesStore.addSong(song);
  }
};

// Función para verificar si la canción está en favoritos
const isFavorite = (id) => favoritesStore.isFavorite(id);

</script>

<style scoped>
h1, h2 {
  color: #007bff;
}

.card-img-top {
  width: 100%;
  height: auto;
}

.card-body {
  text-align: center;
}

.container {
  margin-top: 20px;
}

button {
  background: none;
  border: none;
  color: #007bff;
}

button:hover {
  cursor: pointer;
}
</style>