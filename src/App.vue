<template>
  <div id="app">
    <!-- HEADER -->
    <header class="header">
      <div class="container text-center">
        <h1 class="text-white">Deezer Music Client</h1>
      </div>
    </header>

    <!-- MENÚ MODERNO -->
    <Menu />

    <!-- CONTENIDO PRINCIPAL -->
    <main class="main-content">
      <router-view />
    </main>

    <!-- REPRODUCTOR DE MÚSICA -->
    <MusicPlayer />

    <footer>
      <div class="footer mt-5">
        <p>Desarrollado por Álvaro Conde con Vue 3 y Bootstrap 5</p>
      </div>
    </footer>
   
  </div>
</template>

<script setup>
import Menu from "./components/menu.vue";
import MusicPlayer from "./components/MusicPlayer.vue";
</script>

<style lang="scss">
/* ====== VARIABLES ====== */
$primary-color: #ff6f61;
$secondary-color: #282c34;
$blue-color: #1e90ff;  /* Azul brillante */
$text-color: #ffffff;

/* ====== ESTILOS GENERALES ====== */
body {
  background: linear-gradient(180deg, #f8f9fa, #e9ecef);
  color: #222;
  font-family: "Poppins", sans-serif;
  margin: 0;
  padding: 0;
}

/* ====== HEADER MODERNO ====== */
.header {
  background: linear-gradient(105deg, #ff6f61, #d147a3, #1e90ff);
  padding: 1.5rem 0;
  text-align: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  color: white;
}

.header h1 {
  font-size: 2rem;
  font-weight: bold;
}

/* ====== CONTENIDO PRINCIPAL ====== */
.main-content {
  margin: auto;
}

/* ====== FOOTER ESTILIZADO ====== */
.footer {
  background: rgba(255, 255, 255, 0.1);
  text-align: center;
  padding: 1rem 0;
  margin-top: 2rem;
  font-size: 0.9rem;
}
</style>
