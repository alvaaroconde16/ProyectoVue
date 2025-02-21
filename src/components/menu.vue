<template>
  <nav class="navbar navbar-expand-lg shadow-sm">
    <div class="container d-flex justify-content-between align-items-center">
      <div class="d-flex align-items-center">
        <router-link class="navbar-brand fw-bold" to="/">
          MusicApp
        </router-link>
        <p class="separacion text-white">|</p>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav gap-3">
            <li class="nav-item"><router-link class="nav-link" to="/">Home</router-link></li>
            <li class="nav-item"><router-link class="nav-link" to="/playlists">Playlist</router-link></li>
            <li class="nav-item"><router-link class="nav-link" to="/search2">Buscador</router-link></li>
          </ul>
        </div>
      </div>
      <div class="d-flex align-items-center">
        <div v-if="usuario" class="d-flex align-items-center">
          <img :src="usuario.avatar" alt="Avatar" class="avatar" />
          <button @click="cerrarSesion" class="btn btn-danger ms-4"><i class="bi bi-box-arrow-right me-2"></i>Salir</button>
        </div>
        <div v-else>
          <button @click="abrirLogin" class="btn btn-primary">Iniciar Sesión</button>
        </div>
      </div>
    </div>
    <LoginModal ref="loginModal" @usuarioLogueado="usuario = $event" />
  </nav>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import LoginModal from "@/components/LoginModal.vue";
  
  const usuario = ref(null);
  const loginModal = ref(null);
  
  onMounted(() => {
    const usuarioGuardado = JSON.parse(localStorage.getItem("usuarioLogueado"));
    if (usuarioGuardado && usuarioGuardado.sesionIniciada) {
      usuario.value = usuarioGuardado;
    } else {
      loginModal.value.abrirModal();
    }
  });
  
  const abrirLogin = () => {
    loginModal.value.abrirModal();
  };
  
  const cerrarSesion = () => {
    localStorage.removeItem("usuarioLogueado");
    usuario.value = null;
  };
</script>


<style scoped>
.navbar {
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #262626;
}

.navbar-nav .nav-link {
  font-size: 1.1rem;
  transition: transform 0.3s ease;
  color: white;
}

.navbar-nav .nav-link:hover {
  transform: scale(1.1);
  border-bottom: 2px solid white;
}

.navbar-brand {
  font-size: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  background: linear-gradient(135deg, #ff6f61, #d147a3, #1e90ff);
  background-clip: text;
  color: transparent;
  transition: transform 0.3s ease;
}

.navbar-brand:hover {
  transform: scale(1.1);
  background: linear-gradient(135deg, #ff6f61, #d147a3, #1e90ff);
  background-clip: text;
  color: transparent;
}

.navbar-brand:focus {
  outline: none; /* Elimina el contorno al hacer foco */
  background: linear-gradient(135deg, #ff6f61, #d147a3, #1e90ff); /* Mantén el fondo */
  color: transparent; /* Mantén el color transparente */
  background-clip: text; /* Mantén el clip de fondo */
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
}

.separacion {
  font-size: 1.6rem;
  color: white;
  padding: 0;
  margin: 0;
  margin-right: 15px;
  margin-left: 2px;
}
</style>
