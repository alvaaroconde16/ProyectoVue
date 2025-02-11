<template>
    <div class="artist-card-container container">
  
      <!-- Información del artista -->
      <div class="artist-header d-flex align-items-center gap-4 mt-3">
        <img :src="artist.picture_medium" alt="Artist image" class="artist-image" />
        <div class="artist-info">
          <h1>{{ artist.name }}</h1>
          <p class="text-secondary">{{ artist.nb_fan }} fans</p>
        </div>
      </div>
  
      <!-- Canciones Populares -->
      <div class="songs-section mt-5">
        <h2>Canciones Populares</h2>
        <!-- Usamos el componente SongCard para las canciones -->
        <div class="list-group my-4" v-if="topSongs.length > 0">
          <SongCard v-for="song in topSongs" :key="song.id" :song="song" />
        </div>
      </div>
  
      <!-- Álbumes del artista -->
      <div class="albums-section mt-5">
        <h2 class="mb-4">Álbumes</h2>
        <div class="row row-cols-1 row-cols-md-5 g-4">
          <AlbumCard v-for="album in albums.slice(0,8)" :key="album.id" :album="album" />
        </div>
      </div>
  
    </div>
  </template>
  
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import SongCard from "@/components/SongCard.vue";  // Asegúrate de importar el componente
  import AlbumCard from "@/components/AlbumCard.vue";  // Asegúrate de importar el componente
  
  const route = useRoute();
  const artist = ref({});
  const albums = ref([]);
  const topSongs = ref([]);
  
  // Cargar información del artista al montar el componente
  onMounted(async () => {
    const artistId = route.params.id;
    await fetchArtistInfo(artistId);
  });
  
  const fetchArtistInfo = async (id) => {
    try {
      const artistRes = await fetch(`http://localhost:8080/https://api.deezer.com/artist/${id}`);
      const artistData = await artistRes.json();
      artist.value = artistData;  // Guardamos el artista
      
      const albumsRes = await fetch(`http://localhost:8080/https://api.deezer.com/artist/${id}/albums`);
      const albumsData = await albumsRes.json();
      albums.value = albumsData.data;
  
      const tracksRes = await fetch(`http://localhost:8080/https://api.deezer.com/artist/${id}/top?limit=5`);
      const tracksData = await tracksRes.json();
      topSongs.value = tracksData.data;
  
    } catch (error) {
      console.error("Error fetching artist data:", error);
    }
  };
  </script>
  
  
  <style scoped>
  .artist-card-container {
    padding: 20px;
    border-radius: 10px;
  }
  
  .artist-image {
    border-radius: 50%;
    object-fit: cover;
  }
  </style>
  