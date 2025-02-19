<template>
  <div v-if="mostrarModal" class="modal-overlay">
    <div class="modal-content text-white">
      <h2>Iniciar Sesión</h2>
      <p>Ingresa tu nombre de usuario y contraseña.</p>

      <!-- Input para el nombre -->
      <input v-model="nombreLogin" type="text" class="form-control" placeholder="Nombre de usuario" />

      <!-- Input para la contraseña -->
      <input v-model="contraseñaLogin" type="password" class="form-control mt-2" placeholder="Contraseña" />

      <!-- Botón para iniciar sesión -->
      <button @click="iniciarSesion" class="btn btn-primary">Iniciar sesión</button>
      <button @click="cerrarModal" class="btn btn-secondary mt-2">Cancelar</button>

      <!-- Mensaje de error -->
      <p v-if="errorMensaje" class="error">{{ errorMensaje }}</p>
      
      <!-- Botón para registrarse -->
      <p class="mt-4">
        ¿Todavía no tienes una cuenta?
        <button @click="abrirRegistro" class="btn-link mt-2">Regístrate aquí</button>
      </p>
    </div>
  </div>
  <WelcomeModal ref="welcomeModal" @usuarioRegistrado="usuario = $event" @usuarioLogueado="usuarioLogueado = $event" />
</template>
  
<script setup>
  import { ref, defineEmits } from 'vue';
  import WelcomeModal from './WelcomeModal.vue';
  
  const mostrarModal = ref(false);
  const nombreLogin = ref('');
  const contraseñaLogin = ref('');
  const errorMensaje = ref('');
  const welcomeModal = ref(null);
  const emit = defineEmits(["usuarioLogueado"]);
  
  const abrirModal = () => {
    mostrarModal.value = true;
    errorMensaje.value = ''; // Limpiar errores cuando se abre el modal
    nombreLogin.value = '';
    contraseñaLogin.value = '';
  };

  const abrirRegistro = () => {
    welcomeModal.value.abrirModal();
    cerrarModal();
  };
  
  const cerrarModal = () => {
    mostrarModal.value = false;
  };
  
  const iniciarSesion = () => {
    const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];
    
    if (usuariosGuardados.length === 0) {
      errorMensaje.value = "No hay usuarios registrados. Regístrate primero.";
      return;
    }

    // Buscar el usuario en la lista de usuarios guardados
    const usuarioEncontrado = usuariosGuardados.find(usuario => usuario.nombre === nombreLogin.value);

    if (!usuarioEncontrado) {
      errorMensaje.value = "Usuario no encontrado.";
      return;
    }

    if (usuarioEncontrado.contraseña === contraseñaLogin.value) {
      // Marcar sesión iniciada
      usuarioEncontrado.sesionIniciada = true;
      localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));  // Actualizar usuarios en localStorage
      emit("usuarioLogueado", usuarioEncontrado);
      
      cerrarModal();
    } else {
      errorMensaje.value = "Usuario o contraseña incorrecta.";
    }

  };
  
  defineExpose({ abrirModal });
</script>
  
<style scoped>
 .modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1100;
}

.modal-content {
  background: #2c2c2c;
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  width: 500px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.4);
}

h2 {
  font-size: 1.8rem;
  color: #fff;
}

input {
  width: 100%;
  padding: 12px;
  margin-top: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background: #333;
  color: white;
}

input::placeholder {
  color: #aaa;
}

button {
  padding: 10px 15px;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
}

button.btn-primary {
  background-color: #007bff;
  color: white;
  border: none;
  margin-top: 15px;
}

button.btn-primary:hover {
  background-color: #0056b3;
}

button.btn-secondary {
  color: white;
  background-color: #495057;
  border: none;
}

button.btn-secondary:hover {
  background-color: #343a40;
}

.error {
  color: red;
  margin-top: 10px;
}

.btn-link {
  text-decoration: none;
}

.btn-link:hover {
  text-decoration: underline;
}
  </style>