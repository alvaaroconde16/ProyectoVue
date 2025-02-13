<template>
    <div class="album-container container">
  
      <!-- Información del álbum -->
      <div class="album-header d-flex align-items-center gap-4 mt-3">
        <img :src="album.cover_xl" alt="Album cover" class="album-image" />
        <div class="album-info">
          <h1>{{ album.title }}</h1>
          <p class="text-secondary">Por {{ album.artist?.name }}</p>
          <p class="text-secondary">{{ album.nb_tracks }} canciones - Lanzado en {{ album.release_date }}</p>
        </div>
      </div>
  
      <!-- Lista de canciones del álbum -->
      <div class="songs-section mt-5">
        <h2>Lista de Canciones</h2>
        <div class="list-group my-4" v-if="tracks.length > 0">
          <SongCard v-for="track in tracks" :key="track.id" :song="track" />
        </div>
      </div>
  
      <!-- Otros álbumes del mismo artista -->
      <div class="albums-section mt-5">
        <h2 class="mb-4">Más de {{ album.artist?.name }}</h2>
        <div class="row row-cols-1 row-cols-md-5 g-4">
          <AlbumCard v-for="relatedAlbum in relatedAlbums" :key="relatedAlbum.id" :album="relatedAlbum" />
        </div>
      </div>
  
      <!-- Artistas destacados -->
      <FeaturedArtists />
  
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import SongCard from "@/components/SongCard.vue";
  import AlbumCard from "@/components/AlbumCard.vue";
  import FeaturedArtists from "@/components/FeaturedArtists.vue";
  
  const route = useRoute();
  const album = ref({});
  const tracks = ref([]);
  const relatedAlbums = ref([]);
  
  // Obtener datos del álbum
  onMounted(async () => {
    const albumId = route.params.id;
    await fetchAlbumInfo(albumId);
  });
  
  const fetchAlbumInfo = async (id) => {
    try {
      // Obtener información del álbum
      const albumRes = await fetch(`http://localhost:8080/https://api.deezer.com/album/${id}`);
      const albumData = await albumRes.json();
      album.value = albumData;
      tracks.value = albumData.tracks.data;
  
      // Obtener otros álbumes del mismo artista
      const relatedAlbumsRes = await fetch(`http://localhost:8080/https://api.deezer.com/artist/${albumData.artist.id}/albums`);
      const relatedAlbumsData = await relatedAlbumsRes.json();
      relatedAlbums.value = relatedAlbumsData.data.filter(a => a.id !== id).slice(0, 8);
  
    } catch (error) {
      console.error("Error al obtener información del álbum:", error);
    }
  };
  </script>
  
  <style scoped>
  .album-container {
    padding: 20px;
    border-radius: 10px;
    color: white;
  }
  
  .album-image {
    width: 250px;
    border-radius: 10px;
    object-fit: cover;
  }
  
  .artist-link {
    text-decoration: none;
    color: #1e90ff;
    font-weight: bold;
  }
  
  .artist-link:hover {
    text-decoration: underline;
  }
  </style>
  