<template>
  <div v-if="songs.length > 0" class="container mt-4">
    <h2>Canciones destacadas</h2>
    <div id="songCarousel" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">

        <div class="carousel-item" :class="{ active: index === 0 }" v-for="(song, index) in songs" :key="song.id">
          <img :src="song.album.cover_medium" class="d-block w-100" alt="Imagen del álbum">
          <div class="carousel-caption d-none d-md-block">
            <h5>{{ song.title }}</h5>
            <p>{{ song.artist.name }}</p>
          </div>
        </div>
      
      </div>
      
      <button class="carousel-control-prev" type="button" data-bs-target="#songCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      
      <button class="carousel-control-next" type="button" data-bs-target="#songCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>

<script setup>
  defineProps({
    songs: {
      type: Array,
      required: true
    }
  });
</script>

<style scoped>
.carousel-inner img {
  max-height: 400px;
  object-fit: cover;
}

.container {
  margin-top: 20px;
}
</style>
