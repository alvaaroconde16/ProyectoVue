<template>
  <nav class="navbar navbar-expand-lg shadow-sm">
    <div class="container d-flex justify-content-between align-items-center">
      <!-- LOGO y Menú de navegación -->
      <div class="d-flex align-items-center">
        <router-link class="navbar-brand fw-bold" to="/">
          MusicApp
        </router-link>

        <div class="collapse navbar-collapse" id="navbarNav">
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

      <!-- Usuario logueado o botones de Login/Registro -->
      <div class="d-flex align-items-center">
        <div v-if="usuario" class="d-flex align-items-center">
          <img :src="usuario.avatar" alt="Avatar" class="avatar" />
          <span class="text-white ms-2">Hola, {{ usuario.nombre }}!</span>
          <button @click="cerrarSesion" class="btn btn-sm btn-danger ms-3">Cerrar Sesión</button>
        </div>

        <div v-if="!usuario" class="d-flex">
          <button @click="abrirRegistro" class="btn btn-success me-2">Registrarse</button>
          <button @click="abrirLogin" class="btn btn-primary">Login</button>
        </div>
      </div>
    </div>

    <!-- Modales -->
    <WelcomeModal ref="welcomeModal" @usuarioRegistrado="usuario = $event" />
    <LoginModal ref="loginModal" @usuarioLogueado="usuario = $event" />
  </nav>
</template>

<script setup>
import { ref, onMounted } from "vue";
import WelcomeModal from "@/components/WelcomeModal.vue";
import LoginModal from "@/components/LoginModal.vue";

const usuario = ref(null);
const welcomeModal = ref(null);
const loginModal = ref(null);

onMounted(() => {
  const usuarioGuardado = localStorage.getItem("usuario");
  if (usuarioGuardado) {
    const datosUsuario = JSON.parse(usuarioGuardado);
    if (datosUsuario.sesionIniciada === true) {
      usuario.value = datosUsuario;
    } else {
      loginModal.value.abrirModal();
    }
  } else {
    welcomeModal.value.abrirModal();
  }
});

const abrirRegistro = () => {
  welcomeModal.value.abrirModal();
};

const abrirLogin = () => {
  loginModal.value.abrirModal();
};

const cerrarSesion = () => {
  let usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));
  if (usuarioGuardado) {
    usuarioGuardado.sesionIniciada = false;
    localStorage.setItem("usuario", JSON.stringify(usuarioGuardado));
  }
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
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  transition: transform 0.3s ease;
}

.navbar-brand:hover {
  transform: scale(1.1);
  background: linear-gradient(135deg, #ff6f61, #d147a3, #1e90ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
