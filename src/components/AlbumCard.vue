<template>
  <RouterLink :to="'/album/' + album.id" class="album-link">
    <div class="album-card">
      <!-- Carátula del álbum -->
      <img :src="album.cover_medium" class="card-img-top album-image" :alt="album.title" />

      <div class="card-body">
        <!-- Título del álbum -->
        <h5 class="card-title mt-2">{{ album.title }}</h5>
      </div>
    </div>
  </RouterLink>
</template>

<script setup>
  const props = defineProps({
    album: Object,
  });
</script>

<style scoped>
.album-link {
  text-decoration: none; /* Quita el subrayado */
  color: inherit; /* Usa el color del padre */
}

.album-link:hover {
  text-decoration: none;
}

.album-card {
  background-color: transparent;
  border: 0;
  color: white;
}

.card-title {
  font-size: 18px;
  margin-top: 15px;
}
</style>
