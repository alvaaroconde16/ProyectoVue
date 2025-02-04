<template>
  <div class="container playlist-view">
    <h1 class="mt-4">Gestión de Playlists</h1>
    <PlaylistManager />
  </div>
</template>

<script setup>
import PlaylistManager from "@/components/PlaylistManager.vue";
</script>

<style scoped>
h1 {
  color: #1e90ff;
}
</style>