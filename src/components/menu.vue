<template>
  <nav class="navbar navbar-expand-lg shadow-sm">
    <div class="container">
      <!-- LOGO -->
      <router-link class="navbar-brand fw-bold" to="/">
        MusicApp
      </router-link>

      <!-- Contenedor flex para centrar la barra de búsqueda -->
      <!-- <div class="search-container mx-auto"> -->
        <!-- <SearchBar/> -->
      <!-- </div> -->

      <!-- Menú de navegación -->
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav gap-3">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/playlists">Playlists</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/search2">Buscador</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
  import { RouterLink } from "vue-router";
</script>

<style scoped>
.navbar {
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #262626;
}

/* Contenedor para centrar la barra de búsqueda */
.search-container {
  flex-grow: 1;
  max-width: 400px;
}

/* Estilo de los enlaces del menú */
.navbar-nav .nav-link {
  font-size: 1.1rem;
  transition: transform 0.3s ease;
  color: white;
}

/* Hover en los enlaces */
.navbar-nav .nav-link:hover {
  transform: scale(1.1);
  border-bottom: 2px solid white;
}

/* Logo del menú */
.navbar-brand {
  font-size: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  background: linear-gradient(135deg, #ff6f61, #d147a3, #1e90ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  transition: transform 0.3s ease;
}

.navbar-brand:hover {
  color: transparent;
  transform: scale(1.1);
}
</style>
