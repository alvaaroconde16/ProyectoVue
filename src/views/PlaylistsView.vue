<template>
  <div class="container playlist-view">
    <h2 class="mt-4">Gestión de Playlists</h2>
    <PlaylistManager />
  </div>
</template>

<script setup>
import PlaylistManager from "@/components/PlaylistManager.vue";
</script>

<style scoped>
h2 {
  /* color: #1e90ff; */
  color: white;
}
</style>